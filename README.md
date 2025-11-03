🎮 TpTallerWeb - Plataforma de Videojuegos
📋 Descripción general

Proyecto académico desarrollado para la materia Taller Web, cuyo objetivo es construir una aplicación web full-stack que permita:

Registrar y autenticar usuarios.

Visualizar una lista de videojuegos.

Agregar juegos al carrito de compras.

Simular compras y registrar pedidos.

El sistema está dividido en:

Frontend: Angular + PrimeNG

Backend: Node.js + Express + Prisma

Base de datos: PostgreSQL

⚙️ Tecnologías utilizadas

Frontend	Angular 17, PrimeNG, TypeScript
Backend	Node.js, Express, Prisma ORM
Base de datos	PostgreSQL
ORM	Prisma
Diseño y componentes UI	PrimeNG
Gestión de dependencias	npm


🧩 Estructura general del proyecto

TpTallerWeb-VideoJuegos/
│
├── front/                      # Proyecto Angular (Frontend)
│   ├── src/app/
│   │   ├── api/services/       # Servicios HTTP
│   │   ├── modules/usuarios/   # Módulo de gestión de usuarios
│   │   ├── modules/juegos/     # Módulo de gestión de juegos
│   │   └── shared/             # Componentes comunes
│   └── environments/           # Configuración de entornos
│
├── back/                       # Proyecto Node + Express + Prisma
│   ├── prisma/schema.prisma    # Definición del modelo de datos
│   ├── src/
│   │   ├── controllers/        # Controladores de Express
│   │   ├── repositories/       # Repositorios (Prisma)
│   │   ├── services/           # Lógica de negocio
│   │   └── routes/             # Rutas de la API
│   └── .env                    # Variables de entorno
│
└── database/
    └── sqlJuegos.sql           # Script de creación e inserción de datos iniciales


🧰 Instalación y ejecución
🔸 1. Clonar el repositorio
git clone https://github.com/<tu_usuario>/TpTallerWeb-VideoJuegos.git

🔸 2. Instalar dependencias del backend
cd back
npm install

🔸 3. Configurar la base de datos PostgreSQL

Crear la base sqlJuegos en pgAdmin.

Editar el archivo .env:

DATABASE_URL="postgresql://postgres:1234@localhost:5432/sqlJuegos?schema=public"


Ejecutar Prisma para crear las tablas:

npx prisma migrate dev --name init

🔸 4. Cargar datos iniciales

En pgAdmin o en la terminal SQL, ejecutar el script sqlJuegos.sql (ver más abajo).

🔸 5. Iniciar el backend
npm start

🔸 6. Iniciar el frontend
cd ../front
npm install
npm start

💾 Script SQL (database/sqlJuegos.sql)

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

INSERT INTO "Genero" ("nombre") VALUES ('RPG'), ('Acción'), ('Aventura'), ('Estrategia');

INSERT INTO "Juego" ("nombre", "anio", "descripcion", "desarrollador", "precio") VALUES
('The Witcher 3: Wild Hunt', 2015, 'Un juego de rol de mundo abierto...', 'CD Projekt Red', 49.99),
('God of War', 2018, 'Kratos se aventura en el mundo nórdico...', 'Santa Monica Studio', 59.99),
('The Legend of Zelda: Breath of the Wild', 2017, 'Explora un vasto reino de Hyrule...', 'Nintendo', 59.99),
('Age of Empires II', 1999, 'Juego de estrategia en tiempo real...', 'Ensemble Studios', 19.99);

INSERT INTO "_JuegoGenero" ("A", "B") VALUES 
(1, 1), (1, 3),
(2, 2), (2, 3),
(3, 3),
(4, 4);

INSERT INTO "Usuario" ("nombre", "apellido", "direccion", "email", "contrasenia") VALUES
('Juan', 'Pérez', 'Calle Falsa 123', 'juan.perez@email.com', 'hash_simulado_de_juan'),
('Ana', 'Gómez', 'Avenida Siempre Viva 742', 'ana.gomez@email.com', 'hash_simulado_de_ana');

INSERT INTO "Carrito" ("idUsuario") VALUES (1), (2);

INSERT INTO "_CarritoJuego" ("A", "B") VALUES (1, 1), (1, 4), (2, 2);

BEGIN;
INSERT INTO "Compra" ("idUsuario", "totalPagado")
SELECT 1, SUM(j."precio") FROM "_CarritoJuego" cj
JOIN "Juego" j ON cj."B" = j."id" WHERE cj."A" = 1 RETURNING "id";

INSERT INTO "ItemCompra" ("idCompra", "idJuego", "precioAlComprar")
SELECT 1, cj."B", j."precio"
FROM "_CarritoJuego" cj
JOIN "Juego" j ON cj."B" = j."id"
WHERE cj."A" = 1;

DELETE FROM "_CarritoJuego" WHERE "A" = 1;
COMMIT;

