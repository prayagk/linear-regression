import { render } from "@tensorflow/tfjs-vis";
import { DataPoints } from "../types";

export const plot = async (
  x: string,
  y: string,
  data: DataPoints[],
  predictedLinePoints: DataPoints[] | null = null
) => {
  const values = [data];
  const series = ["Original"];
  if (Array.isArray(predictedLinePoints)) {
    values.push(predictedLinePoints);
    series.push("Predicted");
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
