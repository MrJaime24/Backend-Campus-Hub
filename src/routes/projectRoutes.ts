import express from "express";
import * as projectController from "../controllers/projectController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Rutas de Proyectos.
 * El middleware 'auth' protege los métodos de escritura (POST, PUT).
 */

// Crear un proyecto: Requiere autenticación
router.post("/", auth, projectController.createProject);

// Listar proyectos: Público
router.get("/", projectController.listProjects);

// Editar proyecto: Requiere autenticación y verificación de autoría (en el controlador)
router.put("/:id", auth, projectController.updateProject);

export default router;
