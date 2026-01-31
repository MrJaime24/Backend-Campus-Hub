import { Response } from "express";
import db from "../db/index.js";
import { AuthRequest } from "../middleware/authMiddleware.js";

/**
 * Gestión de Proyectos Académicos.
 * Estos endpoints requieren que el usuario esté autenticado.
 */

/**
 * Crea un proyecto y lo vincula automáticamente al usuario que lo crea.
 */
export async function createProject(req: AuthRequest, res: Response) {
  try {
    const {
      nombreProyecto,
      descripcionProyecto,
      urlProyecto,
      urlGitHub,
      imgPortada,
    } = req.body;

    // Obtenemos el token desde el objeto 'req.user' inyectado por el middleware 'auth'
    const userTokken = req.user?.tokken;

    if (!userTokken) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    // Fase 1: Insertar el proyecto principal
    const sqlProject = `INSERT INTO PROYECTO (nombreProyecto, descripcionProyecto, urlProyecto, urlGitHub, imgPortada) VALUES (?, ?, ?, ?, ?)`;
    const [result]: any = await db.execute(sqlProject, [
      nombreProyecto,
      descripcionProyecto,
      urlProyecto,
      urlGitHub,
      imgPortada,
    ]);
    const newProjectId = result.insertId;

    // Fase 2: Registrar la relación de propiedad (El creador es el dueño)
    const sqlRelation = `INSERT INTO USUARIO_PROYECTO (tokken, proyectoId) VALUES (?, ?)`;
    await db.execute(sqlRelation, [userTokken, newProjectId]);

    return res.status(201).json({
      message: "Proyecto creado y asignado correctamente",
      id: newProjectId,
    });
  } catch (err) {
    console.error("Error al crear proyecto:", err);
    return res.status(500).json({ error: "Error interno al crear proyecto" });
  }
}

/**
 * Lista todos los proyectos (Endpoint público).
 */
export async function listProjects(req: AuthRequest, res: Response) {
  try {
    const [rows] = await db.execute("SELECT * FROM PROYECTO");
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ error: "Error al listar proyectos" });
  }
}

/**
 * Actualiza un proyecto.
 * Verificamos que el usuario que intenta editar sea miembro del proyecto.
 */
export async function updateProject(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const userTokken = req.user?.tokken;
    const { nombreProyecto, descripcionProyecto } = req.body;

    if (!userTokken) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    // Seguridad: Verificación de pertenencia
    const [perms]: any[] = await db.execute(
      "SELECT * FROM USUARIO_PROYECTO WHERE tokken = ? AND proyectoId = ?",
      [userTokken, id]
    );

    if (perms.length === 0) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para editar este proyecto" });
    }

    // Si tiene permiso, procedemos con la actualización
    const sqlUpdate = `UPDATE PROYECTO SET nombreProyecto = ?, descripcionProyecto = ? WHERE id = ?`;
    await db.execute(sqlUpdate, [nombreProyecto, descripcionProyecto, id]);

    return res.json({ message: "Proyecto actualizado correctamente" });
  } catch (err) {
    console.error("Error al actualizar proyecto:", err);
    return res.status(500).json({ error: "Error interno al actualizar" });
  }
}
