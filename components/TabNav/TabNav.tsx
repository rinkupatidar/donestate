import { motion } from 'framer-motion'
import styles from './index.module.scss'

interface TabNavProps {
  items: Array<string>
  activeItem: string
  setActiveItem: (item: string) => void
}

const TabNav = ({ items, activeItem, setActiveItem }: TabNavProps) => {
  return (
    <nav className={styles.bottom_info_nav}>
      {items.map((item) => (
        <div
          role="button"
          className={styles.nav_item}
          key={item}
          onClick={() => setActiveItem(item)}
        >
          {activeItem === item && (
            <motion.div
              layoutId={items.join('')}
              className={styles.floating_bg}
            />
          )}
          {item}
        </div>
      ))}
    </nav>
  )
}
export default TabNav
