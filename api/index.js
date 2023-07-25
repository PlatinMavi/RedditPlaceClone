const express = require("express")
const app = express()
const { default: mongoose } = require("mongoose")
require("dotenv").config()
const userRoute = require("./routes/user")

app.use("/",userRoute)

mongoose.connect(process.env.URI)
const connection = mongoose.connection
connection.once("open",()=>{
    console.log("mongoose connection have been made!")
})

app.listen(4000, ()=>{
    console.log("4000 port on ")
})