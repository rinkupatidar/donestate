import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import Modal from 'components/Modal/Modal'
import { AXIOS_INSTANCE } from '../../../../../../../constants'
import ReactDatePicker from 'react-datepicker'
import LoadingSection from 'components/Loader/LoadingSection'
import { BsShareFill } from 'react-icons/bs'
import CreateChartModal from '../../Chart/SavedCharts/CreateChartModal'
import { BiDownload } from 'react-icons/bi'
import Modalclose from 'components/Modal/Modal_without_close'
import { BsArrowRightShort } from 'react-icons/bs'
import { MdDeleteOutline } from "react-icons/md";
import {
  deleteChart,
  getChart,
  getChartTitles, getopenChart, getSearchChartTitles, updateChart
} from 'service/DashboardService/DashboardServices'
import debounce from 'lodash/debounce';
import { useImmer } from 'use-immer'
import { useRouter } from 'next/router'
import Dropdownratio from 'components/Dropdown/Dropdownratio'
import {
  AiOutlineEdit,
} from 'react-icons/ai'
import {
  CHARTS_BOTTOM_BUTTONS_WRAPPER_ID,
  CHARTS_CACHE_KEY,
  DEFAULT_DATE_PICKER_OPTIONS,
  DIVIDENDS_DISPLAY_VALUE,
  EARNINGS_DISPLAY_VALUE,
  SPLITS_DISPLAY_VALUE,
  GET_CHART_TITLES_QUERY_ID,
} from '../../../../../../../constants'
import { BiSave } from 'react-icons/bi'
import { FaPlus, FaSearch, FaTimes } from 'react-icons/fa'
import useFetch from '../../../../../../../hooks/useFetch'
import Button from '../../../../../../Button/Button'
import Dropdown from '../../../../../../Dropdown/Dropdown'
import Dropdownnew from 'components/Dropdown/Dropdownnew'
import HoriSelectList from '../../../../../../HoriSelectList/HoriSelectList'
import Icon from '../../../../../../Icon/Icon'
import Input from '../../../../../../Input/Input'
import {
  DisplayInterface,
  IndicatorsInterface,
  SocialSentimentDropdownDownInterface,
} from '../../Chart/chartTypes'
import styles from './index.module.scss'
import { SavedChartConfigInterface } from '../../Chart/SavedCharts/SavedChartTypes'
import {
  GetChartResponseInterface,
  GetChartTitlesResponse
} from 'service/DashboardService/DashboardServicesInterface'
import { IoOpenOutline } from 'react-icons/io5'
import axios from 'axios'
import html2canvas from 'html2canvas'


// interface ClickIngFinancialsProps {
//   symbol: string
//   disableSavedCharts?: boolean
//   config?: GetChartResponseInterface
// }

const technicalIndicatorDropdownData: IndicatorsInterface[] = [
  { displayValue: 'B/S Items' },
]

const oscillatorsDropdownData: IndicatorsInterface[] = [
  { displayValue: 'PnL' },
]
const oscillatorsDropdownData1: IndicatorsInterface[] = [
  { displayValue: 'CF' },
]
const SocialSentimentsDropdownData: SocialSentimentDropdownDownInterface[] = [
  { displayValue: 'Ratio Items' },
]
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

interface ClickIngFinancialsProps {

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
  onLoad: () => void
  toDate: Date
  fromDate: Date
  setFromDate: (val: Date) => void
  setToDate: (val: Date) => void
  chartModelstatus: (val: any) => void
  handleDeleteChart: (val: any) => void
  onClickchart_format: (val: any) => void
  symbol: string,
  titleexiting: string,
  userChangeQ_A: string,
  chart_format: string,
  disableSavedCharts?: boolean
  config?: GetChartResponseInterface
  //parentConfig?: GetChartResponseInterface
  loadChartConfig: (config: SavedChartConfigInterface) => void
  parentConfig?: GetChartResponseInterface,
  rangedata,
  exitingdata: any
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

const ClickIngFinancials = ({
  createid,
  datalistbs,
  datalistpnl,
  datalistcf,
  onChartUpdateSuccess,
  onChartUpdaterange,
  onReceiveOpenChartData,
  onLoad,
  onTechnicalIndicatorClick,
  onRangeClick,
  onRangeselect,
  onFrequencyClick,
  onDisplayClick,
  onNewSymbolClick,
  // restoreDefaults,
  onOscillatorsClick,
  onFlagClick,
  onRatioitemClick,
  selectRangeAnnual_Qu,
  // isAnyOverlaySelected,
  // isAnyLowerChartSelected,
  // display,
  // frequency1,
  // frequency,
  range,
  fromDate,
  economiccampare,
  toDate,
  setFromDate,
  setToDate,
  chartModelstatus,
  config,
  userChangeQ_A,
  chart_format,
  symbol,
  selectedValues,
  title,
  parentConfig,
  ratioitem,
  rangedata,
  loadChartConfig,
  exitingdata,
  handleDeleteChart,
  onClickchart_format
}: ClickIngFinancialsProps) => {



  const fillingTypeValue = selectedValues.fillingType;
  // const [rangeselect, setRangeselect] = useState(fillingTypeValue)
  const [successpopup, setSuccessPopup] = useState(false)
  const [isCreateChartModalOpen, setIsCreateChartModalOpen] = useState(false)
  const [showSearchListData, setShowSearchListData] = useState(false)
  const [existingModalOpen, setExistingModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [searchList, setSearchList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1);
  const [openchartData, setopenChart] = useState()
  const [chartidopen, setchartid] = useState()
  const [confirmationDeleteModal, setConfirmationDeleteModal] = useState(false)
  const [currentDay, setcurrentDay] = useState<string>("");

  const chartRange = userChangeQ_A === 'ANNUAL' ? rangedata || 2 : rangedata || 8;
  // const chartRange = userChangeQ_A === 'ANNUAL' ? rangedata : rangedata;


  const [selectedConfig, setSelectedConfig] = useState<
    GetChartResponseInterface | undefined
  >()
  const containerRef = useRef()
  const routerUrl = useRouter()
  let ChartId = routerUrl.query.chartId
  const query = useQuery(
    GET_CHART_TITLES_QUERY_ID,
    () => getChartTitles({ symbol, page: 1, chart_type: "FINANCIAL" }),
    { enabled: !!!parentConfig }
  )
  const handleItemClick = async (id: string) => {
    const chartData = await getChart(id)
    setSelectedConfig(chartData)
    loadChartConfig(chartData.chart_config)
  }
  const autoActive = async (item) => {
    let routerTitles = routerUrl.query.titles as string;
    const filteredItems = item.filter((i) => {
      return i[2] === routerTitles;
    });

    if (filteredItems.length > 0) {
      const id = filteredItems[0][0];
      const chartData = await getChart(id);
      setSelectedConfig(chartData);
      loadChartConfig(chartData.chart_config);
      routerTitles = '';
    } else {
      console.log("No item found with the specified value");
    }
  };

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
  //   setRangeselect(e.value)
  //   onRangeselect(e.value);
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
    if (search) {
      const container = containerRef.current
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
  const router = useRouter()
  const titless = router.query.titles
  const debouncedLoadMoreData = debounce(loadMoreData, 200);



  const handleUpdateChart = async () => {
    setIsLoading(true)
    const data = parentConfig! || selectedConfig



    const configff = (config?.chart_items)


    if (userChangeQ_A === "ANNUAL") {
      await updateChart({
        ...data,
        title: openchartData?.title || titless,
        chart_type: "FINANCIAL",
        chart_config: {
          chart_data_type: userChangeQ_A,
          chart_range: chartRange,
          chart_format: chart_format,
          chart_items: configff,
          compareOptionInEconomics:config?.compareOptionInEconomics
        },
        symbol,
        chart_id: chartidopen || createid || exitingdata?.chart_id
      })
      onChartUpdateSuccess(
        config, userChangeQ_A, openchartData?.title || titless
      );
      onChartUpdaterange(
        userChangeQ_A
      );
      setSuccessPopup(true)
      setTimeout(() => {
        setSuccessPopup(false);
      }, 1500);
     
    } else {
      await updateChart({
        ...data,
        title: openchartData?.title || titless,
        chart_type: "FINANCIAL",
        chart_config: {
          chart_data_type: userChangeQ_A,
          chart_range: chartRange,
          chart_format: chart_format,
          chart_items: configff,
          compareOptionInEconomics:config?.compareOptionInEconomics
        },
        symbol,
        chart_id: chartidopen || createid || exitingdata?.chart_id
      })
     
      onChartUpdateSuccess(
        config, userChangeQ_A,openchartData?.title || titless
      );
      onChartUpdaterange(
        userChangeQ_A
      );

      setSuccessPopup(true)
      setTimeout(() => {
        setSuccessPopup(false);
      }, 1500);
    }



    // setnewchartdata(config);
    // setopenChart();
    setIsLoading(false)
   

  }

  // const openChartid = async (chartId) => {
  //   const url = new URL(location.href);

  //   try {
  //     if (chartId) {
  //       const openChartData = await getopenChart({
  //         chart_id: chartId,
  //       });
  //       setopenChart(openChartData);
  //       onReceiveOpenChartData(openChartData);
  //       setExistingModalOpen(false);
  //       setchartid(openChartData?.chart_id)

  //     } else {
  //       setopenChart([]);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const openChartid = async (chartId) => {
    try {
      const url = new URL(location.href);
      const titles = url.searchParams.get("titles");

      if (chartId) {
        const openChartData = await getopenChart({
          chart_id: chartId,
        });

        setopenChart(openChartData);
        console.log(openChartData,'openChartDataopenChartDataopenChartData');
        
        onReceiveOpenChartData(openChartData);
        setExistingModalOpen(false);
        setchartid(openChartData?.chart_id);
        setSearch("")
        if (titles) {
          url.searchParams.set("titles", openChartData.title);
          window.history.replaceState({}, document.title, url);
        }
      } else {
        setopenChart([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
  useEffect(() => {
    if (query.data) {
      autoActive(query.data)
    }
    //  getFinancialItems(),
    //     getFinancialItemspnl(),
    //     getFinancialItemscf(),
    //     getFinancialItemsratio()
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
  }, [search, query.data])
  // }, [search, routerUrl, query.data])
  const handleClicklist = async () => {
    const token = localStorage.getItem('token')
    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }

    try {
      const response = await axios.get(`https://api.donestat.co/rest/v1/getChartTitles?symbol=${symbol}&chart_type=FINANCIAL&page_no=1`, { headers })
      if (response.status === 200) {

        // handleButtonClick();
        setExistingModalOpen(true)
        setShowSearchListData(true)
        setSearchList(response.data.slice(0, 10))
      }
    } catch (error) {

    }

  }
  const openDeleteModal = () => {
    setConfirmationDeleteModal(true)
  }
  const downLoad = async () => {
    // chartNameTitle chart-container
    try {
      // const targetDiv = document.getElementById('chart-container');
      const targetDiv = document.getElementById('chart')

      if (!targetDiv) {
        console.error('Target div not found.');
        return;
      }

      const canvas = await html2canvas(targetDiv, { async: true, logging: true });

      // Convert the canvas to a Blob
      canvas.toBlob((blob) => {
        // Create a download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        // link.download = 'chart.png';
        link.download = `${title || titless}-${currentDay}.png`

        // Trigger a click on the link to start the download
        link.click();

        // Clean up
        URL.revokeObjectURL(link.href);
      }, 'image/png');

    } catch (error) {
      console.error('Error capturing screenshot:', error);
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
              <HoriSelectList
                value={rangedata}
                onClick={onRangeClick}
                // value={rangeselect}

                dataArr={userChangeQ_A === 'ANNUAL' ? jsonAnnual : jsonQuater}
                controlKey="value"
              />
            </div>
          </div>
          <div className="is-flex"
            // className="is-flex is-gap"
            style={{ gap: "1.5rem" }}>
            <div className="is-flex is-justify-content-space-between" style={{ marginTop: "1.7rem" }}>


              <div>
                {/* <div className=" " /> */}
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

                  <Button
                    size="small"
                    className="is-warning is-outlined"
                    onClick={() => setIsCreateChartModalOpen(true)}
                    disabled={titless}
                    style={{ padding: '7px' }}
                  >
                    <Icon>
                      <BiSave />
                    </Icon>
                    <span>Save </span>
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
                  <Button size="small" className="is-warning is-outlined"
                    style={{ padding: '7px' }}
                    onClick={handleUpdateChart}>
                    <Icon>
                      <AiOutlineEdit />
                    </Icon>
                    <span>Update</span>

                  </Button>
                  <Button size="small" className="is-warning is-outlined"
                    style={{ padding: '7px' }}>
                    <Icon>
                      <BsShareFill />
                    </Icon>
                    <span>Share</span>
                  </Button>
                  <Button size="small" className="is-warning is-outlined"
                    style={{ padding: '7px' }}
                    onClick={() => downLoad()}
                  >
                    <Icon>
                      <BiDownload size={16} />
                    </Icon>
                    <span>Download</span>
                  </Button>
                  <Button size="small" className="is-warning is-outlined"
                    style={{ padding: '7px' }}
                    // onClick={() => handleDeleteChart(ChartId || chartidopen || createid || exitingdata?.chart_id)}
                    onClick={() =>openDeleteModal()}

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
                // value={rangeselect}
                value={userChangeQ_A}
                onClick={selectRangeAnnual_Qu}
                controlKey="value"
              /> */}
              <Dropdown
                dataArr={displayData}
                value={userChangeQ_A}
                onClick={selectRangeAnnual_Qu}
                controlKey="value">
              </Dropdown>
            </div>
            <div style={{ marginTop: "1px" }}>
              <p className="is-size-7 has-text-grey   mb-2">Format</p>
              <Dropdown
                onClick={onClickchart_format}
                value={chart_format}
                // heading={'Thousands'}
                dataArr={displayData1}
                controlKey="value" />
            </div>
          </div>
        </div>
        {successpopup && (
          <Modalclose width="37vw">
            <div>
              <p className="help mt-2 is-scheme-invert is-size-6 has-tw-bold is-centered ">
                <p className="is-centered ">
                  Your chart is updated successfully. If you want to share it into your social media account then please click on the 'Share' button.
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
                <Button onClick={()=>setConfirmationDeleteModal(false)}>Cancel</Button>
                <Button
                  className="is-danger"
                  onClick={() =>{
              
                    handleDeleteChart(ChartId || chartidopen || createid || exitingdata?.chart_id)
                    setConfirmationDeleteModal(false)
                  
                  }}
                >
                  Delete Chart
                </Button>
              </div>
            </div>
          </Modal>
        )}
        <div>
          <p className="is-size-7 has-text-grey mb-2">DISPLAY</p>

          <div className="is-flex is-gap">
            <Dropdownnew
              maxHeight="500px"
              // isOpen={getFinancialItems()}  
              onClick={onTechnicalIndicatorClick}
              disableSelection
              className="is-flex-1 is-warning"
              dataArr={datalistbs}
              heading={'B/S Items'}
            />
            <Dropdownnew
              // isOpen={getFinancialItemspnl()}  
              maxHeight="500px"
              className="is-flex-1 is-warning"
              disableSelection
              dataArr={datalistpnl}
              onClick={onOscillatorsClick}
              heading={'PnL item'}
            />

            <Dropdownnew
              maxHeight="500px"
              className="is-flex-1 is-warning"
              dataArr={datalistcf}
              heading={'CF item'}
              onClick={onFlagClick}
            />

            {/* <Dropdownnew
              //  isOpen={getFinancialItemsratio()} 
              className="is-flex-1 is-warning"
              disableSelection
              dataArr={datalistbs}
              onClick={onRatioitemClick}
              heading={'Ratio item'}
            /> */}
            <Dropdownratio
              maxHeight="500px"
              className="is-flex-1 is-warning"
              dataArr={ratioitem}
              onClick={onRatioitemClick}
              heading={'Ratio item'}
            />
            <div>
              <Button
                size="small"
                className="is-warning has-tw-bold "
                onClick={chartModelstatus}
                disabled={
                  (config?.chart_items.length > 1 || title) && economiccampare.length <= 3
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
                disabled={
                  (config?.chart_items.length > 1 || title ) && economiccampare.length <= 3
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
            <div>

            </div>
          </div>
        </div>

        {isCreateChartModalOpen && (
          <CreateChartModal
            close={() => setIsCreateChartModalOpen(false)}
            config={config}
            symbol={symbol}
            customKey={'FINANCIAL'}
          />
        )}
      </div>
    </>
  )
}

export default ClickIngFinancials
