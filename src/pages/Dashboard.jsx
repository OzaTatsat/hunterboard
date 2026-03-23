import PageWrapper from '../components/layout/PageWrapper'
import StatCard from '../components/dashboard/StatCard'
import EarningsChart from '../components/dashboard/EarningsChart'
import ActivityList from '../components/dashboard/ActivityList'
import useLocalStorage from '../hooks/useLocalStorage'
import { Target, Bug, DollarSign, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  const [targets]  = useLocalStorage('targets',  [])
  const [vulns]    = useLocalStorage('vulns',    [])
  const [earnings] = useLocalStorage('earnings', [])

  const totalEarned   = earnings.reduce((sum, e) => sum + e.amount, 0)
  const criticalCount = vulns.filter((v) => v.severity === 'critical').length
  const resolvedCount = vulns.filter((v) => v.status === 'Resolved').length
  const successRate   = vulns.length
    ? Math.round((resolvedCount / vulns.length) * 100)
    : 0

  const stats = [
    {
      title: 'Total Targets',
      value: String(targets.length),
      trend: targets.length === 0 ? 'No targets yet' : `${targets.filter(t => t.status === 'Active').length} active`,
      icon: Target,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50',
    },
    {
      title: 'Vulnerabilities',
      value: String(vulns.length),
      trend: criticalCount > 0 ? `${criticalCount} critical` : 'None critical',
      icon: Bug,
      color: 'text-red-500',
      bg: 'bg-red-50',
    },
    {
      title: 'Total Earned',
      value: `$${totalEarned.toLocaleString()}`,
      trend: earnings.length === 0 ? 'No payouts yet' : `${earnings.length} payouts logged`,
      icon: DollarSign,
      color: 'text-green-500',
      bg: 'bg-green-50',
    },
    {
      title: 'Success Rate',
      value: `${successRate}%`,
      trend: vulns.length === 0 ? 'Log vulns to track' : `${resolvedCount} of ${vulns.length} resolved`,
      icon: TrendingUp,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50',
    },
  ]

  return (
    <PageWrapper title="Dashboard" description="Welcome back, Hunter 👋">

      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <EarningsChart />
        </div>
        <div className="col-span-1">
          <ActivityList />
        </div>
      </div>

    </PageWrapper>
  )
}