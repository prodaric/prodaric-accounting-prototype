import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export function Configuration() {
  const [functionalCurrency, setFunctionalCurrency] = useState('COP');
  const [presentationCurrency, setPresentationCurrency] = useState('COP');
  const [documentTypes, setDocumentTypes] = useState([
    { id: '1', code: 'INV', name: 'Invoice' },
    { id: '2', code: 'REC', name: 'Receipt' },
    { id: '3', code: 'PAY', name: 'Payment' },
    { id: '4', code: 'ADJ', name: 'Adjustment' }
  ]);
  const [newDocType, setNewDocType] = useState({ code: '', name: '' });

  const currencies = ['COP', 'USD', 'VES', 'EUR'];

  const addDocumentType = () => {
    if (newDocType.code && newDocType.name) {
      setDocumentTypes([
        ...documentTypes,
        { id: String(documentTypes.length + 1), ...newDocType }
      ]);
      setNewDocType({ code: '', name: '' });
    }
  };

  const removeDocumentType = (id: string) => {
    setDocumentTypes(documentTypes.filter(dt => dt.id !== id));
  };

  const handleSave = () => {
    alert('Configuration saved successfully!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Configuration</h1>

      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        {/* Currency Configuration */}
        <fieldset className="mb-6 p-4 border border-[#c0c0c0] rounded">
          <legend className="px-2 text-sm font-medium text-[#666]">Currency Settings</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-[#333] mb-1">
                Functional Currency
              </label>
              <select
                value={functionalCurrency}
                onChange={(e) => setFunctionalCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#c0c0c0] rounded text-sm"
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
              <p className="text-xs text-[#666] mt-1">
                The currency of the primary economic environment
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#333] mb-1">
                Presentation Currency
              </label>
              <select
                value={presentationCurrency}
                onChange={(e) => setPresentationCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#c0c0c0] rounded text-sm"
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
              <p className="text-xs text-[#666] mt-1">
                The currency for financial statement presentation
              </p>
            </div>
          </div>
        </fieldset>

        {/* Document Types */}
        <fieldset className="mb-6 p-4 border border-[#c0c0c0] rounded">
          <legend className="px-2 text-sm font-medium text-[#666]">Document Types</legend>
          <div className="mt-2">
            {/* Existing Document Types */}
            <div className="mb-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#f5f5f5] border-b border-[#c0c0c0]">
                    <th className="px-3 py-2 text-left text-xs font-medium text-[#666]">Code</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-[#666]">Name</th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-[#666] w-16">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {documentTypes.map((docType, index) => (
                    <tr key={docType.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'}>
                      <td className="px-3 py-2 text-sm font-mono">{docType.code}</td>
                      <td className="px-3 py-2 text-sm">{docType.name}</td>
                      <td className="px-3 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => removeDocumentType(docType.id)}
                          className="p-1 hover:bg-[#e0e0e0] rounded"
                        >
                          <Trash2 size={16} className="text-[#666]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add New Document Type */}
            <div className="p-3 bg-[#f9f9f9] border border-[#e0e0e0] rounded">
              <div className="text-xs font-medium text-[#666] mb-2">Add New Document Type</div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Code (e.g., JE)"
                  value={newDocType.code}
                  onChange={(e) => setNewDocType({ ...newDocType, code: e.target.value })}
                  className="w-32 px-2 py-1.5 bg-white border border-[#c0c0c0] rounded text-sm"
                />
                <input
                  type="text"
                  placeholder="Name (e.g., Journal Entry)"
                  value={newDocType.name}
                  onChange={(e) => setNewDocType({ ...newDocType, name: e.target.value })}
                  className="flex-1 px-2 py-1.5 bg-white border border-[#c0c0c0] rounded text-sm"
                />
                <button
                  type="button"
                  onClick={addDocumentType}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-[#f0f0f0] border border-[#c0c0c0] rounded text-sm"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Other Settings */}
        <fieldset className="mb-6 p-4 border border-[#c0c0c0] rounded">
          <legend className="px-2 text-sm font-medium text-[#666]">Other Settings</legend>
          <div className="mt-2 space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="allow-reversal"
                defaultChecked
                className="w-4 h-4"
              />
              <label htmlFor="allow-reversal" className="text-sm">
                Allow reversal entries for closed periods
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="require-approval"
                className="w-4 h-4"
              />
              <label htmlFor="require-approval" className="text-sm">
                Require approval for entries above threshold
              </label>
            </div>
          </div>
        </fieldset>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-[#d0d0d0] hover:bg-[#c0c0c0] border border-[#a0a0a0] rounded text-sm font-medium"
          >
            Save Configuration
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
