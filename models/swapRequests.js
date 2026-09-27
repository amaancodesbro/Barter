const mongoose = require("mongoose");

const swapRequestSchema = new mongoose.Schema({
    id: Number,
    senderId: Number,
    receiverId: Number,
    listingId: Number,
    offeredItem: String,
    status: String
});

const SwapRequest = mongoose.model("SwapRequest", swapRequestSchema);

module.exports = SwapRequest;