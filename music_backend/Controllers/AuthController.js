const UserModel = require('../Models/UserSchema');
const { generateToken } = require("../Utils/TokenGenerator");

exports.register = async function (req, res) {
    try {
        const { username, password } = req.body;

        if (!(username && password)) {
            return res.status(400).send("Please enter a Username & Password");
        }

        const user = await UserModel.findOne({
            username: username
        }).exec();

        if (user) {
            return res.status(400).send({
                message: "Error! Username in use!"
            });
        }

        const userInstance = new UserModel({
            username: username,
            password: password
        });
        
        const token = generateToken(userInstance._id, userInstance.username);
        userInstance.token = token;

        await userInstance.validate();
        await userInstance.save();

        return res.status(201).send({
            message: "Registered successfully!",
            token,
            expiresIn: 3600
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(error => error.message);
            return res.status(400).send({
                errors
            });
        } else {
            //TODO: other error handling
            return res.status(500).send({
                error: 'Something went wrong'
            });
        }
    }
}

exports.login = async function (req, res) {
    try {
        const { username, password } = req.body;

        if (!(username && password)) {
            return res.status(400).send("Username/Password is required");
        }

        const user = await UserModel.findOne({
            username: username
        }).exec();

        if (!user) {
            return res.status(400).send({
                message: "Error! Invalid username or password!"
            });
        }

        const isMatch = await user.validatePassword(password);

        if (!isMatch) {
            return res.status(400).send({
                message: "Error! Invalid username or password!"
            });
        }

        const token = generateToken(user._id, user.username);
        user.token = token;
        await user.save();

        return res.status(201).send({
            message: "Logged in successfully!",
            token: token,
            expiresIn: 3600
        });
    } catch (err) {
        //TODO: other error handling
        return res.status(500).send({
            error: 'Something went wrong'
        });
    }
}