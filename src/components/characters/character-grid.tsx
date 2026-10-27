import { CharacterCard } from "@/components/characters/character-card";
import { Skeleton } from "@/components/ui/skeleton";
import { CHARACTERS_PER_PAGE, type CharacterSummary } from "@/lib/characters";

const gridClassName = "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5";

// Roughly the first row on wide screens: load those portraits straight away.
const EAGER_IMAGE_COUNT = 5;

export function CharacterGrid({ characters }: { characters: CharacterSummary[] }) {
  return (
    <ul className={gridClassName}>
      {characters.map((character, index) => (
        <li key={character.id}>
          <CharacterCard character={character} eager={index < EAGER_IMAGE_COUNT} />
        </li>
      ))}
    </ul>
  );
}

export function CharacterGridSkeleton() {
  return (
    <div role="status">
      <span className="sr-only">Loading characters…</span>
      <Skeleton className="mb-4 h-5 w-48" />
      <ul aria-hidden className={gridClassName}>
        {Array.from({ length: CHARACTERS_PER_PAGE }, (_, index) => (
          <li key={index} className="rounded-2xl border bg-card p-2">
            <Skeleton className="aspect-square rounded-xl" />
            <div className="space-y-2 px-1.5 pt-3 pb-1.5">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
