# 🎮 TpTallerWeb - Plataforma de Videojuegos

## 📋 Descripción general

Proyecto académico desarrollado para la materia **Taller Web**, cuyo objetivo es construir una aplicación web full-stack que permita:

- Registrar y autenticar usuarios.  
- Visualizar una lista de videojuegos.  
- Agregar juegos al carrito de compras.  
- Simular compras y registrar pedidos.  

El sistema está dividido en:
- **Frontend:** Angular + PrimeNG  
- **Backend:** Node.js + Express + Prisma  
- **Base de datos:** PostgreSQL  

---

## ⚙️ Tecnologías utilizadas

| Área | Tecnología |
|------|-------------|
| **Frontend** | Angular 17, PrimeNG, TypeScript |
| **Backend** | Node.js, Express, Prisma ORM |
| **Base de datos** | PostgreSQL |
| **ORM** | Prisma |
| **Diseño y componentes UI** | PrimeNG |
| **Gestión de dependencias** | npm |

---

## 🧩 Estructura general del proyecto

TpTallerWeb-VideoJuegos/
│
├── front/ # Proyecto Angular (Frontend)
│ ├── src/app/
│ │ ├── api/services/ # Servicios HTTP
│ │ ├── modules/usuarios/ # Módulo de gestión de usuarios
│ │ ├── modules/juegos/ # Módulo de gestión de juegos
│ │ └── shared/ # Componentes comunes
│ └── environments/ # Configuración de entornos
│
├── back/ # Proyecto Node + Express + Prisma
│ ├── prisma/schema.prisma # Definición del modelo de datos
│ ├── src/
│ │ ├── controllers/ # Controladores de Express
│ │ ├── repositories/ # Repositorios (Prisma)
│ │ ├── services/ # Lógica de negocio
│ │ └── routes/ # Rutas de la API
│ └── .env # Variables de entorno
│
└── database/
└── sqlJuegos.sql # Script de creación e inserción de datos iniciales


---

## 🧠 Funcionalidades principales

### 👤 Gestión de usuarios
- Registro y autenticación con contraseña encriptada (bcrypt).  
- Validación de email único.  

### 🎮 Gestión de videojuegos
- Listado de juegos con filtros por nombre, clasificación y precio.  
- Asociación de juegos a géneros (muchos a muchos).  

### 🛒 Carrito de compras y pedidos
- Cada usuario posee un carrito único.  
- Al confirmar compra, se registra en `Compra` y `ItemCompra`.  
- El carrito se vacía automáticamente después de la compra.

---

## 🧰 Instalación y ejecución

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/alexisvh5/TpTallerWeb-VideoJuegos.git


2️⃣ Instalar dependencias del backend
cd back
npm install

3️⃣ Configurar la base de datos PostgreSQL

Crear la base de datos sqlJuegos en pgAdmin.

Editar el archivo .env:

DATABASE_URL="postgresql://postgres:1234@localhost:5432/sqlJuegos?schema=public"


Ejecutar Prisma:

npx prisma migrate dev --name init

4️⃣ Cargar datos iniciales

Ejecutar el script sqlJuegos.sql desde pgAdmin o consola.

5️⃣ Iniciar el backend
npm start

6️⃣ Iniciar el frontend
cd ../front
npm install
npm start
💾 Script SQL

El script completo se encuentra en /database/sqlJuegos.sql
.
Incluye la creación de tablas, relaciones y datos iniciales de ejemplo.
