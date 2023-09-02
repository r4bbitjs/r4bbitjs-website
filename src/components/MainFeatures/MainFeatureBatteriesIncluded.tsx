import React from "react";
import { BatteryChargingIcon } from "lucide-react";

export const MainFeatureBatteriesIncluded = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-center items-center px-8">
      <BatteryChargingIcon size={48} />
      <h1 className="mb-2 text-2xl text-themePrimaryDarkest">
        Batteries Included!
      </h1>
      <p>
        r4bbit is a batteries included library! It comes with great defaults and
        out of the box logger and request tracer!
      </p>
    </div>
  );
};
