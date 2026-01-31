import express from "express";
import * as c from "../controllers/rolController.js";

const router = express.Router();

/**
 * Definición de rutas CRUD para la gestión de Roles.
 * Accesibles desde: /api/roles/...
 */

router.post("/", c.create);
router.get("/", c.list);
router.put("/:id", c.update);
router.delete("/:id", c.remove);

export default router;
