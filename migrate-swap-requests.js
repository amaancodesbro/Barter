const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();

const SwapRequest = require("./models/swapRequests");

async function migrateSwapRequests() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        const swapRequests = JSON.parse(
            fs.readFileSync("./swapRequests.json", "utf8")
        );

        const operations = swapRequests.map(request => ({
            replaceOne: {
                filter: { id: request.id },
                replacement: request,
                upsert: true
            }
        }));

        if (operations.length > 0) {
            await SwapRequest.bulkWrite(operations);
        }

        const count = await SwapRequest.countDocuments();

        console.log(`Migration complete. MongoDB has ${count} swap requests.`);
    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        await mongoose.disconnect();
    }
}

migrateSwapRequests();