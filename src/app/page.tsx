import { Suspense, ViewTransition } from "react";

import { CharacterFilters, CharacterFiltersSkeleton } from "@/components/characters/character-filters";
import { CharacterGridSkeleton } from "@/components/characters/character-grid";
import { CharacterResults } from "@/components/characters/character-results";
import { ListViewTracker } from "@/components/characters/list-view-tracker";
import { DataErrorBoundary } from "@/components/common/data-error-boundary";
import { PageTransition } from "@/components/common/page-transition";
import { Portal } from "@/components/common/portal";

export default function HomePage({ searchParams }: PageProps<"/">) {
  return (
    <PageTransition>
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-20 sm:px-6 lg:px-8">
        <section className="relative isolate pt-8 pb-10 sm:pt-14 sm:pb-12">
          <Portal className="absolute -top-14 -right-20 -z-10 size-48 sm:-top-6 sm:right-0 sm:size-80 lg:right-8 lg:size-96" />
          <h1 className="display-type max-w-3xl font-heading text-5xl font-bold tracking-tight text-balance sm:text-7xl">
            Rick and Morty characters
          </h1>
          <p className="mt-5 max-w-xl text-lg/relaxed text-muted-foreground">
            Browse every character from the show. Search by name, or filter by status, species and
            gender.
          </p>
        </section>

        <Suspense fallback={<CharacterFiltersSkeleton />}>
          <ListViewTracker />
          <CharacterFilters />
        </Suspense>

        <DataErrorBoundary title="Characters didn't load">
          <Suspense
            fallback={
              <ViewTransition exit="slide-down" default="none">
                <CharacterGridSkeleton />
              </ViewTransition>
            }
          >
            <CharacterResults searchParams={searchParams} />
          </Suspense>
        </DataErrorBoundary>
      </main>
    </PageTransition>
  );
}
