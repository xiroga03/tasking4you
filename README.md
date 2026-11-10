# Tasking4You

Aplicación web para organizar tareas personales. Proyecto académico de Ingeniería Web desarrollado de forma colaborativa.

## Estado del proyecto

- **Frontend:** dashboard en React + Vite con creación, listado, búsqueda, filtros, marcado y eliminación de tareas en estado local.
- **Backend:** API REST en Node.js + Express con operaciones CRUD y validaciones.
- **Base de datos:** PostgreSQL. El esquema de la tabla `tasks` está en `backend/sql/schema.sql`; el backend la crea automáticamente al iniciar si no existe.
- **Pendiente:** conectar el frontend con los endpoints de la API para que las tareas se guarden en PostgreSQL. Hasta completar esa integración, la interfaz utiliza estado local y los cambios se pierden al recargar.

## Tecnologías

| Capa | Tecnologías |
|---|---|
| Frontend | React, Vite, JavaScript, CSS |
| Backend | Node.js 20+, Express 5 |
| Base de datos | PostgreSQL, node-postgres (`pg`) |
| Calidad | ESLint, pruebas nativas de Node.js |
| Control de versiones | Git y GitHub |

## Estructura del repositorio

```text
tasking4you/
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
├── backend/
│   ├── sql/
│   │   └── schema.sql
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── docs/
│   └── BASE_DE_DATOS.md
├── .gitignore
├── CONTRIBUTING.md
└── README.md
```

## Requisitos

- Node.js 20 o superior y npm.
- PostgreSQL 14 o superior.
- Git.

## Configuración local

### 1. Clonar el repositorio

```bash
git clone https://github.com/xiroga03/tasking4you.git
cd tasking4you
```

### 2. Crear la base de datos

En PostgreSQL (pgAdmin o psql), crear una base de datos llamada `tasking4you`:

```sql
CREATE DATABASE tasking4you;
```

Los pasos completos están en [docs/BASE_DE_DATOS.md](docs/BASE_DE_DATOS.md).

### 3. Configurar y ejecutar el backend

```bash
cd backend
npm install
```

Copia `.env.example` como `.env` y configura `DATABASE_URL` con los datos de tu PostgreSQL. Ejemplo local:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:TU_PASSWORD@localhost:5432/tasking4you
DB_SSL=false
FRONTEND_URL=http://localhost:5173
```

Inicia la API:

```bash
npm run dev
```

Al iniciar, el servidor crea la tabla `tasks` si aún no existe. Verifica la conexión en:

`http://localhost:3000/api/health`

### 4. Ejecutar el frontend

En otra terminal, desde la raíz del repositorio:

```bash
cd frontend
npm install
npm run dev
```

Vite mostrará la dirección local, normalmente `http://localhost:5173`.

> **Importante:** el dashboard visual está implementado, pero la integración de sus acciones con la API todavía debe completarse. No se debe considerar persistente la información del frontend hasta finalizar esa conexión.

## API disponible

Base URL local: `http://localhost:3000/api`

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/health` | Comprueba API y conexión a PostgreSQL |
| GET | `/tasks` | Lista las tareas |
| POST | `/tasks` | Crea una tarea |
| PATCH | `/tasks/:id` | Actualiza el estado de una tarea |
| DELETE | `/tasks/:id` | Elimina una tarea |

Ejemplo de creación:

```json
{
  "title": "Entregar el proyecto",
  "description": "Revisar pruebas y documentación"
}
```

## Pruebas y calidad

Desde `backend/`:

```bash
npm test
```

Desde `frontend/`:

```bash
npm run lint
npm run build
```

## Seguridad

- No subir archivos `.env`, contraseñas ni cadenas de conexión reales.
- Usar `.env.example` como plantilla sin credenciales.
- Configurar `FRONTEND_URL` con el origen permitido del frontend.
- Activar `DB_SSL=true` únicamente cuando el proveedor PostgreSQL requiera SSL.

## Flujo de trabajo Git

Consultar [CONTRIBUTING.md](CONTRIBUTING.md) para nombres de ramas, commits y pull requests.

## Equipo

Proyecto colaborativo de estudiantes de Ingeniería de Software de la Universidad Manuela Beltrán.
