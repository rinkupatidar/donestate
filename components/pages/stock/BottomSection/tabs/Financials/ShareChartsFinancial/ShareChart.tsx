import Button from 'components/Button/Button'
import Icon from 'components/Icon/Icon'
import { CHARTS_BOTTOM_BUTTONS_WRAPPER_ID } from 'constants'
import { AnimatePresence } from 'framer-motion'
import HighchartsReact from 'highcharts-react-official'
import { RefObject, useState } from 'react'
import { createPortal } from 'react-dom'
import { BsShareFill } from 'react-icons/bs'
import ShareChartModal from './ShareChartModal'
import { useRouter } from 'next/router'

interface ShareChartProps {
  // chartsRef:any
  onModalStateChange: (isOpen: boolean) => void;
  imageData:any;
}

const ShareChart = ({onModalStateChange,imageData }: ShareChartProps) => {

  
  const [isModalOpen, setIsModalOpen] = useState(false)

  const router = useRouter()
  const title = router.query.titles
  const ChartTitle = router.query.ChartTitle

  // Function to toggle modal state and notify the parent
  const toggleModal = () => {
    const newState = !isModalOpen;
    setIsModalOpen(newState);
    onModalStateChange(newState);
  };
  

  return (
    <div>
      <AnimatePresence>
        {isModalOpen && (
          <ShareChartModal
          // chartsRef={chartsRef}
          imageData={imageData}
            //chartsRef={chartsRef}
            close={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
      {/* {createPortal( */}
        <Button
          // onClick={() => setIsModalOpen(true)}
          onClick={toggleModal}
          size="small"
          className="is-warning is-outlined is-flex-grow-1"
          disabled={title || ChartTitle ? false : true}
        >
          <Icon>
            <BsShareFill />
          </Icon>
          <span>Share</span>
        </Button>
      {/* //document.getElementById(CHARTS_BOTTOM_BUTTONS_WRAPPER_ID) as HTMLElement 
      // )} */}
    </div>
  )
}
export default ShareChart
