import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import indexRoutes from "./src/routes/index.js";

// Configuramos las variables de entorno desde el archivo .env
dotenv.config();

// Inicializamos la aplicación Express
const app = express();

/**
 * Middlewares globales
 */
// Habilitamos CORS para permitir peticiones desde otros dominios (como el frontend)
app.use(cors());
// Permitimos que la aplicación entienda JSON en el cuerpo de las peticiones
app.use(express.json());

/**
 * Definición de Rutas
 */
// Rutas específicas para gestión de usuarios (login, registro)
app.use("/api/users", userRoutes);
// Rutas para la gestión de proyectos
app.use("/api/projects", projectRoutes);
// Rutas generales y de relaciones (centros, títulos, cursos, etc.)
app.use("/api", indexRoutes);

// Ruta raíz para verificar que la API está operativa
app.get("/", (req, res) => {
  res.send("API funcionando (TypeScript y Comentada)");
});

// Iniciamos el servidor en el puerto configurado o el 3000 por defecto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
