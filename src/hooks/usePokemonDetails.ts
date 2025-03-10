import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPokemonDetails } from "@/src/lib/getPokemonDetails";

export function usePokemonDetails(slug: string) {
  // Try to get cached data
  const queryClient = useQueryClient();
  const cachedPokemon = queryClient.getQueryData(["pokemon", slug]);

  const {
    data: pokemon,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["pokemon", slug],
    queryFn: () => getPokemonDetails(slug),
    initialData: cachedPokemon, // Use cached data first
    enabled: !!slug, // Only fetch if slug is available
  });

  return { pokemon, isLoading, error, refetch };
}
