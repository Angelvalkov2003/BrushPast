"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { SITE_NAME } from "lib/site-config";

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes("welcome-toast=2")) {
      toast(`Welcome to ${SITE_NAME}`, {
        id: "welcome-toast",
        duration: 5000,
        onDismiss: () => {
          document.cookie = "welcome-toast=2; max-age=31536000; path=/";
        },
        description: "Explore The Archive Shop — every purchase supports our creators.",
      });
    }
  }, []);

  return null;
}
