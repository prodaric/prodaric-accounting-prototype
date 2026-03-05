# Reglas Cursor – Prodaric Accounting

Reglas aplicadas automáticamente en el diseño y desarrollo. Inspiradas en buenas prácticas de calidad y workflow (TDD, verificación, comunicación).

## Reglas del proyecto

| Archivo | Propósito |
|---------|-----------|
| **prodaric-accounting.mdc** | Contexto del proyecto: BD `prodaric`, roles, schemas (ledger, accounting, public, sustainability), restricciones NIIF y de inmutabilidad. |
| **quality.mdc** | Calidad: coherencia con design.md y plan.md, verificación antes de dar por terminado, pruebas cuando haya código de aplicación (Red-Green-Refactor). |
| **workflow.mdc** | Workflow: lista de tareas (todo_write), comunicación clara con el usuario, verificación antes de completar; uso de GitHub Issues cuando se soliciten. |
| **developer.mdc** | Desarrollador: nombres y estructura, checklist antes de terminar, no declarar hecho sin verificar; referencias a diseño y contexto. |
| **data-model.mdc** | Modelo de datos: nombres en inglés, minúsculas, una palabra cuando sea posible; tablas en singular; FK como `tabla_id`; COMMENT cuando haga falta. |

## Principios aplicados

1. **Coherencia:** Todo cambio alineado con [design.md](../../design.md) y [plan.md](../../plan.md).
2. **Verificación:** No declarar completado sin ejecutar pruebas, build o lint según defina el proyecto.
3. **Comunicación:** Hacer lo solicitado o explicar por qué no; informar qué se hizo y qué queda pendiente.
4. **Calidad:** Pruebas como requisito previo cuando haya lógica de negocio o API; nombres descriptivos y documentación viva.

## Origen

Adaptado de reglas en `~/.github/.cursor/` (TDD, workflow, calidad y desarrollador), aplicadas al contexto de Prodaric Accounting (PostgreSQL, NIIF, ledger inmutable, roles prodaric / prodaric_sys).
