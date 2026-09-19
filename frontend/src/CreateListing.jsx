import { useState } from "react";

function CreateListing({ token, onCreated }) {
  const [item, setItem] = useState("");
  const [condition, setCondition] = useState("Excellent");
  const [category, setCategory] = useState("TECH");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("CREATING LISTING...");

    try {
      const response = await fetch("http://localhost:3000/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          item,
          condition,
          category,
          image,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "FAILED TO CREATE LISTING.");
        return;
      }

      setMessage("LISTING CREATED SUCCESSFULLY.");

      setItem("");
      setCondition("Excellent");
      setCategory("TECH");
      setImage("");

if (onCreated) {
  onCreated();
}    } catch (error) {
      setMessage("SERVER CONNECTION FAILED.");
    }
  };

  return (
    <section className="create-listing-page">
      <div className="create-listing-card">
        <p>[ MARKETPLACE ENTRY ]</p>
        <h1>CREATE LISTING</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ITEM NAME"
            value={item}
            onChange={(event) => setItem(event.target.value)}
            required
          />

          <select
            value={condition}
            onChange={(event) => setCondition(event.target.value)}
          >
            <option value="Excellent">EXCELLENT</option>
            <option value="Good">GOOD</option>
            <option value="Used">USED</option>
          </select>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="TECH">TECH</option>
            <option value="GAMING">GAMING</option>
            <option value="FASHION">FASHION</option>
            <option value="OTHER">OTHER</option>
          </select>

          <input
            type="text"
            placeholder="IMAGE PATH — /assets/item.png"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />

          <button type="submit">
            CREATE LISTING →
          </button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </section>
  );
}

export default CreateListing;
