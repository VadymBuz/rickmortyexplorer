import type { TypedDocumentString } from "./generated/graphql";

const RICK_AND_MORTY_GRAPHQL_URL = "https://rickandmortyapi.com/graphql";
const REQUEST_TIMEOUT_MS = 10_000;

type GraphQLResponse<TResult> = {
  data?: TResult | null;
  errors?: ReadonlyArray<{ message: string }>;
};

class GraphQLRequestError extends Error {
  override name = "GraphQLRequestError";
}

/**
 * Sends a typed GraphQL operation to the Rick and Morty API.
 *
 * Result and variable types come from GraphQL Codegen, so callers can't pass
 * wrong variables or read fields the query didn't select.
 */
export async function executeQuery<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  variables: TVariables,
): Promise<TResult> {
  const response = await fetch(RICK_AND_MORTY_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: query.toString(), variables }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  // GraphQL validation errors arrive as 4xx responses with a JSON body,
  // so read the body before deciding how to report a failure.
  const body = (await response.json().catch(() => null)) as GraphQLResponse<TResult> | null;

  if (body?.errors?.length) {
    throw new GraphQLRequestError(body.errors.map((error) => error.message).join("; "));
  }
  if (!response.ok || !body?.data) {
    throw new GraphQLRequestError(
      `Rick and Morty API request failed with status ${response.status}`,
    );
  }

  return body.data;
}
