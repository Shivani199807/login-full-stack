const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/login-sample-project");
const User = require("./models/userdetails.model");
const bycrypt = require("bcrypt");
app.post("/api/register", async (req, res) => {
  try {
    //bycrypt is used to convert the password into hash format

    const password = await bycrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      password: password,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate mail" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.json({ status: "error", error: "User doesnt exist" });
  }

  const isPasswordValid = await bycrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    //it consist of user info as payload and secret key which should be secure
    const token = jwt.sign(
      {
        email: user.email,
      },
      "secret123"
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", error: "Duplicate mail" });
  }
});
app.get("/api/quote", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({
      email: email,
    });
    return res.json({ status: "ok", quote: user.quote });
  } catch (err) {
    res.json({ status: "error", error: "invalid user" });
  }
});

app.post("/api/quote", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    await User.updateOne(
      {
        email: email,
      },
      { $set: { quote: req.body.quote } }
    );
    return res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "invalid user" });
  }
});
app.listen(5000, () => {
  console.log("hey");
});
