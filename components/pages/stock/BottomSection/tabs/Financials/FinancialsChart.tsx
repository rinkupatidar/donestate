import dayjs from 'dayjs'
import { useMutation } from '@tanstack/react-query'
import { uploadChartImage } from 'service/DashboardService/DashboardServices'
import { useRef, useState } from 'react'
import Modal from 'components/Modal/Modal'
import Modalclose from 'components/Modal/Modal_without_close'
import { motion } from 'framer-motion'
import ReactDatePicker from 'react-datepicker'
import { BsShareFill } from 'react-icons/bs'
import CreateChartModal from '../Chart/SavedCharts/CreateChartModal'
import { BiDownload } from 'react-icons/bi'
import { MdDeleteOutline } from 'react-icons/md'
import {
  getSearchChartTitles,
  getopenChart,
} from 'service/DashboardService/DashboardServices'
import debounce from 'lodash/debounce'
import { AiOutlineEdit } from 'react-icons/ai'
import Dropdownnew from 'components/Dropdown/Dropdownnew'
import { BsArrowRightShort } from 'react-icons/bs'
import {
  CHARTS_BOTTOM_BUTTONS_WRAPPER_ID,
  CHARTS_CACHE_KEY,
  DEFAULT_DATE_PICKER_OPTIONS,
  DIVIDENDS_DISPLAY_VALUE,
  EARNINGS_DISPLAY_VALUE,
  SPLITS_DISPLAY_VALUE,
  AXIOS_INSTANCE,
} from '../../../../../../constants'
import LoadingSection from 'components/Loader/LoadingSection'
import { BiSave } from 'react-icons/bi'
import { FaPlus, FaSearch, FaTimes } from 'react-icons/fa'
import useFetch from '../../../../../../hooks/useFetch'
import Button from '../../../../../Button/Button'
import Dropdown from '../../../../../Dropdown/Dropdown'
import HoriSelectList from '../../../../../HoriSelectList/HoriSelectList'
import HoriSelectListFinancial from 'components/HoriSelectList/HoriSelectListFinancial'
import Icon from '../../../../../Icon/Icon'
import Input from '../../../../../Input/Input'
import {
  DisplayInterface,
  IndicatorsInterface,
  SocialSentimentDropdownDownInterface,
} from '../Chart/chartTypes'
import styles from './index.module.scss'
import React, { useEffect } from 'react'
import { GetChartResponseInterface } from 'service/DashboardService/DashboardServicesInterface'
import { IoOpenOutline } from 'react-icons/io5'
import DropDownSelect from 'components/Dropdown/DropDownSelect'
import { useRouter } from 'next/router'
import axios from 'axios'
import Dropdownratio from 'components/Dropdown/Dropdownratio'
import html2canvas from 'html2canvas'
import ShareChart from './ShareChartsFinancial/ShareChart'

// interface FinancialChartProps {
//   symbol: string
//   disableSavedCharts?: boolean
//   config?: GetChartResponseInterface
// }
const jsonQuater = [
  { displayValue: '8Q', range: 365 * 2, value: 8 },
  { displayValue: '16Q', range: 365 * 4, value: 16 },
  { displayValue: '32Q', range: 365 * 8, value: 32 },
  { displayValue: '40Q', range: 365 * 10, value: 40 },
  { displayValue: '60Q', range: 365 * 15, value: 60 },
  { displayValue: '80Q', range: 365 * 20, value: 80 },
  { displayValue: 'All', range: 1, value: 1 },
]
const jsonAnnual = [
  { displayValue: '2Y', range: 365 * 2, value: 2 },
  { displayValue: '4Y', range: 365 * 4, value: 4 },
  { displayValue: '8Y', range: 365 * 8, value: 8 },
  { displayValue: '10Y', range: 365 * 10, value: 10 },
  { displayValue: '15Y', range: 365 * 15, value: 15 },
  { displayValue: '20Y', range: 365 * 20, value: 20 },
  { displayValue: 'All', range: 1, value: 1 },
]
// const frequencyData = [
//   { displayValue: 'chart1', type: 'chart1' },
//   { displayValue: 'chart2', type: 'chart2' },
// ]

// const displayData: DisplayInterface[] = [
//     { displayValue: 'Annual', type: 'annual' },
//     { displayValue: 'Quarterly', type: 'quarterly' },
//   ]
const displayData = [
  { displayValue: 'Quarterly', value: 'QUARTER' },
  { displayValue: 'Annually', value: 'ANNUAL' },
]
const displayData1 = [
  { displayValue: 'Thousands', value: 'THOUSANDS' },
  { displayValue: 'Million', value: 'MILLION' },
  { displayValue: 'Billion', value: 'BILLION' },
]

interface FinancialChartProps {
  onTechnicalIndicatorClick: (val: any) => void
  onOscillatorsClick: (val: any) => void
  onRangeClick: (val: any) => void
  selectRangeAnnual_Qu: (val: any) => void
  onFrequencyClick: (val: any) => void
  onDisplayClick: (val: any) => void
  onNewSymbolClick: (val: any) => void
  onFlagClick: (val: any) => void
  onRatioitemClick: (val: any) => void
  restoreDefaults: () => void
  isAnyLowerChartSelected: boolean
  isAnyOverlaySelected: boolean
  display: DisplayInterface
  // frequency1: string
  // frequency: string
  range: number
  rangedata: number
  onLoad: () => void
  toDate: Date
  fromDate: Date
  setFromDate: (val: Date) => void
  setToDate: (val: Date) => void
  chartModelstatus: (val: any) => void
  symbol: string
  disableSavedCharts?: boolean
  config?: GetChartResponseInterface
  ppppp: (val: string) => void
  rangeselect: string
  chart_format: string
  sendDataToParent: () => void
  setButtondata: () => void
  receivedOpenChartData: {}
  updateCall
  safedata: {}
  rangedata1
  onRangeSelection: (val: any) => void
  bsItem
  pnlItem
  cfItem
  ratioitem
  chartTitleName: string
  chartIdInUpdate: string
  saveButtonStateReset: (val: any) => void
  onClickchart_format: (val: any) => void
  handleDeleteChart: (val: any) => void
  economiccampare: string
}
// export interface ControlInterface {
//   displayValue: string
//   controlType:
//     | 'symbol'
//     | 'technical_indicator'
//     | 'oscillator'
//     | 'flag'
//     | 'social_sentiment'
//   type?: string
//   metaData?: { [key: string]: any }
// }

const FinancialChart = ({
  onReceiveOpenChartData,
  onLoad,
  onTechnicalIndicatorClick,
  onRangeClick,
  selectRangeAnnual_Qu,
  onFrequencyClick,
  onDisplayClick,
  onNewSymbolClick,
  restoreDefaults,
  onOscillatorsClick,
  onFlagClick,
  onRatioitemClick,
  // isAnyOverlaySelected,
  // isAnyLowerChartSelected,
  // display,
  // frequency1,
  // frequency,
  rangedata,
  // range,
  fromDate,
  economiccampare,
  toDate,
  setFromDate,
  setToDate,
  chartModelstatus,
  config,
  symbol,
  ppppp,
  rangeselect,
  sendDataToParent,
  setButtondata,
  receivedOpenChartData,
  updateCall,
  safedata,
  rangedata1,
  onRangeSelection,
  bsItem,
  pnlItem,
  cfItem,
  ratioitem,
  chartTitleName,
  chartIdInUpdate,
  saveButtonStateReset,
  chart_format,
  onClickchart_format,
  handleDeleteChart,
}: FinancialChartProps) => {
  const [successpopup, setsuccesspopup] = useState(false)
  const [successcreatepopup, setsuccesscreatepopup] = useState(false)
  const [isCreateChartModalOpen, setIsCreateChartModalOpen] = useState(false)
  const [financialitem, setfinancialitem] = useState()
  const [financialitempnl, setfinancialitempnl] = useState()
  const [financialitemcf, setfinancialitemcf] = useState()
  const [existingModalOpen, setExistingModalOpen] = useState(false)
  const [financialitemratio, setfinancialitemratio] = useState()
  const [showSearchListData, setShowSearchListData] = useState(false)
  const [search, setSearch] = useState('')
  const [searchList, setSearchList] = useState([])
  const [openchart, setopenChart] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef()
  const [page, setPage] = useState(1)
  // const [financialitem, setfinancialitem] = useState()
  const [defaultSelectedBSItem, setDefaultSelectedBSItem] = useState()
  const [defaultSelectedPnLItem, setDefaultSelectedPnLItem] = useState()
  const [defaultSelectedCFItem, setDefaultSelectedCFItem] = useState()
  const [confirmationDeleteModal, setConfirmationDeleteModal] = useState(false)
  const [pnlHeading, setPnlHeading] = useState('PnL items')
  const [CFHeading, setCFHeading] = useState('CF items')
  const [currentDay, setcurrentDay] = useState<string>("");
  
  const router = useRouter()
  const title = router.query.titles
  const ChartTitle = router.query.ChartTitle
  const [imageData, setImgLink] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Function to update the modal state in FinancialChart
  const handleModalStateChange = (isOpen) => {
 
    setIsModalOpen(isOpen)
    handleCapture()
  }
  const handleCapture = async () => {
    try {
      const targetDiv = document.getElementById('chart')

      if (!targetDiv) {
        console.error('Target div not found.')
        return
      }

      setImgLink(targetDiv)
    } catch (error) {
      console.error('Error capturing screenshot:', error)
    }
  }

  const handleSuccess = (data) => {
    if (data === true) {
      setsuccesscreatepopup(true)
      setTimeout(() => {
        setsuccesscreatepopup(false)
      }, 1500)
    }
  }

  const handleButtonClick = () => {
    // ... (your button click logic)

    // Update the buttondata state in the parent component
    setButtondata(false) // Set it to the desired value
  }
  // useEffect(() => {
  //   if (userChangeQ_A) {
  //     setRangeselect(userChangeQ_A)
  //   }

  // }, [userChangeQ_A])
  const handleSearch = (e) => {
    const inputValue = e.target.value.trim()

    setSearch(e.target.value)
    if (inputValue) {
      setShowSearchListData(true)
    } else {
      setShowSearchListData(false)
    }
  }
  // const selectRangeAnnual_Qu = (e) => {

  //   onRangeSelection(e.value);

  //    setRangeselect(e.value)
  //   // ppppp(e.value)
  // }
  // const handleScroll = () => {
  //   // const container = document.getElementById('your-container-id');
  //   const container = containerRef.current
  //   if (container) {
  //     const { scrollTop, clientHeight, scrollHeight } = container

  //     if (scrollTop + clientHeight >= scrollHeight - 20) {
  //       setIsLoading(true)
  //       debouncedLoadMoreData()
  //     }
  //   }
  // }
  const handleScroll = () => {
    // const container = document.getElementById('your-container-id');
    const container = containerRef.current
    if (search) {
      if (container) {
        const { scrollTop, clientHeight, scrollHeight } = container

        if (scrollTop + clientHeight >= scrollHeight - 20) {
          setIsLoading(true)
          debouncedLoadMoreData()
        }
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

  const debouncedLoadMoreData = debounce(loadMoreData, 200)

  const openChartid = async (chartId) => {
    const url = new URL(location.href)
    if (url.searchParams.has('titles')) {
      url.searchParams.delete('titles')
    }

    try {
      if (chartId) {
        const openChartData = await getopenChart({
          chart_id: chartId,
        })

        // onReceiveOpenChartData("");
        setopenChart(openChartData)
        onReceiveOpenChartData(openChartData)
        setExistingModalOpen(false)

        // This is the existing URL instance, don't create a new one
        url.searchParams.set('openChartId', openChartData.chart_id)
        url.searchParams.set('ChartTitle', openChartData.title);
        router.push(url, undefined, { scroll: false });
      } else {
        setopenChart([])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    // getFinancialItems(),
    // getFinancialItemspnl(),
    // getFinancialItemscf(),
    getFinancialItemsratio()
    const fetchData = async () => {
      try {
        if (search) {
          const searchDataList = await getSearchChartTitles({
            symbol: symbol,
            search_text: search,
            chart_type: 'FINANCIAL',
            page: 1,
          })
          setSearchList(searchDataList)
        } else {
          setSearchList([])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
    return () => {
      setSearchList([])
    }
  }, [search])
  // const handleClicklist = () => {
  //   handleButtonClick();
  //   setExistingModalOpen(true)
  // }

  useEffect(() => {
    const updateTime = () => {
      const currentDate = new Date();
  
      // Format current date
      const date = currentDate.getUTCDate();
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = monthNames[currentDate.getUTCMonth()];
      const year = currentDate.getUTCFullYear();
  
      const timeFormatted = `${date}${getDaySuffix(date)} ${month} ${year}`;
  
      // Format current time
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();
      const time = `${hours}:${minutes}:${seconds}`;
      setcurrentDay(`${timeFormatted} ${time}`);
    };
  
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  const getDaySuffix = (day: number) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  const handleClicklist = async () => {
    const token = localStorage.getItem('token')
    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }

    try {
      const response = await axios.get(
        `https://api.donestat.co/rest/v1/getChartTitles?symbol=${symbol}&chart_type=FINANCIAL&page_no=1`,
        { headers }
      )
      if (response.status === 200) {
        handleButtonClick()
        setExistingModalOpen(true)
        setShowSearchListData(true)
        setSearchList(response.data.slice(0, 10))
      }
    } catch (error) {}
  }
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
      setfinancialitem(formattedFinancialData)
      // setDefaultSelectedBSItem(formattedFinancialData[0])
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

      setfinancialitempnl(formattedFinancialData)
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

      setfinancialitemcf(formattedFinancialData)
    } catch (error) {
      console.error('Error fetching search results:', error)
    }
  }
  const bsitem = (data) => {
    let filterData = data.controls.find((item) => {
      return item.controlType === 'BALANCE_SHEET'
    })
    setDefaultSelectedBSItem(filterData)
  }

  const [dataFromChild, setDataFromChild] = useState({})

  const handleDataFromFinance = (data) => {
    setDataFromChild(data)
  }

  const sendData = () => {
    sendDataToParent(dataFromChild)
  }

  useEffect(() => {
    if (Object.keys(dataFromChild).length > 0) {
      sendData()
    }
  }, [dataFromChild])

  const saveAndUpate = async () => {
    if (chartIdInUpdate) {
      const data = {
        title: chartTitleName,
        symbol: symbol,
        chart_id: chartIdInUpdate,
        chart_type: 'FINANCIAL',
        chart_config: {
          chart_data_type: rangeselect,
          chart_range: config.rangedata,
          chart_format: chart_format,
          chart_items: config.chart_items,
          compareOptionInEconomics:config?.compareOptionInEconomics
        },
      }
      const token = localStorage.getItem('token')
      const headers = {
        X_AUTH_TOKEN: token,
        'Content-Type': 'application/json',
      }
      try {
        const response = await AXIOS_INSTANCE.post('updateChart', data, {
          headers,
        })
        if (response.status === 200) {
          // updateCall(val)
          saveButtonStateReset('saveButtonClick')
          setsuccesspopup(true)
          setTimeout(() => {
            setsuccesspopup(false)
          }, 1500)
        }
      } catch (error) {
        console.error('error', error)
      }
    }
  }

  const openDeleteModal = () => {
    setConfirmationDeleteModal(true)
  }
  const downLoad = async () => {
    // chartNameTitle chart-container
    try {
      //const targetDiv = document.getElementById('chart-container');
      const targetDiv = document.getElementById('chart')

      if (!targetDiv) {
        console.error('Target div not found.')
        return
      }

      const canvas = await html2canvas(targetDiv, {
        async: true,
        logging: true,
      })

      // Convert the canvas to a Blob
      canvas.toBlob((blob) => {
        // Create a download link
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `${title || ChartTitle}-${currentDay || 'CurrentDay'}.png`
        const dataURL = canvas.toDataURL('image/png')
        // console.log(dataURL, 'dataURLllllll')

        // setImageData(dataURL);

        // Trigger a click on the link to start the download
        link.click()

        // Clean up
        URL.revokeObjectURL(link.href)
      }, 'image/png')
    } catch (error) {
      console.error('Error capturing screenshot:', error)
    }
  }

  return (
    <>
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
              <HoriSelectListFinancial
                // value={range}
                value={rangedata1}
                onClick={onRangeClick}
                // dataArr={rangeselect === 'annual' ? rangeData : rangeData1}
                dataArr={rangeselect === 'ANNUAL' ? jsonAnnual : jsonQuater}
                controlKey="range"
              />
            </div>
          </div>
          <div className="is-flex " style={{ gap: '1.5rem' }}>
            <div
              className="is-flex is-justify-content-space-between"
              style={{ marginTop: '1.7rem' }}
            >
              <div>
                <div
                  className="is-flex is-gap"
                  id={CHARTS_BOTTOM_BUTTONS_WRAPPER_ID}
                  //   ref={() => onLoad()}
                >
                  <Button
                    size="small"
                    className="is-warning is-outlined"
                    onClick={handleClicklist}
                    style={{ padding: '7px' }}
                  >
                    <Icon>
                      <IoOpenOutline />
                    </Icon>
                    <span>Open</span>
                  </Button>
                  {existingModalOpen && (
                    <Modal close={() => setExistingModalOpen(false)}>
                      <p className="is-size-5 mb-3">Search Title</p>

                      <Input
                        placeholder="Search Chart Title"
                        cSize="small"
                        label="Search Title"
                        value={search}
                        onChange={handleSearch}
                        // error={errors.title}
                      />
                      {showSearchListData && (
                        <div
                          // className={styles.Dropdown}
                          style={{
                            height: '160px',
                            overflowY: 'scroll',
                            transition: 'height 1s ease-in-out',
                            border: 'red',
                          }}
                          ref={containerRef}
                          onScroll={handleScroll}
                        >
                          {searchList.map((item, i) => (
                            <p
                              className="is-size-9 has-text-weight-medium has-text-grey mt-4"
                              style={{ cursor: 'pointer' }}
                              key={item[0]}
                              onClick={() => openChartid(item[0])}
                            >
                              {item[2]}
                            </p>
                          ))}
                          {isLoading && <LoadingSection />}
                          {searchList.length === 0 && (
                            <p className="is-size-7 has-tw-bold is-sizei-7 has-text-centered has-text-gray mt-6">
                              No charts found
                            </p>
                          )}
                        </div>
                      )}
                      <div className="is-flex is-justify-content-flex-end"></div>
                    </Modal>
                  )}
                  <Button
                    size="small"
                    className="is-warning is-outlined"
                    onClick={() => setIsCreateChartModalOpen(true)}
                    style={{ padding: '7px' }}
                    // disabled={title || ChartTitle ? true : false}
                    disabled={
                      config.chart_items.length === 1 || title || ChartTitle
                    }
                  >
                    <Icon>
                      <BiSave />
                    </Icon>
                    <span>Save </span>
                  </Button>
                  {
                    <Button
                      size="small"
                      className="is-warning is-outlined"
                      onClick={() => saveAndUpate()}
                      // disabled = {!title || !ChartTitle}
                      disabled={title || ChartTitle ? false : true}
                      style={{ padding: '7px' }}
                    >
                      <Icon>
                        <AiOutlineEdit />
                      </Icon>
                      <span>Update</span>
                    </Button>
                  }

                  {/* <Button
                    size="small"
                    className="is-warning is-outlined"
                    style={{ padding: '7px' }}
                    disabled={title || ChartTitle ? false : true}
                  >
                    <Icon>
                      <BsShareFill />
                    </Icon>
                    <span>Share</span>
                  </Button> */}
                  <ShareChart
                    onModalStateChange={handleModalStateChange}
                    disabled={title || ChartTitle ? false : true}
                    imageData={imageData}
                  />
                  <Button
                    size="small"
                    className="is-warning is-outlined"
                    style={{ padding: '7px' }}
                    disabled={title || ChartTitle ? false : true}
                    onClick={() => downLoad()}
                  >
                    <Icon>
                      <BiDownload size={16} />
                    </Icon>
                    <span>Download</span>
                  </Button>
                  <Button
                    size="small"
                    className="is-warning is-outlined"
                    style={{ padding: '7px' }}
                    disabled={title || ChartTitle ? false : true}
                    // onClick={()=>{handleDeleteChart(chartIdInUpdate)}}
                    onClick={() => openDeleteModal()}
                  >
                    <Icon>
                      <MdDeleteOutline size={16} />
                    </Icon>
                    <span>Delete</span>
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <p className="is-size-7 has-text-grey mb-2">Period</p>
              {/* <HoriSelectList
                layoutId="filling"
                dataArr={displayData}
                value={rangeselect}
                onClick={selectRangeAnnual_Qu}
                controlKey="value"
              /> */}
              <Dropdown
                dataArr={displayData}
                value={rangeselect}
                onClick={selectRangeAnnual_Qu}
                controlKey="value"
              ></Dropdown>
            </div>
            <div style={{ marginTop: '1px' }}>
              <p className="is-size-7 has-text-grey   mb-2">Format</p>
              <Dropdown
                onClick={onClickchart_format}
                value={chart_format}
                //heading={'Thousands'}
                dataArr={displayData1}
                controlKey="value"
              />
            </div>
          </div>
        </div>

        <div>
          <p className="is-size-7 has-text-grey mb-2">DISPLAY</p>

          <div className="is-flex is-gap">
            <Dropdownnew
              maxHeight="500px"
              onClick={onTechnicalIndicatorClick}
              className="is-flex-1 is-warning"
              dataArr={bsItem}
              heading={'B/S Items'}
              // value={defaultSelectedBSItem}
              rangeselect={rangeselect}
            />

            <Dropdownnew
              maxHeight="500px"
              onClick={onOscillatorsClick}
              className="is-flex-1 is-warning"
              dataArr={pnlItem}
              heading={'PnL Items'}
              rangeselect={rangeselect}
            />
            <Dropdownnew
              maxHeight="500px"
              onClick={onFlagClick}
              className="is-flex-1 is-warning"
              dataArr={cfItem}
              heading={'CF Items'}
              rangeselect={rangeselect}
            />

            <Dropdownratio
              maxHeight="500px"
              className="is-flex-1 is-warning"
              dataArr={ratioitem}
              onClick={onRatioitemClick}
              heading={'Ratio item'}
              rangeselect={rangeselect}
            />

            <div>
              <div className="is-relative is-flex is-justify-content-space-between  ">
                <Button
                  size="small"
                  className="is-warning has-tw-bold "
                  onClick={chartModelstatus}
                  // disabled={
                  //   config?.chart_items.length > 1 || title || ChartTitle
                  //     ? false
                  //     : true
                  // }
                  disabled={
                    (config?.chart_items.length > 1 || title || ChartTitle) &&
                    economiccampare.length <= 3
                      ? false
                      : true
                  }
                >
                  <Icon>
                    <FaPlus />
                  </Icon>
                  <span>Compare</span>
                </Button>
                <Button
                  size="small"
                  className="is-warning is-outlined has-tw-bold is-flex-1  ml-2"
                  // disabled={
                  //   config?.chart_items.length > 1 || title || ChartTitle
                  //     ? false
                  //     : true
                  // }
                  disabled={
                    (config?.chart_items.length > 1 || title || ChartTitle) &&
                    economiccampare.length <= 3
                      ? false
                      : true
                  }
                >
                  <Icon>
                    <FaPlus />
                  </Icon>{' '}
                  <span>Add Stock Price</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        {successpopup && (
          <Modalclose width="37vw">
            <div>
              <p className="help mt-2 is-scheme-invert is-size-6 has-tw-bold is-centered ">
                <p className="is-centered ">
                  Your chart is updated successfully. If you want to share it
                  into your social media account then please click on the
                  'Share' button.
                </p>
              </p>
            </div>
          </Modalclose>
        )}
        {confirmationDeleteModal && (
          <Modal width="30vw" close={() => setConfirmationDeleteModal(false)}>
            <div>
              <p className="is-size-6 has-tw-bold">
                Do you really want to delete this Chart?
              </p>

              <div className="buttons is-centered mt-5 are-small">
                <Button onClick={() => setConfirmationDeleteModal(false)}>
                  Cancel
                </Button>
                <Button
                  className="is-danger"
                  onClick={() => {
                    handleDeleteChart(chartIdInUpdate)
                    setConfirmationDeleteModal(false)
                  }}
                >
                  Delete Chart
                </Button>
              </div>
            </div>
          </Modal>
        )}
        {isCreateChartModalOpen && (
          <CreateChartModal
            close={() => setIsCreateChartModalOpen(false)}
            config={config}
            symbol={symbol}
            customKey={'FINANCIAL'}
            rangeselect={rangeselect}
            chart_format={chart_format}
            B_S_Item={bsitem}
            handleDataFromFinance={handleDataFromFinance}
            onSuccessCallback={handleSuccess}
          />
        )}
        {successcreatepopup && (
          <Modalclose width="30vw">
            <div>
              <p className="help is-scheme-invert is-size-6 has-tw-bold ">
                <p className="is-centered ">
                  Your chart is created successfully. You can share media
                  account by clicking on the 'Share' button.
                </p>
              </p>
            </div>
          </Modalclose>
        )}
      </div>
    </>
  )
}

export default FinancialChart
