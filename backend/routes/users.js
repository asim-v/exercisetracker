const router = require("express").Router();
let User = require("../models/user.model");
//Plugback

router.route("/").get((req, res) => {
  //Sync/Async?
  User.find() //Mongoose method for the user object
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  //parses the response and saves to db
  const username = req.body.username;
  const newUser = new User({ username });
  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
