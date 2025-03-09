"use client"
import StatsChart from "../../../components/StatChart";
import { usePathname } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPokemon } from "@/src/lib/fetchPokemonRest";
import { typeColors } from "@/src/lib/pokemonColor";
import { fetchPokemonGraph, GET_POKEMON_REVELOTION } from "@/src/lib/fetchPokemonGraphql";
import { gql, useQuery as useQueryApollo } from "@apollo/client";







export default function PokemonDetails() {
  const pathname = usePathname()
  const slug = pathname.split("/")[2]

  // Try to get cached data
  const queryClient = useQueryClient();
  const cachedPokemon = queryClient.getQueryData(["pokemon", slug]);

  const { data: pokemon, isLoading } = useQuery({
    queryKey: ["pokemon", slug],
    queryFn: () => fetchPokemon(slug as string),
    initialData: cachedPokemon, // Use cached data first
    enabled: !!slug, // Only fetch if slug is available
  });


  const { data: pokemonEvolution, loading, error } = useQueryApollo(GET_POKEMON_REVELOTION, {
    variables: { name: slug },
  })
  if (isLoading || loading) return <p className="text-gray-500 text-center">Loading...</p>;


  const evolutions = pokemonEvolution.pokemon_v2_evolutionchain.length ? pokemonEvolution.pokemon_v2_evolutionchain[0].pokemon_v2_pokemonspecies : []
  const { id, name, types, stats } = pokemon;
  const mainType = pokemon.types[0]?.type?.name || "normal";
  const bgColor = typeColors[mainType];
  console.log(stats)

  const extractedStats: any = stats?.map((stat: any) => ({
    name: stat.stat.name,
    value: stat.base_stat
  }));

  console.log({extractedStats});


  return (
    <div className={`${bgColor} grid grid-rows-[20px_1fr_20px] items-center justify-items-center  min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}>
      <main className=" grid justify-items-center gap-8 row-start-2  sm:items-start bg-white p-5">

        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`} alt={pokemon.name} className="w-40 my-3" />

        <h1 className="text-[40px]">{pokemon.name}</h1>


        <div className="grid grid-cols-4 gap-4 ">
          {types?.map((type: any, index: number) => { return <div key={index} className={`${typeColors[type.type?.name || "normal"]} col-span-2 p-2 rounded-xl text-center`}>{type.type?.name}</div> })}

        </div>

        <div>{evolutions?.map((pokemon: any, index: number) => <img key={index} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt={pokemon.name} className="w-40 my-3" />
        )}</div>


        <p>Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger.</p>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#88BE5D] col-span-2 p-2 rounded-xl text-center">STATS</div>
          <div className="p-2 rounded-xl col-span-2 text-center">EVOLUTIONS</div>

        </div>

        <StatsChart props={extractedStats} />

      </main>
    </div>

  );
}
