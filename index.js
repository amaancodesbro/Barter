require("dotenv").config();
const fs = require("fs");
const listings = JSON.parse(fs.readFileSync("./listings.json"));
const users = JSON.parse(fs.readFileSync("./users.json"));
const swapRequests = JSON.parse(fs.readFileSync("./swapRequests.json"));

const express = require ("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./auth");
const Listing = require("./models/listings");

const app = express();
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

app.get("/user",(req,res) => {
    res.json(users);
});

app.get("/",(req,res) => {
    res.send( "welcome to my api");
});

app.get("/listings",(req,res) => {
    res.json(listings);
});

app.get("/listings/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const listing = listings.find(listing => listing.id === id);
    res.json(listing);
});

app.put("/listings/:id", authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    const index = listings.findIndex(listing => listing.id === id);
    const userId = req.user.id;
    if (index === -1) {
        return res.status(404).json({
            message: "Listing not found"
        });
    }
    const listing = listings[index];

    if (listing.userId !== userId) {
        return res.status(403).json({
            message: "You are not allowed to update this listing"
        });
    }
    
    const updatedListing = {
        ...req.body,
        id: listings[index].id,
        userId: listings[index].userId
};
    listings[index] = updatedListing;
    fs.writeFileSync("./listings.json", JSON.stringify(listings, null, 2));
    res.json(updatedListing);

});
app.delete("/listings/:id", authenticateToken, (req,res) => {
    const id = parseInt(req.params.id);
    const userId = req.user.id;
    const listing = listings.find(listing => listing.id === id);
    if (listing.userId !== userId) {
        return res.sendStatus(403);
}
    const index = listings.findIndex(listing => listing.id === id);
    listings.splice(index, 1);
    fs.writeFileSync("./listings.json", JSON.stringify(listings, null, 2));

    res.json({ message: "Listing deleted" });


});

app.post("/listings", authenticateToken, (req,res) => {
    const userId = req.user.id;
    const user = users.find(user => user.id === userId);
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    const newId = listings.length > 0
        ? Math.max(...listings.map(listing => listing.id)) + 1
        : 1;
    const newListing = {
        ...req.body,
        id: newId,
        userId: userId,
        owner: user.name

    };
    if (!newListing.item || !newListing.owner || !newListing.condition) {
        return res.status(400).json({
            message: "Item, owner and condition are required"
        });
    }
    listings.push(newListing);
    fs.writeFileSync("./listings.json", JSON.stringify(listings, null, 2));
    res.json(newListing);

});

app.post("/users/register", (req, res) => {
    const newUser = req.body;
    const existingUser = users.find(user => user.email === newUser.email);

    if (existingUser) {
        return res.status(400).json({
            message: "Email already registered"
        });
    }
    const newId = users.length > 0
        ? Math.max(...users.map(user => user.id)) + 1
        : 1;
    if (!newUser.name || !newUser.email || !newUser.password) {
        return res.status(400).json({
            message: "Name, email and password are required"
        });
    }
    newUser.id = newId;
    
    users.push(newUser);
    fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
    res.json(newUser);

});

app.post("/users/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    if (user.password !== password) {
        return res.status(401).json({ message: "Invalid email or password" });
    } 


    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ message: "Login successful", token: token });
});

app.post("/swap-requests",authenticateToken, (req, res) => {
    const { listingId, offeredItem } = req.body;
    if (!listingId || !offeredItem) {
        return res.status(400).json({
            message: "Listing and offered item are required"
        });
    }
    const senderId = req.user.id;
    const listing = listings.find(listing => listing.id === listingId);
    if (!listing) {
        return res.status(404).json({
            message: "Listing not found"
        });
    }
    const receiverId = listing.userId;
    const existingRequest = swapRequests.find(
    request => request.senderId === senderId &&
               request.listingId === listingId &&
               request.status === "pending"
    );
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
    const newRequest = {
        id: swapRequests.length + 1,
        senderId,
        receiverId,
        listingId,
        offeredItem,
        status: "pending"
    };
    swapRequests.push(newRequest);
    fs.writeFileSync("./swapRequests.json", JSON.stringify(swapRequests, null, 2));
    res.json(newRequest);
});

app.get("/swap-requests", authenticateToken, (req, res) => {
    const userId = req.user.id;
    const receivedRequests = swapRequests.filter(
         request => request.receiverId === userId
    );
    res.json(receivedRequests);

});

app.put("/swap-requests/:id", authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    const request = swapRequests.find(request => request.id === id);
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
    const userId = req.user.id;
    if (request.receiverId !== userId) {
        return res.status(403).json({
            message: "You are not allowed to update this request"
        });
    } 
    const { status } = req.body;
    if (status !== "accepted" && status !== "rejected") {
        return res.status(400).json({
            message: "Status must be accepted or rejected"
        });
    }
    
    request.status = status;


    fs.writeFileSync(
        "./swapRequests.json",
        JSON.stringify(swapRequests, null, 2)
);
res.json(request);



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

