import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
function ListingDetails({ token }) {
  const { id } = useParams();
const navigate = useNavigate();
const [listing, setListing] = useState(null);
  const [showOffer, setShowOffer] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [myItems, setMyItems] = useState([]);
  const currentUserId = token
  ? Number(JSON.parse(atob(token.split(".")[1])).id)
  : null;



  useEffect(() => {
     fetch(`http://localhost:3000/listings/${id}`)
      .then((response) => response.json())
      .then((data) => setListing(data));
}, [id]);
  
  useEffect(() => {
      if (!token) return;
      
     const payload = JSON.parse(atob(token.split(".")[1]));
const userId = Number(payload.id);

fetch("http://localhost:3000/listings")
  .then((response) => response.json())
  .then((data) => {
    const myListings = data.filter(
      (listing) => Number(listing.userId) === userId
    );

    setMyItems(myListings);
  });
    }, [token]);
    
    if (!listing) {
      return <div className="listing-loading">LOADING...</div>;
    }

  return (
    <section className="listing-details">

     <button
  className="back-button"
  onClick={() => navigate("/browse")}
>
  ← BACK TO MARKETPLACE
</button>
      {!showOffer ? (
        <div className="details-card">

          <div className="details-image">
            {listing.image ? (
              <img src={listing.image} alt={listing.item} />
            ) : (
              "📦"
            )}
          </div>

          <div className="details-info">

            <p className="details-category">
              [ {listing.category} ]
            </p>

            <h1>{listing.item}</h1>

            <div className="details-condition">
              {listing.condition}
            </div>

            <div className="details-row">
              <span>OWNER</span>
              <strong>{listing.owner}</strong>
            </div>

            <div className="details-row">
              <span>STATUS</span>
              <strong>{listing.status}</strong>
            </div>
{listing.status === "available" &&
  listing.userId !== currentUserId && (
    <button
      className="swap-button"
      onClick={() => setShowOffer(true)}
    >
      ⇄ START A BARTER
    </button>
  )}

          </div>

        </div>
      ) : (
        <div className="swap-screen">

          <div className="swap-heading">
            <p>[ PROPOSE A TRADE ]</p>
            <h1>YOUR ITEM ⇄ THEIR ITEM</h1>
          </div>

          <div className="swap-arena">

            {/* YOUR ITEM */}

            <div
              className={`swap-item ${
                selectedOffer ? "selected" : ""
              }`}
            >
              <p className="swap-label">
                YOU OFFER
              </p>

              <div className="swap-image">

                {selectedOffer?.image ? (
                  <img
                    src={selectedOffer.image}
                    alt={selectedOffer.item}
                  />
                ) : (
                  "📦"
                )}

              </div>

              <h2>
                {selectedOffer
                  ? selectedOffer.item
                  : "SELECT YOUR ITEM"}
              </h2>

              {!selectedOffer && (
                <div className="offer-options">

                  {myItems.map((item) => (
                    <button
                      key={item.item}
                      onClick={() => setSelectedOffer(item)}
                    >
                      {item.item}
                    </button>
                  ))}

                </div>
              )}

            </div>

            {/* BIG SWAP ARROW */}

            <div className="swap-arrow">
              ⇄
            </div>

            {/* THEIR ITEM */}

            <div className="swap-item">

              <p className="swap-label">
                YOU WANT
              </p>

              <div className="swap-image">

                {listing.image ? (
                  <img
                    src={`http://localhost:5173${listing.image}`}
                    alt={listing.item}
                  />
                ) : (
                  "📦"
                )}

              </div>

              <h2>
                {listing.item}
              </h2>

              <p className="swap-owner">
                OWNED BY {listing.owner}
              </p>

            </div>

          </div>

          <div className="swap-actions">

            <button
              className="swap-cancel"
              onClick={() => {
                setShowOffer(false);
                setSelectedOffer(null);
              }}
            >
              ← CANCEL
            </button>

           <button
  className="swap-send"
  disabled={!selectedOffer}
  onClick={async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/swap-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            listingId: listing.id,
            offeredItem: selectedOffer.item,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "FAILED TO SEND REQUEST.");
        return;
      }

      alert("SWAP REQUEST SENT!");
    } catch (error) {
      alert("SERVER CONNECTION FAILED.");
    }
  }}
>
  SEND SWAP REQUEST →
</button>
          </div>

        </div>
      )}

    </section>
  );
}

export default ListingDetails;