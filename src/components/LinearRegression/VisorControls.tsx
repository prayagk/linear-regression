import { useState } from "react";
import { plot, toggleVisor } from "../../utils/visor-utils";
import { useLRStore } from "../../store";
import { plotPredictionLine } from "../../utils/linear-regression";

function VisorControls() {
  const model = useLRStore((state) => state.model);

  const normalisedFeatureMinMax = useLRStore(
    (state) => state.normalisedFeatureMinMax
  );
  const normalisedLabelMinMax = useLRStore(
    (state) => state.normalisedLabelMinMax
  );

  const trainingStatus = useLRStore((state) => state.trainingStatus);

  const isTrained =
    trainingStatus === "IMPORTED" || trainingStatus === "COMPLETED";

  const [isPlotted, setIsPlotted] = useState(false);
  const toggleVisorClick = () => toggleVisor();

  const visualise = async () => {
    plot(null);
    setIsPlotted(true);
  };

  const predictionLine = () => {
    if (!model || !normalisedFeatureMinMax || !normalisedLabelMinMax) return;

    const predictedLinePoints = plotPredictionLine(model);
    plot(predictedLinePoints);
    setIsPlotted(true);
  };

  return (
    <div className="flex gap-2">
      {isPlotted ? (
        <>
          <button onClick={toggleVisorClick}>Toggle Visor</button>
        </>
      ) : (
        <button title="Visualise data on a scatter plot" onClick={visualise}>
          Visualise Data
        </button>
      )}

      {isTrained && (
        <button onClick={predictionLine} title="Plot prediction line">
          Plot Prediction Line
        </button>
      )}
    </div>
  );
}

export default VisorControls;
