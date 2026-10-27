import Link from "next/link";
import { ViewTransition } from "react";

import { CharacterAvatar } from "@/components/characters/character-avatar";
import { CharacterStatus } from "@/components/characters/character-status";
import { getAvatarTransitionName } from "@/lib/avatar";
import type { CharacterSummary } from "@/lib/characters";
import { formatSpecies } from "@/lib/format";

export function CharacterCard({
  character,
  eager = false,
}: {
  character: CharacterSummary;
  eager?: boolean;
}) {
  return (
    <Link
      href={`/character/${character.id}`}
      transitionTypes={["nav-forward"]}
      className="group block rounded-2xl border bg-card p-2 outline-none transition-colors hover:border-primary/45 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <ViewTransition name={getAvatarTransitionName(character.id)} share="morph" default="none">
        <CharacterAvatar
          src={character.image}
          eager={eager}
          className="rounded-xl"
        />
      </ViewTransition>
      <div className="px-1.5 pt-3 pb-1.5">
        <h2 className="truncate font-heading text-lg leading-snug font-semibold">
          {character.name}
        </h2>
        <div className="mt-1 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-0.5 text-sm">
          <CharacterStatus status={character.status} className="whitespace-nowrap" />
          <span className="truncate text-muted-foreground">
            {formatSpecies(character.species)}
          </span>
        </div>
      </div>
    </Link>
  );
}
