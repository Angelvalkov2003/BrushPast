import { NextRequest, NextResponse } from "next/server";
import { sendNewsletterSignupEmail } from "lib/email";
import {
  NEWSLETTER_SOURCE_ABOUT,
  NEWSLETTER_SOURCE_HOME,
  NEWSLETTER_SOURCE_LABELS,
  type NewsletterSource,
} from "lib/newsletter-config";
import { getSupabaseServiceClient } from "lib/supabase/service";

const ALLOWED_SOURCES = new Set<string>([NEWSLETTER_SOURCE_HOME, NEWSLETTER_SOURCE_ABOUT]);

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawEmail = typeof body.email === "string" ? body.email : "";
    const source = typeof body.source === "string" ? body.source : NEWSLETTER_SOURCE_HOME;

    const email = normalizeEmail(rawEmail);
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (!ALLOWED_SOURCES.has(source)) {
      return NextResponse.json({ error: "Invalid source" }, { status: 400 });
    }

    if (body.privacy_policy_accepted !== true) {
      return NextResponse.json(
        { error: "You must accept the Privacy Policy to continue." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseServiceClient();
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ success: true, alreadySubscribed: true }, { status: 200 });
    }

    const { error: dbError } = await supabase.from("newsletter_subscribers").insert({
      email,
      source,
    });

    if (dbError) {
      if (dbError.code === "23505") {
        return NextResponse.json({ success: true, alreadySubscribed: true }, { status: 200 });
      }
      console.error("newsletter_subscribers insert:", dbError);
      return NextResponse.json({ error: "Could not save your email" }, { status: 500 });
    }

    try {
      await sendNewsletterSignupEmail({
        email,
        source: source as NewsletterSource,
        sourceLabel: NEWSLETTER_SOURCE_LABELS[source] ?? source,
      });
    } catch (emailError) {
      console.error("newsletter signup email:", emailError);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("newsletter API:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
