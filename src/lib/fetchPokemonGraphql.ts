import { gql, useQuery } from "@apollo/client";



// GraphQL Query
export const GET_POKEMON_REVELOTION = gql`
query getPokemonEvolution($name: String!) {
  pokemon_v2_evolutionchain(where: {pokemon_v2_pokemonspecies: {name: {_eq: $name}}}) {
    pokemon_v2_pokemonspecies {
      name
      id
    }
  }
}
  `


export function fetchPokemonGraph(id: string) {
  try {


   


  } catch (error) {
    console.error("GraphQL Error:", error);
    return null;
  }
}