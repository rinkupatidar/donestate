import React, { useEffect } from 'react'
import styles from './index.module.scss'
import { useQuery } from '@tanstack/react-query'

import { addOpacityAnimation } from 'animation'
import { useRouter } from 'next/router'
import PrimaryLoader from 'components/Loader/PrimaryLoader'
import {
  AXIOS_INSTANCE,
  DEFAULT_TOPIC_CODE,
} from '../../../../../../../constants'
import axios from 'axios'
import Modalclose from 'components/Modal/Modal_without_close'
import dayjs from 'dayjs'
import { ImCross } from 'react-icons/im'
import Dropdownnew from 'components/Dropdown/Dropdownnew'
import { AnimatePresence, motion } from 'framer-motion'
import { AxisSetExtremesEventObject } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Dropdownratio from 'components/Dropdown/Dropdownratio'
import dynamic from 'next/dynamic'
import DropDownSelect from 'components/Dropdown/DropDownSelect'
import { useCallback, useMemo, useRef, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import Countrydropdown from '../chartIcon/countrysearch/dropdown'
import { GetChartResponseInterface } from 'service/DashboardService/DashboardServicesInterface'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
import { useImmer } from 'use-immer'
import debounce from 'lodash/debounce'
import { BLUE_DARK, GREEN, PINK_DARK, YELLOW } from 'highcharts-styling-config'
import {
  DisplayInterface,
  IndicatorsInterface,
  SocialSentimentDropdownDownInterface,
} from './chartTypes'
// import { SavedChartConfigInterface } from './SavedCharts/SavedChartTypes'
import { SavedChartConfigInterface } from '../../Chart/SavedCharts/SavedChartTypes'
import Modal from 'components/Modal/Modal'
import Button from 'components/Button/Button'
import Input from 'components/Input/Input'
import Dropdown from 'components/Dropdown/Dropdown'
import Chart from './Chart'

import {
  getAllCountries,
  getCountryDetail,
  getCountryWiseHistoricalValues,
  getIndicatorDetail,
  getIndicatorDetailsByTopic,
  getIndicatorTopics,
  getSearchChartTitles,
} from 'service/DashboardService/DashboardServices'
import ClickIngFinancials from './ClickIngFinancials'
import LoadingSection from 'components/Loader/LoadingSection'
import Icon from 'components/Icon/Icon'
import { BiErrorCircle } from 'react-icons/bi'
import { log } from 'console'
export interface ControlInterface {
  displayValue: string
  controlType:
    | 'symbol'
    | 'technical_indicator'
    | 'oscillator'
    | 'flag'
    | 'social_sentiment'
  type?: string
  title: string
  titleexiting: string
  metaData?: { [key: string]: any }
}
const BS_items3 = [
  { displayValue: 'Ratio Items', type: 'aroon' },
  { displayValue: 'Aroon oscillator', type: 'aroonoscillator' },
  { displayValue: 'ATR (Average True Range)', type: 'atr' },
  { displayValue: 'Awesome oscillator', type: 'ao' },

  { displayValue: 'CCI (Commodity Channel Index)', type: 'cci' },
  { displayValue: 'Chaikin', type: 'chaikin' },
  { displayValue: 'CMF (Chaikin Money Flow)', type: 'cmf' },
  { displayValue: 'Disparity Index', type: 'disparityindex' },
  { displayValue: 'CMO (Chande Momentum Oscillator)', type: 'cmo' },
  { displayValue: 'DMI (Directional Movement Index)', type: 'dmi' },
]

const ClickIngChartWrapper = ({
  exitingdata,
  createid,
  symbol,
  data,
  id,
  selectedValues,
  title,
  titleexiting,
  tabChange,
}) => {
  const chartRef = useRef<HighchartsReact.RefObject>(null)
  const containerRef = useRef(null)
  const [controlsLoaded, setControlsLoaded] = useState(false)
  const [animationKey, _animateOpacity] = useState(false)
  const [chartTitle, setChartTitle] = useState()
  // const [frequencyrange, setfrequencyrange] = useState("ANNUAL")
  const [chart_items, setControls] = useImmer<ControlInterface[]>([
    {
      displayValue: symbol,
      type: '',
      controlType: 'symbol',
    },
  ])
  

  // const frequencyrange= selectedValues.fillingType
  const [newchartrange, setnewchartrange] = useState()
  const [newchartra, setnewchartra] = useState()
  const [userChangeQ_A, setRangeselected] = useState(
    data?.chart_config?.chart_data_type || selectedValues.fillingType
  )

  // const userChangeQ_A = newchartra !== undefined ? newchartra : selectedValues.fillingType;
 

  useEffect(() => {
    const initialRange = calculateRange(userChangeQ_A)
    _setDataRange(initialRange)
  }, [userChangeQ_A])

  const calculateRange = (userChangeQ_A) => {
    const range = userChangeQ_A === 'ANNUAL' ? rangedata || 2 : rangedata || 8
    return range
  }

  const [display, setDisplay] = useState<DisplayInterface>({
    displayValue: 'Area',
    type: 'area',
  })
  const [frequency, setFrequency] = useState<IntervalTypes>('ONE_MINUTE')
  const [range, _setRange] = useState(1)
  // const [userChangeQ_A, setUserChangeQ_A] = useState("ANNUAL")
  // const [rangedata, _setDataRange] = useState('8')
  const [rangedata, _setDataRange] = useState(calculateRange(userChangeQ_A))

  const [fromDate, _setFromDate] = useState<Date>(new Date())
  const [toDate, _setToDate] = useState<Date>(new Date())
  const [openModal, setOpenModal] = useState(false)

  const [activeEquityComponent, setActiveEquityComponent] = useState(false)
  const [activeEconomicsComponent, setActiveEconomicsComponent] =
    useState(false)
  const [selectedData, setSelectedData] = useState([])
  const [newchartdata, setnewchartdata] = useState()
  const [newtitle, setnewtitle] = useState()
  const [popdata, setPopdata] = useState(false)
  const [checkmoreitem, setCheckmoreitem] = useState(false)
  const [sameitem, setSameitem] = useState('')

  const [arraymode, setArrayMode] = useState(true)
  const [openquery, setOpenQuery] = useState(false)
  const [search, setSearch] = useState('')
  const [countryCode, setCountryCode] = useState()
  const [indicator, setIndicator] = useState('')
  const [topic, setTopic] = useState(DEFAULT_TOPIC_CODE)
  const router = useRouter()
  const [tab, setTab] = useState('Chart')
  let { country_code } = router.query as Record<string, string>
  const [chartKey, setChartKey] = useState(0)
  let ChartId = router.query.chartId
  // const contriesQuery = useQuery(['countries'], () => getAllCountries())
  // const countriesQuery = useQuery(['countries'], () => getAllCountries(), {
  //   onSuccess: (data) => {
  //     setCountryCode(data[0].country_code)
  //   },
  // });

  const countriesQuery = useQuery(['countries'], () => getAllCountries(), {
    onSuccess: (data) => {
      if (!countryCode) {
        setCountryCode(data[0].country_code)
      }
    },
  })
  
  const [searchList, setSearchList] = useState([])
  const [compareOptionInEconomics, setCompareOptionInEconomics] = useState([])
  const [error, setError] = useState('')

  const [bsItem, setBsItem] = useState([])
  const [pnlItem, setPnlItem] = useState([])
  const [cfItem, setCfItem] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [receivedOpenChartData, setReceivedOpenChartData] = useState(null)
  const [deleteId, setDeleteId] = useState('')
  const [openModalData, setOpenModalData] = useState(false)
  const [chart_format, setchart_format] = useState('THOUSANDS')
  const [ratioitem, setfinancialitemratio] = useState([])
  const [ChartFormatRender, setChartFormatRender] = useState(false)
  const [successpopup, setsuccesspopup] = useState(false)
  const [chartDelete, setChartDelete] = useState(false)
  const [comapresymbol, setcomapresymbol] = useState()
  const [comapresymbol1, setcomapresymbol1] = useState(symbol)
  const [mergedData, setMergedData] = useState([]);
  const [arraymerge, setArraymerge] = useState([]);
  
  const [comparename, setcomparename] = useState([])
  const chartlength =(chart_items.length-1)
  
  const [comparename1, setcomparename1] = useState([])
  const [selectedTechnicalIndicatorValuenew, setSelectedTechnicalIndicatorcampare] = useState([]);
  const [selectedOscillatorcompare, setselectedOscillatorcompare] = useState([]);
  const [selectedFlagcompare, setselectedFlagcompare] = useState([]);
  const [selectedRatiocompare, setselectedRatiocompare] = useState([]);
  const [itemname, setitemname] = useState([])

  const onClickchart_format = (event: object) => {
    setChartFormatRender(true)
    setchart_format(event.value)
  }
  const ChartFormatReset = () => {
    setChartFormatRender(false)
  }


  const handelonRangeClick = (selectedValue) => {
    //  _setDataRange([]);

    _setDataRange(selectedValue?.value)
    setRange(selectedValue?.range)
    // console.log(selectedValue?.range, 'defualt');
  }

  const handelonRangeselect = (selected) => {
    _setDataRange()

    setRangeselected(selected.value)
    setOpenModalData(true)
  }

  const indicatorListQuery = useQuery(
    ['indicators', topic],
    () => getIndicatorDetailsByTopic(topic),
    {
      enabled: !!topic,
      onSuccess: (res) => {
        setIndicator(res[0].code);
        // if (!indicator) {
        //   setIndicator(res[0].code);
        // }
      },
    }
  );

  const indicatorTopicQuery = useQuery(
    ['indicator topics'],
    () => getIndicatorTopics(false),
    { onSuccess: (res) => { } }
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
    ['countries', country_code, indicator, userChangeQ_A],
    () => getCountryWiseHistoricalValues(country_code,indicator,userChangeQ_A),
    { enabled: !!country_code && !!indicator }
  )

  // const handledeleteconfig = (indexToRemove) => {
  //   // console.log(indexToRemove, 'indexToRemove-----------');
  //   setDeleteName(indexToRemove.item_id)

  //   const updatedControls = chart_items.filter(
  //     (item, index) => item.item_id !== indexToRemove.item_id
  //   )
  //   setControls(updatedControls)
   
  // }
  const handledeleteconfig = (data) => {
    setDeleteId(data)
    const updatedControls = chart_items.filter(
      (item, index) => item.item_id !== data.item_id || item.chart_item_symbol !== data.chart_item_symbol
    )
    setControls(updatedControls)
  }

  const handledeleteconfigcompare = (data) => {

  console.log(comparename1,'comparename1');
  
  
   
     
    const updatedControls = comparename1.filter(
        (item, index) => {
            console.log(item.displayValue, 'itemitemitem');
            return item?.displayValue !== data?.displayValue;
        }
    );
    
    setcomparename1(updatedControls);
    setSelectedTechnicalIndicatorcampare([]);
    setselectedOscillatorcompare([]);
    setselectedFlagcompare([]);
    setselectedRatiocompare([]);
    const arraynew = updatedControls
  
    
    const setSelectedStates = arraynew.map(item => {
      if (item.item_group === "BALANCE_SHEET") {
          return setSelectedTechnicalIndicatorcampare([item]);
      } else if (item.item_group === "CASH_FLOW") {
          return setselectedFlagcompare([item]);
      } else if (item.item_group === "PnL") {
          return setselectedOscillatorcompare([item]);
      } else if (item.item_group === "RATIO_ANALYSIS") {
          return setselectedRatiocompare([item]);
      }
  });
  

    const updatedControlNames = updatedControls.map(item => item);
    setcomparename(updatedControlNames);    
};

  const handleOpenChartData = (data) => {
    setControls([])
    setRangeselected([])
    _setDataRange([])
    setControls(data?.chart_config?.chart_items)
    setChartTitle(data?.title)
    setRangeselected(data?.chart_config?.chart_data_type)
    setchart_format(data?.chart_config?.chart_format)
    // console.log(data?.chart_config?.chart_data_type, 'open');
    // setchart_format(data?.chart_config?.chart_format)
    _setDataRange(data?.chart_config?.chart_range)
    setnewchartdata([])
    setOpenModalData(true)
  }

 

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
          item.chart_item_symbol === comapresymbol1  &&
          item.item_name === val.displayValue   
      )
      if (existingItem) {
        setCheckmoreitem(true)
      }
      if (comparename1.length !== null) {
        const lastItem = vcom?.displayValue

        const same = comparename1.find((item, index) => {
          // return item === lastItem
          return item?.displayValue === lastItem && item?.item_group === 'BALANCE_SHEET'
        })

        if (same) {
          setCheckmoreitem(true)
          setTimeout(() => {
            setCheckmoreitem(false)
          }, 1500)
        } 
        else {
              if (!existingItem) {
        const displayValue = val?.displayValue;
         //setSelectedTechnicalIndicatorcampare(val);
        const value =val;
        setSelectedTechnicalIndicatorcampare(prevValue => prevValue ? [...prevValue, value] : [value]);
        setcomparename((prevValue) => [...prevValue, value]);
        //setcomparename1(prevNames => [...prevNames, name]); 
        setcomparename1((prevValue) => [...prevValue, { ...value, item_group: 'BALANCE_SHEET' }]);
        }
        }
      }
      // if (!existingItem) {
      //   const displayValue = val?.displayValue;
      //    //setSelectedTechnicalIndicatorcampare(val);
      //   const value =val;
      //   setSelectedTechnicalIndicatorcampare(prevValue => prevValue ? [...prevValue, value] : [value]);
      //   setcomparename((prevValue) => [...prevValue, value]);
      //   setcomparename1(prevNames => [...prevNames, name]); 
      //   }
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
        item.chart_item_symbol === comapresymbol1  &&
        item.item_name === val.displayValue   
    )
    if (existingItem) {
      setCheckmoreitem(true)
    }

    if (comparename1.length !== null) {
      const lastItem = vcom?.displayValue

      const same = comparename1.find((item, index) => {
        //return item === lastItem
        return item?.displayValue === lastItem && item?.item_group === 'PnL'
      })

      if (same) {
        setCheckmoreitem(true)
        setTimeout(() => {
          setCheckmoreitem(false)
        }, 1500)
      } 
      else {
    if (!existingItem) {
      const displayValue = val?.displayValue
      const value = val
      setselectedOscillatorcompare((prevValue) =>
        prevValue ? [...prevValue, value] : [value]
      )
      setcomparename((prevValue) => [...prevValue, value]);
      // setcomparename1((prevNames) => [...prevNames, name])
      setcomparename1((prevValue) => [...prevValue, { ...value, item_group: 'PnL'  }]);
    }
      }
    }
  //   if (!existingItem) {
  // const displayValue = val?.displayValue;
  // const value =val;
  // setselectedOscillatorcompare(prevValue => prevValue ? [...prevValue, value] : [value]);
  // setcomparename((prevValue) => [...prevValue, value]);
  // setcomparename1(prevNames => [...prevNames, name]); 
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
        item.chart_item_symbol === comapresymbol1  &&
        item.item_name === val.displayValue   
    )
    if (existingItem) {
      setCheckmoreitem(true)
    }
    if (comparename1.length !== null) {
      const lastItem = vcom?.displayValue

      const same = comparename1.find((item, index) => {
        // return item === lastItem
        return item?.displayValue === lastItem && item?.item_group === 'CASH_FLOW'
      })

      if (same) {
        setCheckmoreitem(true)
        setTimeout(() => {
          setCheckmoreitem(false)
        }, 1500)
      } 
      else {
        if (!existingItem) {
          const displayValue = val?.displayValue;
           // setselectedFlagcompare(val);
           const value =val;
           setselectedFlagcompare(prevValue => prevValue ? [...prevValue, value] : [value]);
           setcomparename((prevValue) => [...prevValue, value]);
           //setcomparename1(prevNames => [...prevNames, name]); 
           setcomparename1((prevValue) => [...prevValue, {  ...value, item_group: 'CASH_FLOW' }]);
         }
      }
    }
  //   if (!existingItem) {
  //  const displayValue = val?.displayValue;
  //   // setselectedFlagcompare(val);
  //   const value =val;
  //   setselectedFlagcompare(prevValue => prevValue ? [...prevValue, value] : [value]);
  //   setcomparename((prevValue) => [...prevValue, value]);
  //   setcomparename1(prevNames => [...prevNames, name]); 
  // }
}
}
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
        item.chart_item_symbol === comapresymbol1  &&
        item.item_name === val.displayValue   
    )
    if (existingItem) {
      setCheckmoreitem(true)
    }

    if (comparename1.length !== null) {
      const lastItem = vcom?.displayValue

      const same = comparename1.find((item, index) => {
        //return item === lastItem
        return item?.displayValue === lastItem && item?.item_group === 'RATIO_ANALYSIS'
      })

      if (same) {
        setCheckmoreitem(true)
        setTimeout(() => {
          setCheckmoreitem(false)
        }, 1500)
      } 
      else {
        if (!existingItem) {
          const displayValue = val?.displayValue;
          // setselectedRatiocompare(val);
          const value =val;
          setselectedRatiocompare(prevValue => prevValue ? [...prevValue, value] : [value]);
          setcomparename((prevValue) => [...prevValue, value]);
          setcomparename1((prevValue) => [...prevValue, {  ...value, item_group: 'RATIO_ANALYSIS' }]);
        }
      }
    }


   
//     if (!existingItem) {
//   const displayValue = val?.displayValue;
//   // setselectedRatiocompare(val);
//   const value =val;
//   setselectedRatiocompare(prevValue => prevValue ? [...prevValue, value] : [value]);
//   setcomparename((prevValue) => [...prevValue, value]);
//   setcomparename1(prevNames => [...prevNames, name]); 
// }
}
}
const handleCompare = () => {
  setPopdata(false)
  let selectedCount = 0;

  // if (selectedTechnicalIndicatorValuenew) {
  //   handleTechnicalIndicatorClick(selectedTechnicalIndicatorValuenew);
  //   selectedCount++;
  // }
  if (selectedTechnicalIndicatorValuenew) {
    selectedTechnicalIndicatorValuenew.forEach(item => {
      handleTechnicalIndicatorClick(item);
      selectedCount++;
    });
  }

  if (selectedOscillatorcompare) {
    //handleOscillatorsClick(selectedOscillatorcompare);
    selectedOscillatorcompare.forEach(item => {
      handleOscillatorsClick(item);
    selectedCount++;
    })
  }
  if (selectedFlagcompare) {
    //handleFlagsClick(selectedFlagcompare);
    selectedFlagcompare.forEach(item => {
      handleFlagsClick(item);
    selectedCount++;
    })
  }
  if (selectedRatiocompare) {
    //handleRatioItemClick(selectedRatiocompare);
    selectedRatiocompare.forEach(item => {
      handleRatioItemClick(item);
    selectedCount++;
    })
  }

  if (selectedCount > 1) {
    setOpenModalData(true)
  }

  if (selectedTechnicalIndicatorValuenew || selectedOscillatorcompare || selectedFlagcompare || selectedRatiocompare) {
    setOpenModal(false);
    setSelectedData([]);
    setcomparename([]);
    setcomapresymbol('');
    setSelectedTechnicalIndicatorcampare([]);
    setselectedOscillatorcompare([]);
    setselectedFlagcompare([]);
    setselectedRatiocompare([]);
    setcomparename1([])
  }
}



const handleCompareReset =()=>{
  setPopdata(false)
  setcomparename1([])
  setSelectedData([]);
  setcomparename([]);
  setcomapresymbol('');
  setSelectedTechnicalIndicatorcampare([]);
  setselectedOscillatorcompare([]);
  setselectedFlagcompare([]);
  setselectedRatiocompare([]); 
}
const closeCompareModal=()=>{
  setError(false)
  setOpenModal(false)
  // setTopic(DEFAULT_TOPIC_CODE)
  setSelectedData([]);
  setcomparename([]);
  setcomapresymbol('');
  setSelectedTechnicalIndicatorcampare([]);
  setselectedOscillatorcompare([]);
  setselectedFlagcompare([]);
  setselectedRatiocompare([]);
}

  const handleFlagsClick = (val: any) => {
    setDisplay({ displayValue: 'OHLC', type: 'CASH_FLOW' })

    if (arraymerge.length > 3) {
      setPopdata(true)
    } else {
      setPopdata(false)
    }

    if (arraymerge.length < 4) {
      const existingItem = chart_items?.find(
        (item) =>
          item.item_group === 'CASH_FLOW' &&
          item.item_name === val.displayValue && 
          item.chart_item_symbol  === comapresymbol1
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
    else{
      setPopdata(true)
    }
  }
  const handleOscillatorsClick = (val: any) => {
    setDisplay({ displayValue: 'OHLC', type: 'PnL' })

    if (arraymerge.length > 3) {
      setPopdata(true)
    } else {
      setPopdata(false)
    }

    if (arraymerge.length < 4) {
      const existingItem = chart_items?.find(
        (item) =>
          item.item_group === 'PnL' &&
          item.item_name === val.displayValue && 
          item.chart_item_symbol  === comapresymbol1
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
    else{
      setPopdata(true)
    }
  }
  const handleTechnicalIndicatorClick = (val: any) => {
    setDisplay({ displayValue: 'OHLC', type: 'BALANCE_SHEET' })

    if (arraymerge.length > 3) {
      setPopdata(true)
    } else {
      setPopdata(false)
    }
 
    if (arraymerge.length < 4) {
      const existingItem = chart_items?.find(
        (item) =>
          item.item_group === 'BALANCE_SHEET' &&
          item.item_name === val.displayValue && 
          item.chart_item_symbol  === comapresymbol1
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
    else{
      setPopdata(true)
    }
  }

  const handleRatioItemClick = (val: any) => {
    setDisplay({ displayValue: 'OHLC', type: 'RATIO_ANALYSIS' })
    if (arraymerge.length > 3) {
      setPopdata(true)
    } else {
      setPopdata(false)
    }

     if (arraymerge.length <= 3) {
    if (arraymerge.length < 4) {
      const existingItem = chart_items?.find(
        (item) =>
          item.item_group === 'RATIO_ANALYSIS' && 
          item.item_name === val.label && 
          item.chart_item_symbol  === comapresymbol1
      )
      if (existingItem) {
        setSameitem(existingItem?.item_name)
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

  //   const isAnyOverlaySelected = useMemo(
  //     () =>
  //       !!controls.find(
  //         ({ controlType }) => controlType === 'technical_indicator'
  //       ),
  //     [controls.length]
  //   )
  //   const isAnyLowerChartSelected = useMemo(
  //     () => !!controls.find(({ controlType }) => controlType === 'oscillator'),
  //     [controls.length]
  //   )

  // const [controls, setControls] = useImmer<ControlInterface[]>([
  //     {
  //       displayValue: symbol,
  //       type: '',
  //       controlType: 'symbol',
  //     },
  //   ])
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

  const chartModelstatus = () => {
    setOpenModal(true)
    setActiveEquityComponent(true)
    setActiveEconomicsComponent(false)
  }
 
  const datatransfer = (item) => {
    if (selectedData.length < 4) {
      const uniqueData = new Set(selectedData)
      uniqueData.add(item.equity_symbol)
      setSelectedData(Array.from(uniqueData))
      setcomapresymbol(item.equity_symbol)
      setcomapresymbol1(item.equity_symbol)
      setSearch('')
      setArrayMode(true)
      setOpenQuery(false)
    } else {
      // console.log('Limit reached. Cannot add more items.');
      setSearch('')
      setcomapresymbol(item.equity_symbol)
      setcomapresymbol1(item.equity_symbol)
      setArrayMode(true)
      setOpenQuery(false)
    }
  }
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
          setIsLoading(false)
        }
      } else {
        setSearchList([])
      }
    }

    searchCompany()
  }, [search])
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
        symbol: symbol,
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
  const handleChartUpdateSuccess = (
    updatedChartProps,
    string,
    title,
    datatype
  ) => {
    setnewtitle(title)

    setnewchartdata(updatedChartProps)
    setnewchartrange(string)
    setChartKey((prevKey) => prevKey + 1)
    setReceivedOpenChartData([])
    setOpenModalData(true)
    // setControls([])exitingdata
  }
  const handleNewChartrange = (newChartrangeValue) => {
    setnewchartra(newChartrangeValue)
  }
  const debouncedLoadMoreData = debounce(loadMoreData, 200)
  useEffect(() => {
    const itemNames = chart_items.map(item => item.item_name).filter(name => name);
    setitemname(itemNames);
    setMergedData([])
    setcomparename1([])
    
  }, [chart_items]);

  // useEffect(() => {
  //   const mergedArray = [...itemname, ...comparename1,...compareOptionInEconomics].map((item, index) => ({
  //     ...item,
  //     index: index
  //   }));
    
  //   setMergedData(mergedArray);
  // }, [itemname,comparename1,compareOptionInEconomics]);

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
    getFinancialItems(),
      getFinancialItemspnl(),
      getFinancialItemscf(),
      getFinancialItemsratio()
  }, [])
  useEffect(() => {
    if (ChartId && exitingdata) {
      setControls([])
      setRangeselected([])
      _setDataRange([])
      setCompareOptionInEconomics([])
      setControls(exitingdata?.chart_config?.chart_items)
      setchart_format(exitingdata?.chart_config?.chart_format)
      setChartTitle(exitingdata?.title)
      setRangeselected(exitingdata?.chart_config?.chart_data_type)
      // console.log(datexitingdataa?.chart_config?.chart_data_type,'open');
      setCompareOptionInEconomics(exitingdata?.chart_config?.compareOptionInEconomics)
      _setDataRange(exitingdata?.chart_config?.chart_range)
      setnewchartdata([])
      setOpenModalData(true)
    }
  }, [ChartId])
  useEffect(() => {}, [newchartrange])
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
      console.error('response', response.data)
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
      setCfItem(formattedFinancialData)
    } catch (error) {
      console.error('Error fetching search results:', error)
    }
  }
  const handleDelete = () => {
    setDeleteId('')
  }
  const handleOpen = () => {
    setOpenModalData(false)
  }

  const chartDeleteResetState = () => {
    setChartDelete(false)
  }
  const handleDeleteChart = async (id: String) => {
    console.log("idididididid", id)
    const token = localStorage.getItem('token')
    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }
    const url = new URL(location.href);

    try {
      const response = await axios.delete(`https://api.donestat.co/rest/v1/deleteChart?chart_id=${id}`, { headers })
      console.log("response ", response)
      if (response.status === 200) {
        if (url.searchParams.has("titles") || url.searchParams.has("openChartId") || url.searchParams.has("ChartTitle") || url.searchParams.has("chartId")) {
          console.log("url check ")
          url.searchParams.delete("titles");
          url.searchParams.delete("openChartId");
          url.searchParams.delete("ChartTitle");
          url.searchParams.delete("chartId");
        }
        router.push(url, undefined, { scroll: false });
        setsuccesspopup(true)
        setTimeout(() => {
          setsuccesspopup(false);
        }, 1500);
        setControls([{
          displayValue: symbol,
          type: '',
          controlType: 'symbol',
        }])
        setChartDelete(true)
      }

    } catch (error) {

    }
  }

  const tabChangeDataTrandferToParent =(condition)=>{
    tabChange(condition)
  }
  const compareCountryBase = () => {
    for (let option of compareOptionInEconomics) {
      console.log(option)
      if (
        option.countryCode === countryCode &&
        option.indicator === indicator
        ) {
          setError('This option is already selected')
        return
      } else {
        setError("")
      }
    }
    const indicatorObj = indicatorListQuery.data?.find((i) => i.code === indicator);
    const newCompareOption = {
      countryCode,
      indicator,
      indicatorName: indicatorObj?.indicator_short_name || indicatorObj?.indicator_name,
      data_type:"ECONOMICS",
      valueData: countryWiseHisToricalValuesQuery.data
    };
    setCompareOptionInEconomics(prevOptions => [...prevOptions, newCompareOption]);
    setCountryCode(countriesQuery.data[0].country_code)
    setTopic(DEFAULT_TOPIC_CODE)
    setOpenModal(false)


    // closeModalCompare()
  };

  const compareSearchReset=(data:any)=>{
    console.log("data",data)
    setSelectedData([])
    setSelectedTechnicalIndicatorcampare([]);
    setselectedOscillatorcompare([]);
    setselectedFlagcompare([]);
    setselectedRatiocompare([]);
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
                <Button onClick={() => setCheckmoreitem(false)}>Cancel</Button>
                
              </div> */}
            </div>
          </Modal>
        )}

        <ClickIngFinancials
          economiccampare={arraymerge}
          onClickchart_format={onClickchart_format}
          exitingdata={exitingdata}
          userChangeQ_A={userChangeQ_A}
          chart_format={chart_format}
          createid={createid}
          datalistbs={bsItem}
          datalistpnl={pnlItem}
          datalistcf={cfItem}
          ratioitem={ratioitem}
          loadChartConfig={loadChartConfig}
          onChartUpdateSuccess={handleChartUpdateSuccess}
          onChartUpdaterange={handleNewChartrange}
          title={title}
          onReceiveOpenChartData={handleOpenChartData}
          // onLoad={() => setControlsLoaded(true)}
          toDate={toDate}
          fromDate={fromDate}
          setToDate={setToDate}
          setFromDate={setFromDate}
          rangedata={rangedata}
          // frequency={frequency}
          // display={display}
          // isAnyOverlaySelected={isAnyOverlaySelected}
          // isAnyLowerChartSelected={isAnyLowerChartSelected}
          //onFlagClick={handleFlagsClick}
          // restoreDefaults={restoreDefaults}
          // onDisplayClick={setDisplay}
          // onRangeClick={(val) => setRange(val.range)}
          onRangeClick={handelonRangeClick}
          selectRangeAnnual_Qu={handelonRangeselect}
          // onTechnicalIndicatorClick={handleTechnicalIndicatorClick}
          // onOscillatorsClick={handleOscillatorsClick}
          // onFrequencyClick={handleFrequency}
          chartModelstatus={chartModelstatus}
          // onLoad={() => setControlsLoaded(true)}
          // controls={controls}

          // range={range}
          // frequency={frequency}

          config={{
            chart_items,
            compareOptionInEconomics
          }}
          chart_type="FINANCIAL"
          symbol={symbol}
          // display={display}
          // isAnyOverlaySelected={isAnyOverlaySelected}
          // isAnyLowerChartSelected={isAnyLowerChartSelected}
          onFlagClick={handleFlagsClick}
          // restoreDefaults={restoreDefaults}
          selectedValues={selectedValues}
          // onDisplayClick={setDisplay}
          // onRangeClick={(val) => setRange(val.range)}
          onTechnicalIndicatorClick={handleTechnicalIndicatorClick}
          onOscillatorsClick={handleOscillatorsClick}
          onRatioitemClick={handleRatioItemClick}
          handleDeleteChart={handleDeleteChart}
        />
        {/* </div> */}

        {/* <div
                        className={`${styles.right} `}
                    >
                        <FinancialsSaveChart />

                    </div> */}
        {/* </div> */}
        <div className="tags mb-0"></div>
        <div id="chart" style={{background: '#0a0a0a'}}>
        <AnimatePresence mode="wait">
          <motion.div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              {chart_items?.length > 1
                ? chart_items
                    ?.filter((item, i) => i !== 0)
                    .map((item, i) => (
                      <span
                        className="tag is-warning mt-3"
                        key={i}
                        style={{
                          background: 'transparent',
                          color: '#ffff',
                        }}
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
                          {item?.item_name}({item?.chart_item_symbol})
                        </span>
                        {/* <button
                          className="delete is-small"
                          onClick={() => handledeleteconfig(item)}
                        ></button> */}
                        <button
                          className=" is-small ml-1"
                          onClick={() => handledeleteconfig(item)}
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
                    ))
                : null}
            </div>
            {/* <div className="tags mb-0 mt-5"> */}
            {/* <AnimatePresence>
              {compareOptionInEconomics && compareOptionInEconomics.map(
                (item, idx) =>
                (
                  <motion.span
                    exit={{ opacity: 0 }}
                    layout
                    layoutId={item.countryCode + item.indicator}
                    className="tag is-warning"
                    key={item.countryCode + item.indicator}
                  >
                    <b className="mr-1">{item.countryCode}</b> -{' '}
                    {item.indicatorName}
                    <button
                      className="delete is-small"
                      onClick={() =>
                        setCompareOptionInEconomics((val) => {
                          const updatedState = [...val]
                          updatedState.splice(idx, 1)
                          return updatedState
                        })
                      }
                    ></button>
                  </motion.span>

                )
              )}
            </AnimatePresence> */}
            
          {/* </div> */}
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
                      chartlength+i === 0
                          ? BLUE_DARK
                          : chartlength+i === 1
                          ? GREEN
                          : chartlength+i === 2
                          ? PINK_DARK
                          : chartlength+i === 3
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
                        chartlength+i === 0
                        ? BLUE_DARK
                        : chartlength+i === 1
                        ? GREEN
                        : chartlength+i === 2
                        ? PINK_DARK
                        : chartlength+i === 3
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
            <Chart
             chartDelete={chartDelete}
             tabChangeDataTrandferToParent={tabChangeDataTrandferToParent}
             chartDeleteResetState={chartDeleteResetState}
             chart_format={chart_format}
             ChartFormatRender={ChartFormatRender}
             ChartFormatReset={ChartFormatReset}
              userChangeQ_A={userChangeQ_A}
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
              chart_range={rangedata}
              // newchart={newchartdata}
              // newdatatype={newchartrange}
              // newtitle={newtitle}
              chartTitleopen={chartTitle}
              key={chartKey}
              titleexiting={titleexiting}
              openchart={receivedOpenChartData}
              // item_name={data}
              chart_items={chart_items}
              compareOptionInEconomics={compareOptionInEconomics}
              // item_group={selectedValues.statementType}
              filling={selectedValues.fillingType}
              // item_id={id}
              symbol={symbol}
              deleteId={deleteId}
              handleDelete={handleDelete}
              openNew={openModalData}
              setOpenNew={handleOpen}

              // setOpenNew={()=>{setOpenModal(false)}}
              setDateTime={({ start_date, end_date }) => {
                // console.log("start_datestart_date",dayjs(start_date[0]).format('YYYY-'));
                // console.log("end_dateend_date",end_date);
                if (start_date && start_date[0] && end_date && end_date[0]) {
                  setFromDate(new Date(start_date[0]))
                  // _setFromDate(dayjs(start_date[0]).format('D MMM, YYYY'));
                  setToDate(new Date(end_date[0]))
                }

                // _setFromDate(dayjs(end_date))
                // _setToDate(dayjs(start_date))
              }}
              // setDeleteName={setDeletseName}
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
          {/* {activeEquityComponent && (
            <>
              <div className="mt-5">
                <Input
                  cSize="small"
                  placeholder="Search Stock"
                  onChange={handleSearch}
                  value={search}
                />
              </div>
              {openquery && (
                <div
                  className={styles.Dropdown}
                  style={{
                    height: '160px',
                    overflowY: 'scroll',
                    transition: 'height 1s ease-in-out',
                  }}
                 
                >
                 
                  {searchList.map((item, i) =>
                    item.equity_symbol !== symbol ? (
                      <p
                        className="is-size-9 has-text-weight-medium has-text-grey mt-4"
                        onClick={() => datatransfer(item)}
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
                <div>
                  <AnimatePresence>
                    {selectedData.map((item, idx) => (
                      <motion.span
                        exit={{ opacity: 0 }}
                        layout
                        layoutId={item}
                        className={`tag is-warning ${
                          idx > 0 ? 'ml-2' : ''
                        } mt-3`}
                        key={idx}
                      >
                        {item}
                        <button
                          className="delete is-small"
                          onClick={() =>
                            setSelectedData((prevData) => {
                              const newData = [...prevData]
                              newData.splice(idx, 1)
                              return newData
                            })
                          }
                        ></button>
                      </motion.span>
                    ))}
                  </AnimatePresence>
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
                    // justifyContent: "center",
                    // alignItems: "center",
                  }}
                >
                  <div>
                  <Dropdownnew dataArr={bsItem} maxHeight="300px" className={`${styles.dropDownWidth} is-warning`} heading={'B/S Item'}
                     onClick={handleTechnicalIndicatorClick} />
                  </div>
                  <div>
                   
                    <Dropdownnew 
                    dataArr={pnlItem} 
                    maxHeight="300px" className={`${styles.dropDownWidth} is-warning`} heading={'PnL Item'} 
                     onClick={handleOscillatorsClick}/>
                  </div>
                  <div>
                   
                    <Dropdownnew dataArr={cfItem} maxHeight="300px" className={`${styles.dropDownWidth} is-warning`} heading={'CF Item'} 
                     onClick={handleFlagsClick}/>
                     
                  </div>
                  <div>
                    <Dropdownratio
              maxHeight="300px" className={`${styles.dropDownWidth} is-warning`}
              dataArr={ratioitem}
               onClick={handleRatioItemClick}
              heading={'Ratio item'}
              // rangeselect={rangeselect}
            />
                  </div>
                
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                
                <div className="mt-4 ">
                  <Button
                    className={`is-warning is-outlined`}
                    size="small"
                    disabled={selectedData.length !== 4}
                  >
                    Compare
                  </Button>
                </div>
                <div className="mt-4 ml-2">
                  <Button
                    className={`is-warning is-outlined`}
                    size="small"
                    disabled={selectedData.length !== 4}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </>
          )} */}
              {activeEquityComponent && (
            <>
              <div className="mt-5">
                <Input
                  cSize="small"
                  placeholder="Search Stock"
                  onChange={handleSearch}
                  value={search}
                  disabled={selectedData.length > 0}
                  style={{backgroundColor:'hsl(0, 0%, 14%)'}}
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
                    justifyContent: 'center',
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
                          setCountryCode(i.country_code);
                          router.push({
                            query: {
                              ...router.query,
                              country_code: i.country_code,
                            },
                          });
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
                    {error && <p className="has-text-danger is-size-7 mt-3">{error}</p>}

                  </div>
                </div>
                <div style={{ textAlign: 'right' }} onClick={() => compareCountryBase()}>
                  <Button size="small" className={`is-warning is-outlined`} 
                  // disabled={!country_code}
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

export default ClickIngChartWrapper
