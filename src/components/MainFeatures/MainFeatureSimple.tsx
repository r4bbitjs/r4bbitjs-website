import React from "react";
import { Rabbit } from "lucide-react";

export const MainFeatureSimple = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-center items-center px-8">
      <Rabbit size={48} />
      <h1 className="mb-2 text-2xl text-themePrimaryDarkest">Crazy Simple!</h1>
      <p>
        r4bbit is built for simplicity, it is highly opinionated to have all the
        great options without even thinking about them! With just 10 lines of
        code, you can make your server running
      </p>
    </div>
  );
};
