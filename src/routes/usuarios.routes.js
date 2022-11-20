import { Router } from "express";
import { check } from "express-validator";
import { crearUsuario, encontrarUsuario } from "../controllers/user.controllers";

const routerUser = Router()

routerUser.route("/perfilusuarios").get(encontrarUsuario).post([
    check("nombreUsuario", "El nombre del usuario es obligatorio.")
    .notEmpty()
    .trim()
    .withMessage("El campo no puede estar vacio.")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres."),

    check("apellidoUsuario", "El apellido del usuario es obligatorio.")
    .notEmpty()
    .trim()
    .withMessage("El campo no puede estar vacio.")
    .isLength({ min: 2, max: 30 })
    .withMessage("El apellido debe tener entre 2 y 30 caracteres."),

    check("email", "El email del usuario es obligatorio")
    .notEmpty()
    .trim()
    .withMessage("El campo no puede estar vacio.")
    .matches( /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)
    .withMessage("Debe ingresar un formato valido."),

    check("password", "La contraseña es obligatoria.")
    .notEmpty()
    .trim()
    .withMessage("El campo no puede estar vacio.")
    .isLength({ min: 8, max: 30 })
    .withMessage("El apellido debe tener entre 8 y 30 caracteres."),
    
    crearUsuario
])

export default routerUser;