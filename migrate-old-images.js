require("dotenv").config();

const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const path = require("path");

const Listing = require("./models/listings");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const migrations = [
  {
    id: 16,
    images: [
      "1790675899605-283288276.jpeg",
      "1790675899683-889005073.jpeg"
    ]
  },
  {
    id: 17,
    images: [
      "1790757400585-845094700.jpeg",
      "1790757400656-609931254.jpeg"
    ]
  },
  {
    id: 18,
    images: [
      "1791016919895-894110453.jpeg",
      "1791016920016-61978357.jpeg"
    ]
  }
];

async function migrateImages() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected.");

    for (const migration of migrations) {
      const listing = await Listing.findOne({ id: migration.id });

      if (!listing) {
        console.log(`Listing ${migration.id} not found. Skipping.`);
        continue;
      }

      console.log(`\nMigrating listing ${migration.id}: ${listing.item}`);

      const cloudinaryUrls = [];

      for (const filename of migration.images) {
        const filePath = path.join(__dirname, "uploads", filename);

        console.log(`Uploading ${filename}...`);

        const result = await cloudinary.uploader.upload(filePath, {
          folder: "barter-listings"
        });

        cloudinaryUrls.push(result.secure_url);

        console.log(`Uploaded successfully.`);
      }

      listing.images = cloudinaryUrls;
      await listing.save();

      console.log(`Listing ${migration.id} updated successfully.`);
    }

    console.log("\nMigration complete.");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

migrateImages();