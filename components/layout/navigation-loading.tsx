"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type { TextureVariant } from "components/shared/texture-section";
import { NavigationLoadingScreen } from "./navigation-loading-screen";

const SHOW_DELAY_MS = 150;
const MIN_VISIBLE_MS = 400;
const MAX_WAIT_MS = 15000;

type NavigationLoadingContextValue = {
  startLoading: (texture?: TextureVariant) => void;
};

const NavigationLoadingContext = createContext<NavigationLoadingContextValue | null>(null);

export function useNavigationLoading() {
  const context = useContext(NavigationLoadingContext);
  return context ?? { startLoading: () => {} };
}

function textureForPath(path: string): TextureVariant {
  if (path.startsWith("/shop/") && path !== "/shop") return "secondary";
  return "primary";
}

function shouldShowLoadingForPath(path: string): boolean {
  return path !== "/shop";
}

export function NavigationLoading({ children }: { children?: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;
  const [visible, setVisible] = useState(false);
  const [texture, setTexture] = useState<TextureVariant>("primary");
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxWaitRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shownAtRef = useRef<number | null>(null);

  const finishLoading = useCallback(() => {
    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
    if (maxWaitRef.current) {
      clearTimeout(maxWaitRef.current);
      maxWaitRef.current = null;
    }

    if (!shownAtRef.current) {
      setVisible(false);
      return;
    }

    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

    const elapsed = Date.now() - shownAtRef.current;
    const delay = Math.max(0, MIN_VISIBLE_MS - elapsed);
    hideTimerRef.current = setTimeout(() => {
      hideTimerRef.current = null;
      setVisible(false);
      shownAtRef.current = null;
    }, delay);
  }, []);

  const startLoading = useCallback((nextTexture: TextureVariant = "primary") => {
    if (isAdmin) return;

    setTexture(nextTexture);

    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    if (showTimerRef.current) clearTimeout(showTimerRef.current);
    if (maxWaitRef.current) clearTimeout(maxWaitRef.current);

    showTimerRef.current = setTimeout(() => {
      showTimerRef.current = null;
      shownAtRef.current = Date.now();
      setVisible(true);
      maxWaitRef.current = setTimeout(() => {
        maxWaitRef.current = null;
        setVisible(false);
        shownAtRef.current = null;
      }, MAX_WAIT_MS);
    }, SHOW_DELAY_MS);
  }, [isAdmin]);

  useEffect(() => {
    finishLoading();
  }, [pathname, finishLoading]);

  useEffect(() => {
    if (isAdmin) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;

        const samePath = url.pathname === pathname;
        const sameSearch = url.search === window.location.search;
        if (samePath && sameSearch) return;

        if (!shouldShowLoadingForPath(url.pathname)) return;

        startLoading(textureForPath(url.pathname));
      } catch {
        // ignore invalid href
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [isAdmin, pathname, startLoading]);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  useEffect(
    () => () => {
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (maxWaitRef.current) clearTimeout(maxWaitRef.current);
    },
    [],
  );

  return (
    <NavigationLoadingContext.Provider value={{ startLoading }}>
      {children}
      {visible && !isAdmin ? <NavigationLoadingScreen texture={texture} /> : null}
    </NavigationLoadingContext.Provider>
  );
}
