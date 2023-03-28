const express = require('express');
const router = express.Router();
const UsersController = require("../Controllers/UserController");

// // Authentication for all
// router.use([isUserAuthenticated, isAdmin]);

//GET REQUESTS
router.get("/", UsersController.index);
router.get("/:id", UsersController.show);

//POST REQUESTS
router.post("/", UsersController.create);

//UPDATE REQUESTS
router.patch("/:id", UsersController.update);
router.patch("/genres/:id", UsersController.removeGenre);

//DELETE REQUESTS
router.delete("/all", UsersController.deleteAll);
router.delete("/:id", UsersController.delete);

module.exports = router;