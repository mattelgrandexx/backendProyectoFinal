import mongoose from "mongoose";

const url = "mongodb+srv://nicoelias997:nicoelias997@cluster0.akvwdgj.mongodb.net/menu-bar"

mongoose.connect(url)

const connection = mongoose.connection

connection.once("open", () => {
})