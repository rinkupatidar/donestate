import Button from 'components/Button/Button'
import Icon from 'components/Icon/Icon'
import { CHARTS_BOTTOM_BUTTONS_WRAPPER_ID } from 'constants'
import { AnimatePresence } from 'framer-motion'
import HighchartsReact from 'highcharts-react-official'
import { RefObject, useState } from 'react'
import { createPortal } from 'react-dom'
import { BsShareFill } from 'react-icons/bs'
import ShareChartModal from './ShareChartModal'

interface ShareChartProps {
  chartsRef: RefObject<HighchartsReact.RefObject>
}

const ShareChart = ({ chartsRef }: ShareChartProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <AnimatePresence>
        {isModalOpen && (
          <ShareChartModal
            chartsRef={chartsRef}
            close={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
      {createPortal(
        <Button
          onClick={() => setIsModalOpen(true)}
          size="small"
          className="is-warning is-outlined is-flex-grow-1"
        >
          <Icon>
            <BsShareFill />
          </Icon>
          <span>Share</span>
        </Button>,
        document.getElementById(CHARTS_BOTTOM_BUTTONS_WRAPPER_ID) as HTMLElement
      )}
    </div>
  )
}
export default ShareChart
