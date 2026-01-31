import express from "express";
import * as relationController from "../controllers/relationController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Rutas de Gestión de Relaciones N:M.
 * Controlan las vinculaciones entre diferentes entidades del sistema.
 * Todas estas rutas requieren autenticación.
 */

// Asignar proyecto a usuario
router.post("/assign-project", auth, relationController.assignProjectToUser);

// Consultar proyectos de un usuario concreto
router.get(
  "/users/:tokken/projects",
  auth,
  relationController.getProjectsByUser
);

// Vincular Rol a Usuario
router.post("/assign-rol-user", auth, relationController.assignRolToUser);

// Vincular Título a un Centro Educativo
router.post(
  "/assign-titulo-centro",
  auth,
  relationController.assignTituloToCentro
);

// Vincular Curso a un Título Académico
router.post(
  "/assign-curso-titulo",
  auth,
  relationController.assignCursoToTitulo
);

// Vincular Módulo a un Curso específico
router.post(
  "/assign-modulo-curso",
  auth,
  relationController.assignModuloToCurso
);

export default router;
