"use client"

export default function Page() {
  return (
    <div className={"container"}>
        <title>configs</title>
        <meta name="description" content="Welcome to configs.cc - Home of Player Configurations" />
        <link rel="icon" href="/favicon.ico" />
        <main className={"main"}>
          <h1 className={"title"}>configs</h1>
          <p className={"description"}>Destination for your configurations</p>
          <p className={"details"}>
            Ever had your config get messed up or updated when you didn't want it to? 
            With Configs, you always have a backup of any configuration you upload.
            You can also check out other players configurations, check it out below!
          </p>
          <div className={"cta"}>
              <a href="/players" className={"ctaButton"}>See all configs</a>
          </div>
          <p className={"details"}>
            This is a project made by @jordanhsheldon on github.
          </p>
        </main>
    </div>
  );
}