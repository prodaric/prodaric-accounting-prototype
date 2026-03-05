import { Entity, Period, Account, Entry, Balance, AuditLogEntry, SustainabilityMetric, User } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Juan Pérez',
  email: 'juan.perez@example.com',
  role: 'accountant'
};

export const entities: Entity[] = [
  { id: '1', name: 'Coderic SAS', jurisdiction: 'Colombia', currency: 'COP' },
  { id: '2', name: 'Coderic SA', jurisdiction: 'Venezuela', currency: 'VES' },
  { id: '3', name: 'Coderic Corporation', jurisdiction: 'USA', currency: 'USD' }
];

export const periods: Period[] = [
  { id: '1', entity_id: '1', from: '2026-01-01', to: '2026-12-31', status: 'open' },
  { id: '2', entity_id: '1', from: '2025-01-01', to: '2025-12-31', status: 'closed' },
  { id: '3', entity_id: '2', from: '2026-01-01', to: '2026-12-31', status: 'open' },
  { id: '4', entity_id: '3', from: '2026-01-01', to: '2026-12-31', status: 'open' }
];

export const accounts: Account[] = [
  // Assets
  { id: '1', code: '1', name: 'Assets', element: 'asset', type: 'debit' },
  { id: '2', code: '1.1', name: 'Current Assets', element: 'asset', type: 'debit', parent_id: '1' },
  { id: '3', code: '1.1.1', name: 'Cash and Cash Equivalents', element: 'asset', type: 'debit', parent_id: '2' },
  { id: '4', code: '1.1.2', name: 'Accounts Receivable', element: 'asset', type: 'debit', parent_id: '2' },
  { id: '5', code: '1.1.3', name: 'Inventory', element: 'asset', type: 'debit', parent_id: '2' },
  { id: '6', code: '1.2', name: 'Non-current Assets', element: 'asset', type: 'debit', parent_id: '1' },
  { id: '7', code: '1.2.1', name: 'Property, Plant and Equipment', element: 'asset', type: 'debit', parent_id: '6' },
  
  // Liabilities
  { id: '8', code: '2', name: 'Liabilities', element: 'liability', type: 'credit' },
  { id: '9', code: '2.1', name: 'Current Liabilities', element: 'liability', type: 'credit', parent_id: '8' },
  { id: '10', code: '2.1.1', name: 'Accounts Payable', element: 'liability', type: 'credit', parent_id: '9' },
  { id: '11', code: '2.1.2', name: 'Accrued Expenses', element: 'liability', type: 'credit', parent_id: '9' },
  { id: '12', code: '2.2', name: 'Non-current Liabilities', element: 'liability', type: 'credit', parent_id: '8' },
  { id: '13', code: '2.2.1', name: 'Long-term Debt', element: 'liability', type: 'credit', parent_id: '12' },
  
  // Equity
  { id: '14', code: '3', name: 'Equity', element: 'equity', type: 'credit' },
  { id: '15', code: '3.1', name: 'Share Capital', element: 'equity', type: 'credit', parent_id: '14' },
  { id: '16', code: '3.2', name: 'Retained Earnings', element: 'equity', type: 'credit', parent_id: '14' },
  
  // Income
  { id: '17', code: '4', name: 'Income', element: 'income', type: 'credit' },
  { id: '18', code: '4.1', name: 'Revenue from Contracts with Customers', element: 'income', type: 'credit', parent_id: '17' },
  { id: '19', code: '4.2', name: 'Other Income', element: 'income', type: 'credit', parent_id: '17' },
  
  // Expenses
  { id: '20', code: '5', name: 'Expenses', element: 'expense', type: 'debit' },
  { id: '21', code: '5.1', name: 'Cost of Sales', element: 'expense', type: 'debit', parent_id: '20' },
  { id: '22', code: '5.2', name: 'Administrative Expenses', element: 'expense', type: 'debit', parent_id: '20' },
  { id: '23', code: '5.3', name: 'Selling Expenses', element: 'expense', type: 'debit', parent_id: '20' }
];

export const entries: Entry[] = [
  {
    id: '1',
    entity_id: '1',
    period_id: '1',
    date: '2026-01-15',
    reference: 'INV-001',
    description: 'Initial capital contribution',
    lines: [
      { id: '1', account_id: '3', account_code: '1.1.1', account_name: 'Cash and Cash Equivalents', debit: 100000, credit: 0 },
      { id: '2', account_id: '15', account_code: '3.1', account_name: 'Share Capital', debit: 0, credit: 100000 }
    ],
    created_at: '2026-01-15T10:30:00Z',
    created_by: 'Juan Pérez'
  },
  {
    id: '2',
    entity_id: '1',
    period_id: '1',
    date: '2026-01-20',
    reference: 'INV-002',
    description: 'Purchase of inventory',
    lines: [
      { id: '3', account_id: '5', account_code: '1.1.3', account_name: 'Inventory', debit: 25000, credit: 0 },
      { id: '4', account_id: '10', account_code: '2.1.1', account_name: 'Accounts Payable', debit: 0, credit: 25000 }
    ],
    created_at: '2026-01-20T14:15:00Z',
    created_by: 'Juan Pérez'
  },
  {
    id: '3',
    entity_id: '1',
    period_id: '1',
    date: '2026-02-01',
    reference: 'SAL-001',
    description: 'Sales to customer ABC Corp',
    lines: [
      { id: '5', account_id: '4', account_code: '1.1.2', account_name: 'Accounts Receivable', debit: 40000, credit: 0 },
      { id: '6', account_id: '18', account_code: '4.1', account_name: 'Revenue from Contracts with Customers', debit: 0, credit: 40000 }
    ],
    created_at: '2026-02-01T09:00:00Z',
    created_by: 'María García'
  },
  {
    id: '4',
    entity_id: '1',
    period_id: '1',
    date: '2026-02-05',
    reference: 'EXP-001',
    description: 'Administrative expenses payment',
    lines: [
      { id: '7', account_id: '22', account_code: '5.2', account_name: 'Administrative Expenses', debit: 5000, credit: 0 },
      { id: '8', account_id: '3', account_code: '1.1.1', account_name: 'Cash and Cash Equivalents', debit: 0, credit: 5000 }
    ],
    created_at: '2026-02-05T11:45:00Z',
    created_by: 'Juan Pérez'
  }
];

export const balances: Balance[] = [
  { account_id: '3', account_code: '1.1.1', account_name: 'Cash and Cash Equivalents', debit: 100000, credit: 5000, balance: 95000 },
  { account_id: '4', account_code: '1.1.2', account_name: 'Accounts Receivable', debit: 40000, credit: 0, balance: 40000 },
  { account_id: '5', account_code: '1.1.3', account_name: 'Inventory', debit: 25000, credit: 0, balance: 25000 },
  { account_id: '10', account_code: '2.1.1', account_name: 'Accounts Payable', debit: 0, credit: 25000, balance: -25000 },
  { account_id: '15', account_code: '3.1', account_name: 'Share Capital', debit: 0, credit: 100000, balance: -100000 },
  { account_id: '18', account_code: '4.1', account_name: 'Revenue from Contracts with Customers', debit: 0, credit: 40000, balance: -40000 },
  { account_id: '22', account_code: '5.2', account_name: 'Administrative Expenses', debit: 5000, credit: 0, balance: 5000 }
];

export const auditLog: AuditLogEntry[] = [
  { id: '1', user: 'Juan Pérez', tenant: 'Coderic SAS', action: 'journal:write', resource: 'entry/1', timestamp: '2026-01-15T10:30:00Z', status: 'success' },
  { id: '2', user: 'Juan Pérez', tenant: 'Coderic SAS', action: 'journal:write', resource: 'entry/2', timestamp: '2026-01-20T14:15:00Z', status: 'success' },
  { id: '3', user: 'María García', tenant: 'Coderic SAS', action: 'journal:write', resource: 'entry/3', timestamp: '2026-02-01T09:00:00Z', status: 'success' },
  { id: '4', user: 'Juan Pérez', tenant: 'Coderic SAS', action: 'journal:write', resource: 'entry/4', timestamp: '2026-02-05T11:45:00Z', status: 'success' },
  { id: '5', user: 'Admin User', tenant: 'Coderic SAS', action: 'configuration:write', resource: 'entity_config', timestamp: '2026-01-10T08:00:00Z', status: 'success' }
];

export const sustainabilityMetrics: SustainabilityMetric[] = [
  { id: '1', entity_id: '1', period_id: '1', scope: 'scope1', name: 'Direct emissions from operations', value: 120.5, unit: 'tCO2e' },
  { id: '2', entity_id: '1', period_id: '1', scope: 'scope2', name: 'Indirect emissions from electricity', value: 85.3, unit: 'tCO2e' },
  { id: '3', entity_id: '1', period_id: '1', scope: 'scope3', name: 'Value chain emissions', value: 250.8, unit: 'tCO2e' }
];

// Helper functions to simulate API
export const getAccountById = (id: string): Account | undefined => {
  return accounts.find(acc => acc.id === id);
};

export const getAccountByCode = (code: string): Account | undefined => {
  return accounts.find(acc => acc.code === code);
};

export const getEntityById = (id: string): Entity | undefined => {
  return entities.find(ent => ent.id === id);
};

export const getPeriodById = (id: string): Period | undefined => {
  return periods.find(per => per.id === id);
};

export const getEntryById = (id: string): Entry | undefined => {
  return entries.find(entry => entry.id === id);
};
