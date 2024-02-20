import { AnimatePresence } from 'framer-motion'
import HighchartsReact from 'highcharts-react-official'
import IndicatorsAll from 'highcharts/indicators/indicators-all'
import HighChartsExporting from 'highcharts/modules/exporting'

import Highcharts, { AxisSetExtremesEventObject } from 'highcharts/highstock'
import { RefObject, useEffect, useRef, useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {
    AXIOS_INSTANCE,
    CHARTS_CACHE_KEY,
    IS_CLIENT
} from '../../../../../../constants'
import {
    generalToolTipStyling,
    getColorFromIdx,
    GREEN,
    GREEN_DARK,
    GREY_DARK,
    GREY_DARKEST,
    hexWithTransparency,
    RED_DARK,
    scrollBarStyling,
    X_AXIS_STYLING,
    YELLOW,
    YELLOW_DARK,
    Y_AXIS_STYLING
} from '../../../../../../highcharts-styling-config'
import LoaderOverlay from '../../../../../Loader/LoaderOverlay'
import { ControlInterface } from './ChartsWrapper'
import { getDataToPushInSeriesForFlags, handleFlagData } from './ChartUtils'
import styles from './index.module.scss'
import ShareChart from './ShareCharts/ShareChart'

const defaultOptions: Highcharts.Options = {
  scrollbar: scrollBarStyling,
  lang: {
    thousandsSep: ',',
  },
  navigator: {
    maskFill: hexWithTransparency(GREEN, 0.2),
    outlineColor: GREY_DARK,
    xAxis: {
      gridLineColor: GREY_DARKEST,
    },
  },
  chart: {
    backgroundColor: 'transparent',
    height: IS_CLIENT ? (window.innerHeight * 3) / 4 : 1000,
  },
  plotOptions: {
    flags: {
      color: GREY_DARKEST,
      fillColor: YELLOW,
      shape: 'squarepin',
      lineColor: YELLOW_DARK,
      width: 16,
      states: {
        hover: {
          fillColor: YELLOW_DARK,
          color: GREY_DARKEST,
        },
      },
    },
  },
  yAxis: [
    {
      height: '50%',
      ...Y_AXIS_STYLING,
    },
    {
      top: '55%',
      height: '20%',
      ...Y_AXIS_STYLING,
    },
    {
      top: '80%',
      height: '20%',
      ...Y_AXIS_STYLING,
    },
  ],
  rangeSelector: {
    enabled: false,
  },
}

if (typeof Highcharts === 'object') {
  HighChartsExporting(Highcharts)
}

interface ChartProps {
  range: number
  displayType: string
  controls: ControlInterface[]
  frequency: string
  chartRef: RefObject<HighchartsReact.RefObject>
  handleNavigatorRangeChange: (e: AxisSetExtremesEventObject) => void
  optionsChangeCallback: () => void
  controlsLoaded: boolean
}

if (IS_CLIENT) {
  IndicatorsAll(Highcharts)
}
const cache = new Map()
const Chart = ({
  range,
  displayType,
  controls,
  frequency,
  chartRef,
  handleNavigatorRangeChange,
  controlsLoaded,
  optionsChangeCallback,
}: ChartProps) => {
  const tempRef = useRef<HTMLDivElement>(null)
  const [options, setOptions] = useState<Highcharts.Options>({
    ...defaultOptions,
    xAxis: { ...X_AXIS_STYLING },
  })

  const [isLoading, setIsLoading] = useState(false)

  const getSeries = async (): Promise<Highcharts.Options['series']> => {
    const promises: any[] = []
    const series: Highcharts.SeriesOptionsType[] = []
    const defaultFirstSymbol = controls[0].displayValue

    setIsLoading(true)
    controls.forEach((val) => {
      const { displayValue, controlType, metaData = {} } = val
      const cacheKey = metaData[CHARTS_CACHE_KEY] || displayValue
      if (cache.get(cacheKey)) return

      if (controlType === 'symbol')
        promises.push(
          AXIOS_INSTANCE.get('getAllHistoricalStockData', {
            params: {
              symbol: displayValue,
              interval: frequency,
            },
          }).then((res) => [res, displayValue])
        )
      else if (controlType === 'social_sentiment')
        promises.push(
          AXIOS_INSTANCE.get('getHistoricalSocialSentimentInfoForChart', {
            params: {
              symbol: defaultFirstSymbol,
              days: 28,
            },
          }).then((res) => [res, metaData[CHARTS_CACHE_KEY]])
        )
    })

    const symbolsPromiseRes = await Promise.all(promises)
    symbolsPromiseRes.forEach(([data, cacheKey]) =>
      cache.set(cacheKey, data.data)
    )

    // once you get the response, find the start and end data and cache with those key's for flags
    const firstSymbolsData = cache.get(defaultFirstSymbol)
    const startDate = firstSymbolsData[0][0]
    const endDate = firstSymbolsData[firstSymbolsData.length - 1][0]

    await handleFlagData({
      cache,
      controls,
      defaultFirstSymbol,
      startDate,
      endDate,
    })

    controls.forEach(
      ({ displayValue, type, controlType, metaData = {} }, idx) => {
        const cacheKey = metaData[CHARTS_CACHE_KEY] || displayValue
        switch (controlType) {
          case 'symbol':
            if (cache.has(displayValue)) {
              let data = cache.get(displayValue)
              let fillColor: any = undefined
              // get range of data from range
              const didPriceGoUp =
                data[data.length - 1][1] >
                data[
                  data.length - range - 1 < 0 ? 0 : data.length - range - 1
                ][1]

              const priceColor = didPriceGoUp ? GREEN_DARK : RED_DARK
              const lineColor =
                idx === 0 ? priceColor : getColorFromIdx(idx, 'dark')
              if (displayType === 'area') {
                fillColor = {
                  linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1,
                  },
                  stops: [
                    [0, hexWithTransparency(lineColor, 0.3)],
                    [1, hexWithTransparency(lineColor, 0)],
                  ],
                }
              }

              series.push({
                id: displayValue,
                title: `${displayValue} Stock Price`,
                data,
                name: displayValue,
                type: displayType as any,
                threshold: null,
                tooltip: { valueDecimals: 2 },
                color: lineColor,
                yAxis: 0,
                fillColor,
              })
            }
            break
          case 'technical_indicator':
            series.push({
              type: type as any,
              linkedTo: defaultFirstSymbol,
              color: getColorFromIdx(idx, 'dark'),
              lineWidth: 1,
              yAxis: 0,
              tooltip: generalToolTipStyling,
            })
            break
          case 'flag':
            const res = getDataToPushInSeriesForFlags({
              type: type!,
              cache,
              startDate,
              endDate,
              defaultFirstSymbol,
            })
            series.push(res)
            break
          case 'oscillator': // need 3 axis
            series.push({
              type: type as any,
              linkedTo: defaultFirstSymbol,
              color: getColorFromIdx(idx, 'dark'),
              yAxis: 2,
              tooltip: generalToolTipStyling,
              ...metaData,
            })
            break
          case 'social_sentiment': // need 3 axis
            const val = cache
              .get(cacheKey)
              .map((val: any) => [val[0], val[metaData.idx]])
            series.push({
              type: 'column',
              id: 'social_sentiment',
              name: displayValue,
              data: val,
              yAxis: 2,
              tooltip: generalToolTipStyling,
              color: getColorFromIdx(idx, 'normal'),
            })
        }
      }
    )

    let vol_obj: any
    if (cache.has('volume')) {
      vol_obj = cache.get('volume')
    } else {
      const data = (
        await AXIOS_INSTANCE.get('getAllVolumeData', {
          params: { interval: frequency, symbol: defaultFirstSymbol },
        })
      ).data
      vol_obj = {
        type: 'column',
        id: 'volume',
        name: 'Volume',
        data: data,
        yAxis: 1,
        tooltip: generalToolTipStyling,
        color: getColorFromIdx(3, 'dark'),
      }
      cache.set('volume', vol_obj)
    }

    setIsLoading(false)
    return [vol_obj, ...series]
  }

  useEffect(() => {
    cache.clear()
  }, [frequency])

  useDeepCompareEffect(() => {
    ;(async () => {
      const areMultipleSeries =
        controls.filter(({ controlType }) => controlType === 'symbol').length >
        1
      let extraArgs: Highcharts.Options = {}

      if (areMultipleSeries) {
        extraArgs = {
          tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b> ({point.change}%)',
            valueDecimals: 2,
            split: true,
          },
          plotOptions: {
            ...options.plotOptions,
            series: {
              compare: 'percent',
              showInNavigator: true,
            },
          },
        }
      } else {
        extraArgs = {
          tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>',
            valueDecimals: 2,
            split: true,
          },
          plotOptions: {
            ...options.plotOptions,
            series: undefined,
          },
        }
      }
      const updatedSeries = await getSeries()
      // the first and volumre series are always present, so we need to check for the 3rd series that are of type social_sentiment or oscillator.
      // const isThere3rdSeries = !!controls.filter((val) => val.controlType === "social_sentiment" || val.controlType === "oscillator").length

      setOptions({
        ...defaultOptions,
        chart: {
          ...defaultOptions.chart,
          events: {
            redraw: () => {},
          },
        },
        scrollbar: scrollBarStyling,
        xAxis: {
          ...X_AXIS_STYLING,
          events: {
            afterSetExtremes: handleNavigatorRangeChange,
          },
        },
        series: updatedSeries,
        // yAxis: getYAxisRows(2 + (isThere3rdSeries ? 1 : 0)), // 2 for volume and price, 1 for social_sentiment or oscillator if present
        ...extraArgs,
      })

      // set extremes to max data and min data
      //
    })()
  }, [range, displayType, controls, frequency])

  useDeepCompareEffect(() => {
    chartRef.current?.chart.redraw()
  }, [options])

  return (
    <div ref={tempRef} className={styles.chart_wrapper}>
      {controlsLoaded && <ShareChart chartsRef={chartRef} />}
      <div className={styles.chart_container}>
        <AnimatePresence>
          {isLoading && <LoaderOverlay lOpacity initial="animate" />}
        </AnimatePresence>
        <div>
          <HighchartsReact
            constructorType="stockChart"
            highcharts={Highcharts}
            options={options}
            ref={chartRef}
          />
        </div>
      </div>
    </div>
  )
}
export default Chart
