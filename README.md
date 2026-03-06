# Prodaric Accounting

Sistema de contabilidad completo basado en estándares IFRS/NIIF con soporte para sostenibilidad (IFRS S1/S2) y auditoría (ISA).

## Descripción

Prodaric Accounting es un sistema de administración contable multi-tenant que mantiene el libro diario en un ledger inmutable, expone estados y reportes mediante vistas derivadas y cumple reglas NIIF/ISA.

### Características Principales

- **Multi-tenant**: Soporte para múltiples entidades legales (Coderic SAS, Coderic SA, Coderic Corporation)
- **Gestión de Períodos**: Control de períodos abiertos y cerrados por entidad
- **Plan de Cuentas**: Estructura completa siguiendo IFRS (Activos, Pasivos, Patrimonio, Ingresos, Gastos)
- **Registro de Asientos**: Formulario de journal con validación de partida doble
- **Libro Diario**: Consulta de asientos registrados (ledger inmutable)
- **Balances**: Saldos por cuenta y período
- **Balance de Comprobación**: Trial balance con validación de totales
- **Estados Financieros**: Estado de situación financiera y estado de resultados
- **Cierre de Período**: Flujo de cierre con validaciones pre-cierre
- **Reversión de Asientos**: Creación de asientos de reversa sin modificar el original
- **Auditoría**: Log de auditoría completo según ISA
- **Sostenibilidad**: Registro de métricas climáticas según IFRS S1/S2
- **Roles de Usuario**: Admin, Accountant, Auditor, Viewer

## Tecnologías

- **React 18.3.1** con TypeScript
- **React Router 7** para navegación
- **Tailwind CSS 4** para estilos
- **Lucide React** para iconografía
- **Vite** para build

## Estructura de Navegación

### Pantallas Principales

1. **Home (Dashboard)**
   - Resumen de entidad y período actual
   - Métricas financieras resumidas
   - Últimos asientos registrados
   - Alertas y notificaciones

2. **Entity & Period**
   - Selector de entidad/tenant
   - Listado de períodos por entidad
   - Alta de nuevos períodos

3. **Chart of Accounts**
   - Plan de cuentas completo
   - Filtros por elemento (Asset, Liability, Equity, Income, Expense)
   - Visualización jerárquica

4. **Journal (Registro de Asiento)**
   - Formulario de entrada de asientos
   - Validación de partida doble en tiempo real
   - Múltiples líneas con débitos y créditos

5. **Ledger (Libro Diario)**
   - Listado de todos los asientos
   - Filtros por entidad, período y fechas
   - Navegación a detalle de asiento

6. **Entry Detail (Detalle de Asiento)**
   - Vista read-only de un asiento
   - Botón de reversión (para roles autorizados)

7. **Reverse Entry (Reversión de Asiento)**
   - Formulario para crear asiento de reversa
   - Muestra asiento original (read-only)
   - Parámetros de reversión (fecha, descripción)

8. **Balance (Saldos / Mayor)**
   - Saldos por cuenta
   - Filtros por entidad, período, cuenta
   - Totales de débito, crédito y saldo

9. **Trial Balance (Balance de Comprobación)**
   - Listado completo de cuentas con totales
   - Validación de igualdad débito = crédito
   - Indicador visual de balance

10. **Reports (Estados Financieros)**
    - Statement of Financial Position
    - Statement of Profit or Loss
    - Tabs para diferentes reportes
    - Sin compensación (IAS 1.32)

11. **Close Period (Cierre de Período)**
    - Selección de período a cerrar
    - Validaciones pre-cierre
    - Confirmación y bloqueo

12. **Configuration (Configuración)**
    - Moneda funcional y de presentación
    - Tipos de documento
    - Parámetros configurables

13. **Administration (Administración)**
    - Gestión de entidades (solo admin)
    - Gestión de períodos (solo admin)
    - Tabs para separar funcionalidades

14. **Audit Log (Log de Auditoría)**
    - Registro completo de operaciones
    - Filtros por usuario, tenant, acción, fecha
    - Inmutable según ISA

15. **Sustainability (Sostenibilidad)**
    - Métricas IFRS S1/S2
    - Scope 1, 2, 3 (emisiones GHG)
    - Resumen de emisiones totales

## Diseño y Estética

El sistema implementa una **estética GTK/Qt con tonos grises tradicionales**, integrado en un shell tipo Eclipse Theia/VS Code con:

- Paneles laterales colapsables
- Navegación mediante sidebar
- Breadcrumbs para orientación
- Sin modales (preferencia por tabs y fieldsets)
- Sin logo en la interfaz (solo en splash de arranque)

### Paleta de Colores

- Fondo principal: `#f5f5f5`
- Fondo de paneles: `#e8e8e8`
- Bordes: `#c0c0c0`
- Botones: `#d0d0d0` / `#e0e0e0`
- Texto: `#1a1a1a` / `#333` / `#666`
- Estados: Verde para éxito, rojo para error, amarillo para warnings

## Datos de Ejemplo

El sistema incluye datos mock completos para demostración:

### Entidades (Multi-tenant)

1. **Coderic SAS** (Colombia, COP)
2. **Coderic SA** (Venezuela, VES)
3. **Coderic Corporation** (USA, USD)

### Períodos

- 2026 (abierto) para todas las entidades
- 2025 (cerrado) para Coderic SAS
- 2024 (cerrado) para Coderic SAS

### Plan de Cuentas

Estructura completa de 5 elementos:
- Activos (Cash, Receivables, Inventory, PPE)
- Pasivos (Payables, Accrued Expenses, Long-term Debt)
- Patrimonio (Share Capital, Retained Earnings)
- Ingresos (Revenue from Contracts, Other Income)
- Gastos (Cost of Sales, Administrative, Selling)

### Asientos de Ejemplo

4 asientos registrados incluyendo:
- Aporte de capital inicial
- Compra de inventario
- Venta a cliente
- Pago de gastos administrativos

## Roles de Usuario

El sistema implementa control de acceso basado en roles:

- **Admin**: Acceso completo, puede cerrar períodos, administrar entidades
- **Accountant**: Puede registrar asientos, ver reportes, configurar
- **Auditor**: Solo lectura en libro diario y audit log
- **Viewer**: Solo lectura en reportes

Usuario actual por defecto: **Juan Pérez** (Accountant, juan.perez@coderic.com)

## Arquitectura

### Flujo de Escritura

```
User → Journal Form → register_entry API → Validation IFRS → Ledger (immutable)
```

### Flujo de Lectura

```
User → Filter → Views (accounting schema) → Derived from Ledger
```

### Schemas (Diseñados, no implementados en frontend)

- **public**: Funciones API, vistas, tablas configurables
- **ledger**: entry, entry_line, checksum (inmutable)
- **accounting**: Vistas derivadas (entry view, balance view, account view)
- **sustainability**: metrics (opcional)

## Características Técnicas

### Validaciones Implementadas

- **Partida doble**: Débitos = Créditos en cada asiento
- **Balance de comprobación**: Totales de débitos = totales de créditos
- **Períodos cerrados**: No se permiten nuevos asientos (solo reversiones)
- **Roles**: Acceso restringido según permisos

### Inmutabilidad

- Ledger inmutable: No se borran asientos
- Reversión crea nuevo asiento con débitos/créditos opuestos
- Audit log inmutable: Todas las operaciones quedan registradas

### Cumplimiento de Estándares

- **IFRS/NIIF**: Plan de cuentas, reportes, sin compensación (IAS 1.32)
- **ISA**: Audit log completo para auditoría
- **IFRS S1/S2**: Módulo de sostenibilidad para métricas climáticas

## Próximos Pasos

- Integración con backend PostgreSQL según arquitectura diseñada
- Implementación de API real con funciones SECURITY DEFINER
- Autenticación OAuth2/OIDC con IdP externo
- Reportes adicionales (Cash Flow Statement)
- Conversión de moneda multi-currency
- Notificaciones y alertas avanzadas
- Exportación a PDF/Excel
- Gráficos y dashboards avanzados

## Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Build para producción
npm run build
```

## Créditos

Desarrollado para **Corporación Coderic** - Casa de software de ingeniería open source desde 2004.

Dominios:
- https://coderic.com
- https://coderic.org
- https://coderic.cloud
- https://coderic.co
- https://coderic.net

---

**Versión**: 1.0.0  
**Fecha**: Marzo 2026  
**Licencia**: Propietary
