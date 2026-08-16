"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Fade in on mount and on route changes
    document.body.classList.remove("loaded");
    const timeout = setTimeout(() => {
      document.body.classList.add("loaded");
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return <>{children}</>;
}
