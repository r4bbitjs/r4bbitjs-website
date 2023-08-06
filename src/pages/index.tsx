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

    <div className="container flex justify-items-center w-full h-80">
      <div className="h-full min-w-[50%] flex justify-items-center align-middle">
        <img src={require("@site/static/img/logo.png").default} />
      </div>
      <div className="h-full min-w-[50%] flex justify-items-center align-middle">
        <h1 className="text-8xl ">R4bbit</h1>
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
