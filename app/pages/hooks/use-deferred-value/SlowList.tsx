import { memo } from "react";

type Props = {
  text: string;
};

function SlowListItem({ text }: Props) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return <li className="item">Text: {text}</li>;
}

export function SlowList({ text }: Props) {
  const items = [];
  for (let i = 0; i < 250; i++) {
    items.push(<SlowListItem key={i} text={text} />);
  }
  return <ol>{items}</ol>;
}

export const MemoizedSlowList = memo(SlowList);
