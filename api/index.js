const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const secret = "laoetunc232nxiutea545gkjl";

app.use(
  cors({ credentials: true, origin: "http://localhost:5173" }),
  express.json(),
  cookieParser()
);

mongoose.connect("mongodb://127.0.0.1:27017/mernblog");

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: await bcrypt.hash(password, 10),
    });
    res.json(userDoc);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    const passOk = await bcrypt.compare(password, userDoc.password);
    if (passOk) {
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json("ok");
      });
    } else {
      res.status(400).json("wrong credentials");
    }
  } catch (err) {
    console.log(err)
    res.status(400).json("wrong credentials")
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.listen(4000);
