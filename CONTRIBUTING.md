# Guía de colaboración

Para evitar conflictos y conservar el trabajo de cada integrante, se propone el siguiente flujo.

## Ramas

- `main`: versión estable e integrada del proyecto.
- `feature/nombre-funcionalidad`: nuevas funcionalidades.
- `fix/nombre-problema`: correcciones.
- `docs/tema`: cambios de documentación.

Evitar trabajar directamente sobre `main`.

## Flujo de trabajo

1. Actualizar la rama local desde GitHub.
2. Crear una rama para la tarea asignada.
3. Realizar cambios pequeños y probarlos localmente.
4. Hacer commits descriptivos.
5. Subir la rama y abrir un Pull Request hacia `main`.
6. Solicitar revisión de otro integrante.
7. Integrar el PR después de resolver observaciones y comprobar que no se rompa el proyecto.

## Convención de commits

Usar mensajes breves con prefijo:

- `feat:` nueva funcionalidad.
- `fix:` corrección.
- `docs:` documentación.
- `refactor:` reorganización interna sin cambiar el comportamiento.
- `test:` pruebas.
- `chore:` mantenimiento y configuración.

Ejemplos:

```text
feat: conectar formulario con API de tareas
fix: corregir validación del título
docs: actualizar instrucciones de instalación
```

## Reglas del repositorio

- No subir `.env`, contraseñas, tokens ni datos privados.
- No subir `node_modules/`, `dist/` ni archivos generados.
- Mantener actualizado el README cuando cambie la instalación o la arquitectura.
- Probar backend y frontend antes de solicitar revisión.
