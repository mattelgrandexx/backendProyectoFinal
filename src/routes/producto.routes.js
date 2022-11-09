import { Router } from "express";

const router = Router();

router.route("/prueba").get((req, res)=>{res.send("Hola desde el backend en la peticion get")}
).post()

export default router;