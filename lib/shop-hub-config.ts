export const SHOP_GIFT_HERO = {
  eyebrow: "The Archive Shop",
  title: "Every Gift Tells a Story.",
  description:
    "Curated gifts featuring coffee, wearable art and limited-edition prints that support artists and creative projects. Every purchase is packed as a Brush Past gift box.",
  primaryCta: "Build a gift box",
  primaryHref: "#choose-box",
  secondaryCta: "Explore the archive →",
  secondaryHref: "/stories",
  imageAlt:
    "Open Brush Past gift box with a t-shirt, coffee bag, framed print and a small bottle arranged on a table",
  imageNote:
    "IMAGE NEEDED: Lifestyle photograph of an open cardboard Brush Past box containing a t-shirt, a bag of coffee, a framed print and a small bottle.",
} as const;

export const SHOP_SINGLE_OPTIONS = [
  {
    key: "coffee" as const,
    title: "Coffee Box",
    description: "Speciality coffee, beautifully presented. £15.",
    href: "/shop/box/c?category=coffee",
    imageAlt: "Lifestyle photo of a Brush Past coffee gift box",
    imageNote:
      "IMAGE NEEDED: Lifestyle photograph of a specialty coffee bag in a gift box.",
  },
  {
    key: "tshirt" as const,
    title: "T-Shirt Box",
    description: "Premium artist-designed apparel. £35.",
    href: "/shop/box/c?category=tshirt",
    imageAlt: "Lifestyle photo of a Brush Past t-shirt gift box",
    imageNote: "IMAGE NEEDED: Folded story t-shirt packed in a gift box.",
  },
  {
    key: "print" as const,
    title: "Print Box",
    description: "Museum-quality art prints. £28.",
    href: "/shop/box/c?category=print",
    imageAlt: "Lifestyle photo of a Brush Past print gift box",
    imageNote: "IMAGE NEEDED: Framed or packed print in a gift box.",
  },
] as const;

export const SHOP_PAIR_OPTIONS = [
  {
    key: "coffee-print" as const,
    comboId: "print-coffee" as const,
    title: "Coffee & Print",
    priceLabel: "£40",
    href: "/shop/box/b?combo=print-coffee",
    imageAlt: "Coffee bag paired with a print",
    imageNote:
      "IMAGE NEEDED: Composite of a coffee bag and a print as a fixed pair.",
  },
  {
    key: "coffee-tshirt" as const,
    comboId: "tshirt-coffee" as const,
    title: "Coffee & T-Shirt",
    priceLabel: "£47",
    href: "/shop/box/b?combo=tshirt-coffee",
    imageAlt: "Coffee bag paired with a folded t-shirt",
    imageNote:
      "IMAGE NEEDED: Composite of a coffee bag and a t-shirt as a fixed pair.",
  },
  {
    key: "tshirt-print" as const,
    comboId: "print-tshirt" as const,
    title: "T-Shirt & Print",
    priceLabel: "£58",
    href: "/shop/box/b?combo=print-tshirt",
    imageAlt: "T-shirt paired with a print",
    imageNote:
      "IMAGE NEEDED: Composite of a t-shirt and a print as a fixed pair.",
  },
] as const;

export const SHOP_SIGNATURE = {
  title: "Next Chapter",
  description:
    "One gift. Two impacts. One coffee, one t-shirt and one art print — £70.",
  proposition: "One gift. Two impacts.",
  propositionDetail:
    "The first is the gift someone receives. The second is the opportunity it helps create.",
  href: "/shop/box/a",
  priceLabel: "£70",
  imageAlt:
    "Premium gift box containing coffee, a t-shirt and a print together",
  imageNote:
    "IMAGE NEEDED: High-end gift box containing coffee, a t-shirt and a print.",
} as const;

export const SHOP_BUILD_OWN = {
  title: "Build Your Own",
  description:
    "Choose exactly two or three pieces — any mix, including duplicates. Two pieces save 7%; three save 10%.",
  href: "/shop/box/d",
  checks: ["Coffee", "Prints", "T-Shirts", "Duplicates OK"],
  imageAlt: "Row of product icons for mixing a custom gift box",
  imageNote:
    "IMAGE NEEDED: Simple illustrations of coffee, a print and a t-shirt in a row.",
} as const;

export const SHOP_IMPACT = {
  headline: "65% of profits are reinvested into creators, workshops and partner organisations.",
  body: "Your purchase already gives back. If you’d like, you can make it go even further.",
} as const;

export const SHOP_MISSION_STEPS = [
  { title: "Create", note: "Ideas are born in community.", icon: "create" },
  {
    title: "Produce",
    note: "Working with artists to bring ideas to life.",
    icon: "produce",
  },
  { title: "Gift", note: "Thoughtful gifts that inspire.", icon: "gift" },
  {
    title: "Reinvest",
    note: "Revenue supports artists and future projects.",
    icon: "reinvest",
  },
] as const;

export const SHOP_STORY_CARDS = [
  {
    title: "Meet the Artist",
    snippet: "The people behind the work.",
    href: "/stories",
    imageAlt: "Portrait of a Brush Past artist in the studio",
    imageNote: "IMAGE NEEDED: Portrait of a community artist.",
  },
  {
    title: "Behind the Scenes",
    snippet: "How a story becomes an object.",
    href: "/journal",
    imageAlt: "Workshop table with prints and coffee in progress",
    imageNote: "IMAGE NEEDED: Behind-the-scenes making photograph.",
  },
  {
    title: "Workshops",
    snippet: "Safe space. Be creative. Connect.",
    href: "/workshops",
    imageAlt: "People making work together in a workshop",
    imageNote: "IMAGE NEEDED: Workshop session photograph.",
  },
  {
    title: "Studio Journal",
    snippet: "Notes from the making.",
    href: "/journal",
    imageAlt: "Studio journal pages and materials",
    imageNote: "IMAGE NEEDED: Studio still life for the journal.",
  },
  {
    title: "Exhibitions",
    snippet: "Work shown in real spaces.",
    href: "/stories",
    imageAlt: "Exhibition wall of Brush Past prints",
    imageNote: "IMAGE NEEDED: Exhibition or hanging of prints.",
  },
] as const;

export const SHOP_MOBILE_BOX_CARDS = [
  {
    type: "c" as const,
    title: "Single Collection",
    description: "One piece — coffee, t-shirt or print — packed as a gift box.",
    href: "/shop/box/c",
    imageAlt: "A single Brush Past gift box",
    imageNote:
      "IMAGE NEEDED: One gift box with a single piece inside — coffee, a t-shirt or a print.",
  },
  {
    type: "b" as const,
    title: "Curated Pairings",
    description: "Three fixed two-piece gifts. Choose the designs.",
    href: "/shop#choose-box",
    imageAlt: "A Brush Past pair gift box",
    imageNote:
      "IMAGE NEEDED: A gift box styled as a pair — two pieces packed together.",
  },
  {
    type: "a" as const,
    title: "Next Chapter",
    description: "Coffee, t-shirt and print together. £70.",
    href: "/shop/box/a",
    imageAlt: "Next Chapter gift box",
    imageNote: "IMAGE NEEDED: Complete three-piece gift box.",
  },
  {
    type: "d" as const,
    title: "Build Your Own",
    description: "Two or three pieces. Mix freely. Save 7–10%.",
    href: "/shop/box/d",
    imageAlt: "Build Your Own gift box",
    imageNote: "IMAGE NEEDED: Mixed custom gift box.",
  },
] as const;

export const SHOP_VALUE_PROPS = [
  {
    title: "Supporting artists",
    note: "Empowering independent artists.",
  },
  {
    title: "Sustainable & ethical",
    note: "Choices for people and planet.",
  },
  {
    title: "Premium quality",
    note: "Handpicked materials.",
  },
  {
    title: "Meaningful impact",
    note: "65% of profits reinvested.",
  },
] as const;
