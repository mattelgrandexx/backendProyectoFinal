import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import menuRouter from "./routes/menues.routes";
import routerUser from "./routes/usuarios.routes"
import routerPedidos from "./routes/pedidos.routes";
import * as dotenv from "dotenv"
import "./database"


dotenv.config()

const app = express();

app.set("port", process.env.PORT || 4000);

app.listen( app.get("port"), ()=>{
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));


app.use("/apimenu", menuRouter);
app.use("/apimenu/auth", routerUser);
app.use("/apimenu/pedidos", routerPedidos)
