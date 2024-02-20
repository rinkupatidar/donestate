import dayjs from 'dayjs'
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { BiDownload } from 'react-icons/bi'
import { BsArrowRightShort } from 'react-icons/bs'
import {
    CHARTS_BOTTOM_BUTTONS_WRAPPER_ID,
    CHARTS_CACHE_KEY,
    DEFAULT_DATE_PICKER_OPTIONS,
    DIVIDENDS_DISPLAY_VALUE,
    EARNINGS_DISPLAY_VALUE,
    SPLITS_DISPLAY_VALUE
} from '../../../../../../constants'
import useFetch from '../../../../../../hooks/useFetch'
import Button from '../../../../../Button/Button'
import Dropdown from '../../../../../Dropdown/Dropdown'
import HoriSelectList from '../../../../../HoriSelectList/HoriSelectList'
import Icon from '../../../../../Icon/Icon'
import Input from '../../../../../Input/Input'
import {
    DisplayInterface,
    IndicatorsInterface,
    SocialSentimentDropdownDownInterface
} from './chartTypes'
import styles from './index.module.scss'

const technicalIndicatorDropdownData: IndicatorsInterface[] = [
  { displayValue: 'Chart Overlays' },
  { displayValue: 'Acceleration Bands', type: 'abands' },
  { displayValue: 'Bollinger Bands', type: 'bb' },
  { displayValue: 'DEMA (Double Exponential Moving Average)', type: 'dema' },
  { displayValue: 'EMA (Exponential Moving Average)', type: 'ema' },
  { displayValue: 'Linear Regression', type: 'linearRegression' },
]
const oscillatorsDropdownData: IndicatorsInterface[] = [
  { displayValue: 'Lower Charts' },
  { displayValue: 'Absolute price indicator', type: 'apo' },
  {
    displayValue: 'A/D (Accumulation/Distribution)',
    type: 'ad',
    metaData: {
      params: {
        period: 0,
        volumeSeriesID: 'volume',
      },
    },
  },
  { displayValue: 'Aroon', type: 'aroon' },
  { displayValue: 'Aroon oscillator', type: 'aroonoscillator' },
  { displayValue: 'ATR (Average True Range)', type: 'atr' },
  { displayValue: 'Awesome oscillator', type: 'ao' },

  { displayValue: 'CCI (Commodity Channel Index)', type: 'cci' },
  { displayValue: 'Chaikin', type: 'chaikin' },
  { displayValue: 'CMF (Chaikin Money Flow)', type: 'cmf' },
  { displayValue: 'Disparity Index', type: 'disparityindex' },
  { displayValue: 'CMO (Chande Momentum Oscillator)', type: 'cmo' },
  { displayValue: 'DMI (Directional Movement Index)', type: 'dmi' },
  { displayValue: 'Detrended price', type: 'dpo' },
  { displayValue: 'Linear Regression Angle', type: 'linearRegressionAngle' },
  {
    displayValue: 'Linear Regression Intercept',
    type: 'linearRegressionIntercept',
  },
  { displayValue: 'Linear Regression Slope', type: 'linearRegressionSlope' },
  { displayValue: 'Klinger Oscillator', type: 'klinger' },
  {
    displayValue: '>MACD (Moving Average Convergence Divergence)',
    type: 'macd',
  },
  { displayValue: 'MFI (Money Flow Index)', type: 'mfi' },
  { displayValue: 'Momentum', type: 'momentum' },
  { displayValue: 'NATR (Normalized Average True Range)', type: 'natr' },
  { displayValue: 'OBV (On-Balance Volume)', type: 'obv' },
  { displayValue: 'Percentage Price oscillator', type: 'ppo' },
  { displayValue: 'RoC (Rate of Change)', type: 'roc' },
  { displayValue: 'RSI (Relative Strength Index)', type: 'rsi' },
  { displayValue: 'Slow Stochastic', type: 'slowstochastic' },
  { displayValue: 'Stochastic', type: 'stochastic' },
  { displayValue: 'TRIX', type: 'trix' },
  { displayValue: 'Williams %R', type: 'williamsr' },
]
const rangeData = [
  // range is in days
  { displayValue: '1D', range: 1 },
  { displayValue: '5D', range: 5 },
  { displayValue: '10D', range: 10 },
  { displayValue: '1M', range: 30 },
  { displayValue: '3M', range: 3 * 30 },
  { displayValue: '6M', range: 6 * 30 },
  { displayValue: '1Y', range: 365 },
  { displayValue: '2Y', range: 365 * 2 },
  { displayValue: '5Y', range: 365 * 5 },
  { displayValue: '10Y', range: 365 * 10 },
  { displayValue: '20Y', range: 365 * 20 },
]
const frequencyData = [
  { displayValue: 'One Minute', type: 'ONE_MINUTE' },
  { displayValue: 'One Day', type: 'ONE_DAY' },
]
const displayData: DisplayInterface[] = [
  { displayValue: 'Area', type: 'area' },
  { displayValue: 'Line', type: 'line' },
  { displayValue: 'Candle Stick', type: 'candlestick' },
  { displayValue: 'OHLC', type: 'ohlc' },
]

const SocialSentimentsDropdownData: SocialSentimentDropdownDownInterface[] = [
  { displayValue: 'Social Sentiments' },
  {
    displayValue: 'Stock twit posts',
    type: 'stock_twit_posts',
    metaData: { [CHARTS_CACHE_KEY]: 'social_sentiments', idx: 1 },
  },
  {
    displayValue: 'Stock twit likes',
    type: 'stock_twit_likes',
    metaData: { [CHARTS_CACHE_KEY]: 'social_sentiments', idx: 2 },
  },
  {
    displayValue: 'Stock twit comments',
    type: 'stock_twit_comments',
    metaData: { [CHARTS_CACHE_KEY]: 'social_sentiments', idx: 3 },
  },
  {
    displayValue: 'Stock twit impressions',
    type: 'stock_twit_impressions',
    metaData: { [CHARTS_CACHE_KEY]: 'social_sentiments', idx: 4 },
  },
  {
    displayValue: 'Stock twit sentiments',
    type: 'stock_twit_sentiments',
    metaData: { [CHARTS_CACHE_KEY]: 'social_sentiments', idx: 5 },
  },
  {
    displayValue: 'Twitter posts',
    type: 'twitter_posts',
    metaData: { [CHARTS_CACHE_KEY]: 'social_sentiments', idx: 6 },
  },
  {
    displayValue: 'Twitter likes',
    type: 'twitter_likes',
    metaData: { [CHARTS_CACHE_KEY]: 'social_sentiments', idx: 7 },
  },
  {
    displayValue: 'Twitter comments',
    type: 'twitter_comments',
    metaData: { [CHARTS_CACHE_KEY]: 'social_sentiments', idx: 8 },
  },
  {
    displayValue: 'Twitter impressions',
    type: 'twitter_impressions',
    metaData: { [CHARTS_CACHE_KEY]: 'social_sentiments', idx: 9 },
  },
  {
    displayValue: 'Twitter sentiments',
    type: 'twitter_sentiments',
    metaData: { [CHARTS_CACHE_KEY]: 'social_sentiments', idx: 10 },
  },
]
interface ChartControlsProps {
  onTechnicalIndicatorClick: (val: any) => void
  onOscillatorsClick: (val: any) => void
  onRangeClick: (val: any) => void
  onFrequencyClick: (val: any) => void
  onDisplayClick: (val: any) => void
  onNewSymbolClick: (val: any) => void
  onFlagClick: (val: any) => void
  onSocialSentimentsClick: (val: any) => void
  restoreDefaults: () => void
  isAnyLowerChartSelected: boolean
  isAnyOverlaySelected: boolean
  display: DisplayInterface
  frequency: string
  range: number
  onLoad: () => void
  toDate: Date
  fromDate: Date
  setFromDate: (val: Date) => void
  setToDate: (val: Date) => void
}

const ChartControls = ({
  onLoad,
  onTechnicalIndicatorClick,
  onRangeClick,
  onFrequencyClick,
  onDisplayClick,
  onNewSymbolClick,
  restoreDefaults,
  onOscillatorsClick,
  onFlagClick,
  isAnyOverlaySelected,
  isAnyLowerChartSelected,
  display,
  frequency,
  range,
  onSocialSentimentsClick,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}: ChartControlsProps) => {
  const [searchText, setSearchText] = useState('')
  const [searchResult, isSearchResultsLoading] = useFetch<SearchInterface[]>(
    'searchCompany',
    { search: searchText },
    {
      shouldFetch: !!searchText,
      shouldShowLoadingOnRefetch: true,
      initialData: [],
      initialLoadingState: false,
    }
  )

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onNewSymbolClick(e.target[0].value as string)
    setSearchText('')
  }
  const handleClick = (val: string) => {
    onNewSymbolClick(val)
    setSearchText('')
  }

  return (
    <div className="v_data_section">
      <div className="is-flex is-justify-content-space-between is-gap">
        <div className="is-flex is-gap">
          <div>
            <p className="is-size-7 has-text-grey mb-2">Chart Range</p>
            <div className="v-center">
              <ReactDatePicker
                {...DEFAULT_DATE_PICKER_OPTIONS}
                wrapperClassName={styles.datepicker_wrapper}
                maxDate={toDate}
                customInput={
                  <Button className="is-warning" size="small">
                    {dayjs(fromDate).format('D MMM, YYYY')}
                  </Button>
                }
                selected={fromDate}
                onChange={setFromDate}
              />
              <Icon className="mx-1 has-text-grey">
                <BsArrowRightShort />
              </Icon>
              <ReactDatePicker
                {...DEFAULT_DATE_PICKER_OPTIONS}
                wrapperClassName={styles.datepicker_wrapper}
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

          <div>
            <p className="is-size-7 has-text-grey mb-5"></p>
            <HoriSelectList
              value={range}
              onClick={onRangeClick}
              dataArr={rangeData}
              controlKey="range"
            />
          </div>
        </div>
        <div className="is-flex is-gap">
          <div>
            <p className="is-size-7 has-text-grey mb-2">FREQUENCY</p>
            <Dropdown
              onClick={onFrequencyClick}
              value={frequency}
              dataArr={frequencyData}
              controlKey="type"></Dropdown>
          </div>
          <div>
            <p className="is-size-7 has-text-grey mb-2">DISPLAY</p>
            <Dropdown
              value={display.displayValue}
              disabled={isAnyLowerChartSelected || isAnyOverlaySelected}
              onClick={onDisplayClick}
              dataArr={displayData}></Dropdown>
          </div>
        </div>
      </div>

      <div>
        <p className="is-size-7 has-text-grey mb-2">DISPLAY</p>
        <div className="is-flex is-gap">
          <Dropdown
            onClick={onTechnicalIndicatorClick}
            disableSelection
            className="is-flex-1 is-warning"
            dataArr={technicalIndicatorDropdownData}
          />
          <Dropdown
            className="is-flex-1 is-warning"
            disableSelection
            dataArr={oscillatorsDropdownData}
            onClick={onOscillatorsClick}
          />
          <Dropdown
            className="is-flex-1 is-warning"
            disableSelection
            dataArr={[
              DIVIDENDS_DISPLAY_VALUE,
              EARNINGS_DISPLAY_VALUE,
              SPLITS_DISPLAY_VALUE,
            ]}
            onClick={onFlagClick}
          />

          <Dropdown
            className="is-flex-1 is-warning"
            disableSelection
            dataArr={SocialSentimentsDropdownData}
            onClick={onSocialSentimentsClick}
          />
        </div>
      </div>
      <div className="is-flex is-justify-content-space-between">
        <div>
          <p className="is-size-7 has-text-grey mb-2">COMPARE</p>
          <div className="is-relative">
            <form onSubmit={handleSubmit}>
              {!!searchText && !!searchResult.length && (
                <div className={styles.dropdown}>
                  {searchResult.map((i) => (
                    <div
                      onClick={() => {
                        onNewSymbolClick(i.equity_symbol)
                        setSearchText('')
                      }}
                      key={i.equity_name}
                      className={styles.item}>
                      {i.equity_name} ({i.equity_symbol})
                    </div>
                  ))}
                </div>
              )}
              <Input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                cSize="small"
                placeholder="compare symbol"
              />
            </form>
          </div>
        </div>

        <div>
          <div className="mb-4" />
          <div
            className="is-flex is-gap"
            id={CHARTS_BOTTOM_BUTTONS_WRAPPER_ID}
            ref={() => onLoad()}>
            <Button size="small" className="is-warning is-outlined">
              <Icon>
                <BiDownload size={16} />
              </Icon>
              <span>Download</span>
            </Button>
            <Button
              onClick={restoreDefaults}
              size="small"
              className="is-warning is-outlined">
              restore defaults
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ChartControls
