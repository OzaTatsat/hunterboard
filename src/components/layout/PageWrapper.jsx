import Navbar from './Navbar'
import { motion } from 'framer-motion'

export default function PageWrapper({ title, description, children }) {
  return (
    <motion.div
      className="max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Navbar title={title} description={description} />
      {children}
    </motion.div>
  )
}