import Button from 'components/Button/Button'
import indicators from 'highcharts/indicators/indicators'
import dataModule from 'highcharts/modules/data'
import exportingModule from 'highcharts/modules/exporting'
import { useCallback, useRef } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { BsArrowRightShort } from 'react-icons/bs'
import Dropdown from 'components/Dropdown/Dropdown'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
// import {
//     AXIOS_INSTANCE,
//     DEFAULT_DATE_PICKER_OPTIONS,
//     IS_CLIENT
// } from '../../../constants'
import { AXIOS_INSTANCE, DEFAULT_DATE_PICKER_OPTIONS } from '../../../constants'
// import {
//     getColorFromIdx,
//     GREEN,
//     GREY_DARK,
//     GREY_DARKEST,
//     hexWithTransparency,
//     scrollBarStyling,
//     X_AXIS_STYLING,
//     Y_AXIS_STYLING
// } from '../../../highcharts-styling-config'
import {getColorFromIdx,
  GREEN,
  GREY_DARK,
  GREY_DARKEST,
  hexWithTransparency,
  scrollBarStyling,
  X_AXIS_STYLING,
  Y_AXIS_STYLING} from 'highcharts-styling-config'
// import useFetch from '../../../hooks/useFetch'
import useFetch from 'hooks/useFetch'
import { useEffect, useState } from 'react'
import Chart from 'components/pages/stock/Chart';
// import style from './portfolio.module.scss'
import style from './index.module.scss'
import HoriSelectList from 'components/HoriSelectList/HoriSelectList'
import Icon from 'components/Icon/Icon'
import dayjs from 'dayjs'
import HighchartsReact from 'highcharts-react-official'
import Highcharts, { AxisSetExtremesEventObject } from 'highcharts/highstock'
import useDeepCompareEffect from 'use-deep-compare-effect'
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
interface ChartProps {
  title: string
  symbol: string
  shouldFetch: boolean
}
const PortfolioList = ({ title, symbol, shouldFetch }: ChartProps) => {
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString().slice(-2)
    return `${day}/${month}/${year}`
  }
  const stockDataArray = [
    {
      name: 'Dow Jones Industrial',
      symbol: 'DJI',
      index: 'INDEXDJX',
      value: '33,141.38',
      change_percent: '0.62%',
    },
    {
      name: 'Roblox Corp',
      symbol: 'RBLX',
      index: 'NYSE (US)',
      value: '$32.72',
      change_percent: '7.03%',
    },
  ]
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
  //       { x: 1698177601, y: 173.44 },
  //       true,
  //       true
  //     )
  //   }, 1000 * 60)
  //   return () => {
  //     if (ins) clearInterval(ins)
  //   }
  // }, [data])

  const chartRef = useRef<HighchartsReact.RefObject>(null)

  const [fromDate, _setFromDate] = useState<Date>(new Date())
  const [toDate, _setToDate] = useState<Date>(new Date())

  const [frequency, setFrequency] = useState<IntervalTypes>('ONE_MINUTE')
  const [range, _setRange] = useState(1)
  const [technicalIndicators, setTechnicalIndicators] = useState<
    Highcharts.Options['series']
  >([])

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
  const cache = new Map()
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
  <div className={style.portcontainer}>
     <div className="v-center is-justify-content-space-between">
   <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>
        Library
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Data</Breadcrumb.Item>
    </Breadcrumb>
    </div>
   <table>
            <tr>
              <td style={{width:'25%'}}>
              <input
                  type="text"
                  name="name"
                  defaultValue="176.36"
                  readOnly
                  className={style.portinput}
                />
              </td>
              <td style={{width:'25%'}}>
              <input
                  type="text"
                  name="name"
                  defaultValue="176.36"
                  readOnly
                  className={style.portinput}
                />
              </td>
              <td style={{width:'25%'}}>
              <input
                  type="text"
                  name="name"
                  defaultValue="176.36"
                  readOnly
                  className={style.portinput}
                />
              </td>
              <td style={{width:'25%'}}>
              <input
                  type="text"
                  name="name"
                  defaultValue="176.36"
                  readOnly
                  className={style.portinput}
                />
              </td>
            </tr>
          </table>
          <div className={style.chart_controls_wrapper}>
          
          <div className={style.headingborder}>
            <span className={style.headingtext}>Tesla Inc</span>
          </div>
          {/* <div className="v-center">
            <span className={style.headingsecond}>200</span>
          </div>
          <div>
            <span className={style.subheading}>After Hours:$207.50</span>
            </div>
            <div>
            <span className={style.secondsubheading}>Closed: Oct 25, 7:59:54 PM UTC-4 · USD · NASDAQ · Disclaimer</span>
          </div> */}
          <div className="is-size-4 is-flex is-justify-content-space-between ">
          <div className="my-3">
            <p className="is-size-3 is-family-secondary">
              $300
              </p>
            <p className="is-size-7 is-family-secondary ">
            After Hours:$207.50
            </p>
            <p className="is-size-7">
            Closed:{' '}
              <span className="is-family-secondary">
               Oct 25, 7:59:54 PM UTC-4 · USD · NASDAQ · Disclaimer
              </span>
            </p>
         
          </div>
          <div className={style.info_grid}>
            <p className="has-text-left">Close</p>
            <p>CHG</p>
            <p>CHG%</p>
          </div>
          </div>
        <div className="v-center is-justify-content-space-between">
       
          <div className="v-center">
         
            <HoriSelectList
              value={range}
              onClick={(val) => setRange(val.range)}
              dataArr={rangeData}
              controlKey="range"
              layoutId="overview_range"
            />
          </div>
          <div className="v-center">
            <ReactDatePicker
              {...DEFAULT_DATE_PICKER_OPTIONS}
              maxDate={toDate}
              customInput={
                <Button className="is-warning" size="small">
                  {dayjs(fromDate).format('D MMM, YYYY')}
                </Button>
              }
              selected={fromDate}
              onChange={setFromDate}
            />
            <Icon className="mx-2 has-text-grey">
              <BsArrowRightShort />
            </Icon>
            <ReactDatePicker
              {...DEFAULT_DATE_PICKER_OPTIONS}
              wrapperClassName={style.datepicker_wrapper}
              minDate={fromDate}
              customInput={
                <Button className="is-warning" size="small">
                  {dayjs(toDate).format('D MMM, YYYY')}
                </Button>
              }
              selected={toDate}
              onChange={setToDate}
            />
          </div>
        </div>
        <div ref={handleRef} className={style.chart_wrapper}>
          <div className={style.chart_container}>
            <HighchartsReact
              constructorType="stockChart"
              highcharts={Highcharts}
              options={options}
              ref={chartRef}
            />
          </div>
        </div>
      </div>
          {/* <div>
                        {stockDataArray.map((data, index) => (
                          <div>
                            <div className={style.dOH8Ue} key={index}>
                              <div>
                               
                                <p className={style.nameStock}> {data.name}</p>
                                <div style={{ display: 'flex' }}>
                             
                                  <p className={style.headingSymbol}>
                             
                                    {data.symbol}
                                  </p>
                                  :
                                  <p className={style.nameStock}>
                                
                                    {data.index}
                                  </p>
                                </div>
                              </div>
                              <div>
                            
                                <button className={style.Changevalue}>
                                  {data.value}
                                </button>
                                <button className={style.ChangePerentage}>
                                  {data.change_percent}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}  
                      </div>   */}
                      <table>
  <thead>
    <tr>
      <th className={style.tdPadding} style={{width: '30%'}}>SYMBOL NAME</th>
      <th className={style.tdPadding} style={{width: '10%'}}>PRICE</th>
      <th className={style.tdPadding} style={{width: '17%'}}>QUANTITY</th>
      <th className={style.tdPadding} style={{width:'12%'}}>Day Gain</th>
      <th className={style.tdPadding} style={{width: '0%'}}>VALUE</th>
    </tr>
  </thead>
  <tbody>
    {stockDataArray.map((data, index) => (
      <tr className={style.bordertop} key={index}>
        <td className={style.tdPadding}>{data.name}</td>
        <td className={style.tdPadding}>{data.symbol}</td>
        <td className={style.tdPadding}>{data.index}</td>
        <td className={style.tdPadding}>{data.value}</td>
        <td className={style.tdPadding}>{data.change_percent}</td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  )
}
export default PortfolioList
