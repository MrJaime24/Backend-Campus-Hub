import db from "../db/index.js";
import { Rol } from "../types.js";

/**
 * Gestión de Roles y Permisos en la base de datos.
 * Define qué tipo de usuario es cada uno y qué puede hacer.
 */

/**
 * Registra un nuevo rol.
 * @param nombreGrupo Nombre del grupo (ej: "Administrador", "Estudiante")
 * @param permisos Descripción de permisos (ej: "all", "read_only")
 */
export async function createRol(
  nombreGrupo: string,
  permisos: string
): Promise<number> {
  const [r]: any = await db.execute(
    "INSERT INTO ROL (nombreGrupo, permisos) VALUES (?, ?)",
    [nombreGrupo, permisos]
  );
  return r.insertId;
}

/**
 * Obtiene la lista de todos los roles definidos.
 */
export async function getRoles(): Promise<Rol[]> {
  const [rows] = await db.execute("SELECT * FROM ROL");
  return rows as Rol[];
}

/**
 * Actualiza la información de un rol.
 */
export async function updateRol(
  id: number,
  nombreGrupo: string,
  permisos: string
): Promise<void> {
  await db.execute(
    "UPDATE ROL SET nombreGrupo = ?, permisos = ? WHERE id = ?",
    [nombreGrupo, permisos, id]
  );
}

/**
 * Elimina un rol del sistema.
 */
export async function deleteRol(id: number): Promise<void> {
  await db.execute("DELETE FROM ROL WHERE id = ?", [id]);
}
