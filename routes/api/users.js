const express = require("express");
const User = require("../../models/User");
const gravatar = require("gravatar");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateLoginInput = require("../../validation/login");
const validateRegisterInput = require("../../validation/register");
const passport = require("passport");
const secret = require("../../config/keys").secret;
// router.get("/", (req, res) => {
//   res.send("users");
// });


router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  await User.findOne({
    email: req.body.email,
  }).then((result) => {
    if (result) {
      errors.email = "email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        avatar,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          (newUser.password = hash),
            newUser
              .save()
              .then((user) => res.json({ user }))
              .catch((e) => console.log(e));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "user Not Found";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        };

        jwt.sign(payload, secret, { expiresIn: 360000 }, (err, token) => {
          res.json({ success: true, token: "Bearer " + token });
        });
      } else {
        errors.password = "password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      email: req.user.email,
      name: req.user.name,
      avatar: req.user.avatar,
    });
  }
);
module.exports = router;
