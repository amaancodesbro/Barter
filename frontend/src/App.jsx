import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import ListingCard from "./components/ListingCard";


function App() {
  const [listings, setListings] = useState([]);
  const [token, setToken] = useState(
  localStorage.getItem("token")
);

  useEffect(() => {
    fetch("http://localhost:3000/listings")
      .then((response) => response.json())
      .then((data) => setListings(data));
  }, []);



return (
  <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          BARTER<span>™</span>
        </div>

        <div className="nav-links">
      <Link to="/">[ HOME ]</Link>
      <Link to="/browse">[ BROWSE ]</Link>
      <Link to="#">[ HOW IT WORKS ]</Link>
      <Link to="#">[ ABOUT ]</Link>
        </div>

        <div className="nav-actions">
         <Link to="/browse" className="search-box">
           🔍 SEARCH ITEMS...
         </Link>

{token ? (
<button
  onClick={() => {
    localStorage.removeItem("token");
    setToken(null);
  }}
>
  [ LOG OUT ]
</button>
) : (
   <Link className="nav-button" to="/login">
  [ LOGIN ]
</Link>
)}
  

<Link className="nav-button" to="/swaps">
  [ SWAP REQUESTS ]
</Link>

<Link className="nav-button" to="/create">
  [ CREATE LISTING ]
</Link>

<Link className="nav-button" to="/register">
  [ REGISTER ]
</Link>    
   </div>
      </nav>


      {/* HERO */}
      <section className="hero">
        <div className="voxel voxel-1"></div>
        <div className="voxel voxel-2"></div>
        <div className="voxel voxel-3"></div>
        <div className="voxel voxel-4"></div>
        <div className="voxel voxel-5"></div>

        <div className="hero-text">
          <p className="small-text">
            NO MONEY.<br />
            JUST VALUE.
          </p>

          <h1>
            BARTER<br />
            TRADE<br />
            DIFFERENTLY.
          </h1>

          <p className="hero-description">
            REAL PEOPLE.<br />
            REAL ITEMS.<br />
            A MORE INTERESTING WORLD.
          </p>

          <Link to="/browse" className="browse-button">
         [ BROWSE ITEMS → ]
          </Link>
        </div>


        {/* 3D HERO BOX */}
        <div className="hero-box">
          <div className="crate-side"></div>
          <div className="crate-bottom"></div>
          <div className="crate-bolt bolt-1"></div>
          <div className="crate-bolt bolt-2"></div>
          <div className="crate-bolt bolt-3"></div>
          <div className="crate-bolt bolt-4"></div>

          <div className="box-label">
            SNEAKERS
          </div>
          

          <div className="product-image">
            <img src="/assets/hero-sneaker.png" alt="Sneakers" />
           </div>

          <div className="condition-tag">
            USED<br />
            .GOOD COND.
          </div>

          <div className="box-bottom">
            <span>◉ SWAP?</span>
            <span>BARTER™</span>
          </div>

        </div>

      </section>


      {/* FEATURED ITEMS */}
      <section className="products-section">

        <div className="section-title">
          <h2>FEATURED ITEMS</h2>
          <div></div>
          <span>[ VIEW ALL → ]</span>
        </div>

       <div className="product-grid">
  {listings.map((listing) => (
    <ListingCard
      key={listing.id}
      item={listing.item}
      condition={listing.condition}
      category={listing.category}
      image={listing.image}
      tagClass={
        listing.condition === "Excellent"
          ? "like-new"
          : listing.condition === "Good"
            ? "good"
            : "used"
      }
    />
  ))}
</div>
      </section>





      {/* SUGGESTED */}
      <section className="products-section">

        <div className="section-title">
          <h2>SUGGESTED FOR YOU</h2>
          <div></div>
          <span>[ VIEW ALL → ]</span>
        </div>

        <div className="product-grid">

          <div className="product-card">
            <div className="product-name">LEGO SET</div>
            <div className="product-placeholder">🚀</div>
            <div className="tag used">USED</div>
            <div className="card-bottom">BARTER™</div>
            <p>COLLECTIBLES</p>
          </div>

          <div className="product-card">
            <div className="product-name">FUJIFILM CAMERA</div>
            <div className="product-placeholder">📷</div>
            <div className="tag good">GOOD COND.</div>
            <div className="card-bottom">BARTER™</div>
            <p>PHOTOGRAPHY</p>
          </div>

          <div className="product-card">
            <div className="product-name">HOODIE</div>
            <div className="product-placeholder">👕</div>
            <div className="tag like-new">LIKE NEW</div>
            <div className="card-bottom">BARTER™</div>
            <p>FASHION</p>
          </div>

          <div className="product-card">
            <div className="product-name">MECHANICAL KB</div>
            <div className="product-placeholder">⌨️</div>
            <div className="tag used">USED</div>
            <div className="card-bottom">BARTER™</div>
            <p>TECH</p>
          </div>

          <div className="product-card">
            <div className="product-name">SKATEBOARD</div>
            <div className="product-placeholder">🛹</div>
            <div className="tag good">GOOD COND.</div>
            <div className="card-bottom">BARTER™</div>
            <p>SPORTS</p>
          </div>

          <div className="product-card">
            <div className="product-name">WATCH</div>
            <div className="product-placeholder">⌚</div>
            <div className="tag like-new">LIKE NEW</div>
            <div className="card-bottom">BARTER™</div>
            <p>ACCESSORIES</p>
          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer>
        <div>
          ◉ &nbsp; A COMMUNITY MARKETPLACE FOR A MORE INTERESTING TOMORROW.
        </div>

        <div>
          PRIVACY &nbsp;&nbsp;&nbsp; TERMS &nbsp;&nbsp;&nbsp; CONTACT
        </div>
      </footer>

    </div>
  );
}

export default App;