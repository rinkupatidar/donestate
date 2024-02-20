import { useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getTopWorldEquityMarketInfo } from 'service/DashboardService/DashboardServices'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
import LoadingSection from '../../Loader/LoadingSection'
import Grid from '../../Overview/Grid'
import SectionWrapper from '../../Overview/SectionWrapper'
import SubSectionWrapper from '../../Overview/SubSectionWrapper'
import Value from '../../Overview/Value'
import { WorldEquityMarketResponseType } from './types'

const gridColumnsVal = '1.8fr 1fr .6fr .6fr 1fr 1fr'

interface WorldEquityMarketsSectionProps {
  wsData: WorldEquityMarketResponseType | undefined
}

const WorldEquityMarketsSection = ({
  wsData,
}: WorldEquityMarketsSectionProps) => {
  const queryClient = useQueryClient()
  const query = useQuery(
    ['getTopWorldEquityMarketInfo'],
    getTopWorldEquityMarketInfo
  )
  const { data, isLoading } = query
  // const [data, isLoading, setData] = useFetch<WorldEquityMarketResponseType>
  const [isHovering, setIsHovering] = useState(false)
  const [isFirstRender, setIsFirstRender] = useState(true) // for disabling animation in first render
  const [selectedRegion, setSelectedRegion] = useState('')

  useDeepCompareEffectNoCheck(() => {
    if (wsData) {
      queryClient.setQueryData(['getTopWorldEquityMarketInfo'], wsData)
      setIsFirstRender(false)
    }
  }, [wsData])

  useEffect(() => {
    if (data) setSelectedRegion(data[0].region_name)
  }, [!!data])

  const commonValProps = {
    shouldAnimate: !isFirstRender,
    className: 'is-family-secondary',
    keepDecimal: true,
  }

  const item = data?.find((i) => i.region_name === selectedRegion)

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
          <Grid className="mt-3" isInfo gridColumns={gridColumnsVal}>
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
                index_symbol,
                real_time_data: {
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
                gridColumns={gridColumnsVal}>
                <Value
                  title={index_symbol}
                  className="is-capitalized has-text-left is-clickable">
                  {index_name}
                </Value>
                <Value id={`${index_name}_current_price`} {...commonValProps}>
                  {current_price}
                </Value>
                <Value id={`${index_name}_change`} {...commonValProps}>
                  {change}
                </Value>
                <Value
                  id={`${index_name}_day_change_percentage`}
                  {...commonValProps}>
                  {day_change_percentage}
                </Value>
                <Value id={`${index_name}_day_high`} {...commonValProps}>
                  {day_high}
                </Value>
                <Value id={`${index_name}_day_low`} {...commonValProps}>
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
export default WorldEquityMarketsSection
