const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    item: String,
    owner: String,
    condition: String
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;