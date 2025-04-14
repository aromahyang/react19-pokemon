import { useDeferredValue } from "react";

import { useState } from "react";
import { Input } from "~/components/ui";
import { MemoizedSlowList, SlowList } from "./SlowList";

export default function Page() {
  /* -------------------------------- no defer -------------------------------- */
  const [value1, setValue1] = useState("");
  /* -------------------------------------------------------------------------- */

  /* -------------------------------- defer -------------------------------- */
  const [value2, setValue2] = useState("");
  const deferredValue = useDeferredValue(value2);
  /* -------------------------------------------------------------------------- */

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue1(event.target.value);
    setValue2(event.target.value);
  };

  return (
    <div>
      <h2 className="font-bold text-2xl">useDeferredValue()</h2>
      <p>
        useDeferredValue()는 상태 값 변화에 낮은 우선순위를 지정하기 위한
        훅이다.
        <br />
        useDeferredValue의 파라미터는 원시값이거나{" "}
        <b>컴포넌트 외부에서 생성된</b> 객체여야 한다.
        <br />
        렌더링 중에 새 객체를 생성하고 즉시 useDeferredValue에 전달하면 렌더링할
        때마다 값이 달라져 불필요한 백그라운드 리렌더링이 발생할 수 있기
        때문이다.
        <br />
        useDeferredValue()가 현재 렌더링(여전히 이전 값을 사용하는 경우)과 다른
        값을 받으면 백그라운드에서 새 값을 리렌더링하도록 <b>예약</b>한다.
        <br />
        value에 또 다른 값을 받으면 백그라운드 리렌더링이 중단되고 백그라운드
        리렌더링을 처음부터 다시 시작할 것이다.
        <br />
        예를 들어, 차트가 리렌더링 가능한 지연된 값을 받는 속도보다 사용자 input
        값을 입력하는 속도가 더 빠른 경우 차트는 사용자가 입력을 멈춘 후에만
        리렌더링한다.
      </p>
      <Input onChange={handleInputChange} />
      <div className="flex gap-2">
        <div className="h-[600px] max-h-[800px] overflow-auto">
          <p>no defer</p>
          <SlowList text={value1} />
        </div>
        <div className="h-[600px] max-h-[800px] overflow-auto">
          <p>use defer without memo</p>
          <SlowList text={deferredValue} />
        </div>
        <div className="h-[600px] max-h-[800px] overflow-auto">
          <p>use defer with memo</p>
          <MemoizedSlowList text={deferredValue} />
        </div>
      </div>
    </div>
  );
}
