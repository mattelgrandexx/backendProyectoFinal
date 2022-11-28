import mongoose from "mongoose";

const url = "mongodb+srv://lenobar:lenobar4000@prueba.dhmudco.mongodb.net/menu-bar"

mongoose.connect(url)

const connection = mongoose.connection

connection.once("open", () => {
    console.log("Estoy conectado a la base de datos")
})