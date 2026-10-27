"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getLastListView, requestListRestore } from "@/lib/list-view-memory";

export function BackToListLink() {
  const router = useRouter();

  return (
    <Link
      href="/"
      transitionTypes={["nav-back"]}
      onNavigate={(event) => {
        // Return to the exact list view the user came from: search, filters,
        // page, scroll position and focus. Without one (e.g. a shared link),
        // this is a plain link to the first page.
        const lastView = getLastListView();
        if (!lastView) {
          return;
        }
        event.preventDefault();
        requestListRestore(lastView);
        router.push(lastView.href, { scroll: false, transitionTypes: ["nav-back"] });
      }}
      className="inline-flex items-center gap-2 rounded-md text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
    >
      <ArrowLeft aria-hidden className="size-4" />
      All characters
    </Link>
  );
}
