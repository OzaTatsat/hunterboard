import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../ui/Card'

const data = [
  { month: 'Jan', earned: 200 },
  { month: 'Feb', earned: 800 },
  { month: 'Mar', earned: 600 },
  { month: 'Apr', earned: 1400 },
  { month: 'May', earned: 900 },
  { month: 'Jun', earned: 1800 },
  { month: 'Jul', earned: 2200 },
]

export default function EarningsChart() {
  return (
    <Card>
      {/* Header */}
      <div className="mb-6">
        <p className="text-base font-semibold text-slate-900">Earnings Over Time</p>
        <p className="text-sm text-slate-400 mt-0.5">Monthly bounty payouts</p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip
            formatter={(value) => [`$${value}`, 'Earned']}
            contentStyle={{
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              fontSize: '13px',
            }}
          />
          <Line
            type="monotone"
            dataKey="earned"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#6366f1' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}