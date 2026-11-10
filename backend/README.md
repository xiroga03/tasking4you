# Tasking4You — Backend API

API REST construida con Node.js, Express y PostgreSQL. La estructura separa rutas, controladores, servicios y repositorios.

## Requisitos
- Node.js 20 o superior
- npm
- Una base de datos PostgreSQL

## Instalación local
1. Entrar a la carpeta `backend`.
2. Instalar dependencias: `npm install`.
3. Copiar `.env.example` como `.env`.
4. Completar `DATABASE_URL` y ajustar `DB_SSL` según el proveedor.
5. Ejecutar en desarrollo: `npm run dev`.
6. La API estará disponible en `http://localhost:3000`.

Al iniciar, el servidor crea la tabla `tasks` si todavía no existe. El SQL equivalente está en `sql/schema.sql`.

## Variables de entorno
| Variable | Descripción |
|---|---|
| `PORT` | Puerto de la API (por defecto 3000). |
| `DATABASE_URL` | Cadena de conexión PostgreSQL. |
| `DB_SSL` | `true` si el proveedor requiere SSL; de lo contrario `false`. |
| `FRONTEND_URL` | Origen del frontend permitido por CORS. Se pueden separar varios orígenes con comas. |

No se debe subir el archivo `.env` al repositorio.

## Endpoints
Base URL: `/api`

| Método | Endpoint | Descripción | Respuesta |
|---|---|---|---|
| GET | `/health` | Comprueba API y conexión a PostgreSQL. | `200` o `503`. |
| GET | `/tasks` | Lista las tareas. | `200 { "tasks": [] }` |
| POST | `/tasks` | Crea una tarea. | `201` con `task`. |
| PATCH | `/tasks/:id` | Cambia el estado de una tarea. | `200` con `task`; `404` si no existe. |
| DELETE | `/tasks/:id` | Elimina una tarea. | `200` si se elimina; `404` si no existe. |

### Crear tarea
`POST /api/tasks`
```json
{ "title": "Entregar el proyecto", "description": "Revisar pruebas y documentación" }
```

El título es obligatorio y admite hasta 160 caracteres. La descripción es opcional y admite hasta 5000 caracteres.

### Actualizar estado
`PATCH /api/tasks/1`
```json
{ "completed": true }
```
El campo `completed` debe ser booleano.

## Pruebas
Ejecutar `npm test`. Las pruebas usan el módulo nativo `node:test` y no requieren una base de datos activa.

## Despliegue
Configurar en el proveedor de hosting:
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Variables: `DATABASE_URL`, `DB_SSL`, `FRONTEND_URL` y opcionalmente `PORT`.

La base de datos debe ser PostgreSQL y aceptar conexiones desde el servicio de hosting. Configurar `DB_SSL=true` únicamente si el proveedor lo exige.

## Estructura
```text
backend/
├── sql/schema.sql
├── src/
│   ├── config/database.js
│   ├── controllers/task.controller.js
│   ├── repositories/task.repository.js
│   ├── routes/task.routes.js
│   ├── services/task.service.js
│   ├── services/task.service.test.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
└── package.json
```
