import { useEffect, useState, useCallback } from "react";
import fetch from "~/api";

// 캐시를 위한 Map
const pokemonCache = new Map<string, any>();

export function usePokemon(id: string) {
  const [pokemon, setPokemon] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPokemon = useCallback(async () => {
    // 캐시에 데이터가 있으면 캐시된 데이터 사용
    if (pokemonCache.has(id)) {
      setPokemon(pokemonCache.get(id));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch({
        url: `https://pokeapi.co/api/v2/pokemon/${id}`,
        method: "GET",
      });

      // 캐시에 데이터 저장
      pokemonCache.set(id, res);
      setPokemon(res);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  return { pokemon, isLoading, error };
}