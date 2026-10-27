import Link from "next/link";

import { CharacterGrid } from "@/components/characters/character-grid";
import { CharacterPagination } from "@/components/characters/character-pagination";
import { Button } from "@/components/ui/button";
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

  if (characters.length === 0) {
    return <NoResults params={params} />;
  }

  const firstShown = (params.page - 1) * CHARACTERS_PER_PAGE + 1;
  const lastShown = firstShown + characters.length - 1;

  return (
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
        <Button nativeButton={false} render={<Link href={href} />}>
          {action}
        </Button>
      </EmptyContent>
    </Empty>
  );
}
