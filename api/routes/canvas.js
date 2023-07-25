const PixelModel = require("../models/pixel.model")
const express = require("express");
const router = express.Router();
const cors = require("cors");
require("dotenv").config();

router.use(cors({ credentials: true, origin: "http://localhost:3000" }));
router.use(express.json());

router.post("/putpixel", async (req, res)=>{
    res.json(req.body)
})

module.exports = router;