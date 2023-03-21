const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/spotify/callback',
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      // Save the access token and user profile to your database
      done(null, { profile, accessToken });
    }
  )
);

app.use(passport.initialize());