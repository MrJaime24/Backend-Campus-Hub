import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import indexRoutes from "./src/routes/index.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// Rutas
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api", indexRoutes);
app.get("/", (req, res) => {
    res.send("API funcionando (TypeScript)");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
