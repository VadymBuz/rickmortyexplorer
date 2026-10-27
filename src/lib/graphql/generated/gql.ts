/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment CharacterCard on Character {\n    id\n    name\n    status\n    species\n    image\n  }\n": typeof types.CharacterCardFragmentDoc,
    "\n  query Characters($page: Int, $filter: FilterCharacter) {\n    characters(page: $page, filter: $filter) {\n      info {\n        count\n        pages\n      }\n      results {\n        ...CharacterCard\n      }\n    }\n  }\n": typeof types.CharactersDocument,
    "\n  query Character($id: ID!) {\n    character(id: $id) {\n      id\n      name\n      status\n      species\n      type\n      gender\n      image\n      created\n      origin {\n        name\n        type\n        dimension\n      }\n      location {\n        name\n        type\n        dimension\n      }\n      episode {\n        id\n        name\n        episode\n        air_date\n      }\n    }\n  }\n": typeof types.CharacterDocument,
};
const documents: Documents = {
    "\n  fragment CharacterCard on Character {\n    id\n    name\n    status\n    species\n    image\n  }\n": types.CharacterCardFragmentDoc,
    "\n  query Characters($page: Int, $filter: FilterCharacter) {\n    characters(page: $page, filter: $filter) {\n      info {\n        count\n        pages\n      }\n      results {\n        ...CharacterCard\n      }\n    }\n  }\n": types.CharactersDocument,
    "\n  query Character($id: ID!) {\n    character(id: $id) {\n      id\n      name\n      status\n      species\n      type\n      gender\n      image\n      created\n      origin {\n        name\n        type\n        dimension\n      }\n      location {\n        name\n        type\n        dimension\n      }\n      episode {\n        id\n        name\n        episode\n        air_date\n      }\n    }\n  }\n": types.CharacterDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CharacterCard on Character {\n    id\n    name\n    status\n    species\n    image\n  }\n"): typeof import('./graphql').CharacterCardFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Characters($page: Int, $filter: FilterCharacter) {\n    characters(page: $page, filter: $filter) {\n      info {\n        count\n        pages\n      }\n      results {\n        ...CharacterCard\n      }\n    }\n  }\n"): typeof import('./graphql').CharactersDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Character($id: ID!) {\n    character(id: $id) {\n      id\n      name\n      status\n      species\n      type\n      gender\n      image\n      created\n      origin {\n        name\n        type\n        dimension\n      }\n      location {\n        name\n        type\n        dimension\n      }\n      episode {\n        id\n        name\n        episode\n        air_date\n      }\n    }\n  }\n"): typeof import('./graphql').CharacterDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
