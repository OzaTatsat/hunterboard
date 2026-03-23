import { useState } from 'react'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import useLocalStorage from '../hooks/useLocalStorage'
import { Plus, Trash2 } from 'lucide-react'

const severityOptions = ['low', 'medium', 'high', 'critical']
const statusOptions   = ['Open', 'Submitted', 'Triaged', 'Resolved']

const emptyForm = {
  title:    '',
  severity: 'low',
  status:   'Open',
  target:   '',
}

export default function Vulns() {
  const [vulns, setVulns]       = useLocalStorage('vulns', [])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm]           = useState(emptyForm)

  const handleAdd = () => {
    if (!form.title.trim()) return
    setVulns([...vulns, { ...form, id: Date.now() }])
    setForm(emptyForm)
    setShowModal(false)
  }

  const handleDelete = (id) => {
    setVulns(vulns.filter((v) => v.id !== id))
  }

  return (
    <PageWrapper title="Vulnerabilities" description="Every bug you've found, tracked in one place">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">{vulns.length} vulnerabilities logged</p>
        <Button onClick={() => setShowModal(true)}>
          <span className="flex items-center gap-2">
            <Plus size={16} /> Log Vuln
          </span>
        </Button>
      </div>

      {/* Table */}
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {['Title', 'Severity', 'Status', 'Target', 'Date'].map((col) => (
                <th key={col} className="text-left px-5 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">
                  {col}
                </th>
              ))}
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {vulns.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-slate-400 text-sm">
                  No vulnerabilities logged yet. Find some bugs! 🐛
                </td>
              </tr>
            ) : (
              vulns.map((vuln) => (
                <tr key={vuln.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition">
                  <td className="px-5 py-4 font-medium text-slate-800">{vuln.title}</td>
                  <td className="px-5 py-4">
                    <Badge label={vuln.severity} type={vuln.severity} />
                  </td>
                  <td className="px-5 py-4">
                    <Badge
                      label={vuln.status}
                      type={
                        vuln.status === 'Resolved'  ? 'resolved' :
                        vuln.status === 'Triaged'   ? 'medium'   :
                        vuln.status === 'Submitted' ? 'active'   : 'low'
                      }
                    />
                  </td>
                  <td className="px-5 py-4 text-slate-500">{vuln.target || '—'}</td>
                  <td className="px-5 py-4 text-slate-400">
                    {new Date(vuln.id).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => handleDelete(vuln.id)} className="text-slate-300 hover:text-red-400 transition">
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
            <h3 className="text-lg font-semibold text-slate-900 mb-5">Log Vulnerability</h3>

            <div className="flex flex-col gap-4">

              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Title</label>
                <input
                  type="text"
                  placeholder="e.g. XSS on login form"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Target</label>
                <input
                  type="text"
                  placeholder="e.g. example.com"
                  value={form.target}
                  onChange={(e) => setForm({ ...form, target: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Severity</label>
                  <select
                    value={form.severity}
                    onChange={(e) => setForm({ ...form, severity: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {severityOptions.map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
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
              </div>

            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={handleAdd}>Log Vulnerability</Button>
              <Button variant="ghost" onClick={() => { setShowModal(false); setForm(emptyForm) }}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

    </PageWrapper>
  )
}