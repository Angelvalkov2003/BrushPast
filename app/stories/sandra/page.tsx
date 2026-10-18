import { redirect } from "next/navigation";

/** Sandra is part of Karl’s story — no standalone page. */
export default function Page() {
  redirect("/stories/karl");
}
