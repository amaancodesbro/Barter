import { useState } from "react";
import { useNavigate } from "react-router-dom";
function CreateListing({ token, onCreated }) {
    const navigate = useNavigate();
  const [item, setItem] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  const [condition, setCondition] = useState("Excellent");
  const [category, setCategory] = useState("TECH");
  const [image, setImage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("CREATING LISTING...");

    try {
       const formData = new FormData();

     formData.append("item", item);
     formData.append("condition", condition);
     formData.append("category", category);

     selectedImages.forEach((file) => {
     formData.append("images", file);
     });

      const response = await fetch(`${API_URL}/listings`, {
      method: "POST",
      headers: {
      Authorization: `Bearer ${token}`,
     },
     body: formData,
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
      setSelectedImages([]); 
if (onCreated) {
  onCreated();
}    } catch (error) {
      setMessage("SERVER CONNECTION FAILED.");
    }
  };

  return (
    <section className="create-listing-page">
        <button
  className="page-back-button"
  onClick={() => navigate("/")}
>
  ← BACK TO HOME
</button>
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

       <div className="image-upload">
  <input
    id="listing-images"
    className="image-upload-input"
    type="file"
    accept="image/*"
    multiple
   onChange={(event) => {
  const newFiles = Array.from(event.target.files);

  setSelectedImages((currentImages) => [
    ...currentImages,
    ...newFiles
  ]);

  event.target.value = "";
}}
  />

  <label htmlFor="listing-images" className="image-upload-button">
    + ADD PHOTOS
  </label>

  <p className="image-upload-hint">
    SELECT MULTIPLE IMAGES FROM YOUR DEVICE
  </p>
</div>
<div className="image-preview-list">
  {selectedImages.map((file, index) => (
    <div className="image-preview" key={`${file.name}-${index}`}>
      <img
        src={URL.createObjectURL(file)}
        alt={`Selected listing ${index + 1}`}
      />

      <button
        type="button"
        className="image-preview-remove"
        onClick={() => {
          setSelectedImages((currentImages) =>
            currentImages.filter((_, imageIndex) => imageIndex !== index)
          );
        }}
        aria-label={`Remove ${file.name}`}
      >
        ×
      </button>

      <p>{file.name}</p>
    </div>
  ))}
</div>

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
