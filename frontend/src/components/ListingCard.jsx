function ListingCard({
  item,
  condition,
  category,
  image,
  tagClass,
  onClick,
}) {
  return (
    <div
      className="product-card"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className="product-name">
        {item}
      </div>

      <div className="product-placeholder">
        {image ? (
          <img src={image} alt={item} />
        ) : (
          "📦"
        )}
      </div>

      <div className={`tag ${tagClass}`}>
        {condition}
      </div>

      <div className="card-bottom">
        BARTER™
      </div>

      <p>
        {category}
      </p>
    </div>
  );
}

export default ListingCard;