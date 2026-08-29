import { Resend } from "resend";
import { SITE_NAME, SITE_URL } from "lib/site-config";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set");
}

if (!process.env.CONTACT_EMAIL) {
  throw new Error("CONTACT_EMAIL is not set");
}

const resend = new Resend(process.env.RESEND_API_KEY);
const contactEmail = process.env.CONTACT_EMAIL;
const siteName = SITE_NAME;
const siteUrl = SITE_URL;

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject?: string;
}

export interface NewsletterSignupData {
  email: string;
  source: string;
  sourceLabel: string;
}

export interface OrderNotificationData {
  orderId: string;
  orderNumber?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress: string;
  totalPrice: number;
  paymentMethod: "cash_on_delivery" | "card";
  products: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  comment?: string;
  contributionGbp?: number;
  contributionAllocation?: string | null;
}

/**
 * Send email notification for contact form submission
 */
export async function sendContactFormEmail(data: ContactFormData) {
  try {
    const { error } = await resend.emails.send({
      from: `Contact Form <noreply@${getDomainFromEmail(contactEmail)}>`,
      to: [contactEmail],
      replyTo: data.email,
      subject: data.subject || `New Contact Form Submission from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : ""}
        ${data.subject ? `<p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>This email was sent from the contact form on ${siteName}</small></p>
      `,
      text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}\n` : ""}
${data.subject ? `Subject: ${data.subject}\n` : ""}
Message:
${data.message}

---
This email was sent from the contact form on ${siteName}
      `,
    });

    if (error) {
      console.error("Error sending contact form email:", error);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send contact form email:", error);
    throw error;
  }
}

/**
 * Notify team when someone joins the newsletter
 */
export async function sendNewsletterSignupEmail(data: NewsletterSignupData) {
  try {
    const { error } = await resend.emails.send({
      from: `Newsletter <noreply@${getDomainFromEmail(contactEmail)}>`,
      to: [contactEmail],
      replyTo: data.email,
      subject: `New newsletter signup - ${data.sourceLabel}`,
      html: `
        <h2>New newsletter signup</h2>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Source:</strong> ${escapeHtml(data.sourceLabel)} (${escapeHtml(data.source)})</p>
        <hr>
        <p><small>View subscribers in the admin panel: ${siteUrl}/admin/newsletter</small></p>
      `,
      text: `
New newsletter signup

Email: ${data.email}
Source: ${data.sourceLabel} (${data.source})

View subscribers: ${siteUrl}/admin/newsletter
      `,
    });

    if (error) {
      console.error("Error sending newsletter signup email:", error);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send newsletter signup email:", error);
    throw error;
  }
}

/**
 * Send email notification when a new order is created
 */
export async function sendNewOrderNotification(data: OrderNotificationData) {
  try {
    const gbp = (n: number) =>
      new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(n);

    const productsList = data.products
      .map(
        (product) =>
          `  • ${escapeHtml(product.name)} - ${product.quantity}x ${gbp(product.price)} = ${gbp(product.price * product.quantity)}`,
      )
      .join("\n");

    const productsListHtml = data.products
      .map(
        (product) =>
          `<li>${escapeHtml(product.name)} - ${product.quantity}x ${gbp(product.price)} = ${gbp(product.price * product.quantity)}</li>`,
      )
      .join("");

    const contributionBlock =
      data.contributionGbp && data.contributionGbp > 0
        ? `
        <h3>Optional contribution</h3>
        <p><strong>Amount:</strong> ${gbp(data.contributionGbp)}</p>
        ${
          data.contributionAllocation
            ? `<p><strong>Allocated to:</strong> ${escapeHtml(data.contributionAllocation)}</p>`
            : ""
        }
      `
        : "";

    const contributionText =
      data.contributionGbp && data.contributionGbp > 0
        ? `
Optional contribution: ${gbp(data.contributionGbp)}
${data.contributionAllocation ? `Allocated to: ${data.contributionAllocation}\n` : ""}`
        : "";

    const ref = data.orderNumber || data.orderId.substring(0, 8);

    const { data: emailData, error } = await resend.emails.send({
      from: `New Order <noreply@${getDomainFromEmail(contactEmail)}>`,
      to: [contactEmail],
      replyTo: data.customerEmail,
      subject: `New Order ${ref} - ${siteName}`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>Order:</strong> ${escapeHtml(ref)}</p>
        <p><strong>Total Price:</strong> ${gbp(data.totalPrice)}</p>
        
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> ${escapeHtml(data.customerName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.customerEmail)}</p>
        ${data.customerPhone ? `<p><strong>Phone:</strong> ${escapeHtml(data.customerPhone)}</p>` : ""}
        <p><strong>Address:</strong> ${escapeHtml(data.customerAddress).replace(/\n/g, "<br>")}</p>
        <p><strong>Payment Method:</strong> ${data.paymentMethod === "cash_on_delivery" ? "Pay on delivery" : "Card payment"}</p>
        
        <h3>Order Items</h3>
        <ul>
          ${productsListHtml}
        </ul>
        ${contributionBlock}
        ${data.comment ? `<h3>Notes / gift message</h3><p>${escapeHtml(data.comment).replace(/\n/g, "<br>")}</p>` : ""}
        
        <hr>
        <p><small>View order: ${siteUrl}/admin/orders/${data.orderId}</small></p>
      `,
      text: `
New Order Received

Order: ${ref}
Total Price: ${gbp(data.totalPrice)}

Customer Information:
Name: ${data.customerName}
Email: ${data.customerEmail}
${data.customerPhone ? `Phone: ${data.customerPhone}\n` : ""}
Address: ${data.customerAddress}
Payment Method: ${data.paymentMethod === "cash_on_delivery" ? "Pay on delivery" : "Card payment"}

Order Items:
${productsList}
${contributionText}
${data.comment ? `Notes / gift message:\n${data.comment}\n` : ""}

View order: ${siteUrl}/admin/orders/${data.orderId}
      `,
    });

    if (error) {
      const errorDetails = {
        error,
        message: error.message,
        name: error.name,
        statusCode: (error as any).statusCode,
        response: (error as any).response,
      };
      console.error("Error sending new order notification email:", errorDetails);
      
      // Re-throw with more details
      const enhancedError = new Error(
        error.message || "Failed to send order notification email"
      );
      (enhancedError as any).statusCode = (error as any).statusCode;
      (enhancedError as any).originalError = error;
      throw enhancedError;
    }

    if (!emailData) {
      // Email sent but no data returned from Resend
    }

    // Customer receipt (best-effort — do not fail admin notification path)
    try {
      await sendOrderConfirmationToCustomer(data);
    } catch (customerEmailError) {
      console.error("Customer order confirmation email failed:", customerEmailError);
    }

    return { success: true };
  } catch (error: any) {
    console.error("Failed to send new order notification email:", {
      error,
      message: error?.message,
      statusCode: error?.statusCode,
      stack: error?.stack,
    });
    throw error;
  }
}

async function sendOrderConfirmationToCustomer(data: OrderNotificationData) {
  const gbp = (n: number) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(n);

  const ref = data.orderNumber || data.orderId.substring(0, 8);
  const itemsHtml = data.products
    .map(
      (product) =>
        `<li>${escapeHtml(product.name)} × ${product.quantity} — ${gbp(product.price * product.quantity)}</li>`,
    )
    .join("");

  const contributionHtml =
    data.contributionGbp && data.contributionGbp > 0
      ? `<p><strong>Additional contribution:</strong> ${gbp(data.contributionGbp)}${
          data.contributionAllocation
            ? ` (${escapeHtml(data.contributionAllocation)})`
            : ""
        }</p>
         <p><em>Thank you. This gift gave a little more.</em></p>`
      : "";

  await resend.emails.send({
    from: `${siteName} <noreply@${getDomainFromEmail(contactEmail)}>`,
    to: [data.customerEmail],
    subject: `Order confirmation ${ref} — ${siteName}`,
    html: `
      <h2>Thank you for your order</h2>
      <p>Hi ${escapeHtml(data.customerName)},</p>
      <p>We've received your order <strong>${escapeHtml(ref)}</strong>.</p>
      <h3>Items</h3>
      <ul>${itemsHtml}</ul>
      ${contributionHtml}
      <p><strong>Total:</strong> ${gbp(data.totalPrice)}</p>
      <p>Payment: ${data.paymentMethod === "cash_on_delivery" ? "Pay on delivery" : "Card (Stripe)"}</p>
      <p>We'll be in touch with delivery updates.</p>
      <p>— ${siteName}</p>
    `,
  });
}

export interface SponsorNotificationData {
  sponsorId: string;
  fullName: string;
  email: string;
  amountGbp: number;
  tierLabel: string;
}

export async function sendNewSponsorNotification(data: SponsorNotificationData) {
  try {
    const amount = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(data.amountGbp);

    const { error } = await resend.emails.send({
      from: `New Sponsor <noreply@${getDomainFromEmail(contactEmail)}>`,
      to: [contactEmail],
      replyTo: data.email,
      subject: `New sponsor — ${data.tierLabel} (${amount})`,
      html: `
        <h2>New sponsorship received</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Amount:</strong> ${escapeHtml(amount)}</p>
        <p><strong>Tier:</strong> ${escapeHtml(data.tierLabel)}</p>
        <hr>
        <p><small>View in admin: ${siteUrl}/admin/sponsors</small></p>
      `,
      text: `
New sponsorship received

Name: ${data.fullName}
Email: ${data.email}
Amount: ${amount}
Tier: ${data.tierLabel}

View in admin: ${siteUrl}/admin/sponsors
      `,
    });

    if (error) {
      console.error("Error sending sponsor notification:", error);
      throw error;
    }
  } catch (error) {
    console.error("Failed to send sponsor notification email:", error);
    throw error;
  }
}

/**
 * Helper function to get the sending domain for Resend
 * Resend requires verified domains. Use resend.dev for testing or your verified domain for production
 */
function getDomainFromEmail(email: string): string {
  // Always use resend.dev as the sending domain
  // If you have a verified custom domain in Resend, you can use it here instead
  // For example: return "yourdomain.com" if verified
  return "resend.dev";
}

/**
 * Helper function to escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m] || m);
}
