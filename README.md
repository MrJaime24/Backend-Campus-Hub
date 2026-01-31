# BackCampusHub

**BackCampusHub** es el motor backend para la plataforma de gestión académica CampusHub. Desarrollado con **Node.js** y **TypeScript**, proporciona una API robusta y escalable para gestionar usuarios, proyectos, centros educativos y sus relaciones jerárquicas.

## ✨ Características

- 🔐 **Autenticación Segura**: Sistema de registro y login con hashing de contraseñas mediante `bcrypt` y tokens basados en UUID.
- 🏗️ **Arquitectura Limpia**: Organización basada en Controladores, Modelos y Rutas para una fácil mantenibilidad.
- 📊 **Gestión de Datos**: Completa API para gestionar Centros, Títulos, Cursos, Módulos y Roles.
- 🤝 **Sistema de Relaciones**: Gestión de relaciones N:M entre usuarios, proyectos y entidades académicas.
- 🛡️ **Seguridad con TypeScript**: Tipado estricto para reducir errores en tiempo de ejecución.

## 🛠️ Tecnologías

- **Entorno**: Node.js
- **Lenguaje**: TypeScript (ES Modules)
- **Framework**: Express.js
- **Base de Datos**: MySQL (utilizando `mysql2/promise`)
- **Seguridad**: Bcrypt, UUID, Dotenv
- **Desarrollo**: TSX (Hot Reloading), TSC (Compilador de TS)

## 🚀 Instalación y Uso

### Requisitos previos

- Node.js (v18 o superior recomendado)
- Servidor MySQL (XAMPP recomendable)

### Configuración

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno:
   Renombra o crea un archivo `.env` basado en el siguiente ejemplo:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_contraseña
   DB_NAME=proyecto_integrado
   ```
4. Base de Datos:
   Importa el esquema SQL ubicado en `src/sql/schema.sql` en tu base de datos MySQL.

### Scripts disponibles

- **Desarrollo**: `npm run dev` (Inicia el servidor con recarga automática).
- **Construcción**: `npm run build` (Compila TypeScript a la carpeta `dist/`).
- **Producción**: `npm start` (Ejecuta el código compilado).

## 📁 Estructura del Proyecto

```text
├── src/
│   ├── controllers/ # Lógica de los endpoints
│   ├── models/      # Consultas a la base de datos
│   ├── routes/       # Definición de rutas de la API
│   ├── middleware/   # Middlewares (Autenticación, etc.)
│   ├── sql/          # Esquema de la base de datos
│   ├── utils/        # Funciones de utilidad (hashing, etc.)
│   └── types.ts      # Definiciones de interfaces globales
├── server.ts         # Punto de entrada de la aplicación
├── db.ts             # Configuración del pool de la base de datos
├── tsconfig.json     # Configuración de TypeScript
└── package.json      # Dependencias y scripts
```
