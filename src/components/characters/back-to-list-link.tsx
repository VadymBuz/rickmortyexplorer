import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function BackToListLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 rounded-md text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <ArrowLeft aria-hidden className="size-4" />
      All characters
    </Link>
  );
}
