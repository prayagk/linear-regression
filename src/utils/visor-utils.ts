import { render, show, visor } from "@tensorflow/tfjs-vis";
import { DataPoints } from "../types";
import { useLRStore } from "../store";
import { Sequential } from "@tensorflow/tfjs";

export const plot = async (predictedLinePoints: DataPoints[] | null = null) => {
  const data = useLRStore.getState().plotingPoints;
  const x = useLRStore.getState().xLabel;
  const y = useLRStore.getState().yLabel;
  let values = [];
  let series = [];
  if (Array.isArray(predictedLinePoints)) {
    values = [data.slice(0, 1000), predictedLinePoints];
    series = ["Original", "Predicted"];
  } else {
    values = [data];
    series = ["Original"];
  }
  await render.scatterplot(
    {
      name: `${x} vs ${y}`,
    },
    {
      values,
      series,
    },
    {
      xLabel: x,
      yLabel: y,
    }
  );
};

export const showLayerInfo = (model: Sequential) => {
  const layer = model.getLayer("", 0);
  show.layer({ name: "Layer 1" }, layer);
};

export const toggleVisor = () => visor().toggle();

export const closeVisor = () => visor().close();
export const openVisor = () => visor().open();
