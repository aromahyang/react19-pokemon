import { useState, useTransition } from "react";
import fetch from "~/api";
import { POKEMON_API_URL } from "~/api/constants";
import { Input } from "~/components/ui";

export default function Page() {
  /* ------------------------------ No Transition ----------------------------- */
  const [isPendingWithoutTransition, setIsPending] = useState(false);
  const [pokemon1, setPokemon1] = useState<Record<string, any> | null>(null);
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ useTransition ----------------------------- */
  const [pokemon2, setPokemon2] = useState<Record<string, any> | null>(null);
  const [isPending, startTransition] = useTransition();
  /* -------------------------------------------------------------------------- */

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    (async () => {
      setIsPending(true);
      const res = await fetch({
        url: `${POKEMON_API_URL}/pokemon/${e.target.value}`,
        method: "get",
      });
      setPokemon1(() => res);
      setIsPending(false);
    })();
    startTransition(async () => {
      const res = await fetch({
        url: `${POKEMON_API_URL}/pokemon/${e.target.value}`,
        method: "get",
      });
      setPokemon2(() => res);
    });
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-2xl">useTransition()</h2>
      <p>
        useTransition()은 UI를 차단하지 않고 상태를 업데이트할 수 있는 React hook이다.<br />
        React에서 Transition은 긴급하지 않은 상태 업데이트를 의미한다.<br />
        React가 특정 상태 업데이트를 즉시 처리하지 않고, 우선순위가 낮은 작업으로 간주하여 처리할 수 있게 해준다.<br />
      </p>
      <h3 className="mt-4 font-bold text-xl">id를 입력하여 포켓몬 이름 보여주기</h3>
      <Input type="number" onChange={handleInputChange} />
      <p className="mt-4">useTransition() 이용 X</p>
      <div>
        <p>pending 여부: {isPendingWithoutTransition ? "true" : "false"}</p>
        <p>결과: {JSON.stringify(pokemon1?.name)}</p>
      </div>
      <p className="mt-4">useTransition() 이용</p>
      <div>
        <p>pending 여부: {isPending ? "true" : "false"}</p>
        <p>결과: {JSON.stringify(pokemon2?.name)}</p>
      </div>
    </div>
  );
}
