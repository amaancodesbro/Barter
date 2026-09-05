const jwt = require("jsonwebtoken");
//const authenticateToken = require("./auth");

function authenticateToken(req, res, next) {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();

    });
}
module.exports = authenticateToken;