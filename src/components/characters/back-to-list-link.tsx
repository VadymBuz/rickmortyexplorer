"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getLastListView, requestScrollRestore } from "@/lib/list-view-memory";

export function BackToListLink() {
  const router = useRouter();

  return (
    <Link
      href="/"
      transitionTypes={["nav-back"]}
      onNavigate={(event) => {
        // Return to the exact list view the user came from: search, filters,
        // page and scroll position. Without one (e.g. a shared link), this is a
        // plain link to the first page.
        const lastView = getLastListView();
        if (!lastView) {
          return;
        }
        event.preventDefault();
        requestScrollRestore(lastView.scrollY);
        router.push(lastView.href, { scroll: false, transitionTypes: ["nav-back"] });
      }}
      className="inline-flex items-center gap-2 rounded-md text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <ArrowLeft aria-hidden className="size-4" />
      All characters
    </Link>
  );
}
