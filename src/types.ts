/**
 * Definiciones de interfaces globales.
 * Estas interfaces aseguran que los datos que fluyen por la aplicación
 * tengan la estructura correcta, facilitando el autocompletado y evitando errores.
 */

export interface User {
  id?: number;
  tokken: string; // UUID único generado en el registro
  userName: string;
  passwrd: string; // Almacena el hash de la contraseña (bcrypt)
  email: string;
  fecCreacion?: Date;
}

export interface CentroEducativo {
  id?: number;
  nombreCentro: string;
  sufijoEmail: string; // Ejemplo: "@universidad.es"
}

export interface Curso {
  id?: number;
  numCurso: number; // Ejemplo: 1, 2...
}

export interface Modulo {
  id?: number;
  nombreModulo: string;
}

export interface Rol {
  id?: number;
  nombreGrupo: string;
  permisos: string; // Almacenados como texto (ej: "CRUD", "READ")
}

export interface Titulo {
  id?: number;
  nombreTitulo: string;
}
