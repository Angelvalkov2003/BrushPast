import { redirect } from "next/navigation";

/** Legacy URL from template - brushpast.org uses /privacy */
export default function PrivacyPolicyRedirect() {
  redirect("/privacy");
}
