// exports.isAuthenticated = (req, res, next) => {
//   if (req.session.userId) return next();
//   res.status(401).json({ message: "Unauthorized" });
// };

// exports.isAdmin = (req, res, next) => {
//   if (req.session.role === "admin") return next();
//   res.status(403).json({ message: "Access denied" });
// };
// exports.isBuyer = (req, res, next) => {
//   if (req.session.role === "buyer") return next();
//   res.status(403).json({ message: "Access denied" });
// };
// exports.isSeller = (req, res, next) => {
//   if (req.session.role === "seller") return next();
//   res.status(403).json({ message: "Access denied" });
// };
// exports.isUser = (req, res, next) => {
//   if (req.session.role === "user") return next();
//   res.status(403).json({ message: "Access denied" });
// };
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        if(!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }   
        try {
            const decoded = jwt.verify(token, 'your_jwt_secret');
            req.user = decoded;
            console.log("the decoded user is", req.user);
             
        }
        catch (err) {
            return res.status(401).json({ message: "token not valid" });
        }
    }
}

module.exports = verifyToken;