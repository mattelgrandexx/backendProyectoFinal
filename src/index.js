import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import menuRouter from "./routes/menues.routes";
import usuarioRouter from "./routes/usuarios.routes"

import "./database"

const app = express();

app.set("port", process.env.PORT || 4000);

app.listen( app.get("port"), ()=>{
    console.log("estoy en el puerto"+ app.get("port"));
});

// middlewares:
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));
// archivo estatico
app.use(express.static(path.join(__dirname, "../public")));



// http://localhost:4000/menubar/prueba
app.use("/apimenu", menuRouter);
app.use("/apiuser", usuarioRouter);
