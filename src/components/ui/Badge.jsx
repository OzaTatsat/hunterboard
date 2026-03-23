const styles = {
  low:      'bg-green-100 text-green-700',
  medium:   'bg-yellow-100 text-yellow-700',
  high:     'bg-orange-100 text-orange-700',
  critical: 'bg-red-100 text-red-700',
  active:   'bg-blue-100 text-blue-700',
  resolved: 'bg-slate-100 text-slate-500',
}

export default function Badge({ label, type }) {
  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${styles[type] ?? styles.low}`}>
      {label}
    </span>
  )
}