import { Router } from "express";
import { check } from "express-validator";
import { actualizarPass, confirmEmail, consultarUsuarios, crearUsuario, eliminarUsuario, encontrarUsuario, obtenerEmail, obtenerUsuario, permisoUsuarios, resetPassword, suspenderUsuario } from "../controllers/user.controllers";

const routerUser = Router()

routerUser.route("/perfilusuarios").get(consultarUsuarios).post([
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
    .isEmail()
    .notEmpty()
    .trim()
    .withMessage("El campo no puede estar vacio.")
    .matches( /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)
    .withMessage("Debe ingresar un formato valido."),

    check("password", "La contraseña es obligatoria.")
    .notEmpty()
    .trim()
    .withMessage("El campo no puede estar vacio.")
    .isLength({ min: 8, max: 60 })
    .withMessage("La contraseña debe tener entre 8 y 60 caracteres."),
    
    crearUsuario
])

routerUser.route("/perfilusuarios/:_id").delete(eliminarUsuario).put(suspenderUsuario)

routerUser.route("/perfilusuarios/permisos/:_id").put(permisoUsuarios)

routerUser.route("/perfilusuarios/login").post([
    check("email", "El email del usuario es obligatorio")
    .isEmail()
    .notEmpty()
    .trim()
    .withMessage("El campo no puede estar vacio.")
    .matches( /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)
    .withMessage("Debe ingresar un formato valido."),

    check("password", "La contraseña es obligatoria.")
    .notEmpty()
    .trim()
    .withMessage("El campo no puede estar vacio.")
    .isLength({ min: 8, max: 60 })
    .withMessage("La contraseña debe tener entre 8 y 60 caracteres."),

encontrarUsuario

])

routerUser.route("/perfilusuarios/confirm/:token").get(confirmEmail)


routerUser.route("/perfilusuarios/recuperacion").post([
    check("email", "El email del usuario es obligatorio")
    .isEmail()
    .notEmpty()
    .trim()
    .withMessage("El campo no puede estar vacio.")
    .matches( /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)
    .withMessage("Debe ingresar un formato valido."),
    resetPassword
])
routerUser.route("/perfilusuarios/recuperacion/:token").get(obtenerEmail).put([
    check("password", "La contraseña es obligatoria.")
    .notEmpty()
    .trim()
    .withMessage("El campo no puede estar vacio.")
    .isLength({ min: 8, max: 60 })
    .withMessage("La contraseña debe tener entre 8 y 60 caracteres."),

    actualizarPass
])


export default routerUser;