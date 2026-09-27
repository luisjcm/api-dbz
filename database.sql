-- ==========================================
-- SCRIPT DE INICIALIZACIÓN: DRAGON BALL API
-- ==========================================
-- Instrucciones: 
-- 1. Crea la base de datos manualmente (CREATE DATABASE dbz_api;)
-- 2. Conéctate a dbz_api.
-- 3. Ejecuta todo este script.

-- Eliminamos la tabla si ya existe (ideal para resetear la BD en desarrollo)
DROP TABLE IF EXISTS personajes;

-- Creamos la tabla desde cero
CREATE TABLE personajes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    raza VARCHAR(100) NOT NULL,
    ki INTEGER NOT NULL
);

-- Insertamos los datos iniciales de nuestro universo
INSERT INTO personajes (nombre, raza, ki) VALUES 
('Goku', 'Saiyan', 9000),
('Vegeta', 'Saiyan', 8500),
('Piccolo', 'Namekian', 7000),
('Gohan', 'Half-Saiyan', 7500),
('Frieza', 'Alien', 8000);