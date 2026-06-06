import { redirect } from "next/navigation";

export default function CollectionsRedirect() {
  redirect("/admin/categories");
}
