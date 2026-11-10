# Backend — Tasking4You

API REST construida con Node.js, Express y PostgreSQL. La implementación separa rutas, controladores, servicios y repositorios.

## Requisitos

- Node.js 20 o superior.
- npm.
- PostgreSQL 14 o superior.

## Instalación

Desde esta carpeta:

```bash
npm install
```

Copia `.env.example` como `.env` y configura los valores de tu instancia PostgreSQL.

Ejemplo para una instalación local:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:TU_PASSWORD@localhost:5432/tasking4you
DB_SSL=false
FRONTEND_URL=http://localhost:5173
```

Primero debes crear la base de datos `tasking4you`. Consulta [../docs/BASE_DE_DATOS.md](../docs/BASE_DE_DATOS.md).

## Ejecución

Desarrollo:

```bash
npm run dev
```

Producción:

```bash
npm start
```

Al iniciar, el servidor ejecuta `CREATE TABLE IF NOT EXISTS tasks`. El archivo equivalente y versionado del esquema es `sql/schema.sql`.

## Endpoints

Base URL: `/api`

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/health` | Estado de API y PostgreSQL |
| GET | `/tasks` | Listar tareas |
| POST | `/tasks` | Crear tarea |
| PATCH | `/tasks/:id` | Actualizar estado |
| DELETE | `/tasks/:id` | Eliminar tarea |

### Crear tarea

`POST /api/tasks`

```json
{ "title": "Entregar el proyecto", "description": "Revisar pruebas y documentación" }
```

El título es obligatorio y admite hasta 160 caracteres. La descripción es opcional.

### Actualizar estado

`PATCH /api/tasks/1`

```json
{ "completed": true }
```

El campo `completed` debe ser booleano.

## Pruebas

```bash
npm test
```

Las pruebas unitarias usan `node:test` y un repositorio simulado; no sustituyen las pruebas de integración contra PostgreSQL.

## Variables de entorno

| Variable | Descripción |
|---|---|
| `PORT` | Puerto HTTP; por defecto 3000 |
| `DATABASE_URL` | Cadena de conexión PostgreSQL |
| `DB_SSL` | `true` si el proveedor requiere SSL |
| `FRONTEND_URL` | Origen permitido por CORS; admite varios separados por coma |

Nunca subir el archivo `.env`.
