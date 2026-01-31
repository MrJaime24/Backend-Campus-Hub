import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

/**
 * Rutas de Gestión de Usuarios.
 * No requieren autenticación previa para permitir el acceso inicial.
 */

// URL: POST /api/users/register
router.post("/register", userController.register);

// URL: POST /api/users/login
router.post("/login", userController.login);

export default router;
