import Header from "../Header";
import Predict from "./Predict";
import Loader from "../Loader";
import { useLRStore } from "../../store";
import { lazy, Suspense } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import Reset from "./Reset";
import TrainAndTest from "./TrainAndTest";

const LazyVisorComponent = lazy(() => import("./VisorControls"));
const LazyLoadData = lazy(() => import("./LoadData"));

const LinearAggression = () => {
  const trainingStatus = useLRStore((state) => state.trainingStatus);
  const isDataLoaded = useLRStore((state) => state.isDataLoaded);
  const isMobile = useIsMobile();

  const isTrained =
    trainingStatus === "IMPORTED" || trainingStatus === "COMPLETED";

  return (
    <>
      <Loader />
      <Header
        title="Linear Regression with TensorFlow.js"
        description="Train a model to predict house price from living space."
      />
      <>
        <div className="mt-3 flex gap-2">
          <Suspense fallback={<div>Loading</div>}>
            <LazyLoadData />
            {isDataLoaded && !isMobile && <LazyVisorComponent />}
            {isTrained && <Reset isMobile={isMobile} />}
          </Suspense>
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
          <div>
            {isDataLoaded && (
              <TrainAndTest isMobile={isMobile} isTrained={isTrained} />
            )}
          </div>
          {isDataLoaded && <Predict isTrained={isTrained} />}
        </div>
      </>
    </>
  );
};

export default LinearAggression;
