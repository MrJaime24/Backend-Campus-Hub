# 📘 Backend API - Proyecto Integrado

![NodeJS](https://img.shields.io/badge/Node.js-18.x-green?style=flat&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)
![Express](https://img.shields.io/badge/Express-4.x-white?style=flat&logo=express)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=flat&logo=mysql)

Este repositorio contiene la API RESTful desarrollada en **Node.js con TypeScript** para la gestión integral del Proyecto. El sistema administra usuarios, control de acceso basado en roles (RBAC), gestión de centros educativos y proyectos colaborativos.

---

## 📋 Tabla de Contenidos

1. [Stack Tecnológico](#-stack-tecnológico)
2. [Configuración e Instalación](#-configuración-e-instalación)
3. [Base de Datos](#-base-de-datos)
4. [Credenciales de Acceso](#-credenciales-y-accesos)
5. [⚠️ Conceptos Críticos (Leer antes de probar)](#-conceptos-críticos-token-vs-uuid)
6. [Documentación de Endpoints](#-documentación-de-endpoints)
7. [Solución de Problemas](#-solución-de-problemas-frecuentes)

---

## 🛠️ Stack Tecnológico

| Tecnología | Tipo | Descripción |
| :--- | :--- | :--- |
| **Node.js** | Runtime | Entorno de ejecución del servidor. |
| **TypeScript** | Lenguaje | Superset tipado de JavaScript para mayor robustez. |
| **Express** | Framework | Gestión de rutas y servidor web. |
| **MySQL / MariaDB** | Base de Datos | Persistencia de datos relacional. |
| **JWT** | Seguridad | Autenticación de sesiones (JsonWebToken). |
| **Bcrypt.js** | Seguridad | Hashing y encriptado de contraseñas. |

---

## ⚙️ Configuración e Instalación

### 1. Variables de Entorno (`.env`)

El proyecto requiere un archivo `.env` en la raíz. Crea uno nuevo y pega la siguiente configuración:

\`\`\`env
# Servidor
PORT=3000

# Base de Datos (Ajustar según tu configuración local XAMPP/MAMP)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=proyecto_integrado
DB_PORT=3306

# Seguridad
JWT_SECRET=tu_secreto_super_seguro_cambiar_esto
SALT_ROUNDS=10
\`\`\`

### 2. Instalación de Dependencias

Ejecuta el siguiente comando en la terminal para descargar las librerías:

\`\`\`bash
npm install
\`\`\`

---

## 🗄️ Base de Datos

El sistema depende de una base de datos MySQL llamada \`proyecto_integrado\`.

1. Asegúrate de tener **MySQL corriendo** (vía XAMPP, WAMP o Docker).
2. Entra a tu gestor SQL y ejecuta:

\`\`\`sql
CREATE DATABASE proyecto_integrado;
\`\`\`

3. Importa el script \`proyecto_integrado.sql\` que se encuentra en la carpeta raíz de este repositorio.

---

## 🔑 Credenciales y Accesos

### Super-Admin (Pre-instalado)
Utiliza estas credenciales para el primer inicio de sesión y para dar de alta al resto de usuarios.

| Campo | Valor |
| :--- | :--- |
| **Email** | \`admin@test.com\` |
| **Contraseña** | \`123456\` |

---

## ⚠️ Conceptos Críticos: TOKEN vs UUID

> **IMPORTANTE PARA DESARROLLADORES:** Para evitar errores 401 o 500 en Postman, distingue siempre estos dos conceptos:

### 1. JWT (Access Token) 🎟️
* **Formato:** Cadena muy larga (\`eyJhbGciOiJIUzI1NiIsIn...\`).
* **Origen:** Lo recibes al hacer **Login**.
* **Dónde se usa:** En el **HEADER** de la petición.
    * Key: \`Authorization\`
    * Value: \`eyJ...\`

### 2. UUID (User ID) 🆔
* **Formato:** Cadena corta con guiones (\`a09e0645-d25a-403c...\`).
* **Origen:** Columna \`tokken\` en la tabla \`usuario\` de la BBDD.
* **Dónde se usa:** En el **BODY (JSON)** de la petición.
    * Se usa para decir "A este usuario (UUID) asígnale este proyecto".

---

## 📡 Documentación de Endpoints

### 1. Autenticación (\`/api/auth\`)

#### Iniciar Sesión
Genera el JWT necesario para usar el resto de la API.

* **Método:** \`POST\`
* **URL:** \`/login\`

\`\`\`json
{
  "email": "admin@test.com",
  "password": "123456"
}
\`\`\`

### 2. Gestión de Usuarios (\`/api/users\` o \`/api/admin\`)

#### Crear Nuevo Usuario (Gestor/Profesor)
*Requiere Rol Administrador.*

* **Método:** \`POST\`
* **Header:** \`Authorization: <JWT_DEL_ADMIN>\`

\`\`\`json
{
  "userName": "Nombre Gestor",
  "email": "gestor@empresa.com",
  "password": "123456",
  "rolId": 2  
  // 1: Admin, 2: Gestor, 3: Profesor, 4: Usuario
}
\`\`\`

#### Listar Todos los Usuarios
* **Método:** \`GET\`
* **Header:** \`Authorization: <JWT>\`

### 3. Gestión de Proyectos (\`/api/projects\`)

#### Crear Proyecto
* **Método:** \`POST\`
* **Header:** \`Authorization: <JWT>\`

\`\`\`json
{
  "nombreProyecto": "Web Corporativa",
  "descripcionProyecto": "Desarrollo fullstack...",
  "urlProyecto": "https://miweb.com",
  "urlGitHub": "https://github.com/repo",
  "imgPortada": "url_imagen.jpg"
}
\`\`\`

#### Asignar Usuario a Proyecto
Vincula un usuario existente a un proyecto específico.

* **Método:** \`POST\`
* **URL:** \`/assign\` (o \`/add-user\` según configuración)
* **Header:** \`Authorization: <JWT>\`

\`\`\`json
{
  "proyectoId": 1,
  "userTokkenToAssign": "a09e0645-d25a-403c-91a6-33514f0bbf5" 
  // ⚠️ NOTA: Aquí va el UUID del usuario, NO el JWT.
}
\`\`\`

#### Obtener Proyectos
Lista todos los proyectos o los asignados al usuario, dependiendo del rol.

* **Método:** \`GET\`
* **URL:** \`/\`

### 4. Centros Educativos (\`/api/centers\`)

#### Crear Centro
* **Método:** \`POST\`
* **Header:** \`Authorization: <JWT>\`

\`\`\`json
{
  "nombreCentro": "IES Tecnológico",
  "sufijoEmail": "@ies.com"
}
\`\`\`

---

## 🐛 Solución de Problemas Frecuentes

### Error 1932: "Table doesn't exist in engine"
Indica corrupción en los archivos de XAMPP/MySQL.
* **Solución:** Detener MySQL → Ir a \`C:\\xampp\\mysql\\data\\\` → Borrar la carpeta de la base de datos → Reiniciar MySQL e importar el SQL de nuevo.

### Error: "Password Incorrecta" tras importar SQL
Si el hash generado en otro PC no es compatible con tu entorno.
* **Solución:** Genera un nuevo hash con este script temporal y actualiza la BBDD manualmente:

\`\`\`javascript
const bcrypt = require('bcryptjs');
console.log(bcrypt.hashSync("123456", 10));
\`\`\`

### Error: "Token Inválido" al crear recursos
Estás enviando el UUID del usuario en el Header Authorization.
* **Solución:** Revisa tus Headers en Postman. En \`Authorization\` siempre debe ir el token largo (eyJ...) que recibiste al hacer Login.
