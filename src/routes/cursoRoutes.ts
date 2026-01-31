import express from "express";
import * as c from "../controllers/cursoController.js";

const router = express.Router();

/**
 * Definición de rutas CRUD para los Cursos.
 * Accesibles desde: /api/cursos/...
 */

router.post("/", c.create);
router.get("/", c.list);
router.put("/:id", c.update);
router.delete("/:id", c.remove);

export default router;
