import { lazy, Suspense } from "react";
import LoadModel from "../LoadModel";
import Stats from "../Stats";
import Test from "./Test";
import SaveModel from "../SaveModel";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/solid"; // Outline version
import { useLRStore } from "../../../store";

function TrainAndTest({
  isMobile,
  isTrained,
}: {
  isMobile: boolean;
  isTrained: boolean;
}) {
  const LazyTrainComponent = lazy(() => import("./Train"));
  const terminalTexts = useLRStore((state) => state.terminalTexts);

  return (
    <>
      <div className="border-2 p-3">
        <div className="mb-5 text-3xl flex justify-center items-center">
          <span>Train & Test</span>
          <WrenchScrewdriverIcon className="mx-3 h-7 text-blue-500" />
        </div>
        <div className="flex gap-3 justify-between items-center">
          <Suspense fallback={<div>Loading</div>}>
            <LazyTrainComponent isMobile={isMobile} />
          </Suspense>
          <span>Or</span>
          <LoadModel />
        </div>
        <Stats terminalTexts={terminalTexts} />
        {isTrained && (
          <>
            <div className="flex gap-3 justify-between">
              <Test />
              <SaveModel />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default TrainAndTest;
