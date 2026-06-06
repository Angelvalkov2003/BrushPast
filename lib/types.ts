// Base types for the ecommerce application

export type Image = {
  id: string;
  url: string;
  altText?: string;
  width?: number;
  height?: number;
};

export type ProductVariant = {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  sku?: string;
  inventory?: number;
  available: boolean;
  selectedOptions?: { name: string; value: string }[];
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: Image;
  images: Image[];
  price: number;
  compareAtPrice?: number;
  category?: string;
  createdAt: string;
  updatedAt: string;
  available: boolean;
};

export type ProductDetail = Product & {
  shortDescription: string;
  fullDescription: string;
  storyNumber?: string | null;
  productType?: string | null;
  medium?: string | null;
  qrStoryUrl?: string | null;
  editionNumber?: string | null;
  totalEditionSize?: string | null;
  profitShareNote?: string | null;
  impactNote?: string | null;
  weight?: string | null;
  dimensions?: string | null;
  inventoryType?: string | null;
  inventoryQuantity?: number | null;
  variants: ProductVariant[];
  categories: { slug: string; name: string }[];
  creators: { name: string }[];
  stories: { title: string; slug: string; pageUrl: string | null }[];
};

export type CartVariantOption = {
  id: string;
  title: string;
  price: number;
  available: boolean;
  sku?: string;
  selectedOptions?: { name: string; value: string }[];
};

export type CartItem = {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    title: string;
    handle: string;
    image: Image;
  };
  variant: {
    id: string;
    title: string;
    sku?: string;
    selectedOptions?: { name: string; value: string }[];
  };
  /** All purchasable variants for this product (sizes, colours, etc.) */
  variantOptions?: CartVariantOption[];
};

export type Cart = {
  id?: string;
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  total: number;
  currency: string;
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description?: string;
  updatedAt: string;
};

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  currency: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentIntentId?: string;
  createdAt: string;
  updatedAt: string;
};
