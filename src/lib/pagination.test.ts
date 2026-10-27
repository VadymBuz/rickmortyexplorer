import { describe, expect, it } from "vitest";

import { getPaginationItems } from "./pagination";

describe("getPaginationItems", () => {
  it("returns nothing when there are no pages", () => {
    expect(getPaginationItems(1, 0)).toEqual([]);
  });

  it("lists every page when they all fit", () => {
    expect(getPaginationItems(1, 1)).toEqual([1]);
    expect(getPaginationItems(2, 2)).toEqual([1, 2]);
    expect(getPaginationItems(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("collapses the end of the list on the first pages", () => {
    expect(getPaginationItems(1, 42)).toEqual([1, 2, 3, 4, 5, "end-ellipsis", 42]);
    expect(getPaginationItems(4, 42)).toEqual([1, 2, 3, 4, 5, "end-ellipsis", 42]);
  });

  it("collapses both sides in the middle of the list", () => {
    expect(getPaginationItems(21, 42)).toEqual([
      1,
      "start-ellipsis",
      20,
      21,
      22,
      "end-ellipsis",
      42,
    ]);
  });

  it("collapses the start of the list on the last pages", () => {
    expect(getPaginationItems(42, 42)).toEqual([1, "start-ellipsis", 38, 39, 40, 41, 42]);
  });

  it("never hides a single page behind an ellipsis", () => {
    expect(getPaginationItems(5, 42)).toEqual([1, "start-ellipsis", 4, 5, 6, "end-ellipsis", 42]);
    expect(getPaginationItems(38, 42)).toEqual([1, "start-ellipsis", 37, 38, 39, "end-ellipsis", 42]);
    expect(getPaginationItems(39, 42)).toEqual([1, "start-ellipsis", 38, 39, 40, 41, 42]);
  });
});
