import { graphql } from "./generated";

export const characterCardFragment = graphql(`
  fragment CharacterCard on Character {
    id
    name
    status
    species
    image
  }
`);

export const charactersQuery = graphql(`
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
`);

export const characterQuery = graphql(`
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
`);
