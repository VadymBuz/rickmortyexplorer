// The API reports missing values as a lowercase "unknown" (or an empty string),
// so these helpers turn them into readable labels.

function isKnown(value: string | null | undefined): value is string {
  return typeof value === "string" && value !== "" && value.toLowerCase() !== "unknown";
}

export function formatSpecies(species: string | null): string {
  return isKnown(species) ? species : "Unknown species";
}
