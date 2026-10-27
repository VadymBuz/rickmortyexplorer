"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

import {
  rememberListView,
  takePendingScrollRestore,
} from "@/lib/list-view-memory";

/**
 * Records where the user leaves the list and restores that scroll position
 * when "All characters" brings them back.
 */
export function ListViewTracker() {
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const href = query ? `/?${query}` : "/";

  // Runs inside the commit of the view transition, so its "after" snapshot
  // already has the restored position and the portrait morphs into the right card.
  useLayoutEffect(() => {
    const scrollY = takePendingScrollRestore();
    if (scrollY !== null) {
      window.scrollTo(0, scrollY);
    }
  }, []);

  // Capture the position when a character is opened. Reading it later, while
  // the navigation commits, races with Next's own scroll handling.
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Element && event.target.closest('a[href^="/character/"]')) {
        rememberListView({ href, scrollY: window.scrollY });
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [href]);

  return null;
}
