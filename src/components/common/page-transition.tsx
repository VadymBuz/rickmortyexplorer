import { ViewTransition, type ReactNode } from "react";

// Links tagged "nav-forward" (deeper into the app) slide the page left, and
// "nav-back" slides it right. Untagged updates, such as browser back/forward or
// Suspense reveals, don't move the page.
const directional = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
};

/** Wraps a page so it slides in the direction of the navigation. */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={directional} exit={directional} default="none">
      {children}
    </ViewTransition>
  );
}
