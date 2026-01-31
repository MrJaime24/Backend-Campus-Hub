import db from "../db/index.js";
import { Modulo } from "../types.js";

/**
 * Gestión de Módulos (Asignaturas) en la base de datos.
 */

/**
 * Crea un nuevo módulo educativo.
 */
export async function createModulo(nombreModulo: string): Promise<number> {
  const [r]: any = await db.execute(
    "INSERT INTO MODULO (nombreModulo) VALUES (?)",
    [nombreModulo]
  );
  return r.insertId;
}

/**
 * Obtiene el listado de todos los módulos disponibles.
 */
export async function getModulos(): Promise<Modulo[]> {
  const [rows] = await db.execute("SELECT * FROM MODULO");
  return rows as Modulo[];
}

/**
 * Actualiza el nombre de un módulo.
 */
export async function updateModulo(
  id: number,
  nombreModulo: string
): Promise<void> {
  await db.execute("UPDATE MODULO SET nombreModulo = ? WHERE id = ?", [
    nombreModulo,
    id,
  ]);
}

/**
 * Elimina un módulo por su ID.
 */
export async function deleteModulo(id: number): Promise<void> {
  await db.execute("DELETE FROM MODULO WHERE id = ?", [id]);
}
