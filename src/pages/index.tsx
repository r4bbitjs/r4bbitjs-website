import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";

const R4bbitLogo = require("@site/static/img/logo.svg").default;

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    // <div className={clsx(styles.container)}>
    //   <div className={clsx(styles.flexContainer)}>
    //     <img src={require("@site/static/img/logo.png").default} />
    //   </div>
    //   <div className={clsx(styles.flexGrow)}>
    //     <div className={clsx(styles.flexContainer)}>
    //       <div className={styles.flexText}>
    //         <h1 className={styles.headerTitle}>R4bbit</h1>
    //         <p className={styles.headerParagraph}>
    //           The best way to use RabbitMQ in TypeScript!
    //         </p>

    //         <a className={clsx(styles.ctaButton)} href="/docs/getting-started">
    //           Get started
    //         </a>
    //         <p className="text-red-900 text-xl">test</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="container w-full h-80 md:h-[85vh] xl:h-[85vh] md:pb-24 flex-wrap md:columns-2 flex  flex-row items-center justify-center md:block gap-12 xl:gap-9 pt-16">
      <div className="h-full flex justify-center items-center">
        <img className="max-w-[80%] 2xl:scale-150 md:max-w-none" src={require("@site/static/img/logo.png").default} />
      </div>
      <div className="h-full flex justify-center items-center flex-col md:items-start max-w-[25rem] xl:max-w-lg 2xl:max-w-2xl">
        <h1 className="text-8xl xl:text-9xl 2xl:text-[9rem] r4bbitBackgroundHeaderTitle mb-0">R4bbit</h1>
        <p className="text-xl xl:text-2xl 2xl:text-3xl mb-o font-light">The best way to use RabbitMQ in TypeScript!</p>
        <a className="r4bbitLinearBackground text-shadow-border text-2xl xl:text-3xl 2xl:text-4xl text-center text-white px-4 py-2 w-full rounded-md cursor-pointer hover:text-white hover:scale-105 hover:dec hover:no-underline transition-transform" href="/docs/getting-started">
          Get Started
        </a>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`r4bbit 🐇`} description="The best way to use RabbitMQ">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
