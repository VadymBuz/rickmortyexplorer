"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The page's `<h1>`. When it appears and nothing has focus (after a client-side
 * navigation, focus is left on `<body>`), it takes focus, so keyboard and
 * screen reader users continue from the new page's title.
 */
export function PageHeading({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (document.activeElement === document.body) {
      ref.current?.focus({ preventScroll: true });
    }
  }, []);

  return (
    <h1 ref={ref} tabIndex={-1} className={cn("outline-none", className)}>
      {children}
    </h1>
  );
}
