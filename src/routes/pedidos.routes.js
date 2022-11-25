import { Router } from "express";
import { check } from "express-validator";
import { borrarPedidos, crearPedidos, editarPedidos, listarPedidos, obtenerPedidos } from "../controllers/pedidos.controller";


const router = Router();


router.route("/pedidos").get(listarPedidos)
.post(
    [check("nombreUsuario", "El nombre del pedido es obligatorio")
    .notEmpty()
    .isLength({min:2, max:50})
    .withMessage("El nombre de usuario debe tener entre 2 y 50 caracteres"),
    check("pedido", "El pedido es obligatorio")
    .notEmpty(),
    check("nombreMenu", "El nombre del menu es obligatorio")
    .notEmpty()
    .isLength({min:8, max:20})
    .withMessage("El nombre debe tener entre 8 y 20 caracteres"),
    check("precioMenu", "El precio es obligatorio")
    .notEmpty()
    .custom((value) => {
        if (value >= 100 && value <= 10000) {
          return true;
        } else {
          throw new Error(
            "El precio debe ser mayor a 100 y menor o igual a 10000"
          );
        }
      }),
  ],
    crearPedidos
  );

  router
  .route("/pedidos/:id")
  .get(obtenerPedidos)
  .put(editarPedidos)
  .delete(borrarPedidos);
