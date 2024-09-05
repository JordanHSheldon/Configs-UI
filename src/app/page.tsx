"use client"

import Head from "next/head";
import Link from "next/link";

export default function Page() {
  return (
    <div className={"container"}>
      <Head>
        <title>configs.cc - Home</title>
        <meta name="description" content="Welcome to configs.cc - Home of Player Configurations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={"main"}>
        <h1 className={"title"}>configs</h1>
        <p className={"description"}>The ultimate destination for player configurations.</p>

        <p className={"details"}>
          Ever had your config get messed up or updated when you didn't want it to? 
          With Configs, you always have a backup of any configuration you upload.
          You can also check out other players configurations, check it out below!</p>
        <div className={"cta"}>
            <a href="/players" className={"ctaButton"}>Check out other players</a>
        </div>
        <br />
        <hr />
        <p className={"details"}>
          This is a project made by @jordanhsheldon on github.
        </p>
      </main>
    </div>
  );
}