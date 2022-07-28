const express = require("express");
const mongoose = require("mongoose");
const app = express();
const passport = require("passport");
const bodyParser = require("body-parser");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const post = require("./routes/api/post");
const path = require("path");
require("./config/passport")(passport);

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log("error:>", e);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/post", post);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.use(passport.initialize());

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
