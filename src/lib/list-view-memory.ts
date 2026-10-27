/**
 * Remembers the character list view the user last left (its URL and scroll
 * position), so the detail page's "All characters" link can return to exactly
 * that view with a view transition.
 *
 * The browser's Back button restores it too, but Next applies history
 * traversals synchronously, outside a Transition, so they can't animate.
 */

type ListView = { href: string; scrollY: number };

let lastListView: ListView | null = null;
let pendingScrollY: number | null = null;

export function rememberListView(view: ListView) {
  lastListView = view;
}

export function getLastListView(): ListView | null {
  return lastListView;
}

/** Asks the list to scroll to `scrollY` when it mounts. */
export function requestScrollRestore(scrollY: number) {
  pendingScrollY = scrollY;
}

export function takePendingScrollRestore(): number | null {
  const scrollY = pendingScrollY;
  pendingScrollY = null;
  return scrollY;
}
