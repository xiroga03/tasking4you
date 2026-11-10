# Configuración de la base de datos — Tasking4You

Tasking4You utiliza PostgreSQL. El repositorio incluye el esquema SQL, pero cada integrante debe crear su propia base de datos local o configurar una instancia compartida.

## 1. Crear la base de datos

En pgAdmin:
1. Conéctate a tu servidor PostgreSQL.
2. Abre **Databases**.
3. Selecciona **Create > Database**.
4. Escribe `tasking4you` como nombre.
5. Guarda los cambios.

También puedes hacerlo desde Query Tool o psql, conectado a otra base de datos:

```sql
CREATE DATABASE tasking4you;
```

## 2. Configurar las credenciales del backend

Dentro de `backend/`, copia `.env.example` a un archivo llamado `.env`.

Ejemplo local (reemplaza usuario y contraseña por los tuyos):

```env
PORT=3000
DATABASE_URL=postgresql://postgres:TU_PASSWORD@localhost:5432/tasking4you
DB_SSL=false
FRONTEND_URL=http://localhost:5173
```

No compartas ni subas el archivo `.env`. Cada integrante debe utilizar sus propias credenciales.

## 3. Crear la tabla

La tabla `tasks` se crea automáticamente cuando el backend inicia correctamente y encuentra la base de datos.

También puedes ejecutar manualmente el contenido de `backend/sql/schema.sql` dentro de la base de datos `tasking4you`.

## 4. Estructura de la tabla

| Columna | Tipo | Restricción / propósito |
|---|---|---|
| `id` | BIGSERIAL | Clave primaria autoincremental |
| `title` | VARCHAR(160) | Título obligatorio |
| `description` | TEXT | Descripción; por defecto vacía |
| `completed` | BOOLEAN | Estado; por defecto FALSE |
| `created_at` | TIMESTAMPTZ | Fecha de creación |
| `updated_at` | TIMESTAMPTZ | Fecha de última actualización |

## 5. Verificar la conexión

Inicia el backend desde `backend/`:

```bash
npm install
npm run dev
```

Abre:

`http://localhost:3000/api/health`

Una respuesta correcta debe indicar que la API y la base de datos están disponibles. Si recibes un error 503, revisa que PostgreSQL esté iniciado, que la base de datos exista y que `DATABASE_URL` sea correcta.

## 6. Base de datos compartida o despliegue

Para trabajar en equipo pueden usar una instancia PostgreSQL administrada. El responsable de la instancia debe compartir la cadena de conexión mediante un canal privado y cada integrante la configura localmente en `.env`.

No guardar credenciales, contraseñas ni URLs con secretos en GitHub. En producción, configurar `DB_SSL=true` solamente si el proveedor lo exige.
