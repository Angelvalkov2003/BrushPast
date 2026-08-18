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
  /** Max purchasable quantity when inventory is limited; omitted when unlimited */
  maxQuantity?: number;
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
  /** @deprecated Use linkedStories - kept for compatibility */
  stories: { title: string; slug: string; pageUrl: string | null }[];
  linkedStories: ProductStoryLink[];
  linkedWorkshop: ProductWorkshopLink | null;
  linkedOrganisations: ProductOrganisationLink[];
};

export type ProductStoryLink = {
  title: string;
  slug: string;
  pageUrl: string;
  imageUrl: string | null;
  quote: string | null;
};

export type ProductWorkshopLink = {
  title: string;
  slug: string | null;
  pageUrl: string;
  imageUrl: string | null;
  locationLabel: string | null;
};

export type ProductOrganisationLink = {
  name: string;
  slug: string | null;
  href: string;
  imageUrl: string | null;
  shortDescription: string | null;
  external: boolean;
};

export type CartVariantOption = {
  id: string;
  title: string;
  price: number;
  available: boolean;
  sku?: string;
  maxQuantity?: number;
  selectedOptions?: { name: string; value: string }[];
};

export type CartItemKind = "product" | "box";

export type CartBoxContent = {
  id: string;
  productId: string;
  variantId: string;
  categoryKey: "coffee" | "tshirt" | "print";
  title: string;
  handle: string;
  imageUrl: string;
  variantLabel: string;
  sku?: string;
  unitPrice: number;
  quantity: number;
  maxQuantity?: number;
};

export type CartBox = {
  type: "a" | "b" | "c" | "d";
  comboId?: "print-tshirt" | "print-coffee" | "tshirt-coffee";
  giftMessage: string;
  contents: CartBoxContent[];
  boxPrice: number;
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
  /** Snapshot of stock limit at add-to-bag time (limited inventory only) */
  maxQuantity?: number;
  /** Default "product" keeps standalone PDP / old category-page adds working. */
  kind?: CartItemKind;
  box?: CartBox;
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
