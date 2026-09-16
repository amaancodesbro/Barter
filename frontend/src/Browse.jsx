import { useEffect, useState } from "react";
import ListingCard from "./components/ListingCard";

function Browse({ onSelectListing }) {
    //console.log("BROWSE COMPONENT LOADED");
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  useEffect(() => {
    fetch("http://localhost:3000/listings")
      .then((response) => response.json())
      .then((data) => {
//console.log("LISTINGS FROM BACKEND:", JSON.stringify(data, null, 2));
  setListings(data);
});
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
      <div className="browse-header">
        <p className="browse-kicker">[ MARKETPLACE ]</p>

        <h1>BROWSE ITEMS</h1>

        <p className="browse-description">
          FIND SOMETHING YOU WANT. OFFER SOMETHING YOU HAVE.
        </p>
      </div>

      <div className="browse-controls">
        <input
          type="text"
          placeholder="SEARCH ITEMS..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button onClick={() => setCategory("ALL")}>ALL</button>
        <button onClick={() => setCategory("TECH")}>TECH</button>
        <button onClick={() => setCategory("GAMING")}>GAMING</button>
        <button onClick={() => setCategory("FASHION")}>FASHION</button>
      </div>

      <div className="browse-grid">
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            onClick={() => onSelectListing(listing.id)}
            style={{ cursor: "pointer" }}

          >
            <ListingCard
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