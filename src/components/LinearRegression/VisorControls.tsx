import { useState } from "react";
import { plot, toggleVisor } from "../../utils/visor-utils";
import { useLRStore } from "../../store";
// import { linspace, tidy } from "@tensorflow/tfjs";
// import { useLRStore } from "../../store";

function VisorControls() {
  // const model = useLRStore((state) => state.model);

  const plotingPoints = useLRStore((state) => state.plotingPoints);
  const xLabel = useLRStore((state) => state.xLabel);
  const yLabel = useLRStore((state) => state.yLabel);

  const [isPlotted, setIsPlotted] = useState(false);
  const toggleVisorClick = () => toggleVisor();

  const visualise = async () => {
    plot(xLabel, yLabel, plotingPoints, null);
    setIsPlotted(true);
  };

  // const plotPredictionLine = () => {
  //   if (!model) return;

  //   tidy(() => {
  //     const normalisedXs = linspace(0, 1, 100);
  //     const normalisedYs = model.predict(normalisedXs.reshape([100, 1]));

  //   });
  // };

  return (
    <div>
      {isPlotted ? (
        <button onClick={toggleVisorClick}>Toggle Visor</button>
      ) : (
        <button title="Visualise data on a scatter plot" onClick={visualise}>
          Visualise Data
        </button>
      )}
    </div>
  );
}

export default VisorControls;
