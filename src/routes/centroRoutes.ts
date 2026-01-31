import express from "express";
import * as c from "../controllers/centroController.js";

const router = express.Router();

/**
 * Definición de rutas CRUD para los Centros Educativos.
 * Accesibles desde: /api/centros/...
 */

router.post("/", c.create); // POST /api/centros/ - Crear centro
router.get("/", c.list); // GET /api/centros/  - Listar todos
router.put("/:id", c.update); // PUT /api/centros/:id - Actualizar
router.delete("/:id", c.remove); // DELETE /api/centros/:id - Borrar

export default router;
