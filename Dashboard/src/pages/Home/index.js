import React from "react";

function Home() {
    return (
      <>
        <section className="content">
            <br/>
          <h2>Welcome to Esports Compare</h2>
          <p>
            Have you ever wanted to share your settings with a friend and have to type it all out? consider that a thing of the past!
            With our gaming config application here you can create an account, upload your data and then share your profile link with your friends. 
          </p>

          <br/>
          <h3>Upcoming features:</h3>
          <ul>
                <li>Discord bot</li>
                <li>Config upload</li>
                <li>Multigame support</li>
                <li>Mobile app</li>
                <li>Demo processing for highlights and stats</li>
                <li>Team badges for affiliation</li>
                <li>Desktop and chrome extensions</li>
                <li>Full peripheral page with a rating system.</li>
          </ul>
          <br/>
        </section>

        <section>
          <h3>About</h3>
          <p>
            This is my "personal" project to help me learn more about web development and to help refine my skills for my job in the industry.
            All code can be seen on my github page @jordanhsheldon
          </p>
        </section>

        <section>
          <h3>Bot - work in progress</h3>
          <p>
            The bot feature will allow users to link their profile to their discord account and then use commands to pull up their settings and share them with friends.
          </p>
        </section>

        <section>
          <h3>Mobile app - work in progress</h3>
          <p>
            This feature will allow users to upload their settings from their phone and share them with friends.
          </p>
        </section>

        <section>
          <h3>Config upload - work in progress</h3>
          <p>
            This feature will allow users to upload their config files and have them parsed and displayed on their profile page.
          </p>
        </section>

        <section>
          <h3>Desktop and chrome extensions - work in progress</h3>
          <p>
            This feature will allow users to upload their settings from their desktop and share them with friends.
          </p>
        </section>
        <section>
          <h3>Multigame support - work in progress</h3>
          <p>
            This feature will allow users to add other games such as Valorant, Overwatch, and more, to save their settings and share them with friends, as well as 
            any other configuration requirements for the game
          </p>
        </section>

      </>
    );
  }
  
  export default Home;