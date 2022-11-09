import { Router } from "express";

import { crearMenues, listarMenues } from "../controllers/menues.controllers";

const router = Router();

router.route("/menus").get(listarMenues).post(crearMenues)





export default router;