import { useState } from 'react'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import useLocalStorage from '../hooks/useLocalStorage'
import { Plus, Trash2, DollarSign, TrendingUp, Calendar } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const platformOptions = ['HackerOne', 'Bugcrowd', 'Intigriti', 'YesWeHack', 'Private']
const emptyForm = { title: '', amount: '', platform: 'HackerOne', severity: 'medium' }

export default function Earnings() {
  const [earnings, setEarnings] = useLocalStorage('earnings', [])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(emptyForm)

  const handleAdd = () => {
    if (!form.title.trim() || !form.amount) return
    setEarnings([...earnings, { ...form, amount: Number(form.amount), id: Date.now() }])
    setForm(emptyForm)
    setShowModal(false)
  }

  const handleDelete = (id) => {
    setEarnings(earnings.filter((e) => e.id !== id))
  }

  const total   = earnings.reduce((sum, e) => sum + e.amount, 0)
  const highest = earnings.length ? Math.max(...earnings.map((e) => e.amount)) : 0
  const count   = earnings.length

  const chartData = earnings.reduce((acc, e) => {
    const month = new Date(e.id).toLocaleString('default', { month: 'short' })
    const existing = acc.find((d) => d.month === month)
    if (existing) existing.earned += e.amount
    else acc.push({ month, earned: e.amount })
    return acc
  }, [])

  return (
    <PageWrapper title="Earnings" description="Track every bounty payout you've received">

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Card className="flex items-center gap-4">
          <div className="bg-green-50 text-green-500 p-3 rounded-xl">
            <DollarSign size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Total Earned</p>
            <p className="text-2xl font-semibold text-slate-900">${total.toLocaleString()}</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="bg-indigo-50 text-indigo-500 p-3 rounded-xl">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Highest Payout</p>
            <p className="text-2xl font-semibold text-slate-900">${highest.toLocaleString()}</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="bg-yellow-50 text-yellow-500 p-3 rounded-xl">
            <Calendar size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-0.5">Total Payouts</p>
            <p className="text-2xl font-semibold text-slate-900">{count}</p>
          </div>
        </Card>
      </div>

      {chartData.length > 0 && (
        <Card className="mb-8">
          <div className="mb-6">
            <p className="text-base font-semibold text-slate-900">Earnings Over Time</p>
            <p className="text-sm text-slate-400 mt-0.5">Grouped by month</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                formatter={(value) => [`$${value}`, 'Earned']}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px' }}
              />
              <Line type="monotone" dataKey="earned" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4, fill: '#6366f1' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-500">{count} payouts logged</p>
        <Button onClick={() => setShowModal(true)}>
          <span className="flex items-center gap-2"><Plus size={16} /> Add Payout</span>
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Title', 'Amount', 'Platform', 'Severity', 'Date'].map((col) => (
                  <th key={col} className="text-left px-5 py-3 text-xs font-medium text-slate-400 uppercase tracking-wide">
                    {col}
                  </th>
                ))}
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {earnings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400 text-sm">
                    No payouts yet. Go get that bag! 💰
                  </td>
                </tr>
              ) : (
                earnings.map((e) => (
                  <tr key={e.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition">
                    <td className="px-5 py-4 font-medium text-slate-800">{e.title}</td>
                    <td className="px-5 py-4 font-semibold text-green-600">${e.amount.toLocaleString()}</td>
                    <td className="px-5 py-4 text-slate-500">{e.platform}</td>
                    <td className="px-5 py-4"><Badge label={e.severity} type={e.severity} /></td>
                    <td className="px-5 py-4 text-slate-400">{new Date(e.id).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      <button onClick={() => handleDelete(e.id)} className="text-slate-300 hover:text-red-400 transition">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-slate-900 mb-5">Add Payout</h3>
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
                <label className="text-xs font-medium text-slate-500 mb-1 block">Amount ($)</label>
                <input
                  type="number"
                  placeholder="e.g. 500"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Platform</label>
                  <select
                    value={form.platform}
                    onChange={(e) => setForm({ ...form, platform: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {platformOptions.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Severity</label>
                  <select
                    value={form.severity}
                    onChange={(e) => setForm({ ...form, severity: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {['low','medium','high','critical'].map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={handleAdd}>Add Payout</Button>
              <Button variant="ghost" onClick={() => { setShowModal(false); setForm(emptyForm) }}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

    </PageWrapper>
  )
}