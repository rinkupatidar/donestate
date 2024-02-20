import { addOpacityAnimation } from 'animation'
import PrimaryLoader from 'components/Loader/PrimaryLoader'
import dayjs from 'dayjs'
import { AnimatePresence, motion } from 'framer-motion'
import { AxisSetExtremesEventObject } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useRef, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { GetChartResponseInterface } from 'service/DashboardService/DashboardServicesInterface'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
import { useImmer } from 'use-immer'
import Chart from './Chart'
import ChartControls from './ChartControls'
import {
    DisplayInterface,
    IndicatorsInterface,
    SocialSentimentDropdownDownInterface
} from './chartTypes'
import styles from './index.module.scss'
import { SavedChartConfigInterface } from './SavedCharts/SavedChartTypes'

const SavedChart = dynamic(() => import('./SavedCharts/SavedChart'), {
  ssr: false,
  loading: PrimaryLoader,
})

interface ChartsWrapperProps {
  symbol: string
  disableSavedCharts?: boolean
  config?: GetChartResponseInterface
}

export interface ControlInterface {
  displayValue: string
  controlType:
    | 'symbol'
    | 'technical_indicator'
    | 'oscillator'
    | 'flag'
    | 'social_sentiment'
  type?: string
  metaData?: { [key: string]: any }
}
const ChartsWrapper = ({
  symbol,
  config,
  disableSavedCharts,
}: ChartsWrapperProps) => {
  const chartRef = useRef<HighchartsReact.RefObject>(null)
  const [controlsLoaded, setControlsLoaded] = useState(false)

  
  const [animationKey, _animateOpacity] = useState(false)
  const [controls, setControls] = useImmer<ControlInterface[]>([
    {
      displayValue: symbol,
      type: '',
      controlType: 'symbol',
    },
  ])
 
  

  const [display, setDisplay] = useState<DisplayInterface>({
    displayValue: 'Area',
    type: 'area',
  })
  const [frequency, setFrequency] = useState<IntervalTypes>('ONE_MINUTE')
  const [range, _setRange] = useState(1)
 
  

  const [fromDate, _setFromDate] = useState<Date>(new Date())
  
  const [toDate, _setToDate] = useState<Date>(new Date())
  

  useDeepCompareEffectNoCheck(() => {
    if (config) {
      animateOpacity()
      loadChartConfig(config.chart_config)
    }
  }, [config])

  const animateOpacity = () => _animateOpacity(!animationKey)

  const setFromDate = (date: Date) => {
    if (date.getTime() < toDate.getTime())
      chartRef.current?.chart.xAxis[0].setExtremes(
        new Date(date).getTime(),
        toDate.getTime()
      )
    if (Math.abs(date.getTime() - toDate.getTime()) > 1000 * 60 * 60 * 24)
      setFrequency('ONE_DAY')

    _setFromDate(date)
  }
  const setToDate = (date: Date) => {
    debugger
    chartRef.current?.chart.xAxis[0].setExtremes(
      fromDate.getTime(),
      new Date(date).getTime()
    )
    _setToDate(date)
  }

  const setRange = (days: number) => {
    if (days >= 10) setFrequency('ONE_DAY')
    else setFrequency('ONE_MINUTE')
    // calculate the from date from the range
    const date = dayjs(toDate).subtract(days, 'day').toDate()
    setFromDate(date)
  }

  const handleTechnicalIndicatorClick = (val: any) => {
    setDisplay({ displayValue: 'OHLC', type: 'ohlc' })
    if (
      !controls.find(
      )
    )
      setControls((draft: ControlInterface[]) => {
        draft.push({ ...val, controlType: 'technical_indicator' })
        return draft
      })
  }

  const handleOscillatorsClick = (val: IndicatorsInterface) => {
    setDisplay({ displayValue: 'OHLC', type: 'ohlc' })
    if (
      !controls.find(
        ({ controlType, type }) =>
          controlType === 'oscillator' && type && type === val.type
      )
    )
      setControls((draft: ControlInterface[]) => {
        draft.push({
          displayValue: val.displayValue,
          type: val.type!,
          controlType: 'oscillator',
          metaData: val.metaData,
        })
        return draft
      })
  }

  const handleFlagsClick = (val: string) => {
    if (
      !controls.find(
        ({ controlType, type }) =>
          controlType === 'flag' && type && type === val
      )
    )
      setControls((draft: ControlInterface[]) => {
        draft.push({ displayValue: val, controlType: 'flag', type: val })
        return draft
      })
  }

  const handleSocialSentimentsClick = (
    val: SocialSentimentDropdownDownInterface
  ) => {
    if (
      !controls.find(
        ({ controlType, type }) =>
          controlType === 'social_sentiment' && type && type === val.type
      )
    )
      setRange(30)
    setControls((draft: ControlInterface[]) => {
      draft = draft.filter((item) => item.controlType !== 'social_sentiment')
      draft.push({
        displayValue: val.displayValue,
        controlType: 'social_sentiment',
        type: val.type,
        metaData: val.metaData,
      })
      return draft
    })
  }

  const restoreDefaults = () => {
    if (config) {
      loadChartConfig(config.chart_config)
      return
    }
    setControls([
      {
        displayValue: symbol,
        type: '',
        controlType: 'symbol',
      },
    ])
    setDisplay({ displayValue: 'Line', type: 'line' })
    setRange(1)
  }

  const handleFrequency = ({ type }: { type: IntervalTypes }) => {
    if (type === 'ONE_MINUTE' && range >= 10) setRange(1)
    else if (type === 'ONE_DAY' && range < 10) setRange(10)
    setFrequency(type)
  }

  const loadChartConfig = (config: SavedChartConfigInterface) => {
    setControls(config.controls)
    setDisplay(config.display)
    setFrequency(config.frequency)
    if (config.toDate) _setToDate(new Date(config.toDate))
    if (config.fromDate) _setFromDate(new Date(config.fromDate))
    animateOpacity()
  }

  const handleNavigatorRangeChange = useCallback(
    (e: AxisSetExtremesEventObject) => {
      if (!e.min && !e.max) return
      _setFromDate(new Date(e.min))
      _setToDate(new Date(e.max))
    },
    []
  )

  const isAnyOverlaySelected = useMemo(
    () =>
      !!controls.find(
        ({ controlType }) => controlType === 'technical_indicator'
      ),
    [controls.length]
  )
  const isAnyLowerChartSelected = useMemo(
    () => !!controls.find(({ controlType }) => controlType === 'oscillator'),
    [controls.length]
  )

  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <div
            className={styles.left}
            data-disable-saved-charts={disableSavedCharts}>
            <ChartControls
              onLoad={() => setControlsLoaded(true)}
              toDate={toDate}
              fromDate={fromDate}
              setToDate={setToDate}
              setFromDate={setFromDate}
              range={range}
              frequency={frequency}
              display={display}
              isAnyOverlaySelected={isAnyOverlaySelected}
              isAnyLowerChartSelected={isAnyLowerChartSelected}
              onFlagClick={handleFlagsClick}
              restoreDefaults={restoreDefaults}
              onDisplayClick={setDisplay}
              onRangeClick={(val) => setRange(val.range)}
              onTechnicalIndicatorClick={handleTechnicalIndicatorClick}
              onOscillatorsClick={handleOscillatorsClick}
              onFrequencyClick={handleFrequency}
              onNewSymbolClick={(val: string) =>
                setControls((draft: ControlInterface[]) => {
                  draft.push({
                    controlType: 'symbol',
                    displayValue: val,
                    type: '',
                  })
                  return draft
                })
              }
              onSocialSentimentsClick={handleSocialSentimentsClick}
            />
          </div>

          <div
            className={`${styles.right} `}
            data-disable-saved-charts={disableSavedCharts}>
            {controlsLoaded && (
              <SavedChart
                loadChartConfig={loadChartConfig}
                symbol={symbol}
                parentConfig={config}
                config={{
                  controls,
                  range,
                  display,
                  frequency,
                  toDate,
                  fromDate,
                }}
              />
            )}
          </div>
        </div>
        <div className="tags mb-0">
          <AnimatePresence>
            {controls.map((item, idx) => (
              <motion.span
                exit={{ opacity: 0 }}
                layout
                layoutId={item.displayValue}
                className="tag is-warning"
                key={item.displayValue}>
                {item.displayValue}
                {idx > 0 && (
                  <button
                    className="delete is-small"
                    onClick={() =>
                      setControls((draft: ControlInterface[]) => {
                        draft.splice(idx, 1)
                        return draft
                      })
                    }></button>
                )}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait">
          <motion.div {...addOpacityAnimation} key={`${animationKey}`}>
           
            <Chart
              controlsLoaded={controlsLoaded}
              handleNavigatorRangeChange={handleNavigatorRangeChange}
              optionsChangeCallback={() => {
                if (fromDate && toDate) {
                  chartRef.current?.chart.xAxis[0].setExtremes(
                    fromDate.getTime(),
                    toDate.getTime()
                  )
                }
              }}
              chartRef={chartRef}
              controls={controls}
              range={range}
              displayType={display.type}
              frequency={frequency}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}

export default ChartsWrapper
