import { Request, Response } from "express";
import db from "../db/index.js";

/**
 * Controladores para gestionar las relaciones entre las entidades del sistema (N:M).
 */

/**
 * Vincula un proyecto existente a un usuario.
 */
export async function assignProjectToUser(req: Request, res: Response) {
  try {
    const { tokken, proyectoId } = req.body;
    await db.execute(
      "INSERT INTO USUARIO_PROYECTO (tokken, proyectoId) VALUES (?, ?)",
      [tokken, proyectoId]
    );
    res.status(201).json({ message: "Proyecto asignado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno al asignar proyecto" });
  }
}

/**
 * Recupera todos los proyectos asociados a un usuario específico mediante su token.
 */
export async function getProjectsByUser(req: Request, res: Response) {
  try {
    const { tokken } = req.params;
    const [rows] = await db.execute(
      `SELECT p.* 
       FROM PROYECTO p 
       JOIN USUARIO_PROYECTO up ON p.id = up.proyectoId 
       WHERE up.tokken = ?`,
      [tokken]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno al recuperar proyectos" });
  }
}

/**
 * Asigna un ROL (permisos) a un usuario.
 */
export async function assignRolToUser(req: Request, res: Response) {
  try {
    const { rolId, tokken } = req.body;
    await db.execute("INSERT INTO ROL_USUARIO (rolId, tokken) VALUES (?, ?)", [
      rolId,
      tokken,
    ]);
    res.json({ message: "Rol asignado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno al asignar rol" });
  }
}

/**
 * Vincula un Título académico a un Centro Educativo.
 */
export async function assignTituloToCentro(req: Request, res: Response) {
  try {
    const { centroId, tituloId } = req.body;
    await db.execute(
      "INSERT INTO CENTRO_TITULO (centroId, tituloId) VALUES (?, ?)",
      [centroId, tituloId]
    );
    res.json({ message: "Título vinculado al centro" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno" });
  }
}

/**
 * Vincula un Curso a un Título.
 */
export async function assignCursoToTitulo(req: Request, res: Response) {
  try {
    const { tituloId, cursoId } = req.body;
    await db.execute(
      "INSERT INTO TITULO_CURSO (tituloId, cursoId) VALUES (?, ?)",
      [tituloId, cursoId]
    );
    res.json({ message: "Curso vinculado al título" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno" });
  }
}

/**
 * Vincula un Módulo a un Curso.
 */
export async function assignModuloToCurso(req: Request, res: Response) {
  try {
    const { cursoId, moduloId } = req.body;
    await db.execute(
      "INSERT INTO CURSO_MODULO (cursoId, moduloId) VALUES (?, ?)",
      [cursoId, moduloId]
    );
    res.json({ message: "Módulo vinculado al curso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error interno" });
  }
}
