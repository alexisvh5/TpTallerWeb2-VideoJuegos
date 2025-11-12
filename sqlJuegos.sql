
CREATE TABLE "Juego" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(255) NOT NULL,
    "anio" INTEGER NOT NULL,
    "descripcion" TEXT,
    "desarrollador" VARCHAR(255),
    "precio" DECIMAL(10, 2) NOT NULL DEFAULT 0.00 CHECK (precio >= 0)
);

CREATE TABLE "Genero" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE "_JuegoGenero" (
    "A" INTEGER NOT NULL REFERENCES "Juego"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "B" INTEGER NOT NULL REFERENCES "Genero"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ("A", "B")
);

CREATE TABLE "Usuario"(
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(255) NOT NULL,
    "apellido" VARCHAR(255) NOT NULL,
    "direccion" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "contrasenia" VARCHAR(255) NOT NULL
);

ALTER TABLE "Usuario"
ADD COLUMN "rol" VARCHAR(20) NOT NULL DEFAULT 'USER';

CREATE TABLE "Carrito"(
    "id" SERIAL PRIMARY KEY,
    "idUsuario" INTEGER NOT NULL UNIQUE REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "_CarritoJuego" (
    "A" INTEGER NOT NULL REFERENCES "Carrito"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "B" INTEGER NOT NULL REFERENCES "Juego"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ("A", "B")
);

CREATE TABLE "Compra" (
    "id" SERIAL PRIMARY KEY,
    "idUsuario" INTEGER NOT NULL REFERENCES "Usuario"("id"),
    "fecha" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "totalPagado" DECIMAL(10, 2) NOT NULL 
);

CREATE TABLE "ItemCompra" (
    "id" SERIAL PRIMARY KEY,
    "idCompra" INTEGER NOT NULL REFERENCES "Compra"("id") ON DELETE CASCADE,
    "idJuego" INTEGER NOT NULL REFERENCES "Juego"("id"),
    "precioAlComprar" DECIMAL(10, 2) NOT NULL 
);



INSERT INTO "Genero" ("nombre") VALUES ('RPG'), ('ACCION'), ('AVENTURA'), ('ESTRATEGIA');
-- los generos en mayuscula y sin tilde


INSERT INTO "Juego" ("nombre", "anio", "descripcion", "desarrollador", "precio") VALUES
('The Witcher 3: Wild Hunt', 2015, 'Un juego de rol de mundo abierto...', 'CD Projekt Red', 49.99),
('God of War', 2018, 'Kratos se aventura en el mundo nórdico...', 'Santa Monica Studio', 59.99),
('The Legend of Zelda: Breath of the Wild', 2017, 'Explora un vasto reino de Hyrule...', 'Nintendo', 59.99),
('Age of Empires II', 1999, 'Juego de estrategia en tiempo real...', 'Ensemble Studios', 19.99),
('Assassin s Creed Shadows', 2025, 'Assassin s Creed Shadows es un videojuego de acción-aventura de mundo abierto y sigilo', 'Ubisoft', 79.99);

-- Conectar géneros (Asumimos IDs 1-4 para juegos, 1-4 para géneros)
INSERT INTO "_JuegoGenero" ("A", "B") VALUES 
(1, 1), -- Witcher = RPG
(1, 3), -- Witcher = Aventura
(2, 2), -- God of War = Acción
(2, 3), -- God of War = Aventura
(3, 3), -- Zelda = Aventura
(4, 4); -- Age of Empires = Estrategia


-- ########## PASO 1: CREAR USUARIOS ##########
INSERT INTO "Usuario" ("nombre", "apellido", "direccion", "email", "contrasenia") VALUES
('Juan', 'Pérez', 'Calle Falsa 123', 'juan.perez@email.com', 'hash_simulado_de_juan'),
('Ana', 'Gómez', 'Avenida Siempre Viva 742', 'ana.gomez@email.com', 'hash_simulado_de_ana');
-- Asumimos Juan ID 1, Ana ID 2

-- contraseña: 1234
INSERT INTO "Usuario" ("nombre", "apellido", "direccion", "email", "contrasenia", "rol") VALUES
('Admin', 'Test', '-', 'Admin@test.com', '$2b$10$i4C5COxkl4LGP9FWkaJ4/.u18j7p3Z6e2QXYRIBBCZNdqer.j6xuC', 'ADMIN'),

-- ########## PASO 2: CREAR CARRITOS ##########
INSERT INTO "Carrito" ("idUsuario") VALUES (1), (2);
-- Asumimos Carrito Juan ID 1, Carrito Ana ID 2

-- ########## PASO 3: AÑADIR JUEGOS A LOS CARRITOS ##########
-- Juan (Carrito ID 1) añade "The Witcher 3" (ID 1) y "Age of Empires II" (ID 4)
INSERT INTO "_CarritoJuego" ("A", "B") VALUES (1, 1), (1, 4);

-- Ana (Carrito ID 2) añade "God of War" (ID 2)
INSERT INTO "_CarritoJuego" ("A", "B") VALUES (2, 2);


-- ########## PASO 4: SIMULAR COMPRA DE JUAN (¡Con precios calculados!) ##########
BEGIN;

-- 1. Crear el recibo (Compra) para Juan (Usuario ID 1)
--    CALCULAMOS EL TOTAL sumando los precios de los juegos en su carrito (Carrito ID 1)
INSERT INTO "Compra" ("idUsuario", "totalPagado")
SELECT
    1, -- ID de Juan (Usuario)
    SUM(j."precio") -- <--- AQUÍ SE CALCULA EL TOTAL
FROM
    "_CarritoJuego" cj
JOIN "Juego" j ON cj."B" = j."id"
WHERE
    cj."A" = 1 -- ID del Carrito de Juan
RETURNING "id"; -- Supongamos que esto devuelve el ID de Compra: 1

-- 2. Mover los items a "ItemCompra"
--    CALCULAMOS el 'precioAlComprar' buscando el precio en la tabla 'Juego'
--    Asumimos que el ID de Compra devuelto en el paso 1 fue '1'
INSERT INTO "ItemCompra" ("idCompra", "idJuego", "precioAlComprar")
SELECT
    1, -- El ID de Compra que obtuvimos (reemplazar por el ID real si no es 1)
    cj."B", -- El ID del Juego (columna B)
    j."precio" -- <--- AQUÍ SE OBTIENE EL PRECIO DE CADA JUEGO
FROM
    "_CarritoJuego" cj
JOIN "Juego" j ON cj."B" = j."id"
WHERE
    cj."A" = 1; -- ID del Carrito de Juan

-- 3. Vaciar el carrito de Juan (Carrito ID 1).
DELETE FROM "_CarritoJuego" WHERE "A" = 1;

COMMIT;