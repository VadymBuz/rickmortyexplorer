import Link from "next/link";

import { CharacterGrid } from "@/components/characters/character-grid";
import { CharacterPagination } from "@/components/characters/character-pagination";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { CHARACTERS_PER_PAGE, getCharacters } from "@/lib/characters";
import {
  getCharacterListHref,
  parseCharacterListParams,
  type RawSearchParams,
} from "@/lib/search-params";

export async function CharacterResults({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const params = parseCharacterListParams(await searchParams);
  const { characters, totalCount, totalPages } = await getCharacters(params.page, {});

  if (characters.length === 0) {
    return (
      <Empty className="border py-16">
        <EmptyHeader>
          <EmptyTitle className="text-xl">No characters on this page</EmptyTitle>
          <EmptyDescription>This page is past the end of the list.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button nativeButton={false} render={<Link href={getCharacterListHref({ page: 1 })} />}>
            Go to the first page
          </Button>
        </EmptyContent>
      </Empty>
    );
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
