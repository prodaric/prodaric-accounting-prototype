# Contexto de construcción – Prodaric Accounting

Documento de referencia rápida para diseño y desarrollo. Fuente de verdad detallada en [design.md](../design.md) y [plan.md](../plan.md).

## Credenciales y conexión

| Uso | Usuario | Base de datos | Schemas accesibles |
|-----|---------|---------------|--------------------|
| Aplicación (runtime) | `prodaric` | `prodaric` | Solo `public` |
| Migraciones / sysadmin | `prodaric_sys` | `prodaric` | `public`, `ledger`, `accounting`, `sustainability` |

Variables de entorno (ver `.env` y `.env.example`): conexión local con `prodaric` para desarrollo; `prodaric_sys` para ejecutar migraciones o scripts de esquema.

## Flujo de datos

1. **Escritura contable:** La aplicación llama a una función en `public` (ej. `registrar_asiento(...)`). La función valida reglas NIIF y escribe **solo en `ledger`** (con checksum). No hay tablas de staging para el journal en otros schemas.
2. **Lectura:** Vistas en `public` o `accounting` (derivadas de `ledger`) exponen transacciones, saldos, reportes. La aplicación solo hace SELECT sobre vistas y tablas configurables en `public`.
3. **Configuración:** Tablas o parámetros editables por la entidad/usuario viven en `public` y son accesibles por el usuario `prodaric` según los GRANT definidos en `sql/01_roles.sql`.

## Estructura de schemas

```
prodaric (database)
├── public          → API (funciones, vistas, secuencias) + tablas configurables. Acceso: prodaric.
├── ledger          → Journal inmutable (tablas con checksum). Escritura: solo vía funciones; owner: prodaric_sys.
├── accounting      → Vistas derivadas de ledger (y referencia). Sin tablas de escritura. Owner: prodaric_sys.
└── sustainability  → Datos ESG. Acceso app vía public; escritura: prodaric_sys.
```

## Próximos pasos (plan)

1. Alcance v1 (solo contabilidad o + sostenibilidad).
2. Seed data y plan de cuentas base (5 elementos).
3. Diseño e implementación de tablas en `ledger`, vistas en `accounting`, funciones en `public`.
4. Reglas de presentación (no compensación IAS 1.32).
5. Alinear con .cursor/rules y requisitos ISA.
6. Funciones SECURITY DEFINER y checksums en `ledger`.
