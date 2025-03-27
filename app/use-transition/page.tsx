import { useState, useTransition } from "react";
import fetch from "~/api";
import { POKEMON_API_URL } from "~/api/constants";
import { Button, Input } from "~/components/ui";

export default function Page() {
  const [id, setId] = useState<number | null>(null);
  const [pokemon, setPokemon] = useState<Record<string, any> | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(() => Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await fetch({
        url: `${POKEMON_API_URL}/pokemon/${id}`,
        method: "get",
      });
      setPokemon(() => res);
    });
  };

  return (
    <div>
      <h2>useTransition()</h2>
      <p>id를 입력하여 정보 가져오기</p>
      <form className="flex" onSubmit={handleSubmit}>
        <Input type="number" onChange={handleInputChange} />
        <Button type="submit">Submit</Button>
      </form>
      <div>
        <p>pending 여부: {isPending ? "true" : "false"}</p>
        <p>결과: {JSON.stringify(pokemon)}</p>
      </div>
    </div>
  );
}
