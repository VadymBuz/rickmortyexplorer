import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="mx-auto flex h-16 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="flex items-center gap-2.5 rounded-md font-heading text-lg font-semibold outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
      >
        <span aria-hidden className="portal-mark size-6" />
        Rick &amp; Morty Explorer
      </Link>
    </header>
  );
}
