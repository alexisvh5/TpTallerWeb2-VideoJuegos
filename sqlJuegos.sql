
CREATE TABLE "Juego" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(255) NOT NULL,
    "anio" INTEGER NOT NULL,
    "descripcion" TEXT,
    "desarrollador" VARCHAR(255),
    "precio" DECIMAL(10, 2) NOT NULL DEFAULT 0.00 CHECK (precio >= 0),
    "categoria" VARCHAR(100),
    "imagen_url" VARCHAR(500)
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


INSERT INTO "Juego" ("nombre", "anio", "descripcion", "desarrollador", "precio", "categoria", "imagen_url") VALUES
('The Witcher 3: Wild Hunt', 2015, 'Un juego de rol de mundo abierto donde sigues la historia del brujo Geralt de Rivia.', 'CD Projekt Red', 49.99, 'RPG', '/public/images/juegos/the_witcher3.jpg'),
('God of War', 2018, 'Kratos se aventura en el mundo nórdico con su hijo Atreus.', 'Santa Monica Studio', 59.99, 'Acción-Aventura', '/public/images/juegos/god_of_war.jpg'),
('The Legend of Zelda: Breath of the Wild', 2017, 'Explora un vasto reino de Hyrule en un mundo abierto lleno de secretos.', 'Nintendo', 59.99, 'Aventura', '/public/images/juegos/zelda.jpg'),
('Age of Empires II', 1999, 'Juego de estrategia en tiempo real con civilizaciones históricas.', 'Ensemble Studios', 19.99, 'Estrategia', '/public/images/juegos/age.jpg'),
('Assassins Creed Shadows', 2025, 'Juego de acción-aventura ambientado en el Japón feudal.', 'Ubisoft', 79.99, 'Acción-Aventura', '/public/images/juegos/assassins_creed.jpg'),
('Red Dead Redemption 2', 2018, 'Sigue a Arthur Morgan y la banda Van der Linde en el Salvaje Oeste.', 'Rockstar Games', 69.99, 'Acción-Aventura', '/public/images/juegos/red_dead.webp'),
('Cyberpunk 2077', 2020, 'Explora Night City, una metrópolis futurista llena de crimen y tecnología.', 'CD Projekt Red', 59.99, 'RPG', '/public/images/juegos/cyberpunk.jpg'),
('Elden Ring', 2022, 'Una épica aventura de mundo abierto creada por FromSoftware y George R.R. Martin.', 'FromSoftware', 69.99, 'RPG', '/public/images/juegos/elden_ring.jpg'),
('Minecraft', 2011, 'Juego de construcción y supervivencia en un mundo de bloques infinitos.', 'Mojang', 26.95, 'Sandbox', '/public/images/juegos/minecraft.jpg'),
('Overwatch 2', 2022, 'Shooter en equipos con héroes únicos y acción multijugador.', 'Blizzard Entertainment', 10.00, 'Shooter', '/public/images/juegos/overwatch2.jpg'),
('FIFA 23', 2022, 'La entrega final de EA Sports FIFA con mejoras en jugabilidad y gráficos.', 'EA Sports', 59.99, 'Deportes', '/public/images/juegos/fifa23.jpg'),
('Grand Theft Auto V', 2013, 'Explora Los Santos con tres protagonistas en una historia épica.', 'Rockstar Games', 29.99, 'Acción-Aventura', '/public/images/juegos/gtaV.jpg'),
('Hollow Knight', 2017, 'Una aventura de acción y plataformas en el misterioso reino de Hallownest.', 'Team Cherry', 14.99, 'Metroidvania', '/public/images/juegos/hollow_knight.jpg'),
('Dark Souls III', 2016, 'Enfréntate a enemigos desafiantes en un mundo oscuro y gótico.', 'FromSoftware', 49.99, 'RPG', '/public/images/juegos/dark_souls3.jpg'),
('Resident Evil 4 Remake', 2023, 'Remake del clásico survival horror con gráficos y mecánicas actualizadas.', 'Capcom', 59.99, 'Terror', '/public/images/juegos/resident_evil4.webp'),
('Super Mario Odyssey', 2017, 'Acompaña a Mario en una aventura por diferentes mundos para rescatar a Peach.', 'Nintendo', 49.99, 'Plataformas', '/public/images/juegos/super_mario.jpg'),
('Horizon Forbidden West', 2022, 'Acompaña a Aloy en un viaje por tierras post-apocalípticas llenas de máquinas.', 'Guerrilla Games', 69.99, 'Acción-Aventura', '/public/images/juegos/horizon.jpg'),
('Call of Duty: Modern Warfare III', 2023, 'Acción bélica intensa con campaña, multijugador y zombies.', 'Infinity Ward', 69.99, 'Shooter', '/public/images/juegos/cod_mw3.jpg'),
('Baldurs Gate 3', 2023, 'Juego de rol basado en Dungeons & Dragons con libertad total de decisión.', 'Larian Studios', 69.99, 'RPG', '/public/images/juegos/baldurs_gate3.jpg'),
('Spider-Man 2', 2023, 'Controla a Peter Parker y Miles Morales en esta aventura superheroica.', 'Insomniac Games', 69.99, 'Acción-Aventura', '/public/images/juegos/spiderman.png'),
('Counter Strike 2', 2012, 'Durante las dos últimas décadas, Counter Strike ha proporcionado una experiencia competitiva de primer nivel para los millones de jugadores de todo el mundo que contribuyeron a darle forma. Ahora el próximo capítulo en la historia de CS está a punto de comenzar.', 'Valve', '10', 'Accion', '/public/images/juegos/cs.jpg');

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
('Admin', 'Test', '-', 'Admin@test.com', '$2b$10$i4C5COxkl4LGP9FWkaJ4/.u18j7p3Z6e2QXYRIBBCZNdqer.j6xuC', 'ADMIN');

UPDATE "Usuario"
SET "contrasenia" = '$2b$10$ZGfN5nXmIrC.enySJacWsu6wB8sjqvhh0YdI.p74Jf7.Y6LhcoxwW'
WHERE email = 'Admin@test.com';

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