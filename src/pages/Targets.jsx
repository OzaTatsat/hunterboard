import { useState } from 'react'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import useLocalStorage from '../hooks/useLocalStorage'
import { Plus, Trash2 } from 'lucide-react'

const statusOptions = ['Active', 'Paused', 'Completed']

const emptyForm = { domain: '', status: 'Active', notes: '' }

export default function Targets() {
  const [targets, setTargets] = useLocalStorage('targets', [])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const handleAdd = () => {
    if (!form.domain.trim()) return
    setTargets([...targets, { ...form, id: Date.now() }])
    setForm(emptyForm)
    setShowModal(false)
  }

  const handleDelete = (id) => {
    setTargets(targets.filter((t) => t.id !== id))
  }

  return (
    <PageWrapper title="Targets" description="Domains and programs you're hunting on">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">{targets.length} targets tracked</p>
        <Button onClick={() => setShowModal(true)}>
          <span className="flex items-center gap-2">
            <Plus size={16} /> Add Target
          </span>
        </Button>
      </div>

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left px-5 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">Domain</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">Status</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">Notes</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">Date Added</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {targets.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-slate-400 text-sm">
                  No targets yet. Add your first one ☝️
                </td>
              </tr>
            ) : (
              targets.map((target) => (
                <tr key={target.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition">
                  <td className="px-5 py-4 font-medium text-slate-800">{target.domain}</td>
                  <td className="px-5 py-4">
                    <Badge
                      label={target.status}
                      type={target.status === 'Active' ? 'active' : target.status === 'Completed' ? 'resolved' : 'medium'}
                    />
                  </td>
                  <td className="px-5 py-4 text-slate-500 max-w-xs truncate">{target.notes || '—'}</td>
                  <td className="px-5 py-4 text-slate-400">{new Date(target.id).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    <button onClick={() => handleDelete(target.id)} className="text-slate-300 hover:text-red-400 transition">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-slate-900 mb-5">Add Target</h3>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Domain</label>
                <input
                  type="text"
                  placeholder="e.g. example.com"
                  value={form.domain}
                  onChange={(e) => setForm({ ...form, domain: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {statusOptions.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Notes</label>
                <textarea
                  placeholder="Any notes about this target..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={handleAdd}>Add Target</Button>
              <Button variant="ghost" onClick={() => { setShowModal(false); setForm(emptyForm) }}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

    </PageWrapper>
  )
}