import clsx from 'clsx'

export default function Button({children, onClick, variant = 'primary', className}) {
    const base = 'px-4 py-2 rounded-xl text-sm font-medium transition duration-200 cursor-pointer'
    
    const variants = {
        primary: 'bg-blue-500 text-white hover:bg-indigo-600',
        ghost: 'bg-slate-100 text-slate-700 hover:bg-slate-200', 
    }

    return(
        <button
         onClick={onClick}
         className={clsx(base, variants[variant], className)}
         >
            {children}
         </button>
    )
}