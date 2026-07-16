import { redirect } from "next/navigation";

export default function CollectionsNewRedirect() {
  redirect("/admin/categories/new");
}
