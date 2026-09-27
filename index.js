require("dotenv").config();


const express = require ("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/users");
const Listing = require("./models/listings");
const SwapRequest = require("./models/swapRequests");
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => console.log("MongoDB connection failed:", error));

const jwt = require("jsonwebtoken");
const authenticateToken = require("./auth");

const app = express();
app.use(cors());
app.use(express.json());



//const listings = [
//    {
//        id:1,
//        item: "iPhone 13",
//       owner: "Amaan",
//        condition: "Good"
//    },
//    {
//        id:2,
//        item: "MacBook Air",
//        owner: "Rahul",
//        condition: "Excellent"
//    }
//];
//
//const user = [
//    {
//        name:"amaan",
//        age:22
//    },
//    {
//        name:"rahul",
//        age:23
//    }
//];
app.get("/user", async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        console.error("Failed to fetch users:", error);

        res.status(500).json({
            message: "Failed to fetch users"
        });
    }
});

app.get("/",(req,res) => {
    res.send( "welcome to my api");
});

app.get("/listings", async (req, res) => {
    try {
        const listings = await Listing.find();
        res.json(listings);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch listings"
        });
    }
});

app.get("/listings/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const listing = await Listing.findOne({ id: id });

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found"
            });
        }

        res.json(listing);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch listing"
        });
    }
});
app.put("/listings/:id", authenticateToken, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const userId = req.user.id;

        const listing = await Listing.findOne({ id: id });

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found"
            });
        }

        if (listing.userId !== userId) {
            return res.status(403).json({
                message: "You are not allowed to update this listing"
            });
        }

        const updatedListing = await Listing.findOneAndUpdate(
            { id: id },
            {
                ...req.body,
                id: listing.id,
                userId: listing.userId,
                owner: listing.owner,
                status: listing.status
            },
            { new: true, runValidators: true }
        );

        res.json(updatedListing);

    } catch (error) {
        res.status(500).json({
            message: "Failed to update listing"
        });
    }
});
app.delete("/listings/:id", authenticateToken, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const userId = req.user.id;

        const listing = await Listing.findOne({ id: id });

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found"
            });
        }

        if (listing.userId !== userId) {
            return res.status(403).json({
                message: "You are not allowed to delete this listing"
            });
        }

        await Listing.deleteOne({ id: id });

        res.json({ message: "Listing deleted" });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete listing"
        });
    }
});

app.post("/listings", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findOne({ id: userId });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const latestListing = await Listing.findOne().sort({ id: -1 });
        const newId = latestListing ? latestListing.id + 1 : 1;

        const newListing = {
            ...req.body,
            id: newId,
            userId: userId,
            owner: user.name,
            status: "available"
        };

        if (!newListing.item || !newListing.condition) {
            return res.status(400).json({
                message: "Item and condition are required"
            });
        }

        const savedListing = await Listing.create(newListing);

        res.json(savedListing);

    } catch (error) {
        console.error("Failed to create listing:", error);

        res.status(500).json({
            message: "Failed to create listing"
        });
    }
});

app.post("/users/register", async (req, res) => {
    try {
        const newUser = req.body;

        if (!newUser.name || !newUser.email || !newUser.password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        const existingUser = await User.findOne({
            email: newUser.email
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        const latestUser = await User.findOne().sort({ id: -1 });
        const newId = latestUser ? latestUser.id + 1 : 1;

        const savedUser = await User.create({
            ...newUser,
            id: newId
        });

        res.json(savedUser);

    } catch (error) {
        console.error("Registration failed:", error);

        res.status(500).json({
            message: "Failed to register user"
        });
    }
});
app.post("/users/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET
        );

        res.json({
            message: "Login successful",
            token: token
        });

    } catch (error) {
        console.error("Login failed:", error);

        res.status(500).json({
            message: "Failed to login"
        });
    }
});
app.post("/swap-requests", authenticateToken, async (req, res) => {
    try {
        const { listingId, offeredItem } = req.body;

        if (!listingId || !offeredItem) {
            return res.status(400).json({
                message: "Listing and offered item are required"
            });
        }

        const senderId = req.user.id;
        const parsedListingId = parseInt(listingId);

        const listing = await Listing.findOne({ id: parsedListingId });

        if (!listing) {
            return res.status(404).json({
                message: "Listing not found"
            });
        }

        if (listing.status === "swapped") {
            return res.status(400).json({
                message: "This listing has already been swapped"
            });
        }

        const receiverId = listing.userId;

        const existingRequest = await SwapRequest.findOne({
            senderId: senderId,
            listingId: parsedListingId,
            status: "pending"
        });

        if (existingRequest) {
            return res.status(400).json({
                message: "You already have a pending request for this listing"
            });
        }

        if (senderId === receiverId) {
            return res.status(400).json({
                message: "You cannot request your own listing"
            });
        }

        const latestRequest = await SwapRequest.findOne().sort({ id: -1 });
        const newId = latestRequest ? latestRequest.id + 1 : 1;

        const newRequest = await SwapRequest.create({
            id: newId,
            senderId,
            receiverId,
            listingId: parsedListingId,
            offeredItem,
            status: "pending"
        });

        res.json(newRequest);

    } catch (error) {
        console.error("Failed to create swap request:", error);

        res.status(500).json({
            message: "Failed to create swap request"
        });
    }
});

app.get("/swap-requests", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const userRequests = await SwapRequest.find({
            $or: [
                { receiverId: userId },
                { senderId: userId }
            ]
        });

        res.json(userRequests);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch swap requests"
        });
    }
});
app.put("/swap-requests/:id", authenticateToken, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const userId = req.user.id;
        const { status } = req.body;

        const request = await SwapRequest.findOne({ id: id });

        if (!request) {
            return res.status(404).json({
                message: "Swap request not found"
            });
        }

        if (request.status !== "pending") {
            return res.status(400).json({
                message: "This request has already been decided"
            });
        }

        if (request.receiverId !== userId) {
            return res.status(403).json({
                message: "You are not allowed to update this request"
            });
        }

        if (status !== "accepted" && status !== "rejected") {
            return res.status(400).json({
                message: "Status must be accepted or rejected"
            });
        }

        request.status = status;
        await request.save();

        if (status === "accepted") {
            const listing = await Listing.findOne({
                id: request.listingId
            });

            if (listing) {
                listing.status = "swapped";
                await listing.save();
            }
        }

        res.json(request);

    } catch (error) {
        console.error("Failed to update swap request:", error);

        res.status(500).json({
            message: "Failed to update swap request"
        });
    }
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

//app.get("/about",(req,res) => {
//  res.send("welcome to about page!!!");
//});

//app.get("/contact",(req,res) => {
 //   res.send("this is the contact page!!!");
//});
//app.get("/Profile/:username",(req,res) => {
//    res.send(`welcome ${req.params.username}`);
//});
//app.listen(3000, () => {
//    console.log("Server is running on port 3000");
//});

