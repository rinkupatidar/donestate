import { useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getTopWorldCurrenciesInfo, getTopWorldEquityMarketInfo } from 'service/DashboardService/DashboardServices'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
import LoadingSection from '../../Loader/LoadingSection'
import Grid from '../../Overview/Grid'
import SectionWrapper from '../../Overview/SectionWrapper'
import SubSectionWrapper from '../../Overview/SubSectionWrapper'
import Value from '../../Overview/Value'
import { WorldCurrenciesResponseType } from './types'

const gridColumnsVal = '1.8fr 1fr 1fr 1fr 1fr 1fr'

interface WorldCurrenciesSectionProps {
  wsData: WorldCurrenciesResponseType | undefined
}

const WorldCurrenciesSection = ({ wsData }: WorldCurrenciesSectionProps) => {
  const queryClient = useQueryClient()
  const query = useQuery(
    ['getTopWorldCurrenciesInfo '],
   getTopWorldCurrenciesInfo 
  )
  const { data, isLoading } = query

  const [selectedRegion, setSelectedRegion] = useState('')
  const [isHovering, setIsHovering] = useState(false)
  const [isFirstRender, setIsFirstRender] = useState(true) // for disabling animation in first render

  useDeepCompareEffectNoCheck(() => {
    if (wsData) {
      queryClient.setQueryData(['getTopWorldCurrenciesInfo '], wsData)
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
          <Grid className="mt-3" gridColumns={gridColumnsVal} isInfo>
            <Value className="has-text-left">overview</Value>
            <Value>value</Value>
            <Value>change</Value>
            <Value>day(%)</Value>
            <Value>day high</Value>
            <Value>day low</Value>
          </Grid>
          {item.currencies.map(
            (
              {
                currency_pair,
                currency_pair_symbol,
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
                gridColumns={gridColumnsVal}
                isDark={isHovering && idx % 2 !== 0}
                key={idx}>
                <Value
                  title={currency_pair_symbol}
                  className="is-capitalized has-text-left is-clickable">
                  {currency_pair}
                </Value>
                <Value
                  {...commonValProps}
                  id={`${currency_pair}_current_price`}>
                  {current_price}
                </Value>
                <Value {...commonValProps} id={`${currency_pair}_change`}>
                  {change}
                </Value>
                <Value
                  {...commonValProps}
                  id={`${currency_pair}_day_change_percent`}>
                  {day_change_percentage}
                </Value>
                <Value {...commonValProps} id={`${currency_pair}_day_high`}>
                  {day_high}
                </Value>
                <Value {...commonValProps} id={`${currency_pair}_day_low`}>
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
export default WorldCurrenciesSection
