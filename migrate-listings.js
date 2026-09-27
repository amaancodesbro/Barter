require("dotenv").config();

const fs = require("fs");
const mongoose = require("mongoose");
const Listing = require("./models/listings");

async function migrateListings() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const listings = JSON.parse(
      fs.readFileSync("./listings-backup.json", "utf-8")
    );

    const operations = listings.map((listing) => ({
      replaceOne: {
        filter: { id: listing.id },
        replacement: listing,
        upsert: true
      }
    }));

    const result = await Listing.bulkWrite(operations);

    console.log("Listings migration completed.");
    console.log("Listings in backup:", listings.length);
    console.log("Records inserted:", result.upsertedCount);
    console.log("Records replaced:", result.modifiedCount);
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

migrateListings();