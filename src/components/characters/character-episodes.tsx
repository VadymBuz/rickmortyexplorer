import { useId } from "react";

import type { Episode } from "@/lib/characters";
import { groupEpisodesBySeason } from "@/lib/format";
import { cn } from "@/lib/utils";

export function CharacterEpisodes({
  episodes,
  className,
}: {
  episodes: Episode[];
  className?: string;
}) {
  const seasons = groupEpisodesBySeason(episodes);
  const id = useId();

  if (seasons.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby={`${id}-heading`} className={cn("mt-4", className)}>
      <h2 id={`${id}-heading`} className="font-heading text-2xl font-bold sm:text-3xl">
        Appears in {episodes.length} {episodes.length === 1 ? "episode" : "episodes"}
      </h2>

      <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {seasons.map(({ season, episodes: seasonEpisodes }) => (
          <section key={season} aria-labelledby={`${id}-season-${season}`} className="border-t pt-4">
            <h3 id={`${id}-season-${season}`} className="font-heading text-lg font-semibold">
              Season {season}
            </h3>
            <ul className="mt-3 space-y-3">
              {seasonEpisodes.map((episode) => (
                <li key={episode.id} className="grid grid-cols-[1.75rem_1fr] gap-x-2">
                  <span className="text-muted-foreground tabular-nums">
                    <span className="sr-only">Episode </span>
                    {episode.number}
                  </span>
                  <span>
                    {episode.name}
                    {episode.air_date && (
                      <span className="block text-sm text-muted-foreground">
                        {episode.air_date}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
