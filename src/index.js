import express from "express"
import cors from "cors"
import morgan from "morgan"
import path from "path"

const app = express();


app.set("port", process.env.PORT || 4000);

app.listen( app.get("port"), ()=>{
    console.log("estoy en el puerto"+ app.get("port"));
});


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));
console.log(path.join(__dirname, "../public"))


app.get("/", (req, res)=>{
    res.send("Hola desde el backend en la peticion get")
})
