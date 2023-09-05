import React from "react";
import { Bot } from "lucide-react";

export const MainFeatureInclusive = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-center items-center px-8">
      <Bot size={48} />
      <h1 className="mb-2 text-2xl text-themePrimaryDarkest">Inclusive!</h1>
      <p>
        r4bbit is built on top of amqplib, and it is extendable by all the
        options amqplib provides. It comes with great basics like reconnection
        after connection failure and many more!
      </p>
    </div>
  );
};
