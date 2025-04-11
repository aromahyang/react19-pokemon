import { useState, useTransition } from "react";
import fetch from "~/api";
import { POKEMON_API_URL } from "~/api/constants";
import { Input } from "~/components/ui";
import UseState from "./UseState";
import UseTransition from "./UseTransition";

export default function Page() {
  /* ------------------------------ no transition ----------------------------- */
  const [isPending1, setIsPending1] = useState(false);
  const [pokemon1, setPokemon1] = useState<Record<string, any> | null>(null);
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- transition ------------------------------- */
  const [pokemon2, setPokemon2] = useState<Record<string, any> | null>(null);
  const [isPending2, startTransition] = useTransition();
  /* -------------------------------------------------------------------------- */

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;
    if (!value) return;
    (async () => {
      setIsPending1(() => true);
      const res = await fetch({
        url: `${POKEMON_API_URL}/pokemon/${value}`,
        method: "get",
      });
      setPokemon1(() => res);
      setIsPending1(() => false);
    })();
    startTransition(async () => {
      const res = await fetch({
        url: `${POKEMON_API_URL}/pokemon/${value}`,
        method: "get",
      });
      startTransition(() => {
        setPokemon2(() => res);
      });
    });
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-2xl">useTransition()</h2>
      <p>
        useTransition()은 UI를 차단하지 않고 상태를 업데이트할 수 있는 React
        hook이다.
        <br />
        React에서 Transition은 긴급하지 않은 상태 업데이트를 의미한다.
        <br />
        React가 특정 상태 업데이트를 즉시 처리하지 않고, 우선순위가 낮은
        작업으로 간주하여 처리할 수 있게 해준다.
        <br />
      </p>
      <h3 className="mt-4 font-bold text-xl">
        id를 입력하여 포켓몬 이름 보여주기
      </h3>
      <Input type="number" onChange={handleInputChange} />
      <p className="mt-4">useTransition() 이용 X</p>
      <UseState isPending={isPending1} data={pokemon1} />
      <p className="mt-4">useTransition() 이용</p>
      <UseTransition isPending={isPending2} data={pokemon2} />
    </div>
  );
}
