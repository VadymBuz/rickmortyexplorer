type SearchParamValue = string | string[] | undefined;
export type RawSearchParams = Record<string, SearchParamValue>;

/** Everything that describes one view of the character list. Lives in the URL. */
export type CharacterListParams = {
  page: number;
};

function firstValue(value: SearchParamValue): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parsePage(value: SearchParamValue): number {
  const page = Number(firstValue(value));
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}

export function parseCharacterListParams(searchParams: RawSearchParams): CharacterListParams {
  return {
    page: parsePage(searchParams.page),
  };
}

export function getCharacterListHref(params: CharacterListParams): string {
  const query = new URLSearchParams();
  if (params.page > 1) {
    query.set("page", String(params.page));
  }

  const search = query.toString();
  return search ? `/?${search}` : "/";
}
