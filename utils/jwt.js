const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        { userId: user.user_id, email: user.email, role: user.user_type },
        "abcd", // Use a secure secret key in production
        { expiresIn: "1h" } // Token expiration time
    );
};

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, "abcd", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Failed to authenticate token" });
        }

        req.user = decoded;
        next();
    });
};

module.exports = { generateToken, verifyToken };
