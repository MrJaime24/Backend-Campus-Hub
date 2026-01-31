import bcrypt from "bcrypt";

/**
 * Utilidades para la gestión de contraseñas.
 * Utilizamos 'bcrypt' para asegurar que nunca guardamos contraseñas en texto plano.
 */

/**
 * Encripta una contraseña utilizando un algoritmo de hash con sal (salt).
 * @param password Contraseña en texto plano
 * @returns Promesa con el hash generado
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // Nivel de seguridad (coste) del algoritmo
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Compara una contraseña en texto plano con un hash almacenado.
 * @param password Contraseña enviada por el usuario
 * @param hashed Hash recuperado de la base de datos
 * @returns True si coinciden, False en caso contrario
 */
export async function comparePassword(
  password: string,
  hashed: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashed);
}
