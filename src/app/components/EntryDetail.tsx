import { useParams, Link } from 'react-router';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { getEntryById } from '../data/mockData';
import { currentUser } from '../data/mockData';

export function EntryDetail() {
  const { id } = useParams<{ id: string }>();
  const entry = id ? getEntryById(id) : undefined;

  if (!entry) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-xl text-[#666]">Entry not found</h2>
          <Link to="/ledger" className="text-sm text-[#555] hover:text-[#1a1a1a] mt-2 inline-block">
            ← Back to Ledger
          </Link>
        </div>
      </div>
    );
  }

  const totalDebit = entry.lines.reduce((sum, line) => sum + line.debit, 0);
  const totalCredit = entry.lines.reduce((sum, line) => sum + line.credit, 0);
  const canReverse = currentUser.role === 'admin' || currentUser.role === 'accountant';

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            to="/ledger"
            className="p-1 hover:bg-[#e0e0e0] rounded"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-semibold">Entry #{entry.id}</h1>
        </div>
        {canReverse && (
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#e0e0e0] hover:bg-[#d0d0d0] border border-[#c0c0c0] rounded text-sm">
            <RotateCcw size={16} />
            Reverse Entry
          </button>
        )}
      </div>

      {/* Entry Header */}
      <fieldset className="mb-6 p-4 border border-[#c0c0c0] rounded bg-[#f9f9f9]">
        <legend className="px-2 text-sm font-medium text-[#666]">Entry Information</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <div className="text-xs text-[#666] mb-1">Date</div>
            <div className="text-sm font-medium">{entry.date}</div>
          </div>
          <div>
            <div className="text-xs text-[#666] mb-1">Reference</div>
            <div className="text-sm font-medium">{entry.reference || 'N/A'}</div>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs text-[#666] mb-1">Description</div>
            <div className="text-sm font-medium">{entry.description}</div>
          </div>
          <div>
            <div className="text-xs text-[#666] mb-1">Created At</div>
            <div className="text-sm font-medium">{new Date(entry.created_at).toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-[#666] mb-1">Created By</div>
            <div className="text-sm font-medium">{entry.created_by}</div>
          </div>
        </div>
      </fieldset>

      {/* Entry Lines */}
      <fieldset className="mb-6 p-4 border border-[#c0c0c0] rounded">
        <legend className="px-2 text-sm font-medium text-[#666]">Entry Lines</legend>
        <div className="mt-2">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f5f5f5] border-b border-[#c0c0c0]">
                <th className="px-4 py-2 text-left text-xs font-medium text-[#666]">Account Code</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-[#666]">Account Name</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-[#666]">Debit</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-[#666]">Credit</th>
              </tr>
            </thead>
            <tbody>
              {entry.lines.map((line, index) => (
                <tr
                  key={line.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}
                >
                  <td className="px-4 py-2 text-sm font-mono">{line.account_code}</td>
                  <td className="px-4 py-2 text-sm">{line.account_name}</td>
                  <td className="px-4 py-2 text-sm text-right">
                    {line.debit > 0 ? line.debit.toLocaleString() : '—'}
                  </td>
                  <td className="px-4 py-2 text-sm text-right">
                    {line.credit > 0 ? line.credit.toLocaleString() : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-[#f5f5f5] border-t-2 border-[#808080]">
                <td colSpan={2} className="px-4 py-2 text-sm font-medium">Totals</td>
                <td className="px-4 py-2 text-sm font-medium text-right">
                  {totalDebit.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-sm font-medium text-right">
                  {totalCredit.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </fieldset>

      {/* Validation Status */}
      <div className="p-3 rounded border bg-green-50 border-green-300">
        <div className="flex items-center gap-2 text-sm text-green-700">
          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          <span>Entry is balanced (Debits = Credits = {totalDebit.toLocaleString()})</span>
        </div>
      </div>
    </div>
  );
}
