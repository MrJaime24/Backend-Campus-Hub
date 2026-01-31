import db from "../db/index.js";
import { CentroEducativo } from "../types.js";

/**
 * Gestión de Centros Educativos en la base de datos.
 */

/**
 * Registra un nuevo centro.
 * @returns El ID (autoincremental) generado por MySQL.
 */
export async function createCentro(
  nombreCentro: string,
  sufijoEmail: string
): Promise<number> {
  const [r]: any = await db.execute(
    "INSERT INTO CENTRO_EDUCATIVO (nombreCentro, sufijoEmail) VALUES (?, ?)",
    [nombreCentro, sufijoEmail]
  );
  return r.insertId;
}

/**
 * Obtiene el listado completo de centros registrados.
 */
export async function getCentros(): Promise<CentroEducativo[]> {
  const [rows] = await db.execute("SELECT * FROM CENTRO_EDUCATIVO");
  return rows as CentroEducativo[];
}

/**
 * Actualiza los datos de un centro existente.
 */
export async function updateCentro(
  id: number,
  nombreCentro: string,
  sufijoEmail: string
): Promise<void> {
  await db.execute(
    "UPDATE CENTRO_EDUCATIVO SET nombreCentro = ?, sufijoEmail = ? WHERE id = ?",
    [nombreCentro, sufijoEmail, id]
  );
}

/**
 * Elimina un centro por su ID.
 */
export async function deleteCentro(id: number): Promise<void> {
  await db.execute("DELETE FROM CENTRO_EDUCATIVO WHERE id = ?", [id]);
}
