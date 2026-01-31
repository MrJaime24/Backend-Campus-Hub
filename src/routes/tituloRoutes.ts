import express from "express";
import * as c from "../controllers/tituloController.js";

const router = express.Router();

/**
 * Definición de rutas CRUD para los Títulos Académicos.
 * Accesibles desde: /api/titulos/...
 */

router.post("/", c.create);
router.get("/", c.list);
router.put("/:id", c.update);
router.delete("/:id", c.remove);

export default router;
