Markdown# Backend API - Proyecto Integrado

Este repositorio contiene el servidor Backend (Node.js + TypeScript) para la gestión del Proyecto Integrado. El sistema administra usuarios, roles, centros educativos y proyectos, proporcionando una API RESTful segura.

## 🛠️ Tecnologías

* **Runtime:** Node.js
* **Lenguaje:** TypeScript
* **Base de Datos:** MySQL / MariaDB
* **ORM/Query Builder:** MySQL2 (Consultas SQL directas)
* **Autenticación:** JWT (JSON Web Tokens)
* **Seguridad:** bcryptjs (Hashing de contraseñas)

---

## 🚀 Instalación y Puesta en Marcha

### 1. Prerrequisitos
* Tener instalado **Node.js**.
* Tener instalado **XAMPP** (o cualquier servidor MySQL).
* Tener un cliente de API (Postman, Insomnia) para pruebas.

### 2. Instalación de dependencias
Clona el repositorio y ejecuta:

```bash
npm install
3. Configuración de la Base de DatosEl sistema requiere una base de datos MySQL llamada proyecto_integrado.Abre tu gestor de base de datos (ej. phpMyAdmin).Crea una base de datos nueva llamada proyecto_integrado.Importa el archivo proyecto_integrado.sql que se encuentra en la raíz de este proyecto (o ejecuta el script SQL de creación de tablas).Asegúrate de que la configuración de conexión en tu código (normalmente en src/database.ts o .env) coincida con tus credenciales locales (usuario root, sin contraseña por defecto en XAMPP).4. Ejecutar el servidorPara iniciar el entorno de desarrollo:Bashnpm run dev
El servidor escuchará por defecto en http://localhost:3000.🔐 Sistema de Usuarios y AutenticaciónEl sistema utiliza un modelo de seguridad basado en Roles y Tokens.Roles DisponiblesLos roles están definidos en la tabla rol de la base de datos:Administrador (A): Acceso total.Gestor (G): Puede gestionar proyectos y usuarios.Profesor (P): Gestión académica.Usuario (U): Acceso básico.⚠️ IMPORTANTE: Diferencia entre TokensPara evitar confusiones durante el desarrollo, distingue bien estos dos conceptos:JWT (Authorization Header):Es el token largo que empieza por eyJ....Se obtiene al hacer Login.Uso: Se debe enviar en los Headers de cada petición privada (Authorization: Bearer <token>) para tener permiso de entrada.UUID (User Token/ID):Es el identificador único del usuario en la BBDD (columna tokken). Ejemplo: a09e0645-d25a....Uso: Se utiliza en el Body (JSON) de las peticiones cuando necesitas identificar a un usuario específico (ej: asignar un usuario a un proyecto).👤 Credenciales de Acceso (Admin)Para la primera configuración y pruebas, utiliza el usuario Administrador pre-creado en la base de datos:CampoValorEmailadmin@test.comContraseña123456📡 Endpoints PrincipalesAquí tienes una lista rápida de las rutas más importantes para probar en Postman.AutenticaciónLoginObtiene el JWT de acceso.Método: POSTURL: /api/auth/loginBody:JSON{
  "email": "admin@test.com",
  "password": "123456"
}
UsuariosCrear Gestor (Requiere Auth Admin)Crea un nuevo usuario con rol de gestor.Método: POSTURL: /api/users/create (Ruta aproximada, verificar en router)Header: Authorization: <JWT del Admin>Body:JSON{
  "userName": "Nuevo Gestor",
  "email": "gestor@test.com",
  "password": "123456",
  "rolId": 2
}
ProyectosCrear ProyectoMétodo: POSTURL: /api/projectsHeader: Authorization: <JWT>Body:JSON{
  "nombreProyecto": "Proyecto Demo",
  "descripcionProyecto": "Descripción del proyecto...",
  "urlProyecto": "http://...",
  "urlGitHub": "http://...",
  "imgPortada": "imagen.jpg"
}
Asignar Usuario a ProyectoVincula un usuario existente a un proyecto.Método: POSTURL: /api/projects/assign (o ruta correspondiente)Header: Authorization: <JWT>Body:JSON{
  "proyectoId": 1,
  "userTokkenToAssign": "a09e0645-d25a..." // UUID del usuario (NO el JWT)
}
📂 Estructura de la Base de DatosLas tablas principales son:usuario: Contiene los datos de acceso y el UUID (tokken).rol: Define los permisos (Admin, Gestor, etc.).rol_usuario: Tabla intermedia para asignar roles a usuarios.proyecto: Almacena la info de los proyectos.usuario_proyecto: Relaciona usuarios con proyectos (N:M).
