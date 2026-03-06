import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { ArrowLeft, RotateCcw, AlertCircle } from 'lucide-react';
import { getEntryById } from '../data/mockData';

export function ReverseEntry() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sourceEntryId = searchParams.get('entry');
  
  const sourceEntry = sourceEntryId ? getEntryById(sourceEntryId) : undefined;
  const [reversalDate, setReversalDate] = useState('2026-03-06');
  const [description, setDescription] = useState(
    sourceEntry ? `Reversal of ${sourceEntry.reference}` : ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to create reversal entry
    alert('Reversal entry created successfully!');
    navigate('/ledger');
  };

  if (!sourceEntry) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <AlertCircle size={48} className="mx-auto mb-4 text-[#808080]" />
          <h2 className="text-xl text-[#666]">No source entry specified</h2>
          <p className="text-sm text-[#999] mt-2">
            Please select an entry from the ledger to reverse.
          </p>
          <button
            onClick={() => navigate('/ledger')}
            className="mt-4 px-4 py-2 bg-[#d0d0d0] hover:bg-[#c0c0c0] border border-[#a0a0a0] rounded text-sm"
          >
            Go to Ledger
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-1 hover:bg-[#e0e0e0] rounded"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-semibold">Reverse Entry</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Source Entry (Read-only) */}
        <fieldset className="mb-6 p-4 border border-[#c0c0c0] rounded bg-[#f9f9f9]">
          <legend className="px-2 text-sm font-medium text-[#666]">Source Entry (Read-only)</legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div>
              <div className="text-xs text-[#666] mb-1">Entry ID</div>
              <div className="text-sm font-medium">#{sourceEntry.id}</div>
            </div>
            <div>
              <div className="text-xs text-[#666] mb-1">Date</div>
              <div className="text-sm font-medium">{sourceEntry.date}</div>
            </div>
            <div>
              <div className="text-xs text-[#666] mb-1">Reference</div>
              <div className="text-sm font-medium">{sourceEntry.reference}</div>
            </div>
            <div className="md:col-span-3">
              <div className="text-xs text-[#666] mb-1">Description</div>
              <div className="text-sm font-medium">{sourceEntry.description}</div>
            </div>
          </div>

          {/* Source Lines */}
          <div className="mt-4">
            <div className="text-xs text-[#666] mb-2">Entry Lines</div>
            <div className="bg-white border border-[#c0c0c0] rounded">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f5f5f5] border-b border-[#c0c0c0]">
                    <th className="px-3 py-2 text-left text-xs font-medium text-[#666]">Account</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-[#666]">Debit</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-[#666]">Credit</th>
                  </tr>
                </thead>
                <tbody>
                  {sourceEntry.lines.map((line, index) => (
                    <tr key={line.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}>
                      <td className="px-3 py-2">
                        {line.account_code} - {line.account_name}
                      </td>
                      <td className="px-3 py-2 text-right">
                        {line.debit > 0 ? line.debit.toLocaleString() : '—'}
                      </td>
                      <td className="px-3 py-2 text-right">
                        {line.credit > 0 ? line.credit.toLocaleString() : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </fieldset>

        {/* Reversal Parameters */}
        <fieldset className="mb-6 p-4 border border-[#c0c0c0] rounded">
          <legend className="px-2 text-sm font-medium text-[#666]">Reversal Parameters</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-[#333] mb-1">
                Reversal Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                value={reversalDate}
                onChange={(e) => setReversalDate(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white border border-[#c0c0c0] rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333] mb-1">
                Description <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Reversal description"
                className="w-full px-3 py-2 bg-white border border-[#c0c0c0] rounded text-sm"
              />
            </div>
          </div>
        </fieldset>

        {/* Warning */}
        <div className="mb-6 p-4 bg-[#fffbf0] border border-[#f0e68c] rounded flex items-start gap-3">
          <AlertCircle size={20} className="text-[#d4a017] mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <div className="font-medium mb-1">Important Information</div>
            <p className="text-[#555]">
              This operation will create a new entry with opposite debits and credits to reverse
              the original transaction. The original entry will remain unchanged in the immutable ledger.
              All reversed lines will be posted on the reversal date specified above.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-[#d0d0d0] hover:bg-[#c0c0c0] border border-[#a0a0a0] rounded text-sm font-medium"
          >
            <RotateCcw size={16} />
            Create Reversal Entry
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-white hover:bg-[#f0f0f0] border border-[#c0c0c0] rounded text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
