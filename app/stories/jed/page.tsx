import { redirect } from "next/navigation";

/** Jed is part of Karl’s story — no standalone page. */
export default function Page() {
  redirect("/stories/karl");
}
