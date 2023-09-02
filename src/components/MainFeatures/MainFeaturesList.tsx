import React from "react";
import { MainFeatureSimple } from "./MainFeatureSimple";
import { MainFeatureBatteriesIncluded } from "./MainFeatureBatteriesIncluded";
import { MainFeatureInclusive } from "./MainFeatureInclusive";

export const MainFeaturesList = (): JSX.Element => {
  return (
    <div className="w-full flex flex-col items-center lg:flex-row justify-around px-16 lg:gap-6 mb-16">
      <MainFeatureInclusive />
      <MainFeatureBatteriesIncluded />
      <MainFeatureSimple />
    </div>
  );
};
