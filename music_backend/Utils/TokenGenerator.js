const jwt = require("jsonwebtoken");

exports.generateToken = (userId, username) => {
    const token = {
        userId: userId,
        username: username
    };

    const options = {
        expiresIn: process.env.TOKEN_EXPIRY_TIME
    };

    const secret = process.env.TOKEN_SECRET;

    return jwt.sign(token, secret, options);
};

exports.verifyToken = (token) => {
    const strippedToken = token.replace('Bearer ', '')
    return jwt.verify(strippedToken, process.env.TOKEN_SECRET);
};