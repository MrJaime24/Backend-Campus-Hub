import db from "../db/index.js";
import { Titulo } from "../types.js";

/**
 * Gestión de Títulos Académicos (ej: DAW, ASIR, Bachillerato).
 */

/**
 * Crea un nuevo título en el sistema.
 */
export async function createTitulo(nombreTitulo: string): Promise<number> {
  const [r]: any = await db.execute(
    "INSERT INTO TITULO (nombreTitulo) VALUES (?)",
    [nombreTitulo]
  );
  return r.insertId;
}

/**
 * Lista todos los títulos registrados.
 */
export async function getTitulos(): Promise<Titulo[]> {
  const [rows] = await db.execute("SELECT * FROM TITULO");
  return rows as Titulo[];
}

/**
 * Actualiza el nombre de un título académico.
 */
export async function updateTitulo(
  id: number,
  nombreTitulo: string
): Promise<void> {
  await db.execute("UPDATE TITULO SET nombreTitulo = ? WHERE id = ?", [
    nombreTitulo,
    id,
  ]);
}

/**
 * Elimina un título del sistema.
 */
export async function deleteTitulo(id: number): Promise<void> {
  await db.execute("DELETE FROM TITULO WHERE id = ?", [id]);
}
