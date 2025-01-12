import { useLRStore } from "../../store";

function Stats() {
  const terminalTexts = useLRStore((state) => state.terminalTexts);
  return (
    <div className="flex flex-col bg-black h-28 text-green-700 my-3 p-2 font-mono">
      {terminalTexts.map((line) => (
        <div key={line.id} className="w-full">{`> ${line.text}`}</div>
      ))}
    </div>
  );
}

export default Stats;
