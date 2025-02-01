import { useEffect, useRef } from "react";
import { TerminalTextType } from "../../types";

function Stats({ terminalTexts }: { terminalTexts: TerminalTextType[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [terminalTexts]);

  if (!terminalTexts.length) {
    return;
  }

  return (
    <div
      ref={ref}
      className="flex flex-col bg-black h-32 overflow-y-auto text-green-700 my-3 p-2 font-mono shadow-lg"
    >
      {terminalTexts.map((line) => (
        <div key={line.id} className="w-full">{`> ${line.text}`}</div>
      ))}
    </div>
  );
}

export default Stats;
