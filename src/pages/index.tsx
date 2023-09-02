import React from "react";
import Layout from "@theme/Layout";
// import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";

const R4bbitLogo = require("@site/static/img/logo.svg").default;

function HomepageHeader() {
  return (
    <div className="w-full h-[95vh] flex flex-col lg:flex-row lg:pb-20">
      <div className="lg:w-1/2 h-2/3 lg:h-full flex justify-center lg:justify-end 2xl:justify-center items-center">
        <div className="min-h-min w-fit lg:w-full lg:max-w-[80%] 2xl:scale-150 md:max-w-none flex justify-center lg:justify-end">
          <img
            className=""
            src={require("@site/static/img/logo.png").default}
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2  h-1/3 lg:h-full flex justify-center items-start lg:justify-start lg:items-center">
        <div className="w-full px-16 lg:px-0 lg:w-3/4 2xl:w-1/2 flex flex-col">
          <h1 className="text-4xl lg:text-7xl xl:text-8xl 2xl:text-[9rem] r4bbitBackgroundHeaderTitle mb-0">
            R4bbit
          </h1>
          <p className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl mb-o font-light">
            The best way to use RabbitMQ in TypeScript!
          </p>
          <a
            className="r4bbitLinearBackground text-shadow-border text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl text-center text-white px-4 py-2 w-full rounded-md cursor-pointer hover:text-white hover:scale-105 hover:dec hover:no-underline transition-transform w-full"
            href="/docs/getting-started"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout title={`r4bbit 🐇`} description="The best way to use RabbitMQ">
      <HomepageHeader />
      <main></main>
    </Layout>
  );
}
