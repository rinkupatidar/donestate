import Button from 'components/Button/Button'
import HoriSelectList from 'components/HoriSelectList/HoriSelectList'
import Icon from 'components/Icon/Icon'
import dayjs from 'dayjs'
import HighchartsReact from 'highcharts-react-official'
import Highcharts, { AxisSetExtremesEventObject } from 'highcharts/highstock'
import indicators from 'highcharts/indicators/indicators'
import dataModule from 'highcharts/modules/data'
import exportingModule from 'highcharts/modules/exporting'
import { useCallback, useRef, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { BsArrowRightShort } from 'react-icons/bs'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {AXIOS_INSTANCE} from '../../../constants'
import {
    getColorFromIdx,
    GREEN,
    GREY_DARK,
    GREY_DARKEST,
    hexWithTransparency,
    scrollBarStyling,
    X_AXIS_STYLING,
    Y_AXIS_STYLING
} from '../../../highcharts-styling-config'
import useFetch from '../../../hooks/useFetch'
import Dropdown from '../../Dropdown/Dropdown'
import LoaderOverlay from '../../Loader/LoaderOverlay'
import styles from './index.module.scss'

const dropdownData = [
  // { displayValue: "Keltner Channels", moduleToImport: "keltner-channels", type: "keltnerchannels" },
  // { displayValue: "Pivot Points", moduleToImport: "pivot-points", type: "pivotpoints" },
  { displayValue: 'Select a technical indicator' },
  {
    displayValue: 'Acceleration Bands',
    moduleToImport: 'acceleration-bands',
    type: 'abands',
  },
  {
    displayValue: 'Bollinger Bands',
    moduleToImport: 'bollinger-bands',
    type: 'bb',
  },
  {
    displayValue: 'DEMA (Double Exponential Moving Average)',
    moduleToImport: 'dema',
    type: 'dema',
  },
  {
    displayValue: 'EMA (Exponential Moving Average)',
    moduleToImport: 'ema',
    type: 'ema',
  },
  {
    displayValue: 'Linear Regression',
    moduleToImport: 'regressions',
    type: 'linearRegression',
  },
]
const rangeData = [
  // range is in days
  { displayValue: '1D', range: 1 },
  { displayValue: '3M', range: 3 * 30 },
  { displayValue: '6M', range: 6 * 30 },
  { displayValue: '9M', range: 9 * 30 },
  { displayValue: '1Y', range: 365 * 1 },
  { displayValue: '2Y', range: 365 * 2 },
]

if (IS_CLIENT) {
  indicators(Highcharts)
  dataModule(Highcharts)
  exportingModule(Highcharts)

  dropdownData.map(async (item) => {
    if (item.moduleToImport)
      import(`highcharts/indicators/${item.moduleToImport}.js`).then((mod) => {
        mod.default(Highcharts)
      })
  })
}

interface ChartProps {
  title: string
  symbol: string
  shouldFetch: boolean
}
const defaultOptions: Highcharts.Options = {
  scrollbar: scrollBarStyling,
  navigator: {
    maskFill: hexWithTransparency(GREEN, 0.2),
    outlineColor: GREY_DARK,
    xAxis: {
      gridLineColor: GREY_DARKEST,
      endOnTick: true,
      startOnTick: true,
    },
  },
  chart: {
    backgroundColor: 'transparent',
  },
  plotOptions: {},
  rangeSelector: {
    enabled: false,
  },
  yAxis: Y_AXIS_STYLING,
  xAxis: {
    ...X_AXIS_STYLING,
    range: 1 * 24 * 3600 * 1000,
  },
}

const cache = new Map()
const Chart = ({ title, symbol, shouldFetch }: ChartProps) => {
  // const [data] = useFetch<any>(
  //   'getMarketOpenStatus',
  //   { symbol },
  //   { initialData: {}, shouldFetch: !!symbol }
  // )
  // useDeepCompareEffect(() => {
  //   if (!data) return
  //   const { market_open } = data
  //   let ins: any
  //   if (!market_open) return

  //   // set interval for 1min
  //   ins = setInterval(async () => {
  //     const data = (
  //       await AXIOS_INSTANCE.get('getStockQuote', { params: { symbol } })
  //     ).data
  //     chartRef.current?.chart.series[0]?.addPoint(
  //       { x: data.captured_on, y: data.current_price },
  //       true,
  //       true
  //     )
  //   }, 1000 * 60)
  //   return () => {
  //     if (ins) clearInterval(ins)
  //   }
  // }, [data])

  const chartRef = useRef<HighchartsReact.RefObject>(null)

  const [fromDate, _setFromDate] = useState<Date>(new Date('Mon Oct 23 2023 21:30:00 GMT+0530 (India Standard Time)'))
  const [toDate, _setToDate] = useState<Date>(new Date())

  const [frequency, setFrequency] = useState<IntervalTypes>('ONE_MINUTE')
  const [range, _setRange] = useState(1)
  const [technicalIndicators, setTechnicalIndicators] = useState<
    Highcharts.Options['series']
  >([])
  // console.log(fromDate,'technicalIndicators');
  

  const setFromDate = (date: Date) => {
    if (date.getTime() < toDate.getTime())
      chartRef.current?.chart.xAxis[0].setExtremes(
        new Date(date).getTime(),
        toDate.getTime()
      )
    if (Math.abs(date.getTime() - toDate.getTime()) > 1000 * 60 * 60 * 24)
      setFrequency('ONE_MINUTE')

    _setFromDate('Mon Oct 23 2023 21:30:00 GMT+0530 (India Standard Time)')
  }
  const setToDate = (date: Date) => {
    chartRef.current?.chart.xAxis[0].setExtremes(
      fromDate.getTime(),
      new Date(date).getTime()
    )
    _setToDate(date)
  }

  const setRange = (r: number) => {
    if (r >= 10) setFrequency('ONE_DAY')
    else setFrequency('ONE_MINUTE')

    if (r === 365) {
      setToDate(new Date())
    }
    _setRange(r)
  }

  const [isLoading, setIsLoading] = useState(false)

  const getAllHistoricalStockData = async () => {
    const cacheKey = `${symbol}-${frequency}`
    if (!cache.has(cacheKey)) {
      setIsLoading(true)
      const data = (
        await AXIOS_INSTANCE.get('getAllHistoricalStockData', {
          params: { symbol, interval: frequency },
        })
      ).data
      cache.set(cacheKey, data)
    }

    setIsLoading(false)
    return cache.get(cacheKey)
  }

  const handleExtremesChange = useCallback((e: AxisSetExtremesEventObject) => {
    if (!e.min && !e.max) return
    _setFromDate(new Date(e.min))
    _setToDate(new Date(e.max))
  }, [])

  const [options, _setOptions] = useState<Highcharts.Options>({
    ...defaultOptions,
    xAxis: {
      ...defaultOptions.xAxis,
      events: {
        afterSetExtremes: handleExtremesChange,
      },
    },
  })

  const setOptions = (val: Highcharts.Options) => {
    _setOptions({
      ...defaultOptions,
      ...options,
      ...val,
    })
  }

  useDeepCompareEffect(() => {
    if (!shouldFetch && !symbol) return
    ;(async () => {
      const stockData = await getAllHistoricalStockData()
      const series: any = [
        {
          id: title,
          data: stockData as any[],
          name: symbol,
          type: 'line',
          showInNavigator: true,
          color: getColorFromIdx(0, 'normal'),
        },
        ...technicalIndicators!,
      ]
      setOptions({
        series,
        xAxis: {
          ...X_AXIS_STYLING,
          range: range * 24 * 3600 * 1000,
          events: {
            afterSetExtremes: handleExtremesChange,
          },
        },
      })
    })()
  }, [technicalIndicators, range, frequency, symbol, shouldFetch])

  useDeepCompareEffect(() => {
    chartRef.current?.chart.redraw()
  }, [options])

  const handleDropdownChange = async (val: (typeof dropdownData)[0]) => {
    if (val.type)
      setTechnicalIndicators([
        {
          type: val.type as any,
          linkedTo: title,
          color: getColorFromIdx(1, 'dark'),
          lineWidth: 2,
        },
      ])
    else setTechnicalIndicators([])
  }
  const handleRef = useCallback((ele: HTMLDivElement) => {
    if (ele)
      setOptions({
        chart: {
          ...options.chart,
          height: ele?.getBoundingClientRect().height,
        },
      })
  }, [])

  return (
    <>
      {(isLoading || !shouldFetch) && <LoaderOverlay />}
      <div className={styles.chart_controls_wrapper}>
        <div className="v-center is-justify-content-space-between">
          <div className="v-center">
            {/* <Dropdown
              onClick={handleDropdownChange}
              dataArr={dropdownData}
              className="is-warning mr-3"
            /> */}
            <HoriSelectList
              value={range}
              onClick={(val) => setRange(val.range)}
              dataArr={rangeData}
              controlKey="range"
              layoutId="overview_range"
            />
          </div>
          <div className="v-center">
          <Button className="is-warning is-small has-text-weight-semibold" size="small">
                 
                 <span>Key Events</span>
                </Button>
              
          </div>
        </div>
        <div ref={handleRef} className={styles.chart_wrapper} style={{marginBottom:'317px'}}>
          <div className={styles.chart_container}>
            <HighchartsReact
              constructorType="stockChart"
              highcharts={Highcharts}
              options={options}
              ref={chartRef}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default Chart
