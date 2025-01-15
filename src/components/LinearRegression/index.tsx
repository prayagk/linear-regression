import Header from "./Header";
import Predict from "./Predict";
import Test from "./Test";
import Stats from "./Stats";
import SaveModel from "./SaveModel";
import LoadModel from "./LoadModel";
import Loader from "../Loader";
import { useLRStore } from "../../store";
import { lazy, Suspense } from "react";

const LazyVisorComponent = lazy(() => import("./VisorControls"));
const LazyTrainComponent = lazy(() => import("./Train"));
const LazyLoadData = lazy(() => import("./LoadData"));

const LinearAggression = () => {
  const isTrained = useLRStore((state) => state.isTrained);
  const isDataLoaded = useLRStore((state) => state.isDataLoaded);

  return (
    <>
      <Loader />
      <Header />
      <>
        <div className="my-3 flex gap-2">
          <Suspense fallback={<div>Loading</div>}>
            <LazyLoadData />
            {isDataLoaded && <LazyVisorComponent />}
          </Suspense>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="my-3">
            {isDataLoaded && (
              <div className="flex gap-3 justify-between">
                <Suspense fallback={<div>Loading</div>}>
                  <LazyTrainComponent />
                </Suspense>

                <span>Or</span>
                <LoadModel />
              </div>
            )}

            {isTrained && (
              <>
                <Stats />
                <div className="flex gap-3 justify-between">
                  <Test />
                  <SaveModel />
                </div>
              </>
            )}
          </div>
          {isTrained && <Predict />}
        </div>
      </>
    </>
  );
};

export default LinearAggression;
