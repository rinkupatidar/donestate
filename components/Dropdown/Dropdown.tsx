import DownArrowIcon from '@/icons/down-arrow.svg'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import useKeyPress from '../../hooks/useKey'
import { TOP_TO_BOTTOM_MENU_VARIANT } from '../../utils/variants'
import styles from './index.module.scss'

interface DropdownProps {
  dataArr: DropdownItemType[]
  className?: string
  initialIdx?: number
  disableSelection?: boolean
  onClick?: (item: any) => void
  disabled?: boolean
  value?: string
  controlKey?: string // when you want the dropdown to be a controlled component, give this to make a comparison again anything else
  maxHeight?: string
  dropdownAlign?: 'left' | 'right'
}

const Dropdown = ({
  initialIdx,
  dataArr,
  className = 'is-warning',
  onClick,
  disableSelection,
  disabled,
  value,
  controlKey,
  maxHeight,
  dropdownAlign = 'left',
}: DropdownProps) => {
  useKeyPress('Escape', () => setIsOpen(false))
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState<undefined | number>()

  useEffect(() => {
    if (value === undefined) return
    // const idx = dataArr.findIndex(
      if (dataArr && value !== undefined) {
        const idx = dataArr.findIndex(
      (val) =>
        value ===
        (controlKey
          ? (val as { [key: string]: any })[controlKey]
          : getDisplayValue(val))
    )
    setSelectedIdx(idx)
        }
  }, [value])
  

  let idxToRead: number
  if (selectedIdx !== undefined) idxToRead = selectedIdx
  else {
    if (initialIdx !== undefined) idxToRead = initialIdx
    else idxToRead = 0
  }

  const getDisplayValue = (item: DropdownItemType) => {
    let displayValue
    if (typeof item === 'string') displayValue = item
    else if (typeof item === 'object') {
      if (item.displayValue) displayValue = item.displayValue
      else throw new Error('Data passed does not have a display Value')
    }
    return displayValue
  }

  const handleChange = (idx: number) => {
    if (!disableSelection) setSelectedIdx(idx)
    if (onClick) {
      onClick(dataArr[idx])
    }
  }
  return (
    <button
      disabled={disabled}
      onClick={() => setIsOpen(!isOpen)}
      className={`${styles.container} ${className}`}
    >
      <AnimatePresence>
        {isOpen && (
          <ClickAwayListener onClickAway={() => setIsOpen(false)}>
            <div
              className={styles.dropdown_wrapper}
              style={{ maxHeight: maxHeight, [dropdownAlign]: 0 }}
            >
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={TOP_TO_BOTTOM_MENU_VARIANT}
                className={styles.dropdown}
              >
                {dataArr.map((item, idx) => (
                  <div
                    className={styles.dropdown_item}
                    onClick={() => handleChange(idx)}
                    key={idx}
                  >
                    {getDisplayValue(item)}
                  </div>
                ))}
              </motion.div>
            </div>
          </ClickAwayListener>
        )}
      </AnimatePresence>
      {dataArr && dataArr.length > 0 && (
      <span>{getDisplayValue(dataArr[idxToRead])}</span>
      )}
      <motion.span animate={{ rotateZ: isOpen ? 180 : 0 }} className="icon">
        <DownArrowIcon />
      </motion.span>
    </button>
  )
}

export default Dropdown
