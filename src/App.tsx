// import { tensor, tensor1d, tensor2d } from "@tensorflow/tfjs";
import "./App.css";
import Credits from "./components/general/Credits";
import LinearAggression from "./components/LinearRegression";

function App() {
  // tensor2d([[3], [2], [4]]).print();
  // const t0 = tensor1d([8, 7, 5]);
  // const t1 = tf.tensor1d([232123, 3.324324, -5]);
  // t0.print();

  // const t2d = tensor2d([
  //   [8, 3, 9],
  //   [3, 5, 6],
  // ]);
  // const t2dAlternative = tensor([8, 3, 9, 3, 5, 6], [2, 3]);
  // t2dAlternative.print();
  // t2d.print();
  // t0.print();
  // t1.print();
  // const t2 = tf.scalar(10);
  // const t3 = t1.mul(t2);
  // t3.print();

  // Define a model for linear regression.
  // const model = tf.sequential();
  // model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

  // model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

  // // Generate some synthetic data for training.
  // const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
  // const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

  // Train the model using the data.
  // model.fit(xs, ys, { epochs: 10 }).then(() => {
  //   // Use the model to do inference on a data point the model hasn't seen before:
  //   model.predict(tf.tensor2d([5], [1, 1])).print();
  //   // Open the browser devtools to see the output
  // });

  // console.log(tf.getBackend());
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <div className="flex-grow md:max-w-[900px] flex flex-col justify-center items-start">
        <LinearAggression />
      </div>
      <div className="py-6">
        <footer>
          <Credits>
            <p>
              Data Source:{" "}
              <a
                href="https://www.kaggle.com/datasets/harlfoxem/housesalesprediction"
                target="_blank"
                rel="noopener noreferrer"
              >
                House Sales in King County, USA
              </a>{" "}
              from Kaggle.
            </p>
            <p>License: CC0: Public Domain</p>
          </Credits>
        </footer>
      </div>
    </div>
  );
}

export default App;
