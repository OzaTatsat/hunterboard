import clsx from 'clsx'
import { motion } from 'framer-motion'

export default function Card({ children, className }) {
  return (
    <motion.div
      className={clsx(
        'bg-white border border-slate-200 rounded-2xl shadow-sm p-5',
        className
      )}
      whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}