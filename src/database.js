import mongoose from "mongoose";

const url = "mongodb://localhost:27017/menu-bar"

mongoose.connect(url)

const connection = mongoose.connection

connection.once("open", () => {
    console.log("Estoy conectado a la base de datos")
})