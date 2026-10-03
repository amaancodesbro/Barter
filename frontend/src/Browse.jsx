import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
import ListingCard from "./components/ListingCard";

function Browse() {
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [listings, setListings] = useState([]);
const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState("ALL");


  useEffect(() => {
   fetch(`${API_URL}/listings`)
      .then((response) => response.json())
      .then((data) => {
        setListings(data);
      });
  }, []);
  useEffect(() => {
  searchInputRef.current?.focus();
}, []);

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = listing.item
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "ALL" || listing.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="browse-page">
        <button
  className="browse-back-button"
  onClick={() => navigate("/")}
>
  ← BACK TO HOME
</button>


<div className="browse-header"></div>
      <div className="browse-header">

        <p className="browse-kicker">[ MARKETPLACE ]</p>

<h1>SEARCH ITEMS</h1>
        <p className="browse-description">
          FIND SOMETHING YOU WANT. OFFER SOMETHING YOU HAVE.
        </p>
      </div>
   

      <div className="browse-controls">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="SEARCH ITEMS..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button className={category === "ALL" ? "active" : ""}
          onClick={() => setCategory("ALL")}>ALL </button>   
        <button onClick={() => setCategory("TECH")}>TECH</button>
        <button onClick={() => setCategory("GAMING")}>GAMING</button>
        <button onClick={() => setCategory("FASHION")}>FASHION</button>
      </div>

      <div className="browse-grid">
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            onClick={() => navigate(`/listing/${listing.id}`)}
            style={{ cursor: "pointer" }}
          >
            <ListingCard
              item={listing.item}
              condition={listing.condition}
              category={listing.category}
              image={
                listing.images?.length
                ? `${API_URL}${listing.images[0]}`
                : listing.image
                }              tagClass={
                listing.condition === "Excellent"
                  ? "like-new"
                  : listing.condition === "Good"
                    ? "good"
                    : "used"
              }
            />
          </div>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <p className="no-results">NO ITEMS FOUND.</p>
      )}
    </section>
  );
}

export default Browse;