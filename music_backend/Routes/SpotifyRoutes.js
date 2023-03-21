const express = require('express');
const router = express.Router();
const passport = require('passport')

router.get(
    '/auth/spotify',
    passport.authenticate('spotify', {
      scope: ['user-read-email', 'user-read-private'],
      showDialog: true,
    })
  );

router.get(
    '/auth/spotify/callback',
    passport.authenticate('spotify', {
      failureRedirect: '/login',
      successRedirect: '/',
    })
  );

module.exports = router;