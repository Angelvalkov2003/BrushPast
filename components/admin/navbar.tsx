"use client";

import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon, HomeIcon } from "@heroicons/react/24/outline";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/creators", label: "Creators" },
  { href: "/admin/organisations", label: "Organisations" },
  { href: "/admin/stories", label: "Stories" },
  { href: "/admin/messages", label: "Messages" },
];

export function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (response.ok) {
        toast.success("Logged out");
        router.push("/admin/login");
        router.refresh();
      } else {
        toast.error("Logout failed");
      }
    } catch {
      toast.error("Logout failed");
    }
  };

  const isActive = (path: string) => {
    if (path === "/admin") return pathname === "/admin";
    return pathname.startsWith(path);
  };

  const linkClass = (path: string) => {
    const base = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium";
    return isActive(path)
      ? `${base} border-indigo-500 text-gray-900`
      : `${base} border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700`;
  };

  const mobileLinkClass = (path: string) => {
    const base = "block px-3 py-2 text-base font-medium rounded-md";
    return isActive(path)
      ? `${base} bg-indigo-50 text-indigo-700`
      : `${base} text-gray-700 hover:bg-gray-50`;
  };

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/admin" className="text-xl font-bold text-gray-900">
                Brush Past Admin
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-6">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 text-sm text-gray-500 hover:text-gray-700 sm:flex"
            >
              <HomeIcon className="h-5 w-5" />
              <span>View site</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="hidden text-sm text-gray-500 hover:text-gray-700 sm:block"
            >
              Log out
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 sm:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t sm:hidden">
          <div className="space-y-1 pt-2 pb-3">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={mobileLinkClass(l.href)}
                onClick={() => setMobileMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <HomeIcon className="h-5 w-5" />
              View site
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="block w-full px-3 py-2 text-left text-base font-medium text-gray-700"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
