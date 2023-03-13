const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        maxLength: [40, "Username must not exceed more than 40 characters"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        maxLength: [100, "Password must not exceed more than 40 characters"]
    }
});
const userModel = mongoose.model("user", userSchema, "Users");

module.exports = userModel;