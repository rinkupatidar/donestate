import { useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getTopWorldCommoditiesInfo } from 'service/DashboardService/DashboardServices'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
import LoadingSection from '../../Loader/LoadingSection'
import Grid from '../../Overview/Grid'
import SectionWrapper from '../../Overview/SectionWrapper'
import SubSectionWrapper from '../../Overview/SubSectionWrapper'
import Value from '../../Overview/Value'
import { WorldCommoditiesResponseType } from './types'

interface WorldCommoditiesSectionProps {
  wsData: WorldCommoditiesResponseType | undefined
}

const gridColumnsVal = '1.8fr 1fr .6fr .6fr 1fr 1fr'
const WorldCommoditiesSection = ({ wsData }: WorldCommoditiesSectionProps) => {
  const queryClient = useQueryClient()
  const query = useQuery(
    ['getTopWorldCommoditiesInfo'],
    getTopWorldCommoditiesInfo
  )
  const { data, isLoading } = query

  const [isHovering, setIsHovering] = useState(false)
  const [isFirstRender, setIsFirstRender] = useState(true) // for disabling animation in first render
  const [selectedRegion, setSelectedRegion] = useState('')

  useDeepCompareEffectNoCheck(() => {
    if (wsData) {
      queryClient.setQueryData(['getTopWorldCommoditiesInfo'], wsData)
      setIsFirstRender(false)
    }
  }, [wsData])

  useEffect(() => {
    if (data) setSelectedRegion(data[0].type)
  }, [!!data])

  const commonValProps = {
    shouldAnimate: !isFirstRender,
    className: 'is-family-secondary',
    keepDecimal: true,
  }
  const item = data?.find((i) => i.type === selectedRegion)
  if (isLoading || !item) return <LoadingSection />
  return (
    <motion.div
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}>
      <SectionWrapper>
        <SubSectionWrapper>
          <div className="is-flex" style={{ gap: '16px' }}>
            {data.map((i) => (
              <p
                key={i.type}
                onClick={() => setSelectedRegion(i.type)}
                className={`is-size-7 is-clickable has-tw-medium ${
                  selectedRegion === i.type ? 'has-text-info' : 'has-text-white'
                }`}>
                {i.type}
              </p>
            ))}
          </div>
          <Grid className="mt-3" gridColumns={gridColumnsVal} isInfo>
            <Value className="has-text-left">overview</Value>
            <Value>value</Value>
            <Value>change</Value>
            <Value>day(%)</Value>
            <Value>day high</Value>
            <Value>day low</Value>
          </Grid>
          {item.items.map(
            (
              {
                item_name,
                item_symbol,
                real_time_data: {
                  change,
                  current_price,
                  day_change_percentage,
                  day_high,
                  day_low,
                },
              },
              idx
            ) => (
              <Grid
                gridColumns={gridColumnsVal}
                isDark={isHovering && idx % 2 !== 0}
                key={idx}>
                <Value
                  title={item_symbol}
                  className="is-capitalized has-text-left is-clickable">
                  {item_name}
                </Value>
                <Value {...commonValProps} id={`${item_name}_current_price`}>
                  {current_price}
                </Value>
                <Value {...commonValProps} id={`${item_name}_change`}>
                  {change}
                </Value>
                <Value
                  {...commonValProps}
                  id={`${item_name}_day_change_percentage`}>
                  {day_change_percentage}
                </Value>
                <Value {...commonValProps} id={`${item_name}_day_high`}>
                  {day_high}
                </Value>
                <Value {...commonValProps} id={`${item_name}_day_low`}>
                  {day_low}
                </Value>
              </Grid>
            )
          )}
        </SubSectionWrapper>
      </SectionWrapper>
    </motion.div>
  )
}
export default WorldCommoditiesSection
