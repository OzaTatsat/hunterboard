export default function Navbar({ title, description }) {
  return (
    <div className="flex items-center justify-between mb-8">
      
      {/* Left — Page Info */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        {description && (
          <p className="text-sm text-slate-400 mt-0.5">{description}</p>
        )}
      </div>

      {/* Right — Profile Badge */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-semibold">
          H
        </div>
        <span className="text-sm font-medium text-slate-700">Hunter</span>
      </div>

    </div>
  )
}