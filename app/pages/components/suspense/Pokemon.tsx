import { use } from "react";
import fetch from "~/api";

/* ---------------------------------- fetch --------------------------------- */

let cache = new Map();
function fetchData(url: string) {
  if (!cache.has(url)) {
    cache.set(url, fetch({ url, method: "GET" }));
  }
  return cache.get(url);
}

/* -------------------------------------------------------------------------- */

type Props = {
  id: string;
};

export default function Pokemon({ id }: Props) {
  let res: Record<string, any> = {};
  if (id) {
    res = use(fetchData(`https://pokeapi.co/api/v2/pokemon/${id}`));
  }

  return <p>{res.name}</p>;
}
