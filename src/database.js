import mongoose from "mongoose";

const url = "mongodb+srv://mati123:mati123@cluster0.2q6zsm3.mongodb.net/menu-bar"

mongoose.connect(url)

const connection = mongoose.connection

connection.once("open", () => {
    console.log("Estoy conectado a la base de datos")
})