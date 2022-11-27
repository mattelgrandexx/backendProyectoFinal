import { Router } from "express";
import { check } from "express-validator";
import {
  borrarPedidos,
  crearPedidos,
  editarPedidos,
  listarPedidos,
  obtenerPedidos,
} from "../controllers/pedidos.controller";

const routerPedidos = Router();

routerPedidos
  .route("/combos")
  .get(listarPedidos)
  .post(
    [
      check("nombreUsuario", "El nombre del pedido es obligatorio")
        .notEmpty()
        .isLength({ min: 2, max: 50 })
        .withMessage("El nombre de usuario debe tener entre 2 y 50 caracteres"),
      check("pedido", "El pedido es obligatorio").notEmpty(),
    ],
    crearPedidos
  );

routerPedidos
  .route("/combos/:id")
  .get(obtenerPedidos)
  .put(
    [
      check("nombreUsuario", "El nombre del pedido es obligatorio")
        .notEmpty()
        .isLength({ min: 2, max: 50 })
        .withMessage("El nombre de usuario debe tener entre 2 y 50 caracteres"),
      check("pedido", "El pedido es obligatorio").notEmpty(),
    ],
    editarPedidos
  )
  .delete(borrarPedidos);

export default routerPedidos;
