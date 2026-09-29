import { Link } from "react-router-dom";

function HowItWorks() {
  return (
    <section className="how-it-works-page">
      <div className="how-it-works-hero">
        <p>[ THE BARTER SYSTEM ]</p>

        <h1>
          HOW<br />
          BARTER<br />
          WORKS.
        </h1>

        <p>
          NO MONEY.<br />
          JUST VALUE.
        </p>
      </div>

      <div className="how-it-works-steps">
        <div className="how-step">
          <span>01</span>
          <h2>LIST YOUR ITEM</h2>
          <p>
            Put something you own into the marketplace and tell the world
            what you're willing to trade.
          </p>
        </div>

        <div className="how-step">
          <span>02</span>
          <h2>FIND SOMETHING</h2>
          <p>
            Search the marketplace for an item that you actually want.
          </p>
        </div>

        <div className="how-step">
          <span>03</span>
          <h2>MAKE AN OFFER</h2>
          <p>
            Choose one of your own listings and send it as your barter offer.
          </p>
        </div>

        <div className="how-step">
          <span>04</span>
          <h2>WAIT FOR A DECISION</h2>
          <p>
            The owner can review your offer and accept or reject the trade.
          </p>
        </div>

        <div className="how-step">
          <span>05</span>
          <h2>MAKE THE EXCHANGE</h2>
          <p>
            Once a trade is accepted, the listing is marked as swapped.
          </p>
        </div>
      </div>

      <div className="how-it-works-cta">
        <h2>READY TO TRADE DIFFERENTLY?</h2>

        <Link to="/browse">
          [ START BARTERING → ]
        </Link>
      </div>
    </section>
  );
}

export default HowItWorks;