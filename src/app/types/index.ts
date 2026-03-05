export type UserRole = 'admin' | 'accountant' | 'auditor' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Entity {
  id: string;
  name: string;
  jurisdiction: string;
  currency: string;
}

export interface Period {
  id: string;
  entity_id: string;
  from: string;
  to: string;
  status: 'open' | 'closed';
}

export interface Account {
  id: string;
  code: string;
  name: string;
  element: 'asset' | 'liability' | 'equity' | 'income' | 'expense';
  type: 'debit' | 'credit';
  parent_id?: string;
}

export interface EntryLine {
  id: string;
  account_id: string;
  account_code: string;
  account_name: string;
  debit: number;
  credit: number;
}

export interface Entry {
  id: string;
  entity_id: string;
  period_id: string;
  date: string;
  reference: string;
  description: string;
  lines: EntryLine[];
  created_at: string;
  created_by: string;
}

export interface Balance {
  account_id: string;
  account_code: string;
  account_name: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface AuditLogEntry {
  id: string;
  user: string;
  tenant: string;
  action: string;
  resource: string;
  timestamp: string;
  status: 'success' | 'failed';
}

export interface SustainabilityMetric {
  id: string;
  entity_id: string;
  period_id: string;
  scope: 'scope1' | 'scope2' | 'scope3';
  name: string;
  value: number;
  unit: string;
}
