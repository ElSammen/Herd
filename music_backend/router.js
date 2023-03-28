const express = require('express');
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");
const bodyParser = require("body-parser");
const UserRoutes = require('./Routes/UserRoutes');
const AuthRoutes = require('./Routes/AuthRoutes');
const lyricsFinder = require('lyrics-finder');

router.use('/users', UserRoutes);
router.use('/auth', AuthRoutes);

router.use(bodyParser.json());

router.post("/login", (req, res) => {
  // console.log("hi")
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/home",
    clientId: "c57767f293cb4f48a7d274d7d984f60c",
    clientSecret: "6cfb0ca562de4ac09dc243bc6a4f4028",
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
    clientId: "c57767f293cb4f48a7d274d7d984f60c",
    clientSecret: "6cfb0ca562de4ac09dc243bc6a4f4028",
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