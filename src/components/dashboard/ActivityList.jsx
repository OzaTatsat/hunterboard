import Card from '../ui/Card'
import Badge from '../ui/Badge'
import useLocalStorage from '../../hooks/useLocalStorage'

export default function ActivityList() {
  const [vulns] = useLocalStorage('vulns', [])

  
  const recent = [...vulns]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5)

  return (
    <Card>
      <div className="mb-5">
        <p className="text-base font-semibold text-slate-900">Recent Vulnerabilities</p>
        <p className="text-sm text-slate-400 mt-0.5">Your latest findings</p>
      </div>

      {recent.length === 0 ? (
        <div className="flex items-center justify-center py-10 text-slate-400 text-sm">
          No vulns logged yet 🐛
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {recent.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-slate-800">{item.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item.target || 'No target'}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge label={item.severity} type={item.severity} />
                <span className="text-xs text-slate-400">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}