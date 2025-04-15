import { useState } from "react";
import { Input } from "~/components/ui";
import WithoutSuspense from "./WithoutSuspense";
import WithSuspense from "./WithSuspense";

export default function SuspensePage() {
  const [id, setId] = useState("");

  return (
    <div>
      <h2 className="font-bold text-2xl">Suspense</h2>
      <p>
        Suspense는 자식 요소를 로드하기 전까지 화면에 대체 UI(==fallback)를
        보여준다.<br />
        lazy를 활용한 지연 로딩 컴포넌트 혹은 use를 활용한 캐시된 Promise를 읽을 때에만 가능하다.<br />
        즉, useEffect나 이벤트 핸들러를 통한 데이터 로드는 감지할 수 없다.<br />
      </p>
      <Input onChange={(e) => setId(() => e.target.value)} />
      <WithoutSuspense id={id} />
      <WithSuspense id={id} />
    </div>
  );
}
