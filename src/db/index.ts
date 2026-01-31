import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Cargamos variables de entorno para la conexión
dotenv.config();

/**
 * Creamos un pool de conexiones para MySQL.
 * Un pool permite reutilizar conexiones abiertas, mejorando el rendimiento.
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "proyecto_integrado",
  waitForConnections: true,
  connectionLimit: 10, // Máximo de 10 conexiones simultáneas
  queueLimit: 0, // Sin límite de peticiones en espera
});

/**
 * Función autoejecutable para probar la conexión al inicio del servidor.
 * Ayuda a detectar errores de configuración antes de que lleguen peticiones.
 */
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Conexion a la base de datos establecida correctamente");
    connection.release();
  } catch (err: any) {
    console.error("Error al conectar con la base de datos:", err.message);
  }
}

testConnection();

/**
 * Eventos del Pool: Útiles para monitorizar la salud de las conexiones
 */
(pool as any).on("connection", () => {
  console.log("Nueva conexión al pool establecida");
});

(pool as any).on("error", (err: any) => {
  console.error("Error en el pool de MySQL:", err);
});

export default pool;
