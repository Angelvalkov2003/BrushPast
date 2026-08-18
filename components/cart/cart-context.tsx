"use client";

import {
  enrichVariant,
  optionsFromVariant,
  parseVariantTitle,
} from "lib/product-variants";
import { checkStockQuantity } from "lib/cart-stock";
import {
  cartProductFromBox,
  isBoxCartItem,
  recalcBoxCartItem,
  removeBoxContentItem,
  type BoxCartPayload,
} from "lib/shop-box-cart";
import { boxTypeLabel } from "lib/shop-box-config";
import type {
  Cart,
  CartItem,
  Product,
  ProductVariant,
} from "lib/types";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type UpdateType = "plus" | "minus" | "delete";

type AddCartOptions = {
  variantOptions?: ProductVariant[];
};

type CartContextType = {
  cart: Cart | null;
  /** Increments on each add-to-bag - drives cart icon animation */
  cartPulse: number;
  stockError: string | null;
  clearStockError: () => void;
  updateCartItem: (itemId: string, updateType: UpdateType) => boolean;
  addCartItem: (variant: ProductVariant, product: Product, options?: AddCartOptions) => boolean;
  addBoxItem: (box: BoxCartPayload) => boolean;
  removeBoxContent: (itemId: string, contentId: string) => void;
  updateCartVariant: (itemId: string, variant: ProductVariant) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function updateCartItemQuantity(
  item: CartItem,
  updateType: UpdateType,
): CartItem | null {
  if (updateType === "delete") return null;

  const newQuantity =
    updateType === "plus" ? item.quantity + 1 : item.quantity - 1;
  if (newQuantity === 0) return null;

  return {
    ...item,
    quantity: newQuantity,
  };
}

function toVariantOptions(variants: ProductVariant[] | undefined) {
  if (!variants?.length) return undefined;
  return variants.map((v) => {
    const enriched = enrichVariant(v);
    return {
      id: enriched.id,
      title: enriched.title,
      price: enriched.price,
      available: enriched.available,
      sku: enriched.sku,
      selectedOptions: enriched.selectedOptions,
      maxQuantity: enriched.maxQuantity,
    };
  });
}

function createOrUpdateCartItem(
  existingItem: CartItem | undefined,
  variant: ProductVariant,
  product: Product,
  options?: AddCartOptions,
): CartItem {
  const quantity = existingItem ? existingItem.quantity + 1 : 1;
  const variantOptions =
    toVariantOptions(options?.variantOptions) ?? existingItem?.variantOptions;
  const maxQuantity = variant.maxQuantity ?? existingItem?.maxQuantity;

  return {
    id: existingItem?.id || `${product.id}-${variant.id}`,
    productId: product.id,
    variantId: variant.id,
    quantity,
    price: variant.price,
    product: {
      id: product.id,
      title: product.title,
      handle: product.handle,
      image: product.featuredImage,
    },
    variant: {
      id: variant.id,
      title: variant.title || "Default",
      sku: variant.sku,
      selectedOptions: optionsFromVariant(variant),
    },
    variantOptions,
    maxQuantity,
  };
}

function updateCartTotals(items: CartItem[]): Pick<Cart, "totalQuantity" | "subtotal" | "total"> {
  // Filter out any invalid items before calculating totals
  const validItems = items.filter((item): item is CartItem => 
    item !== null && 
    item !== undefined && 
    typeof item.quantity === 'number' && 
    typeof item.price === 'number'
  );

  const totalQuantity = validItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const subtotal = validItems.reduce(
    (sum, item) => sum + ((item.price || 0) * (item.quantity || 0)),
    0,
  );

  return {
    totalQuantity,
    subtotal,
    total: subtotal, // Add tax/shipping calculation here if needed
  };
}

function createBoxCartItem(box: BoxCartPayload): CartItem {
  const first = box.contents[0];
  return {
    id: `box-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    productId: first?.productId ?? "box",
    variantId: first?.variantId ?? "box",
    quantity: 1,
    price: box.boxPrice,
    kind: "box",
    box,
    product: cartProductFromBox(box.contents, boxTypeLabel(box.type)),
    variant: {
      id: first?.variantId ?? "box",
      title: first?.variantLabel || "Box",
      sku: first?.sku,
    },
  };
}

function checkBoxStock(box: BoxCartPayload): string | null {
  for (const content of box.contents) {
    const check = checkStockQuantity(
      0,
      content.quantity,
      content.maxQuantity,
      content.title,
      content.variantLabel,
    );
    if (!check.ok) return check.error;
  }
  return null;
}

function createEmptyCart(): Cart {
  return {
    id: undefined,
    items: [],
    totalQuantity: 0,
    subtotal: 0,
    total: 0,
    currency: "GBP",
  };
}


const CART_STORAGE_KEY = "ecommerce_cart";

function loadCartFromStorage(): Cart {
  if (typeof window === "undefined") {
    return {
      id: undefined,
      items: [],
      totalQuantity: 0,
      subtotal: 0,
      total: 0,
      currency: "GBP",
    };
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      
      const validItems = (parsed.items || [])
        .filter(
          (item: CartItem | null | undefined): item is CartItem =>
            item != null &&
            typeof item.id === "string" &&
            typeof item.quantity === "number" &&
            typeof item.price === "number" &&
            item.quantity > 0,
        )
        .map((item: CartItem) => {
          const variantOptions = item.variantOptions?.map((o) => ({
            ...o,
            selectedOptions:
              o.selectedOptions?.length
                ? o.selectedOptions
                : parseVariantTitle(o.title),
          }));
          return {
            ...item,
            variant: {
              ...item.variant,
              selectedOptions:
                item.variant.selectedOptions?.length
                  ? item.variant.selectedOptions
                  : parseVariantTitle(item.variant.title),
            },
            variantOptions,
          };
        });

      // Recalculate totals in case prices changed
      const totalQuantity = validItems.reduce(
        (sum: number, item: CartItem) => sum + (item.quantity || 0),
        0
      );
      const subtotal = validItems.reduce(
        (sum: number, item: CartItem) => sum + ((item.price || 0) * (item.quantity || 0)),
        0
      );
      
      return {
        ...parsed,
        items: validItems,
        totalQuantity,
        subtotal,
        total: subtotal,
        currency: parsed.currency || "GBP",
      };
    }
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
  }

  return {
    id: undefined,
    items: [],
    totalQuantity: 0,
    subtotal: 0,
    total: 0,
    currency: "GBP",
  };
}

function saveCartToStorage(cart: Cart | null) {
  if (typeof window === "undefined") return;

  try {
    if (cart && cart.items.length > 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
}

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartPulse, setCartPulse] = useState(0);
  const [stockError, setStockError] = useState<string | null>(null);

  const clearStockError = () => setStockError(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadedCart = loadCartFromStorage();
    setCart(loadedCart);
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (cart) {
      saveCartToStorage(cart);
    }
  }, [cart]);

  const updateCartItem = (itemId: string, updateType: UpdateType): boolean => {
    let blocked = false;

    setCart((currentCart) => {
      if (!currentCart || !currentCart.items) return currentCart;

      const validItems = currentCart.items.filter(
        (item): item is CartItem => item !== null && item !== undefined && item.id !== undefined
      );

      const target = validItems.find((item) => item.id === itemId);
      if (!target) return currentCart;

      if (updateType === "plus") {
        if (isBoxCartItem(target)) {
          return currentCart;
        }
        const check = checkStockQuantity(
          target.quantity,
          1,
          target.maxQuantity,
          target.product.title,
          target.variant.title,
        );
        if (!check.ok) {
          blocked = true;
          setStockError(check.error);
          return currentCart;
        }
      }

      setStockError(null);

      const updatedItems = validItems
        .map((item) => {
          if (item.id === itemId) {
            const updated = updateCartItemQuantity(item, updateType);
            return updated;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null && item !== undefined);

      if (updatedItems.length === 0) {
        return {
          ...currentCart,
          items: [],
          totalQuantity: 0,
          subtotal: 0,
          total: 0,
        };
      }

      return {
        ...currentCart,
        ...updateCartTotals(updatedItems),
        items: updatedItems,
      };
    });

    return !blocked;
  };

  const addCartItem = (
    variant: ProductVariant,
    product: Product,
    options?: AddCartOptions,
  ): boolean => {
    let added = false;

    setCart((currentCart) => {
      const cart = currentCart || createEmptyCart();

      const validItems = (cart.items || []).filter(
        (item): item is CartItem => item !== null && item !== undefined && item.id !== undefined,
      );

      const existingItem = validItems.find(
        (item) =>
          item.kind !== "box" &&
          item.productId === product.id &&
          item.variantId === variant.id,
      );

      const check = checkStockQuantity(
        existingItem?.quantity ?? 0,
        1,
        variant.maxQuantity ?? existingItem?.maxQuantity,
        product.title,
        variant.title,
      );
      if (!check.ok) {
        setStockError(check.error);
        return currentCart ?? cart;
      }

      setStockError(null);

      const updatedItem = createOrUpdateCartItem(
        existingItem,
        variant,
        product,
        options,
      );

      const updatedItems = existingItem
        ? validItems.map((item) =>
            item.kind !== "box" &&
            item.productId === product.id &&
            item.variantId === variant.id
              ? updatedItem
              : item,
          )
        : [...validItems, updatedItem];

      added = true;

      return {
        ...cart,
        ...updateCartTotals(updatedItems),
        items: updatedItems,
      };
    });

    if (added) setCartPulse((n) => n + 1);
    return added;
  };

  const addBoxItem = (box: BoxCartPayload): boolean => {
    if (!box.contents.length) return false;

    const stock = checkBoxStock(box);
    if (stock) {
      setStockError(stock);
      return false;
    }

    setStockError(null);
    setCart((currentCart) => {
      const cart = currentCart || createEmptyCart();
      const validItems = (cart.items || []).filter(
        (item): item is CartItem => item !== null && item !== undefined && item.id !== undefined,
      );
      const nextItem = createBoxCartItem(box);
      const updatedItems = [...validItems, nextItem];
      return {
        ...cart,
        ...updateCartTotals(updatedItems),
        items: updatedItems,
      };
    });
    setCartPulse((n) => n + 1);
    return true;
  };

  const removeBoxContent = (itemId: string, contentId: string) => {
    setCart((currentCart) => {
      if (!currentCart?.items) return currentCart;
      const updatedItems = currentCart.items
        .map((item) => {
          if (item.id !== itemId) return item;
          return removeBoxContentItem(item, contentId);
        })
        .filter((item): item is CartItem => item !== null && item !== undefined);

      if (updatedItems.length === 0) {
        return {
          ...currentCart,
          items: [],
          totalQuantity: 0,
          subtotal: 0,
          total: 0,
        };
      }

      const recalculated = updatedItems.map((item) =>
        isBoxCartItem(item) ? recalcBoxCartItem(item) ?? item : item,
      );

      return {
        ...currentCart,
        ...updateCartTotals(recalculated),
        items: recalculated,
      };
    });
  };

  const updateCartVariant = (itemId: string, variant: ProductVariant) => {
    setCart((currentCart) => {
      if (!currentCart?.items) return currentCart;

      const validItems = currentCart.items.filter(
        (item): item is CartItem => item != null && item.id !== undefined,
      );

      const target = validItems.find((item) => item.id === itemId);
      if (!target || isBoxCartItem(target) || !variant.available) return currentCart;

      const existingSameVariant = validItems.find(
        (item) =>
          item.productId === target.productId &&
          item.variantId === variant.id &&
          item.id !== itemId,
      );

      const withoutDuplicate = validItems.filter(
        (item) =>
          !(
            item.productId === target.productId &&
            item.variantId === variant.id &&
            item.id !== itemId
          ),
      );

      const mergedQuantity = target.quantity + (existingSameVariant?.quantity ?? 0);
      const check = checkStockQuantity(
        0,
        mergedQuantity,
        variant.maxQuantity,
        target.product.title,
        variant.title,
      );
      if (!check.ok) {
        setStockError(check.error);
        return currentCart;
      }

      setStockError(null);

      const updatedItems = withoutDuplicate.map((item) => {
        if (item.id !== itemId) return item;
        return {
          ...item,
          id: `${item.productId}-${variant.id}`,
          variantId: variant.id,
          quantity: mergedQuantity,
          price: variant.price,
          maxQuantity: variant.maxQuantity ?? item.maxQuantity,
          variant: {
            id: variant.id,
            title: variant.title,
            sku: variant.sku,
            selectedOptions: optionsFromVariant(variant),
          },
        };
      });

      return {
        ...currentCart,
        ...updateCartTotals(updatedItems),
        items: updatedItems,
      };
    });
  };

  const clearCart = () => {
    setCart(null);
    // Also clear from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartPulse,
        stockError,
        clearStockError,
        updateCartItem,
        addCartItem,
        addBoxItem,
        removeBoxContent,
        updateCartVariant,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
