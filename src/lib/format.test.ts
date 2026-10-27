import { describe, expect, it } from "vitest";

import {
  formatCreatedDate,
  formatGender,
  formatPlace,
  formatSpecies,
  groupEpisodesBySeason,
  parseEpisodeCode,
} from "./format";

describe("formatSpecies", () => {
  it("keeps known species and labels missing ones", () => {
    expect(formatSpecies("Human")).toBe("Human");
    expect(formatSpecies("unknown")).toBe("Unknown species");
    expect(formatSpecies(null)).toBe("Unknown species");
  });
});

describe("formatGender", () => {
  it("keeps known genders and labels missing ones", () => {
    expect(formatGender("Female")).toBe("Female");
    expect(formatGender("unknown")).toBe("Unknown");
    expect(formatGender("")).toBe("Unknown");
  });
});

describe("formatPlace", () => {
  it("describes a place by name, type and dimension", () => {
    expect(
      formatPlace({ name: "Earth (C-137)", type: "Planet", dimension: "Dimension C-137" }),
    ).toEqual({ name: "Earth (C-137)", details: "Planet in Dimension C-137" });
  });

  it("drops unknown parts", () => {
    expect(
      formatPlace({ name: "Citadel of Ricks", type: "Space station", dimension: "unknown" }),
    ).toEqual({ name: "Citadel of Ricks", details: "Space station" });
    expect(formatPlace({ name: "unknown", type: null, dimension: null })).toEqual({
      name: "Unknown",
      details: null,
    });
    expect(formatPlace(null)).toEqual({ name: "Unknown", details: null });
  });
});

describe("formatCreatedDate", () => {
  it("formats the API timestamp as a calendar date", () => {
    expect(formatCreatedDate("2017-11-04T18:48:46.250Z")).toBe("November 4, 2017");
  });

  it("returns null for missing or invalid dates", () => {
    expect(formatCreatedDate(null)).toBeNull();
    expect(formatCreatedDate("not a date")).toBeNull();
  });
});

describe("parseEpisodeCode", () => {
  it("reads the season and episode numbers", () => {
    expect(parseEpisodeCode("S01E01")).toEqual({ season: 1, episode: 1 });
    expect(parseEpisodeCode("S05E10")).toEqual({ season: 5, episode: 10 });
  });

  it("returns null for unexpected codes", () => {
    expect(parseEpisodeCode("Pilot")).toBeNull();
    expect(parseEpisodeCode(null)).toBeNull();
  });
});

describe("groupEpisodesBySeason", () => {
  it("groups episodes by season in airing order", () => {
    const groups = groupEpisodesBySeason([
      { id: "12", name: "B", episode: "S02E01", air_date: null },
      { id: "1", name: "A", episode: "S01E01", air_date: null },
      { id: "2", name: "A2", episode: "S01E02", air_date: null },
    ]);

    expect(groups.map((group) => group.season)).toEqual([1, 2]);
    expect(groups[0].episodes.map((episode) => episode.number)).toEqual([1, 2]);
    expect(groups[1].episodes[0]).toMatchObject({ id: "12", name: "B", number: 1 });
  });

  it("skips episodes without a readable code", () => {
    expect(
      groupEpisodesBySeason([{ id: "1", name: "Odd", episode: "special", air_date: null }]),
    ).toEqual([]);
  });
});
