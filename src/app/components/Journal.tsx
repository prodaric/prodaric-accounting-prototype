import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { accounts } from '../data/mockData';
import type { EntryLine } from '../types';

export function Journal() {
  const [date, setDate] = useState('2026-03-05');
  const [reference, setReference] = useState('');
  const [description, setDescription] = useState('');
  const [lines, setLines] = useState<EntryLine[]>([
    { id: '1', account_id: '', account_code: '', account_name: '', debit: 0, credit: 0 },
    { id: '2', account_id: '', account_code: '', account_name: '', debit: 0, credit: 0 }
  ]);

  const addLine = () => {
    const newLine: EntryLine = {
      id: String(lines.length + 1),
      account_id: '',
      account_code: '',
      account_name: '',
      debit: 0,
      credit: 0
    };
    setLines([...lines, newLine]);
  };

  const removeLine = (id: string) => {
    if (lines.length > 2) {
      setLines(lines.filter(line => line.id !== id));
    }
  };

  const updateLine = (id: string, field: keyof EntryLine, value: any) => {
    setLines(lines.map(line => {
      if (line.id === id) {
        const updatedLine = { ...line, [field]: value };
        
        // If account is changed, update code and name
        if (field === 'account_id') {
          const account = accounts.find(acc => acc.id === value);
          if (account) {
            updatedLine.account_code = account.code;
            updatedLine.account_name = account.name;
          }
        }
        
        return updatedLine;
      }
      return line;
    }));
  };

  const totalDebit = lines.reduce((sum, line) => sum + (Number(line.debit) || 0), 0);
  const totalCredit = lines.reduce((sum, line) => sum + (Number(line.credit) || 0), 0);
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isBalanced) {
      alert('Entry registered successfully!');
      // Reset form
      setDate('2026-03-05');
      setReference('');
      setDescription('');
      setLines([
        { id: '1', account_id: '', account_code: '', account_name: '', debit: 0, credit: 0 },
        { id: '2', account_id: '', account_code: '', account_name: '', debit: 0, credit: 0 }
      ]);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Journal Entry</h1>

      <form onSubmit={handleSubmit}>
        {/* Entry Header */}
        <fieldset className="mb-6 p-4 border border-[#c0c0c0] rounded">
          <legend className="px-2 text-sm font-medium text-[#666]">Entry Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-[#333] mb-1">
                Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white border border-[#c0c0c0] rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333] mb-1">
                Reference
              </label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="e.g., INV-001"
                className="w-full px-3 py-2 bg-white border border-[#c0c0c0] rounded text-sm"
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-[#333] mb-1">
                Description <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Brief description of the transaction"
                className="w-full px-3 py-2 bg-white border border-[#c0c0c0] rounded text-sm"
              />
            </div>
          </div>
        </fieldset>

        {/* Entry Lines */}
        <fieldset className="mb-6 p-4 border border-[#c0c0c0] rounded">
          <legend className="px-2 text-sm font-medium text-[#666]">Entry Lines</legend>
          <div className="mt-2">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#f5f5f5] border-b border-[#c0c0c0]">
                    <th className="px-3 py-2 text-left text-xs font-medium text-[#666]">Account</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-[#666]">Debit</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-[#666]">Credit</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-[#666] w-16">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((line, index) => (
                    <tr key={line.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}>
                      <td className="px-3 py-2">
                        <select
                          value={line.account_id}
                          onChange={(e) => updateLine(line.id, 'account_id', e.target.value)}
                          required
                          className="w-full px-2 py-1.5 bg-white border border-[#c0c0c0] rounded text-sm"
                        >
                          <option value="">Select account...</option>
                          {accounts.map(account => (
                            <option key={account.id} value={account.id}>
                              {account.code} - {account.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={line.debit || ''}
                          onChange={(e) => {
                            updateLine(line.id, 'debit', Number(e.target.value));
                            if (Number(e.target.value) > 0) {
                              updateLine(line.id, 'credit', 0);
                            }
                          }}
                          className="w-full px-2 py-1.5 bg-white border border-[#c0c0c0] rounded text-sm text-right"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={line.credit || ''}
                          onChange={(e) => {
                            updateLine(line.id, 'credit', Number(e.target.value));
                            if (Number(e.target.value) > 0) {
                              updateLine(line.id, 'debit', 0);
                            }
                          }}
                          className="w-full px-2 py-1.5 bg-white border border-[#c0c0c0] rounded text-sm text-right"
                        />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => removeLine(line.id)}
                          disabled={lines.length <= 2}
                          className="p-1 hover:bg-[#e0e0e0] rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Trash2 size={16} className="text-[#666]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-[#f5f5f5] border-t-2 border-[#808080]">
                    <td className="px-3 py-2 text-sm font-medium">Totals</td>
                    <td className="px-3 py-2 text-sm font-medium text-right">
                      {totalDebit.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 text-sm font-medium text-right">
                      {totalCredit.toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <button
              type="button"
              onClick={addLine}
              className="mt-3 flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-[#f0f0f0] border border-[#c0c0c0] rounded text-sm"
            >
              <Plus size={16} />
              Add Line
            </button>
          </div>
        </fieldset>

        {/* Validation Message */}
        <div className="mb-6 p-3 rounded border">
          {isBalanced ? (
            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border-green-300">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span>Entry is balanced and ready to register</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border-red-300">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <span>
                Entry is not balanced. Debits ({totalDebit.toFixed(2)}) must equal Credits ({totalCredit.toFixed(2)})
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={!isBalanced}
            className="px-4 py-2 bg-[#d0d0d0] hover:bg-[#c0c0c0] border border-[#a0a0a0] rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Register Entry
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-white hover:bg-[#f0f0f0] border border-[#c0c0c0] rounded text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
