const PixelModel = require("../models/pixel.model")
const UserModel = require("../models/user.model")
const express = require("express");
const router = express.Router();
const cors = require("cors");
require("dotenv").config();

router.use(cors({ credentials: true, origin: "http://localhost:3000" }));
router.use(express.json());

router.post("/putpixel", async (req, res) => {
    const { user, x_coordinate, y_coordinate, color } = req.body;

    try {
    // Search for a Pixel with the given x and y coordinates
    let pixel = await PixelModel.findOne({ x: x_coordinate, y: y_coordinate });

    if (pixel) {
        // If the pixel already exists, update its user and color
        pixel.user = user;
        pixel.color = color;
    } else {
        // If the pixel doesn't exist, create a new one
        pixel = new PixelModel({
        x: x_coordinate,
        y: y_coordinate,
        user: user,
        color: color,
        });
    }

    // Save the pixel (either the updated one or the new one)
    await pixel.save();

    res.status(200).json({ message: "Pixel updated/created successfully." });
    } catch (error) {
    console.error("Error updating/creating pixel:", error);
    res.status(500).json({ error: "Server error" });
    }
});

router.get("/getcanvas", async(req,res)=>{
    const data = await PixelModel.find({}).populate('user', 'username')
    res.json(data)
})
module.exports = router;