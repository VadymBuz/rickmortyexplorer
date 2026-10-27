"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

import { rememberListView, takePendingListRestore } from "@/lib/list-view-memory";

/**
 * Records where the user leaves the list, and restores that scroll position and
 * focus (on the card they opened) when "All characters" brings them back.
 */
export function ListViewTracker() {
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const href = query ? `/?${query}` : "/";

  // Runs inside the commit of the view transition, so its "after" snapshot
  // already has the restored position and the portrait morphs into the right card.
  useLayoutEffect(() => {
    const restore = takePendingListRestore();
    if (restore) {
      window.scrollTo(0, restore.scrollY);
      document
        .querySelector<HTMLElement>(`a[href="${restore.openedHref}"]`)
        ?.focus({ preventScroll: true });
    }
  }, []);

  // Capture the position when a character is opened. Reading it later, while
  // the navigation commits, races with Next's own scroll handling.
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const link = event.target instanceof Element && event.target.closest('a[href^="/character/"]');
      if (link) {
        rememberListView({ href, scrollY: window.scrollY, openedHref: link.getAttribute("href")! });
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [href]);

  return null;
}
