import { useEffect, useState } from "react";
import fetch from "~/api";
import Loading from "./Loading";

type Props = {
  id: string;
};

export default function WithoutSuspense({ id }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!id) {
      setPokemon(() => ({}));
      return;
    }

    setIsLoading(() => true);
    fetch({
      url: `https://pokeapi.co/api/v2/pokemon/${id}`,
      method: "GET",
    }).then((res) => {
      setPokemon(() => res);
      setIsLoading(() => false);
    });
  }, [id]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <p>Suspense 미사용</p>
      {isLoading ? <Loading /> : <p>{pokemon.name}</p>}
    </div>
  );
}
