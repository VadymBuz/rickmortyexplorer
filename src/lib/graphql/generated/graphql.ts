/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type FilterCharacter = {
  gender?: string | null | undefined;
  name?: string | null | undefined;
  species?: string | null | undefined;
  status?: string | null | undefined;
  type?: string | null | undefined;
};

export type CharacterCardFragment = { id: string | null, name: string | null, status: string | null, species: string | null, image: string | null };

export type CharactersQueryVariables = Exact<{
  page?: number | null | undefined;
  filter?: FilterCharacter | null | undefined;
}>;


export type CharactersQuery = { characters: { info: { count: number | null, pages: number | null } | null, results: Array<{ id: string | null, name: string | null, status: string | null, species: string | null, image: string | null } | null> | null } | null };

export type CharacterQueryVariables = Exact<{
  id: string | number;
}>;


export type CharacterQuery = { character: { id: string | null, name: string | null, status: string | null, species: string | null, type: string | null, gender: string | null, image: string | null, created: string | null, origin: { name: string | null, type: string | null, dimension: string | null } | null, location: { name: string | null, type: string | null, dimension: string | null } | null, episode: Array<{ id: string | null, name: string | null, episode: string | null, air_date: string | null } | null> } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const CharacterCardFragmentDoc = new TypedDocumentString(`
    fragment CharacterCard on Character {
  id
  name
  status
  species
  image
}
    `, {"fragmentName":"CharacterCard"}) as unknown as TypedDocumentString<CharacterCardFragment, unknown>;
export const CharactersDocument = new TypedDocumentString(`
    query Characters($page: Int, $filter: FilterCharacter) {
  characters(page: $page, filter: $filter) {
    info {
      count
      pages
    }
    results {
      ...CharacterCard
    }
  }
}
    fragment CharacterCard on Character {
  id
  name
  status
  species
  image
}`) as unknown as TypedDocumentString<CharactersQuery, CharactersQueryVariables>;
export const CharacterDocument = new TypedDocumentString(`
    query Character($id: ID!) {
  character(id: $id) {
    id
    name
    status
    species
    type
    gender
    image
    created
    origin {
      name
      type
      dimension
    }
    location {
      name
      type
      dimension
    }
    episode {
      id
      name
      episode
      air_date
    }
  }
}
    `) as unknown as TypedDocumentString<CharacterQuery, CharacterQueryVariables>;