import { ViewTransition, type ReactNode } from "react";

import { CharacterGrid } from "@/components/characters/character-grid";
import { CharacterPagination } from "@/components/characters/character-pagination";
import { ButtonLink } from "@/components/common/button-link";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { CHARACTERS_PER_PAGE, getCharacters } from "@/lib/characters";
import {
  DEFAULT_LIST_PARAMS,
  getCharacterListHref,
  parseCharacterListParams,
  toCharacterFilter,
  type CharacterListParams,
  type RawSearchParams,
} from "@/lib/search-params";

export async function CharacterResults({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const params = parseCharacterListParams(await searchParams);
  const { characters, totalCount, totalPages } = await getCharacters(
    params.page,
    toCharacterFilter(params),
  );

  const viewKey = getCharacterListHref(params);

  if (characters.length === 0) {
    return (
      <ResultsTransition viewKey={viewKey}>
        <NoResults params={params} />
      </ResultsTransition>
    );
  }

  const firstShown = (params.page - 1) * CHARACTERS_PER_PAGE + 1;
  const lastShown = firstShown + characters.length - 1;

  return (
    <ResultsTransition viewKey={viewKey}>
      <section aria-label="Characters">
        <p className="mb-4 text-sm text-muted-foreground tabular-nums">
          Showing {firstShown}–{lastShown} of {totalCount} characters
        </p>
        <CharacterGrid characters={characters} />
        <CharacterPagination
          page={params.page}
          totalPages={totalPages}
          getPageHref={(page) => getCharacterListHref({ ...params, page })}
        />
      </section>
    </ResultsTransition>
  );
}

/**
 * Animates the results: they slide up when they first load, and crossfade when
 * a new page or filter replaces them. Keying by the list URL makes React treat
 * each view as new content rather than an in-place update.
 */
function ResultsTransition({ viewKey, children }: { viewKey: string; children: ReactNode }) {
  return (
    <ViewTransition
      key={viewKey}
      name="character-results"
      share="auto"
      enter="slide-up"
      default="none"
    >
      {children}
    </ViewTransition>
  );
}

function NoResults({ params }: { params: CharacterListParams }) {
  // The API answers both "nothing matches" and "page past the end" with an empty list.
  const { title, description, action, href } =
    params.page > 1
      ? {
          title: "No characters on this page",
          description: "This page is past the end of the list.",
          action: "Go to the first page",
          href: getCharacterListHref({ ...params, page: 1 }),
        }
      : {
          title: "No characters match your search",
          description: "Try a different name, or remove some of the filters.",
          action: "Clear filters",
          href: getCharacterListHref(DEFAULT_LIST_PARAMS),
        };

  return (
    <Empty className="border py-16">
      <EmptyHeader>
        <EmptyTitle className="text-xl">{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <ButtonLink href={href}>{action}</ButtonLink>
      </EmptyContent>
    </Empty>
  );
}
