const jwt = require("jsonwebtoken");
const { User } = require("../model");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }
        if (user.status === "INACTIVE") {
            return res.status(403).json({
                message: "User is inactive",
            });
        }
        req.user = {
            id: user.id,
            fullName: user.fullName,
            role: user.role,
        };
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token expired",
            });
        }

        return res.status(401).json({
            message: "Invalid token",
        });
    }
};