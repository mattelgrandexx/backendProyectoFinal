import mongoose from "mongoose";

const url = "mongodb+srv://nicoelias997:nicoelias997@cluster0.7qmojuv.mongodb.net/menu-bar"

mongoose.connect(url)

const connection = mongoose.connection

connection.once("open", () => {
    console.log("Estoy conectado a la base de datos")
})