import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./App.css";
import ListingCard from "./components/ListingCard";


function App() {
 const [listings, setListings] = useState([]);
 const navigate = useNavigate();

const featuredIds = [1, 2, 3, 4, 5, 16];
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
 <Link to="/" className="logo">
  BARTER<span>™</span>
</Link>

  <div className="nav-links">
    <Link to="/">[ HOME ]</Link>
    <Link to="/browse">[ BROWSE ]</Link>
    <Link to="/how-it-works">[ HOW IT WORKS ]</Link>
    <Link to="/about">[ ABOUT ]</Link>
  </div>

  <div className="nav-search">
    <span>⌕</span>
<input
  type="text"
  placeholder="SEARCH ITEMS..."
  onChange={(event) => setSearch(event.target.value)}
  onKeyDown={(event) => {
    if (event.key === "Enter" && event.target.value.trim()) {
      navigate(`/browse?search=${encodeURIComponent(event.target.value.trim())}`);
    }
  }}
/>
    <span className="search-shortcut">⌘ K</span>
  </div>

  <div className="nav-actions">
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

    <Link className="nav-button nav-create" to="/create">
      + CREATE LISTING
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
<Link to="/browse">[ VIEW ALL → ]</Link>
        </div>

       <div className="product-grid">
     {listings.filter((listing) => featuredIds.includes(listing.id)).map((listing) => (
<ListingCard
  key={listing.id}
  {...listing}
  image={
    listing.images?.length
      ? `http://localhost:3000${listing.images[0]}`
      : listing.image
  }
  onClick={() => navigate(`/listing/${listing.id}`)}
/>
  ))}
</div>
      </section>





      {/* SUGGESTED */}
      <section className="products-section">

        <div className="section-title">
          <h2>SUGGESTED FOR YOU</h2>
          <div></div>
          <Link to="/browse">[ VIEW ALL → ]</Link>
        </div>

        <div className="product-grid">

           {listings.filter((listing) => !featuredIds.includes(listing.id)).map((listing) => (
        <ListingCard
        key={listing.id}
        {...listing}
        onClick={() => navigate(`/listing/${listing.id}`)}
      />
    ))}
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