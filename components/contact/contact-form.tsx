"use client";

import { useState } from "react";
import { CONTACT_SUBJECTS } from "lib/contact-config";
import { PrivacyPolicyCheckbox } from "components/legal/privacy-policy-checkbox";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
    privacy_policy_accepted: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formData.privacy_policy_accepted) {
      setError("Please accept the Privacy Policy to continue.");
      return;
    }
    setIsSubmitting(true);
    try {
      const subjectLabel =
        CONTACT_SUBJECTS.find((s) => s.value === formData.subject)?.label ?? "General enquiry";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          subject: subjectLabel,
          message: formData.message,
          source: "get-in-touch",
          privacy_policy_accepted: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "general",
        message: "",
        privacy_policy_accepted: false,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-form" className="rounded-sm border border-bp-text/10 bg-bp-canvas p-6 md:p-8">
      <h2 className="text-xl font-bold uppercase tracking-wide text-bp-text">Send a message</h2>
      <p className="mt-2 text-sm text-bp-text/70">
        We read every message. You don&apos;t need to have it all figured out.
      </p>

      {success ? (
        <p className="mt-6 rounded border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          Thank you — your message was sent. We&apos;ll be in touch soon.
        </p>
      ) : null}
      {error ? (
        <p className="mt-6 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>
      ) : null}

      {!success ? (
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wide text-bp-text">
              Name *
            </label>
            <input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 w-full border border-bp-text/20 bg-transparent px-3 py-2 text-sm focus:border-bp-accent focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-bp-text">
              Email *
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 w-full border border-bp-text/20 bg-transparent px-3 py-2 text-sm focus:border-bp-accent focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wide text-bp-text">
              Phone (optional)
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 w-full border border-bp-text/20 bg-transparent px-3 py-2 text-sm focus:border-bp-accent focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wide text-bp-text">
              Subject *
            </label>
            <select
              id="subject"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="mt-1 w-full border border-bp-text/20 bg-transparent px-3 py-2 text-sm focus:border-bp-accent focus:outline-none"
            >
              {CONTACT_SUBJECTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wide text-bp-text">
              Message *
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="mt-1 w-full border border-bp-text/20 bg-transparent px-3 py-2 text-sm focus:border-bp-accent focus:outline-none"
            />
          </div>
          <PrivacyPolicyCheckbox
            checked={formData.privacy_policy_accepted}
            onChange={(checked) =>
              setFormData({ ...formData, privacy_policy_accepted: checked })
            }
            id="contact-privacy"
          />
          <button
            type="submit"
            disabled={isSubmitting || !formData.privacy_policy_accepted}
            className="w-full bg-bp-text py-3 text-xs font-bold uppercase tracking-[0.2em] text-bp-canvas hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Sending…" : "Send message"}
          </button>
        </form>
      ) : null}
    </div>
  );
}
