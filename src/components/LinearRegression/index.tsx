import Header from "./Header";
import Predict from "./Predict";
import Test from "./Test";
import Stats from "./Stats";
import SaveModel from "./SaveModel";
import LoadModel from "./LoadModel";
import Loader from "../Loader";
import { useLRStore } from "../../store";
import { lazy, Suspense } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

const LazyVisorComponent = lazy(() => import("./VisorControls"));
const LazyTrainComponent = lazy(() => import("./Train"));
const LazyLoadData = lazy(() => import("./LoadData"));

const LinearAggression = () => {
  const trainingStatus = useLRStore((state) => state.trainingStatus);
  const isDataLoaded = useLRStore((state) => state.isDataLoaded);
  const isMobile = useIsMobile();

  return (
    <>
      <Loader />
      <Header />
      <>
        <div className="mt-3 flex gap-2">
          <Suspense fallback={<div>Loading</div>}>
            <LazyLoadData />
            {isDataLoaded && !isMobile && <LazyVisorComponent />}
          </Suspense>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="my-3">
            {isDataLoaded && (
              <>
                <div className="flex gap-3 justify-between items-center">
                  <Suspense fallback={<div>Loading</div>}>
                    <LazyTrainComponent isMobile={isMobile} />
                  </Suspense>

                  <span>Or</span>
                  <LoadModel />
                </div>
              </>
            )}
            <Stats />

            {trainingStatus === "COMPLETED" && (
              <>
                <div className="flex gap-3 justify-between">
                  <Test />
                  <SaveModel />
                </div>
              </>
            )}
          </div>
          {trainingStatus === "COMPLETED" && <Predict />}
        </div>
      </>
    </>
  );
};

export default LinearAggression;
