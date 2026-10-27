import { cacheLife } from "next/cache";

import { executeQuery } from "@/lib/graphql/client";
import type {
  CharacterCardFragment,
  CharacterQuery,
  FilterCharacter,
} from "@/lib/graphql/generated/graphql";
import { characterQuery, charactersQuery } from "@/lib/graphql/queries";

type ApiCharacter = NonNullable<CharacterQuery["character"]>;

export type CharacterSummary = CharacterCardFragment;
export type Episode = NonNullable<ApiCharacter["episode"][number]>;
export type CharacterDetails = Omit<ApiCharacter, "episode"> & { episode: Episode[] };

export type CharacterPage = {
  characters: CharacterSummary[];
  totalCount: number;
  totalPages: number;
};

// The character dataset changes rarely, so responses are cached for a day
// and may be served stale for up to a week while they revalidate.

export async function getCharacters(page: number, filter: FilterCharacter): Promise<CharacterPage> {
  "use cache";
  cacheLife("days");

  const { characters } = await executeQuery(charactersQuery, { page, filter });

  return {
    characters: characters?.results?.filter((character) => character != null) ?? [],
    totalCount: characters?.info?.count ?? 0,
    totalPages: characters?.info?.pages ?? 0,
  };
}

export async function getCharacter(id: string): Promise<CharacterDetails | null> {
  "use cache";
  cacheLife("days");

  // The API answers non-numeric ids with an internal error instead of `null`.
  if (!/^[1-9]\d*$/.test(id)) {
    return null;
  }

  const { character } = await executeQuery(characterQuery, { id });
  if (!character) {
    return null;
  }

  return {
    ...character,
    episode: character.episode.filter((episode) => episode != null),
  };
}
