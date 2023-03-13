const UserModel = require('../Models/UserSchema');

exports.index = async function (req, res) {
    try {
        const users = await UserModel.find({});
        return res.send(users);
    } catch (error) {
        //TODO: error handling
        return res.status(500).send({ error: 'Something went wrong' });
    }
}

exports.show = async function (req, res) {
    try {
        const user = await UserModel.findById(req.params.id);
        return res.send(user);
    } catch (error) {
        //TODO: error handling
        return res.status(500).send({ error: 'Something went wrong' });
    }
}

exports.create = async function (req, res) {
    try {
        const request = req.body;

        const userInstance = new UserModel({
            username: request.username,
            password: request.password,
        });

        await userInstance.validate();
        const updatedUser = await userInstance.save();
        return res.send(updatedUser);
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(error => error.message);
            return res.status(400).send({ errors });
        } else {
            //TODO: other error handling
            return res.status(500).send({ error: 'Something went wrong' });
        }
    }
}

exports.update = async function (req, res) {
    try {
        const user = await UserModel.findOneAndUpdate(
            req.params.id, req.body, { runValidators: true, new: true }
        );
        return res.send(user);
    } catch (error) {
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(error => error.message);
            return res.status(400).send({ errors });
        } else {
            //TODO: other error handling
            return res.status(500).send({ error: 'Something went wrong' });
        }
    }
}

exports.deleteAll = async function (req, res) {
    try {
        const user = await UserModel.deleteMany({ isAdmin: { $ne: true } });
        return res.send(user);
    } catch (error) {
        //TODO: error handling
        return res.status(500).send({ error: 'Something went wrong' });
    }
}

exports.delete = async function (req, res) {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        return res.send(user);
    } catch (error) {
        //TODO: error handling
        return res.status(500).send({ error: 'Something went wrong' });
    }
}