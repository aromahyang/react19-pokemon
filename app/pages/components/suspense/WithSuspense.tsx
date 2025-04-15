import { Suspense } from "react";
import Loading from "./Loading";
import Pokemon from "./Pokemon";

type Props = {
  id: string;
};

export default function WithSuspense({ id }: Props) {
  return (
    <div>
      <p>Suspense 사용</p>
      <Suspense fallback={<Loading />}>
        <Pokemon id={id} />
      </Suspense>
    </div>
  );
}
