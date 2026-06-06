import { NextRequest, NextResponse } from "next/server";
import { sendContactFormEmail } from "lib/email";
import { CONTACT_SOURCE } from "lib/contact-config";
import { getSupabaseServiceClient } from "lib/supabase/service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, subject, source } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const sourceForm = source === CONTACT_SOURCE ? CONTACT_SOURCE : "contact";
    const subjectLine = subject?.trim() || "General enquiry";
    const phonePart = phone?.trim() ? ` · ${phone.trim()}` : "";
    const customerInfo = `${name.trim()} <${email.trim()}>${phonePart}`;
    const fullMessage = `Subject: ${subjectLine}\n\n${message.trim()}`;

    const supabase = getSupabaseServiceClient();
    const { error: dbError } = await supabase.from("customer_messages").insert({
      customer_info: customerInfo,
      source_form: sourceForm,
      message: fullMessage,
    });

    if (dbError) {
      console.error("customer_messages insert:", dbError);
      return NextResponse.json({ error: "Could not save your message" }, { status: 500 });
    }

    await sendContactFormEmail({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim(),
      message: fullMessage,
      subject: sourceForm === CONTACT_SOURCE ? `Get in Touch: ${subjectLine}` : subjectLine,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("contact API:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
