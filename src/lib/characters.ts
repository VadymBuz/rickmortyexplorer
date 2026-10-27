import { cacheLife } from "next/cache";
import { cache } from "react";

import { isCharacterId } from "@/lib/avatar";
import { executeQuery } from "@/lib/graphql/client";
import type {
  CharacterCardFragment,
  CharacterQuery,
  FilterCharacter,
} from "@/lib/graphql/generated/graphql";
import { characterQuery, charactersQuery } from "@/lib/graphql/queries";

type ApiCharacter = NonNullable<CharacterQuery["character"]>;

export type CharacterSummary = CharacterCardFragment & { id: string };
export type Episode = NonNullable<ApiCharacter["episode"][number]>;
export type CharacterDetails = Omit<ApiCharacter, "episode"> & { episode: Episode[] };

/** The API always pages characters in groups of 20. */
export const CHARACTERS_PER_PAGE = 20;

export type CharacterListResult = {
  characters: CharacterSummary[];
  totalCount: number;
  totalPages: number;
};

/** One page of characters matching `filter`. Cached for a day: the dataset rarely changes. */
export async function getCharacters(
  page: number,
  filter: FilterCharacter,
): Promise<CharacterListResult> {
  "use cache";
  cacheLife("days");

  const { characters } = await executeQuery(charactersQuery, { page, filter });

  return {
    characters:
      characters?.results?.filter(
        (character): character is CharacterSummary => character?.id != null,
      ) ?? [],
    totalCount: characters?.info?.count ?? 0,
    totalPages: characters?.info?.pages ?? 0,
  };
}

async function fetchCharacter(id: string): Promise<CharacterDetails | null> {
  "use cache";
  cacheLife("days");

  const { character } = await executeQuery(characterQuery, { id });
  if (!character) {
    return null;
  }

  return {
    ...character,
    episode: character.episode.filter((episode) => episode != null),
  };
}

/**
 * One character by id, or `null` if it doesn't exist.
 *
 * Ids are validated first: the API answers malformed ids with an internal error
 * instead of `null`, and they shouldn't take up cache entries. `React.cache`
 * shares the result between `generateMetadata` and the page within a request.
 */
export const getCharacter = cache(
  async (id: string): Promise<CharacterDetails | null> =>
    isCharacterId(id) ? fetchCharacter(id) : null,
);
