import { Router } from "express";
import { check } from "express-validator";

import { crearMenues, listarMenues } from "../controllers/menues.controllers";

const router = Router();

router.route("/menus").get(listarMenues).post([
    check("nombreMenu", "El nombre del menu es obligatorio")
    .notEmpty()
    .trim()
    .withMessage("El campo no puede estar vacio.")
    .isLength({ min: 5, max: 50 })
    .withMessage("El menu debe tener entre 5 y 50 caracteres."),
    check("precioMenu", "El precio del producto es obligatorio")
        .notEmpty()
        .isNumeric()
        .withMessage("El precio debe ser numerico.")
        .custom((value) => {
            if(value >= 100 && value <= 10000){
                return true
            } else {
                throw new Error("El precio debe estar comprendido entre 100 y 10000 pesos.")
            }
        }),
        check("descripcion", "La descripcion del menu es obligatorio")
        .notEmpty()
        .trim()
        .withMessage("Este campo no puede estar vacio")
        .isLength({min:20, max: 1000})
        .withMessage("La descripcion debe tener entre 20 y 1000 caracteres."),
        check("imagen", "La imagen del producto es obligatorio")
        .notEmpty()
        .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/
        )
        .withMessage("Debe enviar una url valida."),
        check("pan", "Debe elegir un pan para su menu")
        .notEmpty()
        .isIn([
            "brioche",
            "rustico",
            "papa", 
            "sin gluten",
            "sin pan"
        ])
        .withMessage("La seleccion del pan debe ser valida."),
    
    crearMenues
])





export default router;