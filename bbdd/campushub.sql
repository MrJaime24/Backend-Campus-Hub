-- 1. EMPEZAMOS DE CERO (Borrar si existe y crear nueva)
DROP DATABASE IF EXISTS proyecto_integrado;
CREATE DATABASE proyecto_integrado CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE proyecto_integrado;

-- 2. CREACIÓN DE TABLAS (Estructura original corregida)

CREATE TABLE `centro_educativo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombreCentro` varchar(255) NOT NULL,
  `sufijoEmail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombreCentro` (`nombreCentro`)
) ENGINE=InnoDB;

CREATE TABLE `titulo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombreTitulo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `centro_titulo` (
  `centroId` int(11) NOT NULL,
  `tituloId` int(11) NOT NULL,
  PRIMARY KEY (`centroId`,`tituloId`),
  KEY `tituloId` (`tituloId`)
) ENGINE=InnoDB;

CREATE TABLE `curso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numCurso` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `modulo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombreModulo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombreModulo` (`nombreModulo`)
) ENGINE=InnoDB;

CREATE TABLE `curso_modulo` (
  `cursoId` int(11) NOT NULL,
  `moduloId` int(11) NOT NULL,
  PRIMARY KEY (`cursoId`,`moduloId`),
  KEY `moduloId` (`moduloId`)
) ENGINE=InnoDB;

CREATE TABLE `titulo_curso` (
  `tituloId` int(11) NOT NULL,
  `cursoId` int(11) NOT NULL,
  PRIMARY KEY (`tituloId`,`cursoId`),
  KEY `cursoId` (`cursoId`)
) ENGINE=InnoDB;

CREATE TABLE `usuario` (
  `tokken` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `passwrd` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fecCreacion` datetime NOT NULL,
  PRIMARY KEY (`tokken`)
) ENGINE=InnoDB;

CREATE TABLE `rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombreGrupo` varchar(50) NOT NULL,
  `permisos` char(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombreGrupo` (`nombreGrupo`)
) ENGINE=InnoDB;

CREATE TABLE `rol_usuario` (
  `rolId` int(11) NOT NULL,
  `tokken` varchar(255) NOT NULL,
  PRIMARY KEY (`rolId`,`tokken`),
  KEY `tokken` (`tokken`)
) ENGINE=InnoDB;

CREATE TABLE `proyecto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombreProyecto` varchar(255) NOT NULL,
  `descripcionProyecto` varchar(255) NOT NULL,
  `urlProyecto` varchar(255) NOT NULL,
  `urlGitHub` varchar(255) NOT NULL,
  `imgPortada` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `proyecto_centro` (
  `proyectoId` int(11) NOT NULL,
  `centroId` int(11) NOT NULL,
  PRIMARY KEY (`proyectoId`,`centroId`),
  KEY `centroId` (`centroId`)
) ENGINE=InnoDB;

CREATE TABLE `usuario_proyecto` (
  `tokken` varchar(255) NOT NULL,
  `proyectoId` int(11) NOT NULL,
  `creadorProyecto` tinyint(1) NOT NULL,
  PRIMARY KEY (`tokken`,`proyectoId`),
  KEY `proyectoId` (`proyectoId`)
) ENGINE=InnoDB;

CREATE TABLE `peticiones` (
  `token` varchar(36) NOT NULL,
  `Rol` int(1) NOT NULL,
  PRIMARY KEY (`token`)
) ENGINE=InnoDB;

-- 3. RELACIONES (Foreign Keys)

ALTER TABLE `centro_titulo`
  ADD CONSTRAINT `centro_titulo_ibfk_1` FOREIGN KEY (`centroId`) REFERENCES `centro_educativo` (`id`),
  ADD CONSTRAINT `centro_titulo_ibfk_2` FOREIGN KEY (`tituloId`) REFERENCES `titulo` (`id`);

ALTER TABLE `curso_modulo`
  ADD CONSTRAINT `curso_modulo_ibfk_1` FOREIGN KEY (`cursoId`) REFERENCES `curso` (`id`),
  ADD CONSTRAINT `curso_modulo_ibfk_2` FOREIGN KEY (`moduloId`) REFERENCES `modulo` (`id`);

ALTER TABLE `titulo_curso`
  ADD CONSTRAINT `titulo_curso_ibfk_1` FOREIGN KEY (`tituloId`) REFERENCES `titulo` (`id`),
  ADD CONSTRAINT `titulo_curso_ibfk_2` FOREIGN KEY (`cursoId`) REFERENCES `curso` (`id`);

ALTER TABLE `rol_usuario`
  ADD CONSTRAINT `rol_usuario_ibfk_1` FOREIGN KEY (`rolId`) REFERENCES `rol` (`id`),
  ADD CONSTRAINT `rol_usuario_ibfk_2` FOREIGN KEY (`tokken`) REFERENCES `usuario` (`tokken`) ON DELETE CASCADE;

ALTER TABLE `proyecto_centro`
  ADD CONSTRAINT `proyecto_centro_ibfk_1` FOREIGN KEY (`proyectoId`) REFERENCES `proyecto` (`id`),
  ADD CONSTRAINT `proyecto_centro_ibfk_2` FOREIGN KEY (`centroId`) REFERENCES `centro_educativo` (`id`);

ALTER TABLE `usuario_proyecto`
  ADD CONSTRAINT `usuario_proyecto_ibfk_1` FOREIGN KEY (`tokken`) REFERENCES `usuario` (`tokken`) ON DELETE CASCADE,
  ADD CONSTRAINT `usuario_proyecto_ibfk_2` FOREIGN KEY (`proyectoId`) REFERENCES `proyecto` (`id`);

-- 4. INSERTAR DATOS INICIALES NECESARIOS

-- Roles (El backend espera estos nombres exactos)
INSERT INTO `rol` (`id`, `nombreGrupo`, `permisos`) VALUES
(1, 'Administrador', 'A'),
(2, 'Gestor', 'G'),
(3, 'Profesor', 'P'),
(4, 'Usuario', 'U');

-- Usuario Administrador por defecto
-- Usuario: admin@test.com
-- Contraseña: 123456
INSERT INTO `usuario` (`tokken`, `userName`, `passwrd`, `email`, `fecCreacion`) VALUES
('admin-uuid-super-secret', 'Super Admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOcd7qa8q.Rl2', 'admin@test.com', NOW());

-- Asignar Rol de Administrador (ID 1) al usuario creado
INSERT INTO `rol_usuario` (`tokken`, `rolId`) VALUES ('admin-uuid-super-secret', 1);