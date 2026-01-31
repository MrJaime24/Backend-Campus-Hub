Markdown
# 📘 Backend API - Proyecto Integrado

Este repositorio contiene la API RESTful desarrollada en **Node.js con TypeScript** para la gestión integral del Proyecto. El sistema administra usuarios, control de acceso basado en roles (RBAC), gestión de centros educativos y proyectos colaborativos.

---

## 🛠️ Stack Tecnológico

| Tecnología | Descripción |
| :--- | :--- |
| **Node.js** | Entorno de ejecución. |
| **TypeScript** | Superset tipado de JavaScript. |
| **Express** | Framework de servidor web. |
| **MySQL / MariaDB** | Base de datos relacional. |
| **JWT (JsonWebToken)** | Seguridad y autenticación de sesiones. |
| **Bcrypt.js** | Encriptado de contraseñas. |

---

## ⚙️ Configuración e Instalación

### 1. Variables de Entorno (.env)
El proyecto requiere un archivo `.env` en la raíz para funcionar. Si no existe, créalo con la siguiente configuración estándar:

```properties
# Servidor
PORT=3000

# Base de Datos (Ajustar según tu XAMPP/MAMP)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=proyecto_integrado
DB_PORT=3306

# Seguridad
JWT_SECRET=tu_secreto_super_seguro_cambiar_esto
SALT_ROUNDS=10
2. Instalación de Dependencias
Ejecuta el siguiente comando para descargar las librerías necesarias:

Bash
npm install
3. Base de Datos (MySQL)
El sistema depende de la base de datos proyecto_integrado.

Asegúrate de tener MySQL corriendo (XAMPP/WAMP).

Crea la base de datos vacía: CREATE DATABASE proyecto_integrado;

Importa el script proyecto_integrado.sql incluido en este repositorio.

🔑 Credenciales y Accesos
Super-Admin (Pre-instalado)
Utiliza estas credenciales para el primer inicio de sesión y para crear al resto de usuarios.

Email: admin@test.com

Contraseña: 123456

⚠️ Conceptos Críticos: TOKEN vs UUID
Para evitar errores durante el desarrollo o pruebas en Postman, es vital distinguir los dos tipos de "tokens" que maneja el sistema:

JWT (Access Token):

Formato: eyJhbGciOiJIUzI1NiIsIn... (Cadena muy larga).

Origen: Se obtiene al hacer /login.

Uso: Se coloca en el HEADER (Authorization) de las peticiones. Es la "llave" para entrar.

UUID (User ID):

Formato: a09e0645-d25a-403c... (Cadena corta con guiones).

Origen: Es la columna tokken en la base de datos usuario.

Uso: Se coloca en el BODY (JSON) cuando quieres asignar o referenciar a un usuario específico (ej: asignar un gestor a un proyecto).

📡 Documentación de Endpoints
1. Autenticación (/api/auth)
Iniciar Sesión
Genera el JWT necesario para usar el resto de la API.

Método: POST

URL: /login

Body:

JSON
{
  "email": "admin@test.com",
  "password": "123456"
}
2. Gestión de Usuarios (/api/users o /api/admin)
Crear Nuevo Usuario (Gestor/Profesor)
Requiere ser Administrador.

Método: POST

Header: Authorization: <JWT_DEL_ADMIN>

Body:

JSON
{
  "userName": "Nombre Gestor",
  "email": "gestor@empresa.com",
  "password": "123456",
  "rolId": 2  
  // 1:Admin, 2:Gestor, 3:Profesor, 4:Usuario
}
Listar Todos los Usuarios
Método: GET

Header: Authorization: <JWT>

3. Gestión de Proyectos (/api/projects)
Crear Proyecto
Método: POST

Header: Authorization: <JWT>

Body:

JSON
{
  "nombreProyecto": "Web Corporativa",
  "descripcionProyecto": "Desarrollo fullstack...",
  "urlProyecto": "[https://miweb.com](https://miweb.com)",
  "urlGitHub": "[https://github.com/repo](https://github.com/repo)",
  "imgPortada": "url_imagen.jpg"
}
Asignar Usuario a Proyecto
Vincula un usuario existente a un proyecto específico.

Método: POST

URL: /assign (o /add-user según router)

Header: Authorization: <JWT>

Body:

JSON
{
  "proyectoId": 1,
  "userTokkenToAssign": "a09e0645-d25a-403c-91a6-33514f0bbf5" 
  // NOTA: Aquí va el UUID del usuario, NO el JWT.
}
Obtener Proyectos
Método: GET

URL: / (Lista todos o los propios, según rol)

4. Centros Educativos (/api/centers)
Crear Centro
Método: POST

Header: Authorization: <JWT>

Body:

JSON
{
  "nombreCentro": "IES Tecnológico",
  "sufijoEmail": "@ies.com"
}
🐛 Solución de Problemas Frecuentes
Error 1932: "Table doesn't exist in engine"
Indica corrupción en los archivos de XAMPP/MySQL.

Solución:

Detener MySQL.

Ir a C:\xampp\mysql\data\ y borrar la carpeta de la base de datos.

Reiniciar MySQL y volver a importar el SQL.

Error de "Password Incorrecta" tras importar
Si el hash generado en otro PC no es compatible:

Solución: Generar un nuevo hash ejecutando este script temporal en Node.js y actualizar la BBDD manualmente:

JavaScript
const bcrypt = require('bcryptjs');
console.log(bcrypt.hashSync("123456", 10));
Error: "Token Inválido" al crear recursos
Causa: Estás enviando el UUID del usuario en el Header Authorization.

Solución: En el Header Authorization siempre debe ir el token largo (eyJ...) que recibiste al hacer Login.
