import express from "express";
import * as c from "../controllers/moduloController.js";

const router = express.Router();

/**
 * Definición de rutas CRUD para los Módulos Académicos.
 * Accesibles desde: /api/modulos/...
 */

router.post("/", c.create);
router.get("/", c.list);
router.put("/:id", c.update);
router.delete("/:id", c.remove);

export default router;
