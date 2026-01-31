import db from "../db/index.js";
import { User } from "../types.js";

/**
 * Funciones de acceso a datos para la tabla USUARIO.
 */

/**
 * Crea un nuevo usuario en la base de datos.
 * @param user Objeto con los datos del usuario (tokken ya generado, password ya hasheada)
 * @returns Datos del usuario creado
 */
export async function createUser({ tokken, userName, passwrd, email }: User) {
  const fecCreacion = new Date(); // Fecha de registro actual
  const sql =
    "INSERT INTO USUARIO (tokken, userName, passwrd, email, fecCreacion) VALUES (?, ?, ?, ?, ?)";

  // Ejecutamos la inserción. await asegura que esperamos a que la DB responda.
  await db.execute(sql, [tokken, userName, passwrd, email, fecCreacion]);

  return { tokken, userName, email, fecCreacion };
}

/**
 * Busca un usuario por su nombre de usuario único.
 * Utilizado principalmente durante el login.
 */
export async function findUserByUsername(
  userName: string
): Promise<User | undefined> {
  const [rows] = await db.execute("SELECT * FROM USUARIO WHERE userName = ?", [
    userName,
  ]);
  // Casteamos el resultado a la interfaz User y devolvemos la primera fila encontrada
  return (rows as User[])[0];
}

/**
 * Busca un usuario por su token UUID.
 * Utilizado por el authMiddleware para validar sesiones.
 */
export async function findUserByTokken(
  tokken: string
): Promise<User | undefined> {
  const [rows] = await db.execute("SELECT * FROM USUARIO WHERE tokken = ?", [
    tokken,
  ]);
  return (rows as User[])[0];
}
