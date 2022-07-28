const { json } = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const { session } = require("passport");
const router = express.Router();
const passport = require("passport");
const Post = require("../../models/Post");
const validatePostInput = require("../../validation/post");

// router.get("/", (req, res) => {
//   res.send("post");
// });
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      user: req.user.id,
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
    });
    newPost.save().then((post) => res.json(post));
  }
);

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => {
      if (!posts) {
        return res.json({ noPost: "no post with that id" });
      }

      res.json(posts);
    })
    .catch((err) => res.status(404).json(err));
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ noPost: "no post with that id" });
      }
      res.json(post);
    })
    .catch((err) => res.status(404).json(err));
});

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (!post) {
            return res.status(404).json({ noPost: "no post with that id" });
          }
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ unAuthorized: "User not Authorized" });
          }
          post.remove().then(() => {
            res.json({ success: true });
          });
        })
        .catch((err) => {
          res.status(404).json(err);
        });
    });
  }
);

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (!post) {
          return res.status(404).json({ noPost: "post Not Found" });
        }

        if (
          post.likes.filter((likes) => likes.user.toString() === req.user.id)
            .length > 0
        ) {
          const index = post.likes
            .map((item) => item.user.toString())
            .indexOf(req.user.id);
          post.likes.splice(index, 1);
          return post.save().then((post) => res.json(post));
        }
        post.likes.unshift({ user: req.user.id });
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ noPost: "post Not Found" }));
  }
);
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    Post.findById(req.params.id)
      .then((post) => {
        if (!post) {
          return res.status(404).json({ noPost: "post Not Found" });
        }
        if (!isValid) {
          return res.status(400).json(errors);
        }
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };

        post.comments.unshift(newComment);
        post.save().then((post) => res.json(post));
      })
      .catch((e) => res.status(400).json(e));
  }
);

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (!post) {
          return res.status(404).json({ noPost: "Post not Found" });
        }
        const index = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);


        if (post.comments[index].user.toString() !== req.user.id) {
          return res.status(404).json({ authorization: "unAuthorization" });
        }
        if (index === -1) {
          return res.status(404).json({ noComment: "comment not Found" });
        }

        post.comments.splice(index, 1);
        post.save().then(() => res.json({ success: true }));
      })
      .catch((e) => res.status(404).json(e));
  }
);
module.exports = router;
