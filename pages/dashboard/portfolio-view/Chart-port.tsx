import Button from 'components/Button/Button'
import HoriSelectList from 'components/HoriSelectList/HoriSelectList'
import Icon from 'components/Icon/Icon'
import dayjs from 'dayjs'
import HighchartsReact from 'highcharts-react-official'
import Highcharts, { AxisSetExtremesEventObject } from 'highcharts/highstock'
import indicators from 'highcharts/indicators/indicators'
import dataModule from 'highcharts/modules/data'
import exportingModule from 'highcharts/modules/exporting'
import { useCallback, useRef, useState ,useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { BsArrowRightShort } from 'react-icons/bs'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {
    AXIOS_INSTANCE,
    DEFAULT_DATE_PICKER_OPTIONS,
    IS_CLIENT
} from '../../../constants'
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
// import Dropdown from '../../Dropdown/Dropdown'
// import LoaderOverlay from '../../Loader/LoaderOverlay'
import LoaderOverlay from 'components/Loader/LoaderOverlay'
import styles from './index.module.scss'
import { useRouter } from 'next/router'
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
  { displayValue: '1W', range: 7 },
  { displayValue: '1M', range: 1 * 30 },
  { displayValue: '3M', range: 3 * 30 },
  { displayValue: '6M', range: 6 * 30 },
  { displayValue: '9M', range: 9 * 30 },
  { displayValue: '1Y', range: 365 * 1 },
  { displayValue: '5Y', range: 365 * 5 },
  {
    displayValue: 'YTD',
    range: (() => {
      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const daysPassed = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));
      return daysPassed;
    })(),
  },
]



interface ChartProps {
  title: string
  symbol: string
  shouldFetch: boolean
  newItem:[]
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
const Chart = ({ title, symbol, shouldFetch ,newItem}: ChartProps) => {
  const [currentNewItem, setCurrentNewItem] = useState(newItem);
useEffect(() => {
  setCurrentNewItem([]); 
}, []);

  const [data] = useFetch<any>(
    'getMarketOpenStatus',
    { symbol },
    { initialData: {}, shouldFetch: !!symbol }
  )
  useDeepCompareEffect(() => {
    if (!data) return
    const { market_open } = data
    let ins: any
    if (!market_open) return

    ins = setInterval(async () => {
      const data = (
        await AXIOS_INSTANCE.get('getStockQuote', { params: { symbol } })
      ).data
      chartRef.current?.chart.series[0]?.addPoint(
        { x: data.captured_on, y: data.current_price },
        true,
        true
      )
    }, 1000 * 60)
    return () => {
      if (ins) clearInterval(ins)
    }
  }, [data])

  const chartRef = useRef<HighchartsReact.RefObject>(null)

  const [fromDate, _setFromDate] = useState<Date>(new Date('Mon Oct 23 2023 21:30:00 GMT+0530 (India Standard Time)'))
  const [toDate, _setToDate] = useState<Date>(new Date())

  const [frequency, setFrequency] = useState<IntervalTypes>('ONE_MINUTE')
  const [range, _setRange] = useState(1)
  const [technicalIndicators, setTechnicalIndicators] = useState<
    Highcharts.Options['series']
  >([])
  // console.log(fromDate,'technicalIndicators');
  const router = useRouter()

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

  const getInvestmentChartData = async () => {

    const cacheKey = `${symbol}-${frequency}`
    // console.log("cachekey",cacheKey)
    const token = localStorage.getItem('token')

    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }


    setIsLoading(true)
    const tabvalue = router.query.tab


    const data = await AXIOS_INSTANCE.get(
      `getInvestmentChartData/${tabvalue}`,
      { headers }
    )
   
    const newData = Array.isArray(data?.data) ? data.data.map((innerArray: any) =>

      innerArray.filter((_, index) => index !== 1)
    ) : [];
    console.log('nnnnnnnnnn', newData)
    // console.log('aaaaaaaa', data.data)
    cache.set(cacheKey, newData)

    // } 
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
 
    if (!shouldFetch && !symbol) return;
    (async () => {
      let stockData = [];
      // const hasStockEquity = currentNewItem.some(item => item?.equity_type === 'stock');
    
      // if (hasStockEquity) {
 
        stockData = await getInvestmentChartData();
      // }

      const series: any = [
        {
          id: title,
          data: stockData as any[],
          name: technicalIndicators,
          type: 'line',
          showInNavigator: true,
          color: getColorFromIdx(0, 'normal'),
        },
        ...technicalIndicators!,
      ];

      // Set options based on the retrieved data
      setOptions({
        series,
        xAxis: {
          ...X_AXIS_STYLING,
          range: range * 24 * 3600 * 1000,
          events: {
            afterSetExtremes: handleExtremesChange,
          },
        },
      });
    })();
    // (async () => {
    //   const stockData = await getInvestmentChartData()
    //   const series: any = [
    //     {
    //       id: title,
    //       data: stockData as any[],
    //       name: technicalIndicators,
    //       type: 'line',
    //       showInNavigator: true,
    //       color: getColorFromIdx(0, 'normal'),
    //     },
    //     ...technicalIndicators!,
    //   ]
    //   setOptions({
    //     series,
    //     xAxis: {
    //       ...X_AXIS_STYLING,
    //       range: range * 24 * 3600 * 1000,
    //       events: {
    //         afterSetExtremes: handleExtremesChange,
    //       },
    //     },
    //   })
    // })()
  }, [router.query.tab,technicalIndicators, range, frequency, symbol, shouldFetch,newItem])
  // useDeepCompareEffect(() => {
  //   if (!shouldFetch && !symbol) return;
  
  //   const hasStockEquity = currentNewItem.some(item => item?.equity_type === 'stock');
  //   if (!hasStockEquity) return; 
  
  //   (async () => {
  //     try {
  //       const stockData = await getInvestmentChartData();
  
  //       const series: any = [
  //         {
  //           id: title,
  //           data: stockData as any[],
  //           name: technicalIndicators,
  //           type: 'line',
  //           showInNavigator: true,
  //           color: getColorFromIdx(0, 'normal'),
  //         },
  //         ...technicalIndicators!,
  //       ];
  
  //       // Set options based on the retrieved data
  //       setOptions({
  //         series,
  //         xAxis: {
  //           ...X_AXIS_STYLING,
  //           range: range * 24 * 3600 * 1000,
  //           events: {
  //             afterSetExtremes: handleExtremesChange,
  //           },
  //         },
  //       });
  //     } catch (error) {
  //       console.error('Error fetching investment chart data:', error);
  //     }
  //   })();
  // }, [router.query.tab, technicalIndicators, range, frequency, symbol, shouldFetch, currentNewItem]);
  

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
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <div>
            {/* <Dropdown
              onClick={handleDropdownChange}
              dataArr={dropdownData}
              className="is-warning mr-3"
            /> */}
          
          </div>
          <div>
          <HoriSelectList
              value={range}
              onClick={(val) => setRange(val.range)}
              dataArr={rangeData}
              controlKey="range"
              layoutId="overview_range"
            />
              
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