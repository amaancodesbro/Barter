import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SwapRequests({ token }) {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [requests, setRequests] = useState([]);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch(`${API_URL}/swap-requests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setRequests(data));

    fetch(`${API_URL}/listings`)
      .then((response) => response.json())
      .then((data) => setListings(data));
  }, [token]);

  const currentUserId = token
    ? JSON.parse(atob(token.split(".")[1])).id
    : null;

  const handleDecision = async (requestId, status) => {
    try {
      const response = await fetch(
       `${API_URL}/swap-requests/${requestId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "FAILED TO UPDATE REQUEST.");
        return;
      }

      setRequests((currentRequests) =>
        currentRequests.map((request) =>
          request.id === requestId
            ? { ...request, status: data.request?.status || status }
            : request
        )
      );
    } catch (error) {
      alert("SERVER CONNECTION FAILED.");
    }
  };

  return (
    <section className="swap-requests">
        <button
  className="page-back-button"
  onClick={() => navigate("/")}
>
  ← BACK TO HOME
</button>
      <div className="swap-requests-header">
        <p>[ TRADE ACTIVITY ]</p>

        <h1>SWAP REQUESTS</h1>

        <span>MANAGE YOUR ACTIVE BARTER REQUESTS.</span>
      </div>

      {requests.length === 0 ? (
        <div className="no-requests">
          NO SWAP REQUESTS.
        </div>
      ) : (
        <div className="swap-request-list">
          {requests.map((request) => {
            const isIncoming = request.receiverId === currentUserId;

            const wantedListing = listings.find(
              (listing) => listing.id === request.listingId
            );

            return (
              <div
                className="swap-request-card"
                key={request.id}
              >
                <div className="request-top">
                  <h2>REQUEST #{request.id}</h2>

                  <span
                    className={`request-status ${request.status}`}
                  >
                    {request.status.toUpperCase()}
                  </span>
                </div>

                <div className="request-info">
                  <div>
                    <span>ROLE</span>

                    <strong>
                      {isIncoming ? "INCOMING" : "OUTGOING"}
                    </strong>
                  </div>

                  <div>
                    <span>THEY OFFER</span>

                    <strong>
                      {request.offeredItem}
                    </strong>
                  </div>

                  <div>
                    <span>THEY WANT</span>

                    <strong>
                      {wantedListing
                        ? wantedListing.item
                        : "UNKNOWN ITEM"}
                    </strong>
                  </div>
                </div>

                {isIncoming && request.status === "pending" && (
                  <div className="request-actions">
                    <button
                      className="accept-request"
                      onClick={() =>
                        handleDecision(
                          request.id,
                          "accepted"
                        )
                      }
                    >
                      [ ACCEPT ]
                    </button>

                    <button
                      className="reject-request"
                      onClick={() =>
                        handleDecision(
                          request.id,
                          "rejected"
                        )
                      }
                    >
                      [ REJECT ]
                    </button>
                  </div>
                )}
                {request.status === "accepted" && request.contactPartner && (
  <div className="contact-partner">
    <h3>CONTACT SWAP PARTNER</h3>

    <p>
      Connect with {request.contactPartner.name} to arrange your exchange.
    </p>

    <div className="contact-buttons">
      {request.contactPartner.whatsapp && (
        <a
          className="contact-button whatsapp-button"
          href={`https://wa.me/${request.contactPartner.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          WHATSAPP
        </a>
      )}

      {request.contactPartner.phone && (
        <a
          className="contact-button phone-button"
          href={`tel:${request.contactPartner.phone}`}
        >
          CALL
        </a>
      )}

      {request.contactPartner.email && (
        <a
          className="contact-button email-button"
          href={`mailto:${request.contactPartner.email}`}
        >
          EMAIL
        </a>
      )}
    </div>
  </div>
)}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
  
}


export default SwapRequests;