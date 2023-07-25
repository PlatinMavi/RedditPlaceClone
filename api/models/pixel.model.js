const mongoose = require("mongoose")
const UserSchema = require("./user.model")

const PixelSchema = new mongoose.Schema({
    x:{
        type:Number
    },
    y:{
        type:Number
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId type for referencing UserModel
        ref: "User", // Use the model name "User" (make sure it matches your UserModel)
    },
    color:{
        type:String
    }
})

const PixelModel = mongoose.model("Pixel", PixelSchema)

module.exports = PixelModel