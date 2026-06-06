import type { LegalPageContent } from "./types";

const LAST_UPDATED = "1 June 2026";

const contactBlock =
  "For questions about these policies, contact us at hello@brushpast.org or 07710 022 677.";

export const legalPages: Record<string, LegalPageContent> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    description:
      "How Brush Past collects, uses, and protects your personal data when you shop, share a story, or contact us — in line with UK GDPR.",
    lastUpdated: LAST_UPDATED,
    sections: [
      {
        title: "Who we are",
        paragraphs: [
          "Brush Past is a Community Interest Company (CIC) based in the United Kingdom. We operate brushpast.org — a creative platform and social enterprise combining storytelling, workshops, and The Archive Shop.",
          "We are the data controller for personal data collected through this website. Our activities are focused on supporters, customers, and partners in the UK.",
          contactBlock,
        ],
      },
      {
        title: "What data we collect",
        paragraphs: ["We may collect:"],
        list: [
          "Identity and contact details (name, email, phone) when you contact us, share your story, or place an order",
          "UK delivery and billing details for shop orders",
          "Order history and payment references (card payments are processed by Stripe in GBP; we do not store full card numbers)",
          "Technical data (IP address, browser type, device) via cookies and server logs",
          "Communications you send us (messages, story submissions, workshop enquiries)",
        ],
      },
      {
        title: "How we use your data",
        paragraphs: ["We use personal data to:"],
        list: [
          "Process and fulfil shop orders and donations (where applicable)",
          "Respond to enquiries and story submissions",
          "Send operational emails (order updates) where relevant",
          "Improve our website and comply with UK legal obligations",
          "Protect against fraud and misuse",
        ],
      },
      {
        title: "Legal bases (UK GDPR)",
        paragraphs: ["We rely on:"],
        list: [
          "Contract — to fulfil orders and provide services you request",
          "Legitimate interests — to operate our social enterprise, improve the site, and communicate with supporters (balanced against your rights)",
          "Consent — for non-essential cookies and optional marketing (where offered)",
          "Legal obligation — where law requires us to retain or disclose data",
        ],
      },
      {
        title: "Sharing and processors",
        paragraphs: [
          "We use trusted service providers who process data on our behalf, including hosting (Vercel), database (Supabase), payments (Stripe), email (Resend), and image hosting (Cloudinary). They act under contract and only as instructed.",
          "We do not sell your personal data.",
        ],
      },
      {
        title: "International transfers",
        paragraphs: [
          "Some providers may process data outside the UK. Where this occurs, we ensure appropriate safeguards (e.g. UK adequacy decisions or standard contractual clauses) are in place.",
        ],
      },
      {
        title: "Retention",
        paragraphs: [
          "We keep data only as long as needed for the purposes above, including statutory retention for tax and accounting where orders are placed.",
        ],
      },
      {
        title: "Your rights",
        paragraphs: ["Under UK data protection law you may have the right to:"],
        list: [
          "Access, rectify, or erase your personal data",
          "Restrict or object to certain processing",
          "Data portability (where applicable)",
          "Withdraw consent (for consent-based processing)",
          "Lodge a complaint with the ICO (ico.org.uk)",
        ],
      },
      {
        title: "Security",
        paragraphs: [
          "We implement appropriate technical and organisational measures to protect personal data. No method of transmission over the internet is 100% secure.",
        ],
      },
      {
        title: "Children",
        paragraphs: [
          "Our shop and forms are not directed at children under 16. If you believe we have collected a child's data, please contact us.",
        ],
      },
      {
        title: "Changes",
        paragraphs: [
          "We may update this policy from time to time. The date at the top shows when it was last revised.",
        ],
      },
    ],
  },
  cookies: {
    slug: "cookies",
    title: "Cookies Policy",
    description:
      "How Brush Past uses cookies and similar technologies on brushpast.org — and how you can control them (UK PECR & UK GDPR).",
    lastUpdated: LAST_UPDATED,
    sections: [
      {
        title: "What are cookies?",
        paragraphs: [
          "Cookies are small text files stored on your device when you visit a website. They help the site work, remember preferences (such as items in your bag), and — only with your consent — understand how visitors use the site.",
        ],
      },
      {
        title: "How we use cookies",
        paragraphs: [
          "On brushpast.org we use cookies in line with UK law (PECR and UK GDPR). When you first visit, our cookie banner lets you accept all cookies, reject non-essential cookies, or choose category by category.",
          "We use:",
        ],
        list: [
          "Strictly necessary cookies — required for security, checkout, your shopping bag, and remembering your cookie choices. These cannot be switched off in our cookie banner.",
          "Analytics cookies — only if you accept them (e.g. to measure traffic via Google Analytics when configured). IP addresses are anonymised where possible.",
          "Marketing cookies — only if you accept them, to measure campaigns or show more relevant content.",
          "Preference cookies — to remember choices such as cookie consent.",
        ],
      },
      {
        title: "Third-party cookies",
        paragraphs: [
          "Some cookies are set by services we use, such as Stripe (payments) and analytics providers. These providers have their own privacy notices. We only enable non-essential third-party cookies when you consent.",
        ],
      },
      {
        title: "Managing cookies",
        paragraphs: [
          "You can change your choices at any time using the cookie settings button (bottom-right of the screen after your first visit), or through your browser settings. Blocking all cookies may affect shop checkout and site functionality.",
          "For more on how we use personal data, see our Privacy Policy.",
          contactBlock,
        ],
      },
    ],
  },
  returns: {
    slug: "returns",
    title: "Returns & Refunds",
    description: "Returns and refunds for Brush Past shop orders (UK).",
    lastUpdated: LAST_UPDATED,
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "We want you to be happy with purchases from The Archive Shop. Many items are limited editions or made with creators — please read below before ordering.",
          contactBlock,
        ],
      },
      {
        title: "Faulty or damaged items",
        paragraphs: [
          "If your order arrives faulty or damaged, contact us within 14 days of delivery with your order number and photos. We will offer a replacement or refund where appropriate.",
        ],
      },
      {
        title: "Change of mind",
        paragraphs: [
          "Unless stated otherwise on the product page, you may return unused items in original packaging within 14 days of receipt for a refund of the product price. You are responsible for return postage unless the item was faulty.",
          "Custom or personalised items may not be eligible for return unless faulty.",
        ],
      },
      {
        title: "How to return",
        paragraphs: [
          "Email hello@brushpast.org with your order details. We will confirm return instructions and the address to send items to.",
        ],
      },
      {
        title: "Refunds",
        paragraphs: [
          "Approved refunds are processed to your original payment method within 14 days of us receiving the returned item (or confirming a fault without return where agreed). Delivery charges are non-refundable unless the entire order was faulty or we sent the wrong item.",
        ],
      },
    ],
  },
  "code-of-conduct": {
    slug: "code-of-conduct",
    title: "Code of Conduct",
    description: "Standards for how we work with members, partners, and the public.",
    lastUpdated: LAST_UPDATED,
    sections: [
      {
        title: "Our commitment",
        paragraphs: [
          "Brush Past exists to amplify voices and support people with lived experience of homelessness, addiction, and other challenges. Everyone interacting with our platform, workshops, and shop is expected to uphold dignity, respect, and safety.",
        ],
      },
      {
        title: "Expected behaviour",
        paragraphs: ["We expect all staff, volunteers, partners, and visitors to:"],
        list: [
          "Treat others with respect and without discrimination or harassment",
          "Protect confidentiality of members unless they choose to share publicly",
          "Obtain appropriate consent for photography, stories, and publication",
          "Report concerns about safety or misconduct promptly",
        ],
      },
      {
        title: "Unacceptable behaviour",
        paragraphs: ["This includes:"],
        list: [
          "Abuse, threats, or bullying",
          "Exploitation of members or misuse of their work",
          "Discrimination on protected characteristics",
          "Fraud, theft, or misuse of funds",
        ],
      },
      {
        title: "Reporting",
        paragraphs: [
          "Concerns can be raised via hello@brushpast.org or through our Whistleblowing policy. We will investigate proportionately and protect reporters where possible.",
          "This document will be expanded with board-approved detail. Contact us if you need the full signed version.",
        ],
      },
    ],
  },
  "modern-slavery": {
    slug: "modern-slavery",
    title: "Modern Slavery Statement",
    description: "Brush Past commitment under the Modern Slavery Act 2015.",
    lastUpdated: LAST_UPDATED,
    sections: [
      {
        title: "Introduction",
        paragraphs: [
          "Brush Past (Community Interest Company) is committed to preventing modern slavery and human trafficking in our operations and supply chains.",
        ],
      },
      {
        title: "Our organisation",
        paragraphs: [
          "We operate as a UK social enterprise: creative programmes, workshops, and an online shop (including specialty coffee gift boxes and art products). Our supply chain includes producers, printers, packaging, and fulfilment partners.",
        ],
      },
      {
        title: "Policies and due diligence",
        paragraphs: ["We aim to:"],
        list: [
          "Source from suppliers who share our values and comply with UK law",
          "Include ethical expectations in agreements where practicable",
          "Encourage reporting of concerns without retaliation",
        ],
      },
      {
        title: "Training and review",
        paragraphs: [
          "Relevant team members are made aware of modern slavery risks. This statement will be reviewed annually and published on brushpast.org.",
          contactBlock,
        ],
      },
    ],
  },
  whistleblowing: {
    slug: "whistleblowing",
    title: "Whistleblowing",
    description: "How to report serious concerns about Brush Past.",
    lastUpdated: LAST_UPDATED,
    sections: [
      {
        title: "Purpose",
        paragraphs: [
          "We encourage reporting of genuine concerns about wrongdoing, including financial misconduct, safeguarding issues, discrimination, or breaches of law or this Code of Conduct.",
        ],
      },
      {
        title: "How to report",
        paragraphs: [
          "Contact hello@brushpast.org with the subject line 'Whistleblowing'. You may request confidentiality where possible.",
          "For urgent safeguarding matters involving immediate risk, contact the police or local authority as appropriate, then inform us.",
        ],
      },
      {
        title: "What happens next",
        paragraphs: [
          "Reports will be reviewed by appropriate trustees or senior leads. We aim to acknowledge receipt promptly and investigate proportionately. Outcomes may include corrective action; we cannot always disclose full details to the reporter due to privacy.",
        ],
      },
      {
        title: "Protection",
        paragraphs: [
          "Retaliation against someone raising a concern in good faith is not tolerated. Malicious false reports may be treated as misconduct.",
        ],
      },
    ],
  },
};

export const legalPageSlugs = Object.keys(legalPages);

export function getLegalPage(slug: string): LegalPageContent | undefined {
  return legalPages[slug];
}
