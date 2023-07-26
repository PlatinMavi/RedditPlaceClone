const PixelModel = require("../models/pixel.model")
const UserModel = require("../models/user.model")
const express = require("express");
const router = express.Router();
const cors = require("cors");
require("dotenv").config();

router.use(cors({ credentials: true, origin: "http://localhost:3000" }));
router.use(express.json());

const TEN_SECONDS = 10000; // 10 seconds in milliseconds

router.post("/putpixel", async (req, res) => {
  const { user, x_coordinate, y_coordinate, color } = req.body;

  try {
    // Check the user's lastPixelTime
    const currentUser = await UserModel.findById(user);

    if (currentUser && currentUser.lastPixelTime) {
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - currentUser.lastPixelTime.getTime();

      if (timeElapsed < TEN_SECONDS) {
        const timeRemaining = TEN_SECONDS - timeElapsed;
        return res
          .status(429)
          .json({ error: "Please wait before placing another pixel.", timeRemaining });
      }
    }

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

    // Update the lastPixelTime of the user
    currentUser.lastPixelTime = new Date();
    await currentUser.save();

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