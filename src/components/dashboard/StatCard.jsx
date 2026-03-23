import Card from '../ui/Card'

export default function StatCard({ title, value, trend, icon: Icon, color, bg }) {
  return (
    <Card className="hover:-translate-y-1 transition duration-200">
      <div className="flex items-start justify-between mb-4">
        
        {/* Icon */}
        <div className={`${bg} ${color} p-2.5 rounded-xl`}>
          <Icon size={20} />
        </div>

      </div>

      {/* Value */}
      <p className="text-2xl font-semibold text-slate-900 mb-1">{value}</p>

      {/* Title */}
      <p className="text-sm text-slate-500">{title}</p>

      {/* Trend */}
      <p className="text-xs text-indigo-500 font-medium mt-2">{trend}</p>
    </Card>
  )
}