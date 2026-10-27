/**
 * Remembers the character list view the user last left (its URL, scroll
 * position and the card they opened), so the detail page's "All characters"
 * link can return to exactly that view with a view transition.
 *
 * The browser's Back button restores it too, but Next applies history
 * traversals synchronously, outside a Transition, so they can't animate.
 */

type ListView = { href: string; scrollY: number; openedHref: string };

let lastListView: ListView | null = null;
let pendingRestore: Omit<ListView, "href"> | null = null;

export function rememberListView(view: ListView) {
  lastListView = view;
}

export function getLastListView(): ListView | null {
  return lastListView;
}

/** Asks the list to restore the scroll position and focus of `view` when it mounts. */
export function requestListRestore(view: ListView) {
  pendingRestore = { scrollY: view.scrollY, openedHref: view.openedHref };
}

export function takePendingListRestore(): Omit<ListView, "href"> | null {
  const restore = pendingRestore;
  pendingRestore = null;
  return restore;
}
