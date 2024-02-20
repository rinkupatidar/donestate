import { motion } from 'framer-motion'
import { OPACITY_VARIANT } from '../../utils/variants'
import styles from './index.module.scss'
import PrimaryLoader from './PrimaryLoader'

interface LoaderOverlayProps {
  initial?: string
  lOpacity?: boolean
  loaderTop?: boolean
}

const LoaderOverlay = ({
  initial = 'initial',
  lOpacity,
  loaderTop,
}: LoaderOverlayProps) => {
  return (
    <motion.div
      variants={OPACITY_VARIANT}
      transition={{ delay: 0.3 }}
      initial={initial}
      animate="animate"
      exit="exit"
      data-top={loaderTop}
      className={`${styles.loading_overlay} ${
        lOpacity ? styles.low_opacity : ''
      }`}>
      <PrimaryLoader />
    </motion.div>
  )
}
export default LoaderOverlay
