const jwt = require("jsonwebtoken");

const authController = require("../controllers/auth/auth.controller");

async function middlewareAuthenticateToken(req, res, next) {
    // Lấy token từ header
    const authorization = req.headers["authorization"];
    if (authorization) {
        const token = authorization.replaceAll("Bearer ", "");
        // Xác thực token
        jwt.verify(token, authController.secretKey, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden" });
            }
            req.payload = decoded;
            next();
        });
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = middlewareAuthenticateToken;
