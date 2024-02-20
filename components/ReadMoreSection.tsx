import { motion } from 'framer-motion'
import { useState } from 'react'

interface ReadMoreSectionProps {
  height?: number
  charLimit?: number
  text: string
}

const ReadMoreSection = ({
  height = 100,
  text,
  charLimit = 500,
}: ReadMoreSectionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const isLongText = text.length > charLimit
  return (
    <div>
      <motion.p
        animate={isLongText ? { height: isOpen ? 'auto' : height } : undefined}
        className="is-clipped"
      >
        {text}
      </motion.p>
      {isLongText && (
        <span
          onClick={() => setIsOpen(!isOpen)}
          className="has-text-grey is-size-7 is-underlined is-clickable"
        >
          read {isOpen ? 'less' : 'more'}
        </span>
      )}
    </div>
  )
}
export default ReadMoreSection
