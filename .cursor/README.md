# Contexto Cursor: Prodaric Accounting

Este directorio concentra el **contexto y la fuente de verdad** para el diseño y desarrollo del proyecto. Cursor y los agentes deben usarlo como referencia.

## Contenido

- **[rules/](rules/)** – Reglas que definen el contexto del proyecto, calidad, workflow y desarrollador. Se aplican automáticamente en las conversaciones.
  - `prodaric-accounting.mdc` – Contexto: BD, schemas, roles, restricciones NIIF.
  - `quality.mdc` – Calidad: coherencia con diseño/plan, verificación antes de terminar, pruebas (TDD cuando aplique).
  - `workflow.mdc` – Workflow: todos, comunicación con el usuario, verificación.
  - `developer.mdc` – Desarrollador: nombres, checklist, no declarar hecho sin verificar.
  - `data-model.mdc` – Modelo de datos: inglés, minúsculas, singular, una palabra cuando sea posible, FK = `tabla_id`, COMMENT si hace falta.
  - Ver [rules/README.md](rules/README.md) para el detalle.
- **Documentación raíz** (referencia):
  - [../design.md](../design.md) – Diseño completo: estándares NIIF/ISA, schemas, inmutabilidad, journal en ledger, vistas derivadas, roles.
  - [../plan.md](../plan.md) – Plan de implementación y próximos pasos.
  - [../sql/01_roles.sql](../sql/01_roles.sql) – Definición de base de datos y roles PostgreSQL.

## Resumen de decisiones (fuente de verdad)

- **Producto:** Prodaric Accounting. Contabilidad, Sostenibilidad y Auditoría.
- **Base de datos:** `prodaric`. Usuario app: `prodaric` (solo schema `public`). Usuario sysadmin: `prodaric_sys` (acceso total).
- **Schemas:** `ledger` = única fuente de verdad del journal (inmutable, checksum). `accounting` = solo vistas derivadas. `public` = API (funciones, vistas, secuencias) + tablas configurables. `sustainability` = datos ESG; acceso vía API.
- **Lógica:** No hay escritura directa a ledger/accounting desde la aplicación; todo pasa por funciones en `public` (SECURITY DEFINER) que validan reglas NIIF y escriben en `ledger`.
