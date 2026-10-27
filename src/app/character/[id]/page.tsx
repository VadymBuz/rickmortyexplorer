import type { Metadata } from "next";
import { Suspense, ViewTransition } from "react";

import { BackToListLink } from "@/components/characters/back-to-list-link";
import {
  CharacterPortrait,
  CharacterPortraitSkeleton,
} from "@/components/characters/character-portrait";
import {
  CharacterProfile,
  CharacterProfileSkeleton,
} from "@/components/characters/character-profile";
import { DataErrorBoundary } from "@/components/common/data-error-boundary";
import { PageTransition } from "@/components/common/page-transition";
import { getCharacter } from "@/lib/characters";
import { formatSpecies } from "@/lib/format";

export async function generateMetadata({
  params,
}: PageProps<"/character/[id]">): Promise<Metadata> {
  const { id } = await params;

  try {
    const character = await getCharacter(id);
    if (!character?.name) {
      return { title: "Character not found" };
    }

    return {
      title: character.name,
      description: `${character.name}, ${formatSpecies(character.species).toLowerCase()} from Rick and Morty: origin, last known location and every episode they appear in.`,
      openGraph: character.image ? { images: [character.image] } : undefined,
    };
  } catch {
    // The page itself shows the error and a retry; metadata just falls back.
    return { title: "Character" };
  }
}

export default function CharacterPage({ params }: PageProps<"/character/[id]">) {
  return (
    <PageTransition>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-20 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mt-4 mb-8 sm:mt-8 sm:mb-12">
          <BackToListLink />
        </nav>

        <article className="grid items-start gap-14 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-16">
          <Suspense fallback={<CharacterPortraitSkeleton />}>
            <CharacterPortrait />
          </Suspense>

          <DataErrorBoundary title="This character didn't load">
            <Suspense
              fallback={
                <ViewTransition exit="slide-down" default="none">
                  <CharacterProfileSkeleton />
                </ViewTransition>
              }
            >
              <ViewTransition enter="slide-up" default="none">
                <CharacterProfile params={params} />
              </ViewTransition>
            </Suspense>
          </DataErrorBoundary>
        </article>
      </main>
    </PageTransition>
  );
}
