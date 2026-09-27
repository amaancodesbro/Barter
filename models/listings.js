const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  id: Number,
  item: String,
  owner: String,
  userId: Number,
  condition: String,
  category: String,
  image: String,
  status: String
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;