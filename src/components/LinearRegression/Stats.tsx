import { useEffect, useRef } from "react";
import { useLRStore } from "../../store";

function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const terminalTexts = useLRStore((state) => state.terminalTexts);

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
