import type { FilterCharacter } from "@/lib/graphql/generated/graphql";

type SearchParamValue = string | string[] | undefined;
export type RawSearchParams = Record<string, SearchParamValue>;

// Filter values accepted by the API. It matches them case-insensitively, so the
// URL keeps them lowercase. Species is a partial match on the API side
// ("human" also returns "Humanoid"); the list mirrors every species in the data.

export const STATUS_OPTIONS = [
  { value: "alive", label: "Alive" },
  { value: "dead", label: "Dead" },
  { value: "unknown", label: "Status unknown" },
] as const;

export const SPECIES_OPTIONS = [
  { value: "human", label: "Human" },
  { value: "alien", label: "Alien" },
  { value: "humanoid", label: "Humanoid" },
  { value: "animal", label: "Animal" },
  { value: "robot", label: "Robot" },
  { value: "mythological creature", label: "Mythological creature" },
  { value: "poopybutthole", label: "Poopybutthole" },
  { value: "cronenberg", label: "Cronenberg" },
  { value: "disease", label: "Disease" },
  { value: "unknown", label: "Unknown species" },
] as const;

export const GENDER_OPTIONS = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "genderless", label: "Genderless" },
  { value: "unknown", label: "Gender unknown" },
] as const;

type OptionValue<T extends ReadonlyArray<{ value: string }>> = T[number]["value"];

export type StatusFilter = OptionValue<typeof STATUS_OPTIONS>;
export type SpeciesFilter = OptionValue<typeof SPECIES_OPTIONS>;
export type GenderFilter = OptionValue<typeof GENDER_OPTIONS>;

/** Everything that describes one view of the character list. Lives in the URL. */
export type CharacterListParams = {
  page: number;
  name: string;
  status: StatusFilter | null;
  species: SpeciesFilter | null;
  gender: GenderFilter | null;
};

export const DEFAULT_LIST_PARAMS: CharacterListParams = {
  page: 1,
  name: "",
  status: null,
  species: null,
  gender: null,
};

const MAX_NAME_LENGTH = 100;

function firstValue(value: SearchParamValue): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parsePage(value: SearchParamValue): number {
  const page = Number(firstValue(value));
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

function parseOption<T extends ReadonlyArray<{ value: string }>>(
  value: SearchParamValue,
  options: T,
): OptionValue<T> | null {
  const normalized = firstValue(value)?.trim().toLowerCase();
  const option = options.find((candidate) => candidate.value === normalized);
  return option ? (option.value as OptionValue<T>) : null;
}

export function parseCharacterListParams(searchParams: RawSearchParams): CharacterListParams {
  return {
    page: parsePage(searchParams.page),
    name: firstValue(searchParams.name)?.trim().slice(0, MAX_NAME_LENGTH) ?? "",
    status: parseOption(searchParams.status, STATUS_OPTIONS),
    species: parseOption(searchParams.species, SPECIES_OPTIONS),
    gender: parseOption(searchParams.gender, GENDER_OPTIONS),
  };
}

export function hasActiveFilters(params: CharacterListParams): boolean {
  return Boolean(params.name || params.status || params.species || params.gender);
}

/** The API filter for a list view. Unset filters are left out, which keeps cache keys stable. */
export function toCharacterFilter(params: CharacterListParams): FilterCharacter {
  const filter: FilterCharacter = {};
  if (params.name) filter.name = params.name;
  if (params.status) filter.status = params.status;
  if (params.species) filter.species = params.species;
  if (params.gender) filter.gender = params.gender;
  return filter;
}

export function getCharacterListHref(params: CharacterListParams): string {
  const query = new URLSearchParams();
  if (params.name) query.set("name", params.name);
  if (params.status) query.set("status", params.status);
  if (params.species) query.set("species", params.species);
  if (params.gender) query.set("gender", params.gender);
  if (params.page > 1) query.set("page", String(params.page));

  const search = query.toString();
  return search ? `/?${search}` : "/";
}
