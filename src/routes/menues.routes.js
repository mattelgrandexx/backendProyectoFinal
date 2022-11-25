import { Router } from "express";
import { check } from "express-validator";

import {
  borrarMenu,
  crearMenu,
  editarMenu,
  listarMenus,
  obtenerMenu,
} from "../controllers/menues.controllers";

const router = Router();

router
  .route("/menus")
  .get(listarMenus)
  .post([
    check("nombreMenu", "El nombre del menu es obligatorio")
      .notEmpty()
      .trim()
      .withMessage("El campo no puede estar vacio.")
      .isLength({ min: 4, max: 50 })
      .withMessage("El menu debe tener entre 4 y 50 caracteres."),
    check("precioMenu", "El precio del producto es obligatorio")
      .notEmpty()
      .isNumeric()
      .withMessage("El precio debe ser numerico.")
      .custom((value) => {
        if (value >= 100 && value <= 10000) {
          return true;
        } else {
          throw new Error(
            "El precio debe estar comprendido entre 100 y 10000 pesos."
          );
        }
      }),
    check("descripcion", "La descripcion del menu es obligatorio")
      .notEmpty()
      .trim()
      .withMessage("Este campo no puede estar vacio")
      .isLength({ min: 10, max: 100 })
      .withMessage("La descripcion debe tener entre 10 y 100 caracteres."),
    check("imagen", "La imagen del producto es obligatorio")
      .notEmpty()
      .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)
      .withMessage("Debe enviar una url valida."),
    check("categoria", "Debe elegir una categoria para su menu")
      .notEmpty()
      .isIn(["hamburgesas", "extras", "bebidas"])
      .withMessage("La seleccion de la categoria debe ser valida."),

    crearMenu,
  ]);

router
  .route("/menus/:_id")
  .get(obtenerMenu)
  .delete(borrarMenu)
  .put([
    check("nombreMenu", "El nombre del menu es obligatorio")
      .notEmpty()
      .trim()
      .withMessage("El campo no puede estar vacio.")
      .isLength({ min: 4, max: 50 })
      .withMessage("El menu debe tener entre 4 y 50 caracteres."),
    check("precioMenu", "El precio del producto es obligatorio")
      .notEmpty()
      .isNumeric()
      .withMessage("El precio debe ser numerico.")
      .custom((value) => {
        if (value >= 100 && value <= 10000) {
          return true;
        } else {
          throw new Error(
            "El precio debe estar comprendido entre 100 y 10000 pesos."
          );
        }
      }),
    check("descripcion", "La descripcion del menu es obligatorio")
      .notEmpty()
      .trim()
      .withMessage("Este campo no puede estar vacio")
      .isLength({ min: 10, max: 100 })
      .withMessage("La descripcion debe tener entre 10 y 100 caracteres."),
    check("imagen", "La imagen del producto es obligatorio")
      .notEmpty()
      .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)
      .withMessage("Debe enviar una url valida."),
    check("categoria", "Debe elegir una categoria para su menu")
      .notEmpty()
      .isIn(["hamburguesas", "extras", "bebidas"])
      .withMessage("La seleccion de la categoria debe ser valida."),

    editarMenu,
  ]);

export default router;