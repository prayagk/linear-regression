import { render, visor } from "@tensorflow/tfjs-vis";
import { DataPoints } from "../../types";
import { useState } from "react";

interface IVisorControlsProps {
  data: DataPoints[];
  x: string;
  y: string;
}
function VisorControls({ data, x, y }: IVisorControlsProps) {
  const [isPlotted, setIsPlotted] = useState(false);
  const toggleVisor = () => {
    visor().toggle();
  };
  const visualise = async () => {
    await render.scatterplot(
      {
        name: `${x} vs ${y}`,
      },
      {
        values: data,
        series: ["Original"],
      },
      {
        xLabel: x,
        yLabel: y,
      }
    );
    setIsPlotted(true);
  };
  return (
    <div>
      {isPlotted ? (
        <button onClick={toggleVisor}>Toggle Visor</button>
      ) : (
        <button onClick={visualise}>Visualise Data</button>
      )}
    </div>
  );
}

export default VisorControls;
