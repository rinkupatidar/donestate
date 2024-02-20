import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { IS_CLIENT, OVERVIEW_DATA } from '../../constants'
import LoadingSection from '../Loader/LoadingSection'
import Modal from '../Modal/Modal'
import Grid from './Grid'
import SectionWrapper from './SectionWrapper'
import SubSectionWrapper from './SubSectionWrapper'
import Value from './Value'

interface OverviewSectionProps {
  data: typeof OVERVIEW_DATA
}

const localStorageKey = 'overviewAccordion'
let initialAccordion = {}
if (IS_CLIENT && localStorage.getItem(localStorageKey)) {
  initialAccordion = JSON.parse(localStorage.getItem(localStorageKey) || '{}')
}
const OverviewSection = ({}: OverviewSectionProps) => {
  const [isHovering, setIsHovering] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState(
    OVERVIEW_DATA.regions[0].region_name
  )

  const item = OVERVIEW_DATA.regions.find(
    (i) => i.region_name === selectedRegion
  )
  if (!item) return <LoadingSection />
  return (
    <motion.div
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}>
      <AnimatePresence>
        {isModalOpen && (
          <Modal close={() => setIsModalOpen(false)}>
            <div className="p-3">
              <p>Overview Settings</p>
            </div>
          </Modal>
        )}
      </AnimatePresence>
      <SectionWrapper>
        <SubSectionWrapper>
          <div className="is-flex is-capitalized" style={{ gap: '16px' }}>
            {OVERVIEW_DATA.regions.map((i) => (
              <p
                key={i.region_name}
                onClick={() => setSelectedRegion(i.region_name)}
                className={`is-size-7 has-tw-medium is-clickable ${
                  selectedRegion === i.region_name
                    ? 'has-text-info'
                    : 'has-text-white'
                }`}>
                {i.region_name}
              </p>
            ))}
          </div>
          <Grid className="mt-3" isInfo gridColumns="repeat(6 ,1fr)">
            <Value className="has-text-left">overview</Value>
            <Value>value</Value>
            <Value>change</Value>
            <Value>day(%)</Value>
            <Value>day high</Value>
            <Value>day low</Value>
          </Grid>
          {item.indexes.map(
            (
              {
                index_name,
                real_time_data: {
                  open,
                  current_price,
                  change,
                  day_change_percentage,
                  day_high,
                  day_low,
                },
              },
              idx
            ) => (
              <Grid
                isDark={isHovering && idx % 2 !== 0}
                key={idx}
                gridColumns="repeat(6 ,1fr)">
                <Value className="is-capitalized has-text-left">
                  {index_name}
                </Value>

                <Value className="is-family-secondary">{current_price}</Value>
                <Value className="is-family-secondary">{change}</Value>
                <Value className="is-family-secondary">
                  {day_change_percentage}
                </Value>
                <Value className="is-family-secondary">{day_high}</Value>
                <Value className="is-family-secondary">{day_low}</Value>
              </Grid>
            )
          )}
        </SubSectionWrapper>
      </SectionWrapper>
    </motion.div>
  )
}
export default OverviewSection
