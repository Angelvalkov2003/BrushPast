export type ContentStatus = "draft" | "active" | "hidden" | "archived";
export type InventoryType = "single" | "limited" | "unlimited";
export type PaymentMethod = "card" | "cash_on_delivery";
export type PaymentStatus =
  | "pending"
  | "paid"
  | "stripe_confirmed"
  | "received"
  | "failed"
  | "cancelled"
  | "refunded";
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type AdminProductVariant = {
  id: string;
  product_id: string;
  variant_name: string | null;
  inventory_type: InventoryType;
  inventory_quantity: number | null;
  sku: string | null;
  price_override: number | null;
  status: ContentStatus;
  sort_order: number;
};

export type AdminProductVariantInput = {
  id?: string;
  variant_name: string;
  inventory_type?: InventoryType;
  inventory_quantity?: number | null;
  sku?: string;
  price_override?: number | null;
  status?: ContentStatus;
};

export type AdminProduct = {
  id: string;
  title: string | null;
  slug: string | null;
  short_description: string | null;
  full_description: string | null;
  main_image_url: string | null;
  price_gbp: number | null;
  story_number: string | null;
  product_type: string | null;
  medium: string | null;
  qr_story_url: string | null;
  edition_number: string | null;
  total_edition_size: string | null;
  profit_share_note: string | null;
  impact_note: string | null;
  weight: string | null;
  dimensions: string | null;
  inventory_type: InventoryType;
  inventory_quantity: number | null;
  workshop_id?: string | null;
  status: ContentStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
  category_ids?: string[];
  story_ids?: string[];
  organisation_ids?: string[];
  images?: { id: string; image_url: string | null; sort_order: number }[];
  variants?: AdminProductVariant[];
};

export type AdminCategory = {
  id: string;
  name: string | null;
  slug: string | null;
  image_url: string | null;
  short_description: string | null;
  shop_cta: string | null;
  status: ContentStatus;
  sort_order: number;
};

export type AdminOrganisation = {
  id: string;
  name: string | null;
  image_url: string | null;
  short_description: string | null;
  location_label: string | null;
  slug: string | null;
  page_url: string | null;
  external_url: string | null;
  status: ContentStatus;
  sort_order: number;
};

export type AdminWorkshop = {
  id: string;
  title: string | null;
  slug: string | null;
  image_url: string | null;
  short_description: string | null;
  location_label: string | null;
  page_url: string | null;
  workshop_category: string | null;
  organisation_id: string | null;
  status: ContentStatus;
  sort_order: number;
};

export type AdminStory = {
  id: string;
  title: string | null;
  slug: string | null;
  image_url: string | null;
  short_description: string | null;
  page_url: string | null;
  tags: string[] | null;
  organisation_id: string | null;
  is_anonymous: boolean;
  status: ContentStatus;
  sort_order: number;
};

export type AdminOrder = {
  id: string;
  order_number: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  payment_method: PaymentMethod | null;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  subtotal: number | null;
  shipping_total: number | null;
  grand_total: number | null;
  optional_contribution_gbp: number | null;
  created_at: string;
};

export type AdminOrderDetail = AdminOrder & {
  address_line_1: string | null;
  address_line_2: string | null;
  city: string | null;
  county: string | null;
  postcode: string | null;
  country: string | null;
  courier_name: string | null;
  shipping_method_name: string | null;
  shipping_price: number | null;
  customer_note: string | null;
  admin_note: string | null;
  stripe_checkout_session_id: string | null;
  gift_message: string | null;
  optional_contribution_gbp: number | null;
  contribution_allocation: string | null;
  box_type: "a" | "b" | "c" | "d" | null;
  box_combo_id: string | null;
  items: {
    id: string;
    product_title: string | null;
    sku: string | null;
    quantity: number;
    unit_price: number | null;
    line_total: number | null;
  }[];
};

export type CustomerMessage = {
  id: string;
  customer_info: string | null;
  source_form: string | null;
  message: string | null;
  created_at: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  source: string;
  created_at: string;
};

export type AdminSponsor = {
  id: string;
  full_name: string | null;
  email: string | null;
  amount_gbp: number;
  tier: "supporter" | "creative_ally" | "project_backer" | "visionary" | "custom";
  payment_status: "pending" | "paid" | "failed" | "refunded";
  created_at: string;
};

export type AdminJournalPostImage = {
  id: string;
  journal_post_id: string;
  image_url: string | null;
  sort_order: number;
};

export type AdminJournalPost = {
  id: string;
  title: string | null;
  slug: string | null;
  description: string | null;
  main_image_url: string | null;
  body: string | null;
  status: ContentStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
  images?: AdminJournalPostImage[];
};
