export function SiteFooter() {
  return (
    <footer
      // Named so it can fade in at its new position after the page has moved.
      style={{ viewTransitionName: "site-footer" }}
      className="mx-auto w-full max-w-7xl px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:px-8"
    >
      Character data from{" "}
      <a href="https://rickandmortyapi.com" className="text-cyan underline underline-offset-4 hover:text-foreground">
        The Rick and Morty API
      </a>
      .
    </footer>
  );
}
