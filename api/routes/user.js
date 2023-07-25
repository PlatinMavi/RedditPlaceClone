const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");
const router = express.Router();
const cors = require("cors");
require("dotenv").config();

const JWTsecret = process.env.JWTSECRET;

router.use(cors({ credentials: true, origin: "http://localhost:3000" }));
router.use(express.json());
router.use(cookieParser());

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const UserDoc = await UserModel.create({ username, password: hashedPassword, salt });
    res.json({ requestData: UserDoc });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const Userdoc = await UserModel.findOne({ username });

    if (Userdoc === null) {
      return res.status(404).json({ msg: "Invalid Username" });
    }

    const isPasswordValid = bcrypt.compareSync(password, Userdoc.password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid Password" });
    }

    jwt.sign({ username, id: Userdoc._id }, JWTsecret, { algorithm: "HS256" }, (err, token) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Internal Server Error" });
      } else {
        res.cookie("token", token, { httpOnly: true, secure: true }).json({ id: Userdoc._id, username });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.get("/profile", (req, res) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, JWTsecret, { algorithm: "HS256" }, (err, info) => {
      if (err) {
        return res.status(401).json({ msg: "Unauthorized" });
      } else {
        res.json(info);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ msg: "Cookie has been reset" });
});

module.exports = router;
