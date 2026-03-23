import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import useLocalStorage from '../hooks/useLocalStorage'

export default function EarningsChart() {
  const [earnings] = useLocalStorage('earnings', [])

  
  const chartData = earnings.reduce((acc, e) => {
    const month = new Date(e.id).toLocaleString('default', { month: 'short' })
    const existing = acc.find((d) => d.month === month)
    if (existing) existing.earned += e.amount
    else acc.push({ month, earned: e.amount })
    return acc
  }, [])

  return (
    <Card>
      <div className="mb-6">
        <p className="text-base font-semibold text-slate-900">Earnings Over Time</p>
        <p className="text-sm text-slate-400 mt-0.5">Monthly bounty payouts</p>
      </div>

      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-[260px] text-slate-400 text-sm">
          No earnings yet. Add a payout to see your chart 📈
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
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
      )}
    </Card>
  )
}