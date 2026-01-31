import express from "express";
import centroRoutes from "./centroRoutes.js";
import tituloRoutes from "./tituloRoutes.js";
import cursoRoutes from "./cursoRoutes.js";
import moduloRoutes from "./moduloRoutes.js";
import rolRoutes from "./rolRoutes.js";
import relationRoutes from "./relationRoutes.js";

const router = express.Router();

/**
 * Agregador de Rutas de Entidades y Relaciones.
 * Todas estas rutas cuelgan del prefijo '/api' definido en server.ts.
 */

// Rutas académicas
router.use("/centros", centroRoutes);
router.use("/titulos", tituloRoutes);
router.use("/cursos", cursoRoutes);
router.use("/modulos", moduloRoutes);
router.use("/roles", rolRoutes);

// Rutas para gestionar asignaciones entre entidades (N:M)
router.use("/relations", relationRoutes);

export default router;
