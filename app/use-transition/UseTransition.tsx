type Props = {
  isPending: boolean;
  data: Record<string, any> | null;
};

export default function UseTransition({ isPending, data }: Props) {
  return (
    <div>
      <p>pending 여부: {isPending ? "true" : "false"}</p>
      <p>결과: {JSON.stringify(data?.name)}</p>
    </div>
  );
}
