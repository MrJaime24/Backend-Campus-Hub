import db from "../db/index.js";
import { Curso } from "../types.js";

/**
 * Gestión de Cursos (ej: 1º, 2º...) en la base de datos.
 */

export async function createCurso(numCurso: number): Promise<number> {
  const [r]: any = await db.execute("INSERT INTO CURSO (numCurso) VALUES (?)", [
    numCurso,
  ]);
  return r.insertId;
}

export async function getCursos(): Promise<Curso[]> {
  const [rows] = await db.execute("SELECT * FROM CURSO");
  return rows as Curso[];
}

export async function updateCurso(id: number, numCurso: number): Promise<void> {
  await db.execute("UPDATE CURSO SET numCurso = ? WHERE id = ?", [
    numCurso,
    id,
  ]);
}

export async function deleteCurso(id: number): Promise<void> {
  await db.execute("DELETE FROM CURSO WHERE id = ?", [id]);
}
