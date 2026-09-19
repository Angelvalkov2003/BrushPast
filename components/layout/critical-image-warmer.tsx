"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  BOX_BUILDER_CRITICAL_IMAGES,
  HOME_CRITICAL_IMAGES,
  SHOP_CRITICAL_IMAGES,
} from "./critical-image-preloads";

const warmed = new Set<string>();

function warmImages(urls: string[]) {
  if (typeof window === "undefined") return;
  for (const src of urls) {
    if (!src || warmed.has(src)) continue;
    warmed.add(src);
    const img = new window.Image();
    img.decoding = "async";
    img.src = src;
  }
}

function imagesForPath(path: string): string[] {
  if (path === "/") return HOME_CRITICAL_IMAGES;
  if (path === "/shop" || path.startsWith("/shop?")) return SHOP_CRITICAL_IMAGES;
  if (path.startsWith("/shop/box")) {
    return [...SHOP_CRITICAL_IMAGES, ...BOX_BUILDER_CRITICAL_IMAGES];
  }
  return [];
}

function eventElement(target: EventTarget | null): Element | null {
  if (!target) return null;
  if (target instanceof Element) return target;
  if (target instanceof Text) return target.parentElement;
  return null;
}

/**
 * Warms critical photos early:
 * - on current route mount
 * - on hover/focus of links to home / shop / box builder
 */
export function CriticalImageWarmer() {
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    warmImages(imagesForPath(pathname));
  }, [pathname]);

  useEffect(() => {
    const onIntent = (event: Event) => {
      const el = eventElement(event.target);
      const anchor = el?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        warmImages(imagesForPath(url.pathname));
      } catch {
        // ignore
      }
    };

    document.addEventListener("pointerenter", onIntent, true);
    document.addEventListener("focusin", onIntent, true);
    document.addEventListener("touchstart", onIntent, {
      capture: true,
      passive: true,
    });

    return () => {
      document.removeEventListener("pointerenter", onIntent, true);
      document.removeEventListener("focusin", onIntent, true);
      document.removeEventListener("touchstart", onIntent, true);
    };
  }, []);

  return null;
}
