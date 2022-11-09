import { Router } from "express";

import { listarMenues } from "../controllers/menues.controllers";

const router = Router();

router.route("/menus").get(listarMenues)





export default router;