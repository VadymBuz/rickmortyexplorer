import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { CharacterEpisodes } from "@/components/characters/character-episodes";
import { CharacterStatus } from "@/components/characters/character-status";
import { PageHeading } from "@/components/common/page-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { getCharacter } from "@/lib/characters";
import {
  formatCreatedDate,
  formatGender,
  formatPlace,
  formatSpecies,
  parseEpisodeCode,
} from "@/lib/format";

/**
 * The character's name, facts and episodes. Renders two items into the detail
 * page grid, next to the portrait, which the page shows before this data loads.
 */
export async function CharacterProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const character = await getCharacter(id);

  if (!character) {
    notFound();
  }

  const origin = formatPlace(character.origin);
  const location = formatPlace(character.location);
  const created = formatCreatedDate(character.created);
  const firstEpisode = character.episode[0];
  const firstEpisodeCode = parseEpisodeCode(firstEpisode?.episode ?? null);

  return (
    <>
      <div>
        <PageHeading className="display-type font-heading text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          {character.name}
        </PageHeading>
        <CharacterStatus status={character.status} className="mt-3 text-lg" />

        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:gap-x-10">
          <Fact label="Species">{formatSpecies(character.species)}</Fact>
          {character.type && <Fact label="Type">{character.type}</Fact>}
          <Fact label="Gender">{formatGender(character.gender)}</Fact>
          <Fact label="Origin" details={origin.details}>
            {origin.name}
          </Fact>
          <Fact label="Last known location" details={location.details}>
            {location.name}
          </Fact>
          {firstEpisode && (
            <Fact
              label="First seen in"
              details={
                firstEpisodeCode &&
                `Season ${firstEpisodeCode.season}, episode ${firstEpisodeCode.episode}`
              }
            >
              {firstEpisode.name}
            </Fact>
          )}
          {created && <Fact label="Added to the API">{created}</Fact>}
        </dl>
      </div>

      <CharacterEpisodes episodes={character.episode} className="md:col-span-2" />
    </>
  );
}

function Fact({
  label,
  details,
  children,
}: {
  label: string;
  details?: string | null;
  children: ReactNode;
}) {
  return (
    <div>
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-lg leading-snug">
        {children}
        {details && <span className="mt-0.5 block text-sm text-muted-foreground">{details}</span>}
      </dd>
    </div>
  );
}

/** Mirrors the two grid items of the profile, so the page doesn't shift when it loads. */
export function CharacterProfileSkeleton() {
  return (
    <>
      <div role="status">
        <span className="sr-only">Loading character…</span>
        <div aria-hidden>
          <Skeleton className="h-12 w-3/4 sm:h-16" />
          <Skeleton className="mt-4 h-6 w-24" />
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:gap-x-10">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-32" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div aria-hidden className="mt-4 md:col-span-2">
        <Skeleton className="h-8 w-64 sm:h-9" />
        <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="space-y-3 border-t pt-4">
              <Skeleton className="h-6 w-24" />
              {Array.from({ length: 4 }, (_, row) => (
                <Skeleton key={row} className="h-10 w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
