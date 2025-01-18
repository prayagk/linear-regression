import { useLRStore } from "../../store";
import { closeVisor } from "../../utils/visor-utils";
import { ArrowPathIcon } from "@heroicons/react/24/solid"; // For a solid reset icon

function Reset({ isMobile }: { isMobile: boolean }) {
  const setTrainingStatus = useLRStore((state) => state.setTrainingStatus);
  const resetTerminalText = useLRStore((state) => state.resetTerminalText);
  const setModel = useLRStore((state) => state.setModel);
  const setTerminalText = useLRStore((state) => state.setTerminalText);

  const onReset = () => {
    setTrainingStatus(null);
    resetTerminalText();
    setTerminalText("Model reset");
    setModel(null);
    if (!isMobile) closeVisor();
  };
  return (
    <div>
      <button onClick={onReset} title="Reset">
        <ArrowPathIcon className="w-6 h-6" />
      </button>
    </div>
  );
}

export default Reset;
