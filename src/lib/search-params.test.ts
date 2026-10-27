import { describe, expect, it } from "vitest";

import {
  DEFAULT_LIST_PARAMS,
  getCharacterListHref,
  hasActiveFilters,
  parseCharacterListParams,
  parseURLSearchParams,
  toCharacterFilter,
} from "./search-params";

describe("parseCharacterListParams", () => {
  it("falls back to defaults for an empty query", () => {
    expect(parseCharacterListParams({})).toEqual(DEFAULT_LIST_PARAMS);
  });

  it("reads every filter from the query", () => {
    expect(
      parseCharacterListParams({
        page: "3",
        name: "  rick ",
        status: "Alive",
        species: "mythological creature",
        gender: "MALE",
      }),
    ).toEqual({
      page: 3,
      name: "rick",
      status: "alive",
      species: "mythological creature",
      gender: "male",
    });
  });

  it("ignores values the API doesn't support", () => {
    expect(
      parseCharacterListParams({ status: "zombie", species: "", gender: "robot" }),
    ).toMatchObject({ status: null, species: null, gender: null });
  });

  it("resets invalid page numbers to the first page", () => {
    for (const page of ["0", "-2", "2.5", "abc", ""]) {
      expect(parseCharacterListParams({ page }).page).toBe(1);
    }
  });

  it("uses the first value when a parameter is repeated", () => {
    expect(parseCharacterListParams({ status: ["dead", "alive"], page: ["4", "9"] })).toMatchObject(
      { status: "dead", page: 4 },
    );
  });

  it("caps the page at the largest number the API accepts", () => {
    expect(parseCharacterListParams({ page: "3000000000" }).page).toBe(2_147_483_647);
  });

  it("caps very long names", () => {
    expect(parseCharacterListParams({ name: "a".repeat(500) }).name).toHaveLength(100);
  });
});

describe("parseURLSearchParams", () => {
  it("reads repeated keys the same way as the server", () => {
    const query = "status=dead&status=alive&page=4&page=9";
    expect(parseURLSearchParams(new URLSearchParams(query))).toEqual(
      parseCharacterListParams({ status: ["dead", "alive"], page: ["4", "9"] }),
    );
  });
});

describe("getCharacterListHref", () => {
  it("returns the bare path for the default view", () => {
    expect(getCharacterListHref(DEFAULT_LIST_PARAMS)).toBe("/");
  });

  it("only includes values that differ from the defaults", () => {
    expect(getCharacterListHref({ ...DEFAULT_LIST_PARAMS, status: "dead", page: 2 })).toBe(
      "/?status=dead&page=2",
    );
  });

  it("round-trips through the parser", () => {
    const params = {
      page: 2,
      name: "summer smith",
      status: "alive",
      species: "human",
      gender: "female",
    } as const;
    const href = getCharacterListHref(params);
    const query = Object.fromEntries(new URL(href, "http://localhost").searchParams);
    expect(parseCharacterListParams(query)).toEqual(params);
  });
});

describe("toCharacterFilter", () => {
  it("leaves out unset filters", () => {
    expect(toCharacterFilter(DEFAULT_LIST_PARAMS)).toEqual({});
    expect(toCharacterFilter({ ...DEFAULT_LIST_PARAMS, name: "morty", gender: "male" })).toEqual({
      name: "morty",
      gender: "male",
    });
  });
});

describe("hasActiveFilters", () => {
  it("ignores the page number", () => {
    expect(hasActiveFilters({ ...DEFAULT_LIST_PARAMS, page: 5 })).toBe(false);
    expect(hasActiveFilters({ ...DEFAULT_LIST_PARAMS, species: "robot" })).toBe(true);
  });
});
