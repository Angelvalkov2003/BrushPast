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
      subject: `New newsletter signup — ${data.sourceLabel}`,
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
    const productsList = data.products
      .map(
        (product) =>
          `  • ${escapeHtml(product.name)} - ${product.quantity}x $${product.price.toFixed(2)} = $${(product.price * product.quantity).toFixed(2)}`
      )
      .join("\n");

    const productsListHtml = data.products
      .map(
        (product) =>
          `<li>${escapeHtml(product.name)} - ${product.quantity}x $${product.price.toFixed(2)} = $${(product.price * product.quantity).toFixed(2)}</li>`
      )
      .join("");

    const { data: emailData, error } = await resend.emails.send({
      from: `New Order <noreply@${getDomainFromEmail(contactEmail)}>`,
      to: [contactEmail],
      replyTo: data.customerEmail,
      subject: `New Order #${data.orderId.substring(0, 8)} - ${siteName}`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>Order ID:</strong> ${escapeHtml(data.orderId)}</p>
        <p><strong>Total Price:</strong> $${data.totalPrice.toFixed(2)}</p>
        
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> ${escapeHtml(data.customerName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.customerEmail)}</p>
        ${data.customerPhone ? `<p><strong>Phone:</strong> ${escapeHtml(data.customerPhone)}</p>` : ""}
        <p><strong>Address:</strong> ${escapeHtml(data.customerAddress).replace(/\n/g, "<br>")}</p>
        <p><strong>Payment Method:</strong> ${data.paymentMethod === "cash_on_delivery" ? "Cash on delivery" : "Card payment"}</p>
        
        <h3>Order Items</h3>
        <ul>
          ${productsListHtml}
        </ul>
        
        ${data.comment ? `<h3>Customer Comment</h3><p>${escapeHtml(data.comment).replace(/\n/g, "<br>")}</p>` : ""}
        
        <hr>
        <p><small>This email was sent automatically when a new order was placed on ${siteName}</small></p>
        <p><small>View order: ${siteUrl}/admin/orders/${data.orderId}</small></p>
      `,
      text: `
New Order Received

Order ID: ${data.orderId}
Total Price: $${data.totalPrice.toFixed(2)}

Customer Information:
Name: ${data.customerName}
Email: ${data.customerEmail}
${data.customerPhone ? `Phone: ${data.customerPhone}\n` : ""}
Address: ${data.customerAddress}
Payment Method: ${data.paymentMethod === "cash_on_delivery" ? "Cash on delivery" : "Card payment"}

Order Items:
${productsList}

${data.comment ? `Customer Comment:\n${data.comment}\n` : ""}

---
This email was sent automatically when a new order was placed on ${siteName}
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
