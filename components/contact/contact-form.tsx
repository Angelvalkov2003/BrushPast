"use client";

import { useState } from "react";
import { CONTACT_SUBJECTS, type ContactSubjectValue } from "lib/contact-config";
import { IndexCard } from "components/home/home-decor";
import { homeHandClass } from "components/home/home-typography";
import { PrivacyPolicyCheckbox } from "components/legal/privacy-policy-checkbox";
import { ContactSubjectSelect } from "./contact-subject-select";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general" as ContactSubjectValue,
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
        subject: "general" as ContactSubjectValue,
        message: "",
        privacy_policy_accepted: false,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelClass = `${homeHandClass} block text-lg text-bp-text`;
  const inputClass =
    "mt-1.5 w-full border border-bp-text/20 bg-bp-canvas/50 px-3 py-2.5 text-sm focus:border-bp-accent focus:outline-none focus:ring-1 focus:ring-bp-accent/30";

  return (
    <IndexCard id="contact-form" className="scroll-mt-24">
      <h2 className={`${homeHandClass} text-3xl font-bold text-bp-text`}>Send a message</h2>
      <p className={`${homeHandClass} mt-2 text-sm italic text-bp-text/70`}>
        We read every message. You don&apos;t need to have it all figured out.
      </p>

      {success ? (
        <p className="mt-6 rounded-sm border border-green-200/80 bg-green-50/90 p-4 text-sm text-green-800">
          Thank you - your message was sent. We&apos;ll be in touch soon.
        </p>
      ) : null}
      {error ? (
        <p className="mt-6 rounded-sm border border-red-200/80 bg-red-50/90 p-4 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      {!success ? (
        <form onSubmit={submit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="name" className={labelClass}>
              Name *
            </label>
            <input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email *
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone <span className="text-bp-text/50">(optional)</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="subject" className={labelClass}>
              Subject *
            </label>
            <ContactSubjectSelect
              value={formData.subject}
              onChange={(subject) => setFormData({ ...formData, subject })}
            />
          </div>
          <div>
            <label htmlFor="message" className={labelClass}>
              Message *
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={inputClass}
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
            className={`${homeHandClass} w-full bg-bp-accent py-3.5 text-lg font-bold text-bp-canvas shadow-[3px_3px_0_rgba(1,2,0,0.2)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:translate-none disabled:opacity-50 disabled:shadow-none`}
          >
            {isSubmitting ? "Sending…" : "Send message →"}
          </button>
        </form>
      ) : null}
    </IndexCard>
  );
}
