const express = require('express');
const router = express.Router();
const SpotifyController = require("../Controllers/SpotifyController");

//POST REQUESTS
router.post("/login", SpotifyController.login);

module.exports = router;