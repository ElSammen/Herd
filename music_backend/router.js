const express = require('express');
const router = express.Router();


const UserRoutes = require('./Routes/UserRoutes');
const AuthRoutes = require('./Routes/AuthRoutes');


router.use('/users', UserRoutes);
router.use('/auth', AuthRoutes);

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