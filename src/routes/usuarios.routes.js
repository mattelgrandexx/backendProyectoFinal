import { Router } from "express";
import { crearUsuario, encontrarUsuario } from "../controllers/user.controllers";

const router = Router()

router.route("/usuarios").get(encontrarUsuario).post(crearUsuario)