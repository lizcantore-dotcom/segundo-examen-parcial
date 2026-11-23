# Huellas & Refugios — Plataforma de Adopción de Mascotas

Proyecto Full-Stack desarrollado con el stack **MERN** (**M**ongoDB, **E**xpress, **R**eact, **N**ode.js) para la asignatura **Aplicaciones Híbridas** (Parcial 2 — Escuela Da Vinci, 2026).

La aplicación permite gestionar un catálogo de mascotas rescatadas y refugios asociados, ofreciendo vistas públicas informativas, autenticación mediante **JSON Web Tokens (JWT)** y un panel de administración protegido por roles (`user`, `admin` y `superadmin`).

---

## Datos de la Entrega

* **Alumna:** Liz Jhoana Cantore Paiva
* **Carrera:** Tecnicatura Superior en Diseño y Programación Web
* **Asignatura:** Aplicaciones Híbridas
* **Comisión:** DWN
* 4AV (Turno mañana)
* **Año Lectivo:** 2026

## Funcionalidades Principales

### Backend (API REST)
* **Arquitectura en capas:** División estructurada en `routes`, `controllers`, `services`, `middlewares` y `schemas` de validación.
* **Autenticación y Seguridad:** Registro y login con contraseñas encriptadas mediante `bcrypt` y emisión de tokens **JWT**.
* **Control de Acceso por Roles (RBAC):** Middlewares de verificación de token (`validateToken`) y permisos (`validateRol`) para diferenciar entre `user`, `admin` y `superadmin`.
* **Entidades y Operaciones CRUD:**
  * **Usuarios (`/api/usuarios`):** Registro, inicio de sesión, listado (exclusivo `superadmin`), asignación dinámica de roles y reseteo de contraseña.
  * **Mascotas (`/api/mascotas`):** Alta, lectura, edición y eliminación de mascotas en adopción.
  * **Refugios (`/api/refugios`):** Alta, lectura, edición y eliminación de refugios, además de consulta de mascotas asociadas por refugio.

### Frontend (React + Vite)
* **Enrutamiento y Protección de Rutas:** Navegación SPA con `react-router`, carga diferida (`lazy` / `Suspense`) y componente `ProtectedRoute` según sesión y rol.
* **Estado Global:** Manejo de sesión persistente con `SessionContext` y hooks personalizados (`useRol`).
* **Separación de Lógica:** Capa de servicios dedicada (`api.service.js`, `auth.service.jsx`, `mascotas.service.jsx`, `refugios.service.jsx`, `usuarios.service.jsx`) desacoplada de las vistas.
* **Interfaz y Feedback:** Maquetado responsivo con **Bootstrap 5** y notificaciones en tiempo real mediante `react-toastify`.

---

## Tecnologías Utilizadas

* **Backend:** Node.js, Express, MongoDB (driver nativo), JSON Web Token (`jsonwebtoken`), `bcrypt`, Zod, CORS, `@supabase/supabase-js`.
* **Frontend:** React, Vite, React Router, Bootstrap 5, `jwt-decode`, `react-toastify`, `@supabase/supabase-js`.

---

## Estructura del Proyecto

```text
tp2-aplicacionesHibridas/
├── back/                           # API REST (Node.js + Express + MongoDB)
│   ├── api/                        # Rutas y controladores de la API REST
│   ├── config/                     # Configuración y conexión a MongoDB
│   ├── controllers/                # Controladores de vistas/entidades
│   ├── data/                       # Datos iniciales / semillas
│   ├── middleware/                 # Middlewares de JWT, roles, validaciones y Supabase
│   ├── page/                       # Generadores de vistas HTML
│   ├── public/                     # Recursos estáticos
│   ├── routes/                     # Definición de rutas generales
│   ├── schemas/                    # Esquemas de validación de datos
│   ├── services/                   # Lógica de negocio y acceso a MongoDB
│   ├── views/                      # Vistas del servidor
│   ├── .env                        # Variables de entorno locales (no versionado)
│   ├── .env.example                # Plantilla de variables de entorno
│   └── main.js                     # Punto de entrada del servidor Express
│
├── front/                          # Aplicación Cliente (React + Vite)
│   ├── public/                     # Archivos públicos (CSS e imágenes)
│   └── src/
│       ├── assets/                 # Recursos estáticos internos
│       ├── components/             # Componentes reutilizables
│       │   ├── Alert.jsx
│       │   ├── Error.jsx
│       │   ├── ItemError.jsx
│       │   ├── ItemLoading.jsx
│       │   ├── ItemMascota.jsx
│       │   ├── ItemRefugio.jsx
│       │   ├── Layout.jsx
│       │   ├── Loading.jsx
│       │   ├── Navbar.jsx
│       │   └── ProtectedRoute.jsx
│       ├── context/                # Estado global de autenticación
│       │   └── Session.Context.jsx
│       ├── pages/                  # Vistas principales organizadas por módulo
│       │   ├── auth/               # Login.jsx, Logout.jsx, Register.jsx
│       │   ├── crud/               # CRUD de Mascotas y Refugios: (Detalle y Listados, Actualizacion, creacion y                                     eliminacion)
│       │   ├── Contact.jsx
│       │   ├── Home.jsx
│       │   └── Usuarios.jsx        # Gestión de usuarios, roles y reseteo de clave
│       ├── schemas/                # Validaciones en frontend (mascotas, refugios, users)
│       ├── services/               # Consumo de API separado de las vistas
│       │   ├── api.service.js
│       │   ├── auth.service.jsx
│       │   ├── mascotas.service.jsx
│       │   ├── refugios.service.jsx
│       │   ├── supabase.service.jsx
│       │   └── usuarios.service.jsx
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx                # Configuración de rutas y punto de entrada React
│
└── README.md


##  Requisitos Previos e Instalación

Asegúrate de tener instalados **Node.js** (v18 o superior), **pnpm** (para el frontend) y una instancia activa de **MongoDB** (local o MongoDB Atlas).

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DE_LA_CARPETA>
```

### 2. Configurar y levantar el Backend

1. Ingresa a la carpeta `back` e instala las dependencias:
   ```bash
   cd back
   npm install
   ```
2. Crea un archivo `.env` en la raíz de `back/` (entregado por separado según la consigna) con las variables de entorno correspondientes:
   ```env
   PORT=3333
   MONGODB_URI=mongodb://localhost:27017
   DB_NAME=huellas_refugios
   JWT_SECRET=Mi clave super secreta
   ```
3. Inicia el servidor del backend:
   ```bash
   npm start
   ```
   El servidor quedará escuchando en `http://localhost:3333`.

### 3. Configurar y levantar el Frontend

1. En una nueva terminal, ingresa a la carpeta `front` e instala las dependencias:
   ```bash
   cd front
   pnpm install
   ```
2. Si utilizas variables de entorno en el frontend, crea un archivo `.env` en la raíz de `front/`:
   ```env
   VITE_API_URL=http://localhost:3333/api
   ```
3. Inicia el entorno de desarrollo:
   ```bash
   pnpm dev
   ```
   Abre en el navegador la URL indicada por Vite (por defecto `http://localhost:5173`).

---

## Roles y Credenciales de Prueba

* **`user`:** Puede navegar por el sitio, consultar el catálogo de mascotas y ver el detalle de los refugios.
* **`admin`:** Tiene permisos adicionales para crear, editar y eliminar mascotas y refugios.
* **`superadmin`:** Accede al panel de **Usuarios** (`/usuarios`) para modificar roles en tiempo real y restablecer contraseñas (al presionar *Reset*, la contraseña del usuario se restablece al valor por defecto configurado en el servidor).

## Usuarios

name: "liz"
username: "Admin"
rol: "admin"
email: "admin@admin.com"
password: 123456Admin/

name: "liz"
username: "superAdmin"
rol: "superadmin"
email: "superAdmin@superAdmin.com"
password:123Superadmin/

name:"liz"
username: "user"
rol: "user"
email: "user@user.com"
password: 1234User/


## Este rol cambie para probar si funcionaba el reset(cambie de user a admin)
name:"liz"
username: "user"
rol: "admin"
email: "user@user.com"
password: 1234Amin/

