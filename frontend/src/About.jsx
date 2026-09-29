import { Link } from "react-router-dom";

function About() {
  return (
    <section className="about-page">
      <div className="about-hero">
        <p>[ THE BARTER WORLD ]</p>

        <h1>
          TRADE<br />
          DIFFERENTLY.
        </h1>

        <p>
          BARTER IS A COMMUNITY MARKETPLACE<br />
          BUILT AROUND VALUE, NOT MONEY.
        </p>
      </div>

      <div className="about-content">
        <div className="about-block">
          <span>01</span>
          <h2>WHAT IS BARTER?</h2>
          <p>
            Barter is a marketplace where people exchange things they already
            own instead of buying everything with money.
          </p>
        </div>

        <div className="about-block">
          <span>02</span>
          <h2>WHY BARTER?</h2>
          <p>
            Sometimes the thing you want is sitting in someone else's hands,
            while the thing they want is sitting in yours.
          </p>
        </div>

        <div className="about-block">
          <span>03</span>
          <h2>THE IDEA</h2>
          <p>
            Turn unused value into something useful. Find an item, make an
            offer, and let the owners decide whether the trade works.
          </p>
        </div>
      </div>

      <div className="about-cta">
        <h2>READY TO FIND YOUR NEXT TRADE?</h2>

        <Link to="/browse">
          [ ENTER THE MARKETPLACE → ]
        </Link>
      </div>
    </section>
  );
}

export default About;