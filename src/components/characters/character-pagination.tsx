import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getPaginationItems } from "@/lib/pagination";

type CharacterPaginationProps = {
  page: number;
  totalPages: number;
  getPageHref: (page: number) => string;
};

export function CharacterPagination({ page, totalPages, getPageHref }: CharacterPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-1">
      <StepLink href={page > 1 ? getPageHref(page - 1) : null} direction="previous" />

      <ul className="hidden items-center gap-1 sm:flex">
        {getPaginationItems(page, totalPages).map((item) => (
          <li key={item}>
            {typeof item === "number" ? (
              <Button
                variant={item === page ? "default" : "ghost"}
                size="lg"
                className="min-w-9 tabular-nums"
                nativeButton={false}
                render={
                  <Link
                    href={getPageHref(item)}
                    aria-label={`Page ${item}`}
                    aria-current={item === page ? "page" : undefined}
                  />
                }
              >
                {item}
              </Button>
            ) : (
              <span aria-hidden className="px-2 text-muted-foreground">
                …
              </span>
            )}
          </li>
        ))}
      </ul>

      <p className="px-3 text-sm text-muted-foreground tabular-nums sm:hidden">
        Page {page} of {totalPages}
      </p>

      <StepLink href={page < totalPages ? getPageHref(page + 1) : null} direction="next" />
    </nav>
  );
}

function StepLink({ href, direction }: { href: string | null; direction: "previous" | "next" }) {
  const content =
    direction === "previous" ? (
      <>
        <ChevronLeft data-icon="inline-start" />
        Previous
      </>
    ) : (
      <>
        Next
        <ChevronRight data-icon="inline-end" />
      </>
    );

  if (!href) {
    return (
      <Button variant="ghost" size="lg" disabled>
        {content}
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="lg"
      nativeButton={false}
      render={<Link href={href} prefetch rel={direction === "next" ? "next" : "prev"} />}
    >
      {content}
    </Button>
  );
}
