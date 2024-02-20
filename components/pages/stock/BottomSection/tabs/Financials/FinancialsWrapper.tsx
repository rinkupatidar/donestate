import React, { useEffect } from 'react'
import styles from './index.module.scss'
import { useQuery } from '@tanstack/react-query'
import FinancialChart from './FinancialsChart'
import { addOpacityAnimation } from 'animation'
import { useRouter } from 'next/router'
import PrimaryLoader from 'components/Loader/PrimaryLoader'
import { AXIOS_INSTANCE, DEFAULT_TOPIC_CODE } from '../../../../../../constants'
import dayjs from 'dayjs'
import { AnimatePresence, motion } from 'framer-motion'
import { AxisSetExtremesEventObject, data } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useRef, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import Countrydropdown from './chartIcon/countrysearch/dropdown'
import { GetChartResponseInterface } from 'service/DashboardService/DashboardServicesInterface'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
import { useImmer } from 'use-immer'
import { ImCross } from 'react-icons/im'
import debounce from 'lodash/debounce'
import axios from 'axios'
import Modalclose from 'components/Modal/Modal_without_close'
// import Chart from './Chart'
// import ChartControls from './ChartControls'
import {
  DisplayInterface,
  IndicatorsInterface,
  SocialSentimentDropdownDownInterface,
} from '../Chart/chartTypes'
// import { SavedChartConfigInterface } from './SavedCharts/SavedChartTypes'
import { SavedChartConfigInterface } from '../Chart/SavedCharts/SavedChartTypes'
import Modal from 'components/Modal/Modal'
import Button from 'components/Button/Button'
import Input from 'components/Input/Input'
import Dropdown from 'components/Dropdown/Dropdown'
import AllDataChart from './AllDataChart'

import {
  getAllCountries,
  getCountryDetail,
  getCountryWiseHistoricalValues,
  getIndicatorDetail,
  getIndicatorDetailsByTopic,
  getIndicatorTopics,
  getSearchChartTitles,
  getopenChart,
} from 'service/DashboardService/DashboardServices'
import LoadingSection from 'components/Loader/LoadingSection'
import Dropdownnew from 'components/Dropdown/Dropdownnew'
import Dropdownratio from 'components/Dropdown/Dropdownratio'
import { config, title } from 'process'
import { BiErrorCircle } from 'react-icons/bi'
import Icon from 'components/Icon/Icon'
import { BLUE_DARK, GREEN, PINK_DARK, YELLOW } from 'highcharts-styling-config'
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

const FinancialchartWrapper = ({ symbol }) => {
  const router = useRouter()
  const chartRef = useRef<HighchartsReact.RefObject>(null)
  
  const containerRef = useRef(null)
  const [controlsLoaded, setControlsLoaded] = useState(false)
  const { ChartTitle, titles } = router.query || {}
  const [animationKey, _animateOpacity] = useState(false)
  const [chart_items, setControls] = useImmer<ControlInterface[]>([
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
  const [rangeselect, setRangeselect] = useState('QUARTER')
  const calculateRange = (selectedRange) => {
    return selectedRange === 'ANNUAL' ? rangedata || 2 : rangedata || 8
  }
  const [rangedata, setRangedata] = useState(calculateRange(rangeselect))

  const onRangeClick = (val) => {
    setRange(val?.range)
    setRangedata(val?.value)
  }
  const handleOpen = () => {
    setcreateModalData(false)
  }

  useEffect(() => {
    const initialRange = calculateRange(rangeselect)
    setRangedata(initialRange)
  }, [rangeselect])

  const selectRangeAnnual_Qu = (e) => {
    setRangedata()
    setUserChangeAnnual_Quater_After_Open(true)
    setRangeselect(e.value)
  }

  const UserChangeRangeSelectReset = () => {
    setUserChangeAnnual_Quater_After_Open(false)
  }
  const [chart_format, setchart_format] = useState('THOUSANDS')
  const [ChartFormatRender, setChartFormatRender] = useState(false)
  const [fromDate, _setFromDate] = useState<Date>(new Date())
  const [toDate, _setToDate] = useState<Date>(new Date())
  const [openModal, setOpenModal] = useState(false)
  const [activeEquityComponent, setActiveEquityComponent] = useState(false)
  const [activeEconomicsComponent, setActiveEconomicsComponent] =
    useState(false)
  const [selectedData, setSelectedData] = useState([])
  const [arraymode, setArrayMode] = useState(true)
  const [openquery, setOpenQuery] = useState(false)

  const [search, setSearch] = useState('')
  const [countryCode, setCountryCode] = useState()
  const [indicator, setIndicator] = useState('')
  const [topic, setTopic] = useState(DEFAULT_TOPIC_CODE)
  const [searchList, setSearchList] = useState([])
  const [tab, setTab] = useState('Chart')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  let { country_code } = router.query as Record<string, string>
  const [bsItem, setBsItem] = useState([])
  const [pnlItem, setPnlItem] = useState([])
  const [ratioitem, setfinancialitemratio] = useState([])
  const [cfItem, setCfItem] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // const contriesQuery = useQuery(['countries'], () => getAllCountries())
  const countriesQuery = useQuery(['countries'], () => getAllCountries(), {
    onSuccess: (data) => {
      setCountryCode(data[0].country_code)
    },
  })
  const [chartApi, setChartApi] = useState({})
  const [receivedOpenChartData, setReceivedOpenChartData] = useState(null)
  const [apiResponseDuration, setApiResponseDuration] = useState('')
  const [opensaving, setOpensaving] = useState(null)
  const [savechart1, setSavechart1] = useState({})
  const [dataFromChild, setDataFromChild] = useState({})
  const [mubeen, setMubeen] = useState({})
  const [checkmoreitem, setCheckmoreitem] = useState(false)
  const [sameitem, setSameitem] = useState('')
  const [samesymbol, setsamesymbol] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const [dataFromChildDeleteName, setDataFromChildDeleteName] = useState('')
  const [newCreate, setNewCreate] = useState(false)
  const [newCreateInOpen, setNewCreateInOpen] = useState(false)
  const [chartOpenDeleteName, setChartOpenDeleteName] = useState('')
  const [
    userChangeAnnual_Quater_After_Open,
    setUserChangeAnnual_Quater_After_Open,
  ] = useState(false)
  const [stopApiInOpenFirstTime, setStopApiInOpenFirstTime] = useState(true)
  const [stopApiInOpenFirstTimeCreate, setStopApiInOpenFirstTimeCreate] =
    useState(true)
  const [saveClickRenderChart, setSaveClickRenderChart] = useState(false)
  const [successpopup, setsuccesspopup] = useState(false)
  const [stopUseEffectInUrl, setStopUseEffectInUrl] = useState(true)
  const [comapresymbol, setcomapresymbol] = useState()
  const [comapresymbol1, setcomapresymbol1] = useState(symbol)
  const [mergedData, setMergedData] = useState([])
  const [compareOptionInEconomics, setCompareOptionInEconomics] = useState([])
  const [error, setError] = useState('')

  const [comparename, setcomparename] = useState([])
  const [comparename1, setcomparename1] = useState([])
  const [arraymerge, setArraymerge] = useState([]);

  const [itemname, setitemname] = useState([])
  const [popdata, setPopdata] = useState(false)
  //const [selectedTechnicalIndicatorValuenew, setSelectedTechnicalIndicatorcampare] = useState(null);


const chartlength =(arraymerge.length-1)
  const [
    selectedTechnicalIndicatorValuenew,
    setSelectedTechnicalIndicatorcampare,
  ] = useState([])

  const [selectedOscillatorcampre, setSelectedOscillatorcampre] = useState([])
  const [selectedFlagcampare, setSelectedFlagcampare] = useState([])
  const [selectedRatiocampare, setSelectedRatiocampare] = useState([])

  const { openChartId } = router.query
  const currentopenchart = async () => {
    try {
      if (openChartId) {
        const openChartData = await getopenChart({
          chart_id: openChartId,
        })
        console.log(openChartData, 'openChartData')
        setControls([])
        setRangeselect('')
        setRangedata('')
        setchart_format('')
        setChartIdInUpdate('')
        setChartTitleName('')
        setControls(openChartData?.chart_config?.chart_items)
        setRangeselect(openChartData?.chart_config?.chart_data_type)
        setRangedata(openChartData?.chart_config?.chart_range)
        setchart_format(openChartData?.chart_config?.chart_format)
        setChartIdInUpdate(openChartData?.chart_id)
        setChartTitleName(openChartData?.title)
        setcreateModalData(true)
      } else {
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    if (openChartId && stopUseEffectInUrl) {
      currentopenchart()
    }
  }, [openChartId])

  const onClickchart_format = (event: object) => {
    setChartFormatRender(true)
    setchart_format(event.value)
  }
  const ChartFormatReset = () => {
    setChartFormatRender(false)
  }
  const deleteIdResetState = () => {
    setDeleteId('')
  }

  const saveButtonStateReset = (key: string) => {
    if (key === 'saveButtonClick') {
      setSaveClickRenderChart(true)
    } else {
      setSaveClickRenderChart(false)
    }
  }

  const handledeleteconfig12 = (data) => {
    setDeleteId(data)
    const updatedControls = chart_items.filter(
      (item, index) =>
        item.item_id !== data.item_id ||
        item.chart_item_symbol !== data.chart_item_symbol
    )
    setControls(updatedControls)
  }

  const handledeleteconfigcompare = (data) => {
    const updatedControls = comparename1.filter((item, index) => {
      return item?.displayValue !== data?.displayValue
    })

    setcomparename1(updatedControls)
    setSelectedTechnicalIndicatorcampare([])
    setSelectedOscillatorcampre([])
    setSelectedFlagcampare([])
    setSelectedRatiocampare([])
    const arraynew = updatedControls
    const setSelectedStates = arraynew.map((item) => {
      if (item.item_group === 'BALANCE_SHEET') {
        return setSelectedTechnicalIndicatorcampare([item])
      } else if (item.item_group === 'CASH_FLOW') {
        return setSelectedFlagcampare([item])
      } else if (item.item_group === 'PnL') {
        return setSelectedOscillatorcampre([item])
      } else if (item.item_group === 'RATIO_ANALYSIS') {
        return setSelectedRatiocampare([item])
      }
    })

    //   updatedControls.map(item => {
    //     console.log(item,'itemitemitemitem');

    //     if (item.item_group === "BALANCE_SHEET") {
    //       console.log("updatedControls",item)
    //       setSelectedTechnicalIndicatorcampare([]);
    //       setSelectedTechnicalIndicatorcampare(item);
    //     } else if (item.item_group === "CASH_FLOW") {
    //       setSelectedFlagcampare([]);
    //       setSelectedFlagcampare(item);
    //     }
    //     else if (item.item_group === "PnL") {
    //       setSelectedOscillatorcampre([]);
    //       setSelectedOscillatorcampre(item);
    //     }
    //     else if (item.item_group === "RATIO_ANALYSIS") {
    //       setSelectedRatiocampare([]);
    //       setSelectedRatiocampare(item);
    //     }
    // });
    const updatedControlNames = updatedControls.map((item) => item)
    setcomparename(updatedControlNames)
  
  }

  // const handledeleteconfigcompare = (data) => {

  //   const updatedControls = chart_items.filter(
  //     (item, index) =>
  //       item.item_id !== data.item_id ||
  //       item.chart_item_symbol !== data.chart_item_symbol
  //   )
  //   set(updatedControls)
  // }
  const handleOpenChartData = (data) => {
    // setReceivedOpenChartData{{}}
    setControls([])
    setRangeselect('')
    setRangedata('')
    setchart_format('')
    setChartIdInUpdate('')
    setChartTitleName('')
      setCompareOptionInEconomics([])
    setCompareOptionInEconomics(data?.chart_config?.compareOptionInEconomics)
    setControls(data?.chart_config?.chart_items)
    setRangeselect(data?.chart_config?.chart_data_type)
    setRangedata(data?.chart_config?.chart_range)
    setchart_format(data?.chart_config?.chart_format)
    setChartIdInUpdate(data?.chart_id)
    setChartTitleName(data?.title)
    setcreateModalData(true)
    setStopUseEffectInUrl(false)
  }

  const indicatorListQuery = useQuery(
    ['indicators', topic],
    () => getIndicatorDetailsByTopic(topic),
    {
      enabled: !!topic,
      onSuccess: (res) => {
        setIndicator(res[0].code)
        // if (!indicator) {
        //   setIndicator(res[0].code);
        // }
      },
    }
  )
  const indicatorTopicQuery = useQuery(
    ['indicator topics'],
    () => getIndicatorTopics(false),
    { onSuccess: (res) => {} }
  )
  // console.log("indicatorTopicQuery",indicatorTopicQuery)
  const contriesDetailsQuery = useQuery(
    ['countries', country_code],
    () => getCountryDetail(country_code),
    { enabled: !!country_code }
  )

  const indicatorDetailsQuery = useQuery(
    ['indicators', indicator],
    () => getIndicatorDetail(indicator),
    { enabled: !!indicator }
  )
  const countryWiseHisToricalValuesQuery = useQuery(
    ['countries', country_code, indicator, rangeselect],
    () => getCountryWiseHistoricalValues(country_code, indicator, rangeselect),
    { enabled: !!country_code && !!indicator }
  )

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

  // const handleTechnicalIndicatorcampare = (val: any) => {

  //     if (mergedData.length >= 3) {
  //       setPopdata(true)
  //     } else {
  //       setPopdata(false)
  //     }
  //     if (mergedData.length < 4) {
  //       const existingItem = chart_items?.find(
  //         (item) =>
  //           item.item_group === 'BALANCE_SHEET' &&
  //           item.chart_item_symbol === comapresymbol1  &&
  //           item.item_name === val.displayValue
  //       )
  //       if (existingItem) {
  //         setCheckmoreitem(true)
  //       }

  //       if (comparename !== comparename)
  //       {
  //         if (!existingItem) {
  //           const name = val?.displayValue;
  //            //setSelectedTechnicalIndicatorcampare(val);
  //           const value =val;
  //           setSelectedTechnicalIndicatorcampare(prevValue => prevValue ? [...prevValue, value] : [value]);
  //           setcomparename(prevNames => [...prevNames, name]);
  //           setcomparename1(prevNames => [...prevNames, name]);
  //           }
  //         }
  //        else if(comparename.length === 0) {
  //           if (!existingItem) {
  //             const name = val?.displayValue;
  //              //setSelectedTechnicalIndicatorcampare(val);
  //             const value =val;
  //             setSelectedTechnicalIndicatorcampare(prevValue => prevValue ? [...prevValue, value] : [value]);
  //             setcomparename(prevNames => [...prevNames, name]);
  //             setcomparename1(prevNames => [...prevNames, name]);
  //             }

  //         }
  //       //   else
  //       // {
  //       //   console.log('2222222222222222');

  //       //   setCheckmoreitem(true)
  //       //   setTimeout(() => {
  //       //     setCheckmoreitem(false)
  //       //   }, 1500)
  //       // }

  //     }

  // }
  const handleTechnicalIndicatorcampare = (val: any) => {
    const vcom = val

    if (mergedData.length > 3) {
      setPopdata(true)
    } else {
      setPopdata(false)
    }
    if (mergedData.length < 4) {
      const existingItem = chart_items?.find(
        (item) =>
          item.item_group === 'BALANCE_SHEET' &&
          item.chart_item_symbol === comapresymbol1 &&
          item.item_name === val.displayValue
      )
      if (existingItem) {
        setCheckmoreitem(true)
      }
      if (comparename1.length !== null) {
        const lastItem = vcom?.displayValue

        const same = comparename1.find((item, index) => {
          console.log(item, 'item')
          return (
            item?.displayValue === lastItem &&
            item?.item_group === 'BALANCE_SHEET'
          )
        })

        if (same) {
          setCheckmoreitem(true)
          setTimeout(() => {
            setCheckmoreitem(false)
          }, 1500)
        } else {
          if (!existingItem) {
            const displayValue = val?.displayValue
            const value = val
            setSelectedTechnicalIndicatorcampare((prevValue) =>
              prevValue ? [...prevValue, value] : [value]
            )
            //setSelectedTechnicalIndicatorcampare((prevValue) => [...prevValue, value]);
            //setcomparename((prevNames) => [...prevNames, displayValue]);
            setcomparename((prevValue) => [...prevValue, value])

            setcomparename1((prevValue) => [
              ...prevValue,
              { ...value, item_group: 'BALANCE_SHEET' },
            ])
            //setcomparename1((prevNames) => [...prevNames, { displayValue, item_group: 'BALANCE_SHEET' }]);
          }
        }
      }
    }
  }

  const handleOscillatorscampare = (val: any) => {
    const vcom = val

    if (mergedData.length > 3) {
      setPopdata(true)
    } else {
      setPopdata(false)
    }
    if (mergedData.length < 4) {
      const existingItem = chart_items?.find(
        (item) =>
          item.item_group === 'PnL' &&
          item.chart_item_symbol === comapresymbol1 &&
          item.item_name === val.displayValue
      )
      if (existingItem) {
        setCheckmoreitem(true)
      }
      if (comparename1.length !== null) {
        const lastItem = vcom?.displayValue

        const same = comparename1.find((item, index) => {
          // return item === lastItem
          return item?.displayValue === lastItem && item?.item_group === 'PnL'
        })

        if (same) {
          setCheckmoreitem(true)
          setTimeout(() => {
            setCheckmoreitem(false)
          }, 1500)
        } else {
          if (!existingItem) {
            const displayValue = val?.displayValue
            const value = val
            setSelectedOscillatorcampre((prevValue) =>
              prevValue ? [...prevValue, value] : [value]
            )
            setcomparename((prevValue) => [...prevValue, value])
            setcomparename1((prevValue) => [
              ...prevValue,
              { ...value, item_group: 'PnL' },
            ])
          }
        }
      }
      // if (!existingItem) {
      //   const name = val?.displayValue
      //   const value = val
      //   setSelectedOscillatorcampre((prevValue) =>
      //     prevValue ? [...prevValue, value] : [value]
      //   )
      //   setcomparename((prevNames) => [...prevNames, name])
      //   setcomparename1((prevNames) => [...prevNames, name])
      // }
    }
  }
  const handleFlagscampare = (val: any) => {
    const vcom = val

    if (mergedData.length > 3) {
      setPopdata(true)
    } else {
      setPopdata(false)
    }

    if (mergedData.length < 4) {
      const existingItem = chart_items?.find(
        (item) =>
          item.item_group === 'CASH_FLOW' &&
          item.chart_item_symbol === comapresymbol1 &&
          item.item_name === val.displayValue
      )
      if (existingItem) {
        setCheckmoreitem(true)
      }
      if (comparename1.length !== null) {
        const lastItem = vcom?.displayValue

        const same = comparename1.find((item, index) => {
          // return item === lastItem
          return (
            item?.displayValue === lastItem && item?.item_group === 'CASH_FLOW'
          )
        })

        if (same) {
          setCheckmoreitem(true)
          setTimeout(() => {
            setCheckmoreitem(false)
          }, 1500)
        } else {
          if (!existingItem) {
            const displayValue = val?.displayValue
            const value = val
            setSelectedFlagcampare((prevValue) =>
              prevValue ? [...prevValue, value] : [value]
            )
            setcomparename((prevValue) => [...prevValue, value])
            //setcomparename1((prevNames) => [...prevNames, name])
            // setcomparename1((prevValue) => [...prevValue, {  value: value, item_group: 'CASH_FLOW' }]);
            setcomparename1((prevValue) => [
              ...prevValue,
              { ...value, item_group: 'CASH_FLOW' },
            ])
            //setcomparename1((prevNames) => [...prevNames, { displayValue, item_group: 'CASH_FLOW' }]);
          }
        }
      }
      // if (!existingItem) {
      //   const name = val?.displayValue
      //   const value = val
      //   setSelectedFlagcampare((prevValue) =>
      //     prevValue ? [...prevValue, value] : [value]
      //   )
      //   setcomparename((prevNames) => [...prevNames, name])
      //   setcomparename1((prevNames) => [...prevNames, name])
      // }
    }
  }
  const handleNew = () => {
    setSelectedTechnicalIndicatorcampare([]);
    setSelectedOscillatorcampre([]);
    setSelectedFlagcampare([]);
    setSelectedRatiocampare([]); 
  };
  

  const handleRatiocampare = (val: any) => {
    const vcom = val

    if (mergedData.length > 3) {
      setPopdata(true)
    } else {
      setPopdata(false)
    }
    if (mergedData.length < 4) {
      const existingItem = chart_items?.find(
        (item) =>
          item.item_group === 'RATIO_ANALYSIS' &&
          item.chart_item_symbol === comapresymbol1 &&
          item.item_name === val.displayValue
      )
      if (existingItem) {
        setCheckmoreitem(true)
      }

      if (comparename1.length !== null) {
        const lastItem = vcom?.displayValue

        const same = comparename1.find((item, index) => {
          // return item === lastItem
          return (
            item?.displayValue === lastItem &&
            item?.item_group === 'RATIO_ANALYSIS'
          )
        })

        if (same) {
          setCheckmoreitem(true)
          setTimeout(() => {
            setCheckmoreitem(false)
          }, 1500)
        } else {
          if (!existingItem) {
            const displayValue = val?.displayValue
            // setSelectedRatiocampare(val);
            const value = val
            setSelectedRatiocampare((prevValue) =>
              prevValue ? [...prevValue, value] : [value]
            )
            setcomparename((prevValue) => [...prevValue, value])
            setcomparename1((prevValue) => [
              ...prevValue,
              { ...value, item_group: 'RATIO_ANALYSIS' },
            ])

            //setcomparename1((prevValue) => [...prevValue, { value, item_group: 'RATIO_ANALYSIS' }]);
          }
        }
      }
      // if (!existingItem) {
      //   const name = val?.displayValue
      //   // setSelectedRatiocampare(val);
      //   const value = val
      //   setSelectedRatiocampare((prevValue) =>
      //     prevValue ? [...prevValue, value] : [value]
      //   )
      //   setcomparename((prevNames) => [...prevNames, name])
      //   setcomparename1((prevNames) => [...prevNames, name])
      // }
    }
  }

  const handleCompare = () => {
    setPopdata(false)
    let selectedCount = 0

    // if (selectedTechnicalIndicatorValuenew) {
    //   handleTechnicalIndicatorClick(selectedTechnicalIndicatorValuenew);
    //   selectedCount++;
    // }
    if (selectedTechnicalIndicatorValuenew) {
      selectedTechnicalIndicatorValuenew.forEach((item) => {
        handleTechnicalIndicatorClick(item)
        selectedCount++
      })
    }

    if (selectedOscillatorcampre) {
      //handleOscillatorsClick(selectedOscillatorcampre);
      selectedOscillatorcampre.forEach((item) => {
        handleOscillatorsClick(item)
        selectedCount++
      })
    }
    if (selectedFlagcampare) {
      //handleFlagsClick(selectedFlagcampare);
      selectedFlagcampare.forEach((item) => {
        handleFlagsClick(item)
        selectedCount++
      })
    }
    if (selectedRatiocampare) {
      //handleRatioItemClick(selectedRatiocampare);
      selectedRatiocampare.forEach((item) => {
        handleRatioItemClick(item)
        selectedCount++
      })
    }

    if (selectedCount > 1) {
      setcreateModalData(true)
    }

    if (
      selectedTechnicalIndicatorValuenew ||
      selectedOscillatorcampre ||
      selectedFlagcampare ||
      selectedRatiocampare
    ) {
      setOpenModal(false)
      setSelectedData([])
      setcomparename([])
      setcomapresymbol('')
      setSelectedTechnicalIndicatorcampare([])
      setSelectedOscillatorcampre([])
      setSelectedFlagcampare([])
      setSelectedRatiocampare([])
      setcomparename1([])
    }
  }

  const handleCompareReset = () => {
    setPopdata(false)
    setcomparename1([])
    setSelectedData([])
    setcomparename([])
    setcomapresymbol('')
    setSelectedTechnicalIndicatorcampare([])
    setSelectedOscillatorcampre([])
    setSelectedFlagcampare([])
    setSelectedRatiocampare([])
  }
  const handleFlagsClick = (val: any) => {
    setDisplay({ displayValue: 'OHLC', type: 'CASH_FLOW' })

    if (mergedData.length > 3) {
      setPopdata(true)
    } else {
      setPopdata(false)
    }
    if (arraymerge.length <= 3) {
    if (chart_items.length < 5) {
      const existingItem = chart_items?.find(
        (item) =>
          item.item_group === 'CASH_FLOW' &&
          item.chart_item_symbol === comapresymbol1 &&
          item.item_name === val.displayValue
      )

      if (existingItem) {
        setSameitem(existingItem?.item_name)
        setCheckmoreitem(true)
      }
      if (!existingItem && chart_items.length < 5) {
        setControls((draft: ControlInterface[]) => {
          draft.push({
            item_id: val.type!,
            item_name: val.displayValue,
            item_group: 'CASH_FLOW',
            item_type: 'FINANCIAL',
            chart_item_symbol: comapresymbol || symbol,
            item_component_type: 'BAR',
            item_color: 'YELLOW',
          })
          return draft
        })
      }
    }
  }
  else{
    setPopdata(true)
  }
  }
  const handleOscillatorsClick = (val: any) => {
    setDisplay({ displayValue: 'OHLC', type: 'PnL' })

    if (chart_items.length > 4) {
      setPopdata(true)
    } else {
      setPopdata(false)
    }
    if (arraymerge.length <= 3) {
    if (chart_items.length < 5) {
      const existingItem = chart_items?.find(
        (item) =>
          item.item_group === 'PnL' &&
          item.chart_item_symbol === comapresymbol1 &&
          item.item_name === val.displayValue
        // item.chart_item_symbol ===  comapresymbol || symbol
      )
      if (existingItem) {
        setSameitem(existingItem?.item_name)
        setCheckmoreitem(true)
      }
      if (!existingItem) {
        setControls((draft: ControlInterface[]) => {
          draft.push({
            item_id: val.type!,
            item_name: val.displayValue,
            item_group: 'PnL',
            item_type: 'FINANCIAL',
            chart_item_symbol: comapresymbol || symbol,
            item_component_type: 'BAR',
            item_color: 'RED',
          })
          return draft
        })
      }
    }
  }
  else{
    setPopdata(true)
  }
  }
  const handleTechnicalIndicatorClick = (val: any) => {
    setDisplay({ displayValue: 'OHLC', type: 'BALANCE_SHEET' })

    if (chart_items.length > 4) {
      setPopdata(true)
    } else {
      setPopdata(false)
    }
    if (arraymerge.length <= 3) {
    if (chart_items.length < 5) {
      const existingItem = chart_items?.find(
        (item) =>
          item.item_group === 'BALANCE_SHEET' &&
          item.chart_item_symbol === comapresymbol1 &&
          item.item_name === val.displayValue
        // item.chart_item_symbol === comapresymbol || symbol
      )

      if (existingItem) {
        // console.log(existingItem,'existingItemexistingItemexistingItemexistingItembssssssss');
        // setsamesymbol(existingItem?.chart_item_symbol)
        setSameitem(existingItem?.item_name)
        setCheckmoreitem(true)
      }

      if (!existingItem) {
        setControls((draft: ControlInterface[]) => {
          draft.push({
            item_id: val.type!,
            item_name: val.displayValue,
            item_group: 'BALANCE_SHEET',
            item_type: 'FINANCIAL',
            chart_item_symbol: comapresymbol || symbol,
            item_component_type: 'BAR',
            item_color: 'BLUE',
          })
          return draft
        })
      }
    }
  }
  else{
    setPopdata(true)
  }
  }

  const handleRatioItemClick = (val: any) => {

    setDisplay({ displayValue: 'OHLC', type: 'RATIO_ANALYSIS' })
    if (chart_items.length > 4) {
      setPopdata(true)
    } else {
      setPopdata(false)
    }
    if (arraymerge.length <= 3) {
    if (chart_items.length < 5) {
      const existingItem = chart_items?.find(
        (item) =>
          item.item_group === 'RATIO_ANALYSIS' &&
          item.item_name === val.label &&
          item.chart_item_symbol === comapresymbol1
      )

      if (existingItem) {
        // setSameitem(existingItem?.item_group)
        setCheckmoreitem(true)
      }

      if (!existingItem) {
        setControls((draft: ControlInterface[]) => {
          draft.push({
            item_id: val.key!,
            item_name: val.displayValue,
            item_group: 'RATIO_ANALYSIS',
            ratio_analysis_type: val.groupType,
            item_type: 'FINANCIAL',
            chart_item_symbol: comapresymbol || symbol,
          })
          return draft
        })
      }
    }
  }
  else{
    setPopdata(true)
  }
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
    setControls(config.chart_items)
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

  const equityComponent = () => {
    setActiveEquityComponent(true)
    setActiveEconomicsComponent(false)
  }
  const economicsComponent = () => {
    setActiveEquityComponent(false)
    setActiveEconomicsComponent(true)
  }
  const handleSearch = (e) => {
    const inputValue = e.target.value.trim()

    setSearch(e.target.value)
    if (inputValue) {
      setArrayMode(false)
      setOpenQuery(true)
    } else {
      setArrayMode(true)
      setOpenQuery(false)
    }
  }

  const handleScroll = () => {
    // const container = document.getElementById('your-container-id');
    const container = containerRef.current
    if (container) {
      const { scrollTop, clientHeight, scrollHeight } = container

      if (scrollTop + clientHeight >= scrollHeight - 20) {
        setIsLoading(true)
        debouncedLoadMoreData()
      }
    }
  }

  const loadMoreData = async () => {
    try {
      const newDataList = await getSearchChartTitles({
        search_text: search,
        chart_type: 'FINANCIAL',
        page: page + 1,
      })

      setSearchList((prevList) => [...prevList, ...newDataList])
      setPage((prevPage) => prevPage + 1)
    } catch (error) {
      console.error('something Error')
    } finally {
      setIsLoading(false)
    }
  }

  const debouncedLoadMoreData = debounce(loadMoreData, 200)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (search) {
  //         const searchDataList = await getSearchChartTitles({ search_text: search, chart_type: "FINANCIAL", page: 1 });
  //         setSearchList(searchDataList);
  //       } else {
  //         setSearchList([]);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  //   return () => {
  //     setSearchList([]);
  //   };
  // }, [search]);
  useEffect(() => {
    const itemNames = chart_items
      .map((item) => item.item_name)
      .filter((name) => name)
    setitemname(itemNames)
    // setMergedData([])
    //setcomparename1([])
  }, [chart_items])

  // useEffect(() => {
  //   const mergedArray = [...itemname, ...comparename1,...compareOptionInEconomics].map((item, index) => ({
  //     ...item,
  //     index: index,
  //   }))
  //   setMergedData(mergedArray)
  // }, [itemname, comparename1,compareOptionInEconomics])
  useEffect(() => {
    if (itemname && comparename1 && compareOptionInEconomics) {
        const mergedArray = [...itemname, ...comparename1, ...compareOptionInEconomics].map((item, index) => ({
            ...item,
            index: index,
        }));
        // Check if setMergedData is defined and is a function
        if (typeof setMergedData === 'function') {
            setMergedData(mergedArray);
        } else {
            console.error("setMergedData is not a function");
        }
    } else {
        console.error("One of the arrays is undefined or not iterable");
    }
}, [itemname, comparename1, compareOptionInEconomics]);


  useEffect(() => {
    if (itemname && compareOptionInEconomics) {
    const merged = [...itemname, ...compareOptionInEconomics].map((item, index) => ({
      ...item,
      index: index,
    }));

    setArraymerge(merged);
  } else {
    console.error("One of the arrays is undefined or not iterable");
}
  }, [itemname, compareOptionInEconomics]);

  useEffect(() => {
    const searchCompany = async () => {
      const token = localStorage.getItem('token')
      const headers = {
        X_AUTH_TOKEN: token,
        'Content-Type': 'application/json',
      }

      if (search) {
        try {
          setIsLoading(true)
          const response = await AXIOS_INSTANCE.get(
            `searchCompany?search=${search}`,
            { headers }
          )
          if (response.status === 200) {
            setSearchList(response.data)
          }
        } catch (error) {
          console.error('Error getting company data:', error)
        } finally {
          // Set loading to false after the API call is completed (success or error)
          setIsLoading(false)
        }
      } else {
        setSearchList([])
      }
    }

    searchCompany()
  }, [search])

  const chartModelstatus = () => {
    setOpenModal(true)
    setActiveEquityComponent(true)
    setActiveEconomicsComponent(false)
  }

  const datatransfer = (item) => {
    // Check if the length of selectedData is less than 4
    if (selectedData.length < 4) {
      const uniqueData = new Set(selectedData)
      uniqueData.add(item.equity_symbol)
      setcomapresymbol(item.equity_symbol)
      setcomapresymbol1(item.equity_symbol)
      setSelectedData(Array.from(uniqueData))
      setSearch('')
      setArrayMode(true)
      setOpenQuery(false)
    } else {
      // Handle the case where the limit is reached (optional)
      setcomapresymbol(item.equity_symbol)
      setcomapresymbol1(item.equity_symbol)
      setSearch('')
      setArrayMode(true)
      setOpenQuery(false)
    }
  }

  useEffect(() => {
    getFinancialItems(),
      getFinancialItemspnl(),
      getFinancialItemscf(),
      getFinancialItemsratio()
  }, [])

  const getFinancialItems = async (statement_type: string) => {
    const token = localStorage.getItem('token')
    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }

    try {
      const response = await AXIOS_INSTANCE.get(
        `getFinancialItems?statement_type=BALANCE_SHEET&report_type=AS_REPORTED`,
        { headers }
      )
      // console.error('response', response.data)
      const fetchedFinancialData = response.data
      const formattedFinancialData = Object.entries(fetchedFinancialData).map(
        ([key, value]) => ({
          displayValue: value,
          type: key,
        })
      )

      // setfinancialitem(formattedFinancialData);
      setBsItem(formattedFinancialData)
    } catch (error) {
      console.error('Error fetching search results:', error)
    }
  }
  const getFinancialItemspnl = async (statement_type: string) => {
    const token = localStorage.getItem('token')
    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }

    try {
      const response = await AXIOS_INSTANCE.get(
        `getFinancialItems?statement_type=PnL&report_type=AS_REPORTED`,
        { headers }
      )
      console.error('response', response.data)
      const fetchedFinancialData = response.data
      const formattedFinancialData = Object.entries(fetchedFinancialData).map(
        ([key, value]) => ({
          displayValue: value,
          type: key,
        })
      )

      // setfinancialitempnl(formattedFinancialData);
      setPnlItem(formattedFinancialData)
    } catch (error) {
      console.error('Error fetching search results:', error)
    }
  }
  const getFinancialItemsratio = async (statement_type: string) => {
    const token = localStorage.getItem('token')
    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }

    try {
      const response = await AXIOS_INSTANCE.get(
        `getFinancialItems?statement_type=RATIO_ANALYSIS&report_type=AS_REPORTED`,
        { headers }
      )
      console.error('response', response.data)
      const fetchedFinancialData = response.data
      const formattedFinancialData = Object.entries(fetchedFinancialData).map(
        ([key, value]) => ({
          displayValue: value,
          type: key,
        })
      )

      setfinancialitemratio(formattedFinancialData)
    } catch (error) {
      console.error('Error fetching search results:', error)
    }
  }
  const getFinancialItemscf = async (statement_type: string) => {
    const token = localStorage.getItem('token')
    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }

    try {
      const response = await AXIOS_INSTANCE.get(
        `getFinancialItems?statement_type=CASH_FLOW&report_type=AS_REPORTED`,
        { headers }
      )
      console.error('response', response.data)
      const fetchedFinancialData = response.data
      const formattedFinancialData = Object.entries(fetchedFinancialData).map(
        ([key, value]) => ({
          displayValue: value,
          type: key,
        })
      )

      // setfinancialitemcf(formattedFinancialData);
      setCfItem(formattedFinancialData)
    } catch (error) {
      console.error('Error fetching search results:', error)
    }
  }

  const OpenApiReponseDuration = (duration) => {
    // setUserChange(duration)
  }

  //  const [dataSend, setDataSend] = useState(null);
  const [chartIdInUpdate, setChartIdInUpdate] = useState('')
  const [chartTitleName, setChartTitleName] = useState('')
  const [createModalData, setcreateModalData] = useState(false)

  const handleDataFromChild = (data) => {
    setControls([])
    setRangedata('')
    setchart_format('')
    setRangeselect('')
    // setDataFromChild(data);
  
    setControls(data?.chart_config?.chart_items)
    setRangedata(data?.chart_config?.chart_range)
    setchart_format(data?.chart_config?.chart_format)
    setRangeselect(data?.chart_config?.chart_data_type)
    setChartIdInUpdate(data?.chart_id)
    setChartTitleName(data?.title)
    setcreateModalData(true)
  }

  const [buttondata, setButtondata] = useState(true)

  const handleButtonDataChange = (newValue) => {
    setButtondata(newValue)
  }

  const updateCall = (data) => {
    setMubeen(data)
    setDataFromChild(data)
  }

  const resetStateSave = () => {
    setDataFromChild('')
  }

  const handleDeleteChart = async (id: String) => {
    const token = localStorage.getItem('token')
    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }
    const url = new URL(location.href)

    try {
      const response = await axios.delete(
        `https://api.donestat.co/rest/v1/deleteChart?chart_id=${id}`,
        { headers }
      )
      console.log('response ', response)
      if (response.status === 200) {
        if (
          url.searchParams.has('titles') ||
          url.searchParams.has('openChartId') ||
          url.searchParams.has('ChartTitle')
        ) {
          url.searchParams.delete('titles')
          url.searchParams.delete('openChartId')
          url.searchParams.delete('ChartTitle')
        }
        router.push(url, undefined, { scroll: false })
        setsuccesspopup(true)
        setTimeout(() => {
          setsuccesspopup(false)
        }, 1500)
        setControls([
          {
            displayValue: symbol,
            type: '',
            controlType: 'symbol',
          },
        ])
        setChartIdInUpdate('')
        setChartTitleName('')
      }
    } catch (error) {}
  }
  // const closeCompareModal=()=>{
  //   setOpenModal(false)
  //   setTopic(DEFAULT_TOPIC_CODE)
  //   setSelectedData([]);
  //   setcomparename([]);
  //   setcomapresymbol('');
  //   setSelectedTechnicalIndicatorcampare(null);
  //   setSelectedOscillatorcampre(null);
  //   setSelectedFlagcampare(null);
  //   setSelectedRatiocampare(null);
  // }
  const closeCompareModal = () => {
    setError(false)
    setOpenModal(false)
    setCountryCode(countriesQuery.data[0].country_code)
    setTopic(DEFAULT_TOPIC_CODE)
    setSelectedData([])
    setcomparename([])
    setcomapresymbol('')
    setSelectedTechnicalIndicatorcampare(null)
    setSelectedOscillatorcampre(null)
    setSelectedFlagcampare(null)
    setSelectedRatiocampare(null)
    const url = new URL(location.href)
    if (url.searchParams.has('country_code')) {
      url.searchParams.delete('country_code')
    }
    router.push(url, undefined, { scroll: false })
  }
  const compareCountryBase = () => {
    setCountryCode(countriesQuery.data[0].country_code)
    setTopic(DEFAULT_TOPIC_CODE)
    for (let option of compareOptionInEconomics) {
      console.log(option)
      if (
        option.countryCode === countryCode &&
        option.indicator === indicator
      ) {
        setError('This option is already selected')
        return
      } else {
        setError('')
      }
    }
    const indicatorObj = indicatorListQuery.data?.find(
      (i) => i.code === indicator
    )
    const newCompareOption = {
      countryCode,
      indicator,
      indicatorName:
        indicatorObj?.indicator_short_name || indicatorObj?.indicator_name,
      data_type: 'ECONOMICS',
      valueData: countryWiseHisToricalValuesQuery.data,
    }
    setCompareOptionInEconomics((prevOptions) => [
      ...prevOptions,
      newCompareOption,
    ])
    setOpenModal(false)

    // closeModalCompare()
  }
  // const closeModalCompare = () => {
  //   setOpenModal(false)
  // }
  const compareSearchReset=(data:any)=>{
    console.log("data",data)
    setSelectedData([])
    setSelectedTechnicalIndicatorcampare([])
    setSelectedOscillatorcampre([])
    setSelectedFlagcampare([])
    setSelectedRatiocampare([])
    setcomparename1([])
    setcomparename([])


  }


  useEffect(()=>{
    if(activeEconomicsComponent==false){
      setIndicator("GC.DOD.TOTL.GD.ZS")
    }
  
  },[activeEconomicsComponent])
  








  return (
    <>
      <div className={styles.container}>
        {popdata && (
          <Modal width="30vw" close={() => setPopdata(false)}>
            <div>
              <p className="help mt-2 is-danger is-size-6 has-tw-bold is-centered ">
                {/* <Icon className="is-small  ">
                <BiErrorCircle size={20} />
              </Icon> */}
                <p className="is-centered ">
                  This chart already contains maximum items. Please create
                  another chart.
                </p>
              </p>
            </div>
          </Modal>
        )}
        {successpopup && (
          <Modalclose width="32vw">
            <div>
              <p className="help mt-2 is-scheme-invert is-size-6 has-tw-bold is-centered ">
                <p className="is-centered ">
                  Your chart is removed successfully from your workspace.
                </p>
              </p>
            </div>
          </Modalclose>
        )}

        {checkmoreitem && (
          <Modal width="30vw" close={() => setCheckmoreitem(false)}>
            <div>
              {/* is-size-7 has-tw-bold is-sizei-7 has-text-centered has-text-gray mt-6 */}
              <p className="help mt-2 is-danger is-size-6 has-tw-bold">
                {/* <Icon className="is-small  ">
                <BiErrorCircle size={20} />
              </Icon> */}
                {/* <span>"{sameitem}" already exist</span> */}
                <span>This item is already defined within this chart.</span>
              </p>
              {/* <p
                className="is-size-6 has-tw-bold has-text-centered text-danger" ><span className='text-danger'>"{sameitem}"</span> already exist</p> */}
              {/* <div className="buttons is-centered mt-5 are-small ">
                <Button onClick={() => setCheckmoreitem(false)} >Cancel</Button>
              
              </div> */}
            </div>
          </Modal>
        )}
        <FinancialChart
          economiccampare={arraymerge}
          chartModelstatus={chartModelstatus}
          config={{
            chart_items,
            compareOptionInEconomics,
            rangedata,
            // display,
            toDate,
            fromDate,
          }}
          toDate={toDate}
          // fromDate={fromDate}
          setToDate={setToDate}
          setFromDate={setFromDate}
          OpenApiReponseDuration={OpenApiReponseDuration}
          onFlagClick={handleFlagsClick}
          restoreDefaults={restoreDefaults}
          onRangeClick={onRangeClick}
          selectRangeAnnual_Qu={selectRangeAnnual_Qu}
          onTechnicalIndicatorClick={handleTechnicalIndicatorClick}
          onOscillatorsClick={handleOscillatorsClick}
          onRatioitemClick={handleRatioItemClick}
          symbol={symbol}
          // ppppp={ppppp}
          onReceiveOpenChartData={handleOpenChartData}
          rangeselect={rangeselect}
          sendDataToParent={handleDataFromChild}
          setButtondata={handleButtonDataChange}
          receivedOpenChartData={receivedOpenChartData}
          updateCall={updateCall}
          safedata={dataFromChild}
          rangedata1={rangedata}
          // range={rangedata}
          // setFromDate={setFromDate}
          fromDate={fromDate}
          bsItem={bsItem}
          pnlItem={pnlItem}
          cfItem={cfItem}
          ratioitem={ratioitem}
          chartIdInUpdate={chartIdInUpdate}
          chartTitleName={chartTitleName}
          saveButtonStateReset={saveButtonStateReset}
          chart_format={chart_format}
          onClickchart_format={onClickchart_format}
          handleDeleteChart={handleDeleteChart}
        />
        <div className="tags mb-0"></div>
      <div id="chart" style={{background: '#0a0a0a'}}>
        <AnimatePresence   mode="wait">
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              {chart_items?.slice(1).map((item, i) => (
                <span
                  className="tag is-warning mt-3"
                  key={i}
                  style={{ background: 'transparent', color: '#ffff' }}
                >
                  <span
                    style={{
                      height: '12px',
                      width: '12px',
                      backgroundColor:
                        i == 0
                          ? BLUE_DARK
                          : i == 1
                          ? GREEN
                          : i == 2
                          ? PINK_DARK
                          : i == 3
                          ? YELLOW
                          : '',
                      borderRadius: '50%',
                      display: 'inline-display',
                      marginRight: '5px',
                    }}
                  />
                  <span style={{ fontSize: '0.80rem' }}>
                    {' '}
                    {item.item_name} ({item?.chart_item_symbol})
                  </span>
                  
                  <button
                    className=" is-small ml-1"
                    onClick={() => handledeleteconfig12(item)}
                    style={{
                      width: '13px',
                      height: '13px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '100%',
                    }}
                  >
                    <ImCross
                      style={{
                        fontSize: '8px',
                        // marginLeft: '-3.1px',
                        marginBottom: '5px',
                        color:
                          i == 0
                            ? BLUE_DARK
                            : i == 1
                            ? GREEN
                            : i == 2
                            ? PINK_DARK
                            : i == 3
                            ? YELLOW
                            : '',
                      }}
                    />
                  </button>
                </span>
              ))}
            </div>
         
          <div className="tags mb-0">
            <AnimatePresence>
              {compareOptionInEconomics &&
                compareOptionInEconomics.map((item, i) => (
            
                  <span
                  className="tag is-warning mt-3"
                  key={i}
                  style={{ background: 'transparent', color: '#ffff' }}
                >

                  <span
                    style={{
                      height: '12px',
                      width: '12px',
                      backgroundColor:
                      chartlength-i == 0
                          ? BLUE_DARK
                          : chartlength-i == 1
                          ? GREEN
                          : chartlength-i == 2
                          ? PINK_DARK
                          : chartlength-i == 3
                          ? YELLOW
                          : '',
                      borderRadius: '50%',
                      display: 'inline-display',
                      marginRight: '5px',
                    }}
                  />
                  <span style={{ fontSize: '0.80rem' }}>
                  {item.countryCode}{" "}{item.indicator}
                  </span>
                  
                  <button
                    className=" is-small ml-1"
                        
                    style={{
                      width: '13px',
                      height: '13px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '100%',
                    }}
                  >
                    <ImCross
                    onClick={() =>
                      setCompareOptionInEconomics((val) => {
                        const updatedState = [...val]
                        updatedState.splice(i, 1)
                        return updatedState
                      })
                    }
                      style={{
                        fontSize: '8px',
                        // marginLeft: '-3.1px',
                        marginBottom: '5px',
                        color:
                        chartlength-i === 0
                            ? BLUE_DARK
                            : chartlength-i === 1
                            ? GREEN
                            : chartlength-i === 2
                            ? PINK_DARK
                            : chartlength-i === 3
                            ? YELLOW
                            : '',
                      }}
                    />
                  </button>
                </span>
                ))}
            </AnimatePresence>
          </div>
          </div>
          <motion.div>
            <AllDataChart
            // chartRef={chartRef}
              createNew={createModalData}
              setcreateNew={handleOpen}
              config={{
                chart_items,
                compareOptionInEconomics,
                rangedata,
                // display,
                chart_format,
                toDate,
                fromDate,
              }}
              symbol={symbol}
              rangeselect={rangeselect}
              chart_range={rangedata}
              deleteId={deleteId}
              deleteIdResetState={deleteIdResetState}
              userChangeAnnual_Quater_After_Open={
                userChangeAnnual_Quater_After_Open
              }
              setDateTime={({ start_date, end_date }) => {
                // console.log("start_datestart_date",start_date);
                // console.log("end_dateend_date",end_date);
                if (start_date && start_date[0] && end_date && end_date[0]) {
                  setFromDate(new Date(start_date[0]))
                  // _setFromDate(dayjs(start_date[0]).format('D MMM, YYYY'));
                  setToDate(new Date(end_date[0]))
                }

                // _setFromDate(dayjs(end_date))
                // _setToDate(dayjs(start_date))
              }}
              chartTitleName={chartTitleName}
              saveClickRenderChart={saveClickRenderChart}
              saveButtonStateReset={saveButtonStateReset}
              UserChangeRangeSelectReset={UserChangeRangeSelectReset}
              chart_format={chart_format}
              ChartFormatRender={ChartFormatRender}
              ChartFormatReset={ChartFormatReset}
              compareOptionInEconomics={compareOptionInEconomics}
            />
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
      {openModal && (
        <Modal disableOverflowHidden close={() => closeCompareModal()} isSmall>
          <div className="is-flex is-flex-direction-row mt-3">
            <div>
              <Button
                size="small"
                className={` ${
                  activeEquityComponent
                    ? 'is-warning'
                    : 'is-warning is-outlined'
                } `}
                onClick={equityComponent}
              >
                Equity
              </Button>
            </div>
            <div>
              <Button
                size="small"
                className={` ${
                  activeEconomicsComponent
                    ? 'is-warning'
                    : 'is-warning is-outlined'
                } ml-2 `}
                onClick={economicsComponent}
              >
                Economics
              </Button>
            </div>
          </div>
          {activeEquityComponent && (
            <>
              <div className="mt-5">
                <Input
                  cSize="small"
                  placeholder="Search Stock"
                  onChange={handleSearch}
                  value={search}
                  disabled={selectedData.length > 0}
                  style={{ backgroundColor: 'hsl(0, 0%, 14%)' }}
                />
              </div>
              {openquery && (
                <div
                  className={styles.Dropdown}
                  style={{
                    height: '160px',
                    overflowY: 'scroll',
                    transition: 'height 1s ease-in-out',
                    border: 'red',
                  }}
                >
                  {searchList.map((item, i) =>
                    item.equity_symbol !== symbol ? (
                      <p
                        className="is-size-9 has-text-weight-medium has-text-grey mt-4"
                        // onClick={() => datatransfer(item)}
                        onClick={() => {
                          datatransfer(item)
                        }}
                        style={{ cursor: 'pointer' }}
                        key={i}
                      >
                        {item.equity_name}({item.equity_symbol})
                      </p>
                    ) : null
                  )}
                  {isLoading && <LoadingSection />}
                  {searchList.length === 0 && (
                    <p className="is-size-7 has-tw-bold is-sizei-7 has-text-centered has-text-gray mt-6">
                      No charts found
                    </p>
                  )}
                </div>
              )}
              {arraymode && (
                <div className="mt-2" style={{ display: 'flex' }}>
                  {selectedData.map((item, idx) => (
                    <motion.span
                      exit={{ opacity: 0 }}
                      layout
                      layoutId={item}
                      className={`tag is-warning ${idx > 0 ? 'ml-2' : ''} mt-3`}
                      key={idx}
                    >
                      {item}
                      <button
                        className="delete is-small"
                        // onClick={() =>
                        //   setSelectedData((prevData) => {
                        //     const newData = [...prevData]
                        //     newData.splice(idx, 1)
                        //     return newData
                        //   })
                        // }
                        onClick={()=>compareSearchReset(item)}
                      ></button>
                      {/* <button
                        className="delete is-small"
                        onClick={() => {
                          setSelectedData((prevData) => {
                            const newData = [...prevData]
                            newData.splice(idx, 1)
                            return newData
                          })
                          handleNew()
                        }}
                      ></button> */}
                    </motion.span>
                  ))}
                </div>
              )}
              <p className="is-size-9 has-text-weight-medium has-text-grey mt-4">
                Compare with Financial items
              </p>
              <div
                style={{
                  border: '2px solid #3e3a3a94',
                  borderRadius: '20px',
                  padding: '20px 25px',
                  // paddingLeft: '50px',
                  // paddingRight: '50px',
                }}
                className="mt-3"
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '25px',
                  }}
                >
                  <div>
                    <Dropdownnew
                      maxHeight="300px"
                      className={`${styles.dropDownWidth} is-warning`}
                      dataArr={bsItem}
                      onClick={handleTechnicalIndicatorcampare}
                      heading={'B/S Item'}
                    />
                  </div>
                  <div>
                    <Dropdownnew
                      maxHeight="300px"
                      className={`${styles.dropDownWidth} is-warning`}
                      dataArr={pnlItem}
                      onClick={handleOscillatorscampare}
                      heading={'PnL item'}
                    />
                  </div>
                  <div>
                    <Dropdownnew
                      maxHeight="300px"
                      className={`${styles.dropDownWidth} is-warning`}
                      dataArr={cfItem}
                      heading={'CF item'}
                      onClick={handleFlagscampare}
                    />
                  </div>
                  <div>
                    <Dropdownratio
                      maxHeight="300px"
                      className={`${styles.dropDownWidth} is-warning`}
                      dataArr={ratioitem}
                      onClick={handleRatiocampare}
                      heading={'Ratio item'}
                    />
                  </div>
                </div>
              </div>
              {/* {comparename !== '' &&  ( */}
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {comparename.map((item, idx) => (
                  <AnimatePresence mode="wait" key={idx}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <motion.span
                        exit={{ opacity: 0 }}
                        layout
                        className={`tag is-warning mt-4 mr-2`}
                      >
                        <span style={{ fontSize: '0.80rem' }}>
                          {' '}
                          {item?.displayValue} ({comapresymbol})
                        </span>

                        <button
                          className=" is-small ml-1"
                          onClick={() => handledeleteconfigcompare(item)}
                          style={{
                            width: '13px',
                            height: '13px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            borderRadius: '100%',
                          }}
                        >
                          <ImCross
                            style={{
                              fontSize: '8px',
                              marginLeft: '-3.1px',
                              marginBottom: '5px',
                            }}
                          />
                        </button>
                      </motion.span>
                    </div>
                  </AnimatePresence>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div className="mt-4 ">
                    <Button
                      className={`is-warning is-outlined`}
                      size="small"
                      disabled={comparename1.length === 0}
                      onClick={handleCompare}
                    >
                      Compare
                    </Button>
                  </div>
                  <div className="mt-4 ml-2">
                    <Button
                      className={`is-warning is-outlined`}
                      size="small"
                      disabled={comparename1.length === 0}
                      onClick={handleCompareReset}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
          {activeEconomicsComponent && (
            <>
              <div>
                <div className="is-size-9 has-text-weight-medium has-text-grey mt-4">
                  <p>Compare with Financial Items</p>
                </div>
                <div
                  style={{
                    marginBottom: '20px',
                    border: '2px solid #3e3a3a94',
                    borderRadius: '20px',
                    padding: '20px',
                    paddingLeft: '20px',
                    paddingRight: '60px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '25px',
                    justifyContent: 'center', // Center the grid horizontally
                    alignItems: 'center',
                  }}
                  className="mt-4"
                >
                  <div className="is-flex is-flex-direction-column is-gap">
                    <div>
                      <p className="is-size-7 has-text-grey mb-2">Country</p>

                      <Countrydropdown
                        value={countryCode}
                        controlKey="country_code"
                        onClick={(i) => {
                          setCountryCode(i.country_code)
                          router.push({
                            query: {
                              ...router.query,
                              country_code: i.country_code,
                            },
                          })
                        }}
                        dropdownAlign="left"
                        dataArr={countriesQuery.data!}
                        maxHeight="300px"
                      />
                    </div>
                    <div>
                      <p className="is-size-7 has-text-grey mb-2">Topic </p>
                      <Dropdown
                        value={topic}
                        controlKey="type"
                        onClick={(val) => setTopic(val.type)}
                        dropdownAlign="left"
                        //dataArr={sampleyear}
                        dataArr={indicatorTopicQuery.data!}
                        maxHeight="300px"
                      />
                    </div>
                    <div>
                      <p className="is-size-7 has-text-grey mb-2">Indicator </p>
                      <Dropdown
                        value={indicator}
                        controlKey="code"
                        onClick={(val) => setIndicator(val.code)}
                        dropdownAlign="left"
                        dataArr={indicatorListQuery.data!}
                        //dataArr={sampleyear}
                        maxHeight="300px"
                      />
                    </div>
                    {error && (
                      <p className="has-text-danger is-size-7 mt-3">{error}</p>
                    )}
                  </div>
                </div>
                <div
                  style={{ textAlign: 'right' }}
                  onClick={() => compareCountryBase()}
                >
                  <Button
                    size="small"
                    className={`is-warning is-outlined`}
                    disabled={!country_code}
                  >
                    Compare
                  </Button>
                </div>
              </div>
            </>
          )}
        </Modal>
      )}
    </>
  )
}

export default FinancialchartWrapper
