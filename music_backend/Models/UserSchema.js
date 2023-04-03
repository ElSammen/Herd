const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true
    },
    profilepic: {
        type: String,
        default: "https://i.natgeofe.com/n/05ecc07c-c0e3-4d94-9e32-93ba1e9110ed/white-tailed-deer_thumb_3x4.JPG"
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
    },
    genres: {
        type: Array
    }
});

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const salt = await bcrypt.genSalt(parseInt(process.env.PASSWORD_SALT_ROUNDS));
        const hashed = await bcrypt.hash(this.password, salt);
        this.password = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
});

// userSchema.pre('findOneAndUpdate', async function (next) {
//     try {
//         if (this._update.password) {
//             const salt = await bcrypt.genSalt(parseInt(process.env.PASSWORD_SALT_ROUNDS));
//             const hashed = await bcrypt.hash(this._update.password, salt);
//             this._update.password = hashed;
//         }
//         return next();
//     } catch (err) {
//         return next(err);
//     }
// });

userSchema.method("validatePassword", async function (pass) {
    console.log("were validating", pass)
    return bcrypt.compare(pass, this.password);
});

const userModel = mongoose.model("user", userSchema, "Users");

module.exports = userModel;