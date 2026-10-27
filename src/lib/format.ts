// The API reports missing values as a lowercase "unknown" (or an empty string),
// so these helpers turn them into readable labels.

function isKnown(value: string | null | undefined): value is string {
  return typeof value === "string" && value !== "" && value.toLowerCase() !== "unknown";
}

export function formatSpecies(species: string | null): string {
  return isKnown(species) ? species : "Unknown species";
}

export function formatGender(gender: string | null): string {
  return isKnown(gender) ? gender : "Unknown";
}

type Place = {
  name: string | null;
  type: string | null;
  dimension: string | null;
};

/** A place's name, plus a short "Planet in Dimension C-137" description when known. */
export function formatPlace(place: Place | null): { name: string; details: string | null } {
  const name = isKnown(place?.name) ? place.name : "Unknown";
  const type = isKnown(place?.type) ? place.type : null;
  const dimension = isKnown(place?.dimension) ? place.dimension : null;

  const details =
    type && dimension ? `${type} in ${dimension}` : (type ?? (dimension ? `In ${dimension}` : null));

  return { name, details };
}

const createdDateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
});

export function formatCreatedDate(isoDate: string | null): string | null {
  if (!isoDate) {
    return null;
  }
  const date = new Date(isoDate);
  return Number.isNaN(date.getTime()) ? null : createdDateFormat.format(date);
}

/** Splits an episode code like "S01E05" into its season and episode numbers. */
export function parseEpisodeCode(code: string | null): { season: number; episode: number } | null {
  const match = code?.match(/^S(\d+)E(\d+)$/i);
  return match ? { season: Number(match[1]), episode: Number(match[2]) } : null;
}

type SeasonGroup<T> = {
  season: number;
  episodes: Array<T & { number: number }>;
};

export function groupEpisodesBySeason<T extends { episode: string | null }>(
  episodes: T[],
): SeasonGroup<T>[] {
  const seasons = new Map<number, Array<T & { number: number }>>();

  for (const episode of episodes) {
    const code = parseEpisodeCode(episode.episode);
    if (!code) continue;
    const season = seasons.get(code.season) ?? [];
    season.push({ ...episode, number: code.episode });
    seasons.set(code.season, season);
  }

  return [...seasons.entries()]
    .sort(([a], [b]) => a - b)
    .map(([season, seasonEpisodes]) => ({
      season,
      episodes: seasonEpisodes.sort((a, b) => a.number - b.number),
    }));
}
