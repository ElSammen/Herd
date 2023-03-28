const UserModel = require('../Models/UserSchema');
const mongoose = require("mongoose");


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
    console.log(req.body.genres.split(',').length);
    try {
        //get length of the array in db
        const dbsize = await UserModel.findById(req.params.id);
        console.log(dbsize.genres.length);
    
        let user;
        if (dbsize.genres.length <= 10) {
          const update = { ...req.body };
          console.log("There is a problem")
          const genreArray = req.body.genres.split(',').map(genre => genre.trim());
          { update.$push = { genres: { $each: genreArray } } };
          delete update.genres; // remove genres property from the update object
          user = await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            update,
            { runValidators: true, new: true }
          );
        } else {
          console.log("Genre limit reached")
        } return res.send("Genre limit reached");
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(error => error.message);
            return res.status(400).send({ errors });
        } else {
            //TODO: other error handling
            return res.status(500).send({ error });
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

exports.removeGenre = async function (req, res) {
    console.log(req.body.genres)
    try {
        const user = await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { genres: req.body.genres } },
            { new: true }
        );
        console.log(user);
        return res.send(user.genres);
    } catch (error) {
        //TODO: error handling
        return res.status(500).send({ error: 'Something went wrong' });
    }
}