function Stats({ texts }: { texts: string[] }) {
  return (
    <div className="flex flex-col bg-black h-28 text-green-700 my-3 p-2 font-mono">
      {texts.map((line) => (
        <div className="w-full">{`> ${line}`}</div>
      ))}
    </div>
  );
}

export default Stats;
