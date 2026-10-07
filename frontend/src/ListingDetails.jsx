import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
function ListingDetails({ token }) {
  const { id } = useParams();
const navigate = useNavigate();
const API_URL = import.meta.env.VITE_API_URL;
const [listing, setListing] = useState(null);
const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showOffer, setShowOffer] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [myItems, setMyItems] = useState([]);
  const currentUserId = token
  ? Number(JSON.parse(atob(token.split(".")[1])).id)
  : null;



  useEffect(() => {
    fetch(`${API_URL}/listings/${id}`)
      .then((response) => response.json())
      .then((data) => setListing(data));
}, [id]);
  
  useEffect(() => {
      if (!token) return;
      
     const payload = JSON.parse(atob(token.split(".")[1]));
const userId = Number(payload.id);

fetch(`${API_URL}/listings`)
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
    const galleryImages = listing.images?.length
  ? listing.images.map((imagePath) =>
      imagePath.startsWith("http")
        ? imagePath
        : `${API_URL}${imagePath}`
    )
  : listing.image
    ? [listing.image]
    : [];

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
  {galleryImages.length > 0 ? (
    <>
      <img
        src={galleryImages[currentImageIndex]}
        alt={`${listing.item} ${currentImageIndex + 1}`}
      />

      {galleryImages.length > 1 && (
        <>
          <button
            type="button"
            className="gallery-arrow gallery-prev"
            onClick={() =>
              setCurrentImageIndex((current) =>
                current === 0 ? galleryImages.length - 1 : current - 1
              )
            }
          >
            ‹
          </button>

          <button
            type="button"
            className="gallery-arrow gallery-next"
            onClick={() =>
              setCurrentImageIndex((current) =>
                current === galleryImages.length - 1 ? 0 : current + 1
              )
            }
          >
            ›
          </button>

          <span className="gallery-counter">
            {currentImageIndex + 1} / {galleryImages.length}
          </span>
        </>
      )}
    </>
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
  {(selectedOffer?.images?.length || selectedOffer?.image) ? (
    <img
 src={
  selectedOffer.images?.length
    ? selectedOffer.images[0].startsWith("http")
      ? selectedOffer.images[0]
      : `${API_URL}${selectedOffer.images[0]}`
    : selectedOffer.image?.startsWith("http")
      ? selectedOffer.image
      : selectedOffer.image?.startsWith("/uploads/")
        ? `${API_URL}${selectedOffer.image}`
        : selectedOffer.image
}
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

{myItems.filter((item) => item.status?.toLowerCase() !== "swapped").map((item) => (
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
  {galleryImages.length > 0 ? (
    <img
      src={galleryImages[0]}
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
      `${API_URL}/swap-requests`,
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