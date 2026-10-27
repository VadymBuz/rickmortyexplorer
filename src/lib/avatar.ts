/**
 * Portrait URL for a character id.
 *
 * The API serves every portrait (the `image` field) at this fixed address. The
 * detail page uses it to show the portrait the instant you open a character,
 * before the rest of the data has loaded, which lets the portrait morph straight
 * out of its card.
 */
export function getAvatarUrl(id: string): string | null {
  return isCharacterId(id) ? `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg` : null;
}

/** Character ids are positive integers. */
export function isCharacterId(id: string): boolean {
  return /^[1-9]\d*$/.test(id);
}

/** Shared view-transition name that pairs a card portrait with the detail portrait. */
export function getAvatarTransitionName(id: string): string {
  return `character-portrait-${id}`;
}
