const express = require('express');
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");
const bodyParser = require("body-parser");
const UserRoutes = require('./Routes/UserRoutes');
const AuthRoutes = require('./Routes/AuthRoutes');
const lyricsFinder = require('lyrics-finder');
const axios = require("axios")


router.use('/users', UserRoutes);
router.use('/auth', AuthRoutes);

router.use(bodyParser.json());

router.get("/images/:genre", async (req, res) => {
  const url = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${req.params.genre}&client_id=g6OURgVTe_hS4cJ-FnIQo0KQ5QlKUYOIZjO_eriyR5M`) 
  console.log(url)
  res.send(url.data)
  });



router.post("/login", (req, res) => {
  // console.log("hi")
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/home",
    clientId: "dc2e15714c224981bd8be8fa9297a1ca",
    clientSecret: "8bb0d16cd0a94e2994d209ce41bde332",
  });
  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      res.sendStatus(400)
    })
})


router.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  console.log("hi");
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/home",
    clientId: "dc2e15714c224981bd8be8fa9297a1ca",
    clientSecret: "8bb0d16cd0a94e2994d209ce41bde332",
    refreshToken,
  });
  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    })
})

router.get("/lyrics", async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
    console.log(lyrics)
  res.json({ lyrics })
})

//404 page
router.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server"
    },
  });
});


module.exports = router;