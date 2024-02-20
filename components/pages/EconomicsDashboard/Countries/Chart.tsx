import { UseQueryResult } from '@tanstack/react-query'
import Button from 'components/Button/Button'
import Icon from 'components/Icon/Icon'
import LoadingSection from 'components/Loader/LoadingSection'
import { IS_CLIENT } from 'constants'
import Modalclose from 'components/Modal/Modal_without_close'
import { MdDeleteOutline } from 'react-icons/md'
import { BiDownload } from 'react-icons/bi'
import { BsShareFill } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { AXIOS_INSTANCE } from 'constants'
import { BiSave } from 'react-icons/bi'
import Input from 'components/Input/Input'
import { IoOpenOutline } from 'react-icons/io5'
import {  FaSearch, FaTimes } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'
import HighchartsReact from 'highcharts-react-official'
import { useRouter } from 'next/router'
import Modal from 'components/Modal/Modal'
import axios from 'axios'
import ShareChart from '../ShareEconomicCharts/ShareChart'
import CreateChartModal from 'components/pages/stock/BottomSection/tabs/Chart/SavedCharts/CreateChartModal'
import {
    getColorFromIdx,
    GREEN,
    GREY_DARK,
    GREY_DARKEST,
    hexWithTransparency,
    scrollBarStyling,
    X_AXIS_STYLING,
    Y_AXIS_STYLING
} from 'highcharts-styling-config'
import Highcharts from 'highcharts/highstock'
import indicators from 'highcharts/indicators/indicators'
import dataModule from 'highcharts/modules/data'
import exportingModule from 'highcharts/modules/exporting'
import { useRef, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { FaPlus } from 'react-icons/fa'
import { getCountryWiseHistoricalValues } from 'service/DashboardService/DashboardServices'
import {
    getSearchChartTitles,
    getopenChart,
  } from 'service/DashboardService/DashboardServices'
import useDeepCompareEffect, {
    useDeepCompareEffectNoCheck
} from 'use-deep-compare-effect'
import AddChartComparisionModal from './AddChartComparisionModal'
import html2canvas from 'html2canvas'
import { title } from 'process'
import { useEffect } from 'react'

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
  title: {
    text: 'stockChart',
    style: {
      color: "#ffff"
    }
  },
  plotOptions: {},
  rangeSelector: {
    enabled: false,
  },
  yAxis: Y_AXIS_STYLING,
  xAxis: {
    ...X_AXIS_STYLING,
  },
}

if (IS_CLIENT) {
  indicators(Highcharts)
  dataModule(Highcharts)
  exportingModule(Highcharts)
}

export interface CompareOptionsInterface {
  countryCode: string
  indicator: string
  indicatorName?: string
}
const cache = new Map()

interface ChartProps {
  query: UseQueryResult<any, unknown>
  countryCode: string
  indicator: string
  topic: string
}

const Chart = ({ query, countryCode, indicator, topic }: ChartProps) => {
  const router = useRouter()
  const title1 = router.query.titles
  const [openchart, setopenChart] = useState()
  const [isComparisionModalOpen, setIsComparisionModalOpen] = useState(false)
  const [isCreateChartModalOpen, setIsCreateChartModalOpen] = useState(false)
  // const [compareOptionInEconomics, setCompareOptionInEconomics] = useState([])
  const [existingModalOpen, setExistingModalOpen] = useState(false)
  const [showSearchListData, setShowSearchListData] = useState(false)
  const [searchList, setSearchList] = useState([])
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageData, setImgLink] = useState(null)
  const [successpopup, setsuccesspopup] = useState(false)
  const [successcreatepopup, setsuccesscreatepopup] = useState(false)
  const [chartIdInUpdate, setChartIdInUpdate] = useState('')
  const [chartTitleName, setChartTitleName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [confirmationDeleteModal, setConfirmationDeleteModal] = useState(false)
  // const [compareOptions, setCompareOptions] = useState<
  //   CompareOptionsInterface[]
  // >([{ countryCode, indicator }])
  const [compareOptionInEconomics, setCompareOptions] = useState<
    CompareOptionsInterface[]
  >([{ countryCode, indicator }])
  

  const [technicalIndicators, setTechnicalIndicators] = useState<
    Highcharts.Options['series']
  >([])

  const chartRef = useRef<HighchartsReact.RefObject>(null)
  const [options, setOptions] = useState<Highcharts.Options>({
    ...defaultOptions,
    xAxis: {
      ...defaultOptions.xAxis,
    }, title: {
        text: title1,
        style: {
          color: "#ffff"
        }
      },
  })
  

useEffect(() => {
    setOptions(prevOptions => ({
      ...prevOptions,
      title: {
        ...prevOptions.title,
        text: title1 // Update the title dynamically
      }
    }));
  }, [title1]);


  const compareCountryBase = () => {
    const newCompareOption = {
      countryCode,
      indicator,
      data_type: 'ECONOMICS',
      valueData: query.data,
    }
    // setCompareOptionInEconomics([newCompareOption]);
    setCompareOptionInEconomics((prevOptions) => [
      ...prevOptions,
      newCompareOption,
    ])
    // setOpenModal(false)

    // closeModalCompare()
  }

  const saveAndUpate = async () => {
    console.log(chartIdInUpdate,'chartIdInUpdate');
    if (chartIdInUpdate) {
      const data = {
        title: chartTitleName,
        chart_id: chartIdInUpdate,
        chart_type: 'ECONOMICS',
        chart_config: {
          compareOptionInEconomics:compareOptionInEconomics
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
        //   saveButtonStateReset('saveButtonClick')
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
      if (response.status === 200) {
        if (
          url.searchParams.has('titles') 
        ) {
          url.searchParams.delete('titles')
        }
        router.push('/dashboard/economics-dashboard');
        // router.push(url, undefined, { scroll: false })
        setsuccesspopup(true)
        setTimeout(() => {
          setsuccesspopup(false)
        }, 1500)
        // setControls([
        //   {
        //     displayValue: symbol,
        //     type: '',
        //     controlType: 'symbol',
        //   },
        // ])
        setChartIdInUpdate('')
        setChartTitleName('')
      }
    } catch (error) {}
  }
  const handleClicklist = async () => {
    const token = localStorage.getItem('token')
    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }

    try {
      const response = await axios.get(
        `https://api.donestat.co/rest/v1/getChartTitles?chart_type=ECONOMICS&page_no=1`,
        { headers }
      )
      if (response.status === 200) {
        // handleButtonClick()
        setExistingModalOpen(true)
        setShowSearchListData(true)
        setSearchList(response.data.slice(0, 10))
      }
    } catch (error) {}
  }

  const handleSearch = (e) => {
    const inputValue = e.target.value.trim()

    setSearch(e.target.value)
    if (inputValue) {
      setShowSearchListData(true)
    } else {
      setShowSearchListData(false)
    }
  }
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
        // setCompareOptions([])

        // onReceiveOpenChartData("");
        setopenChart(openChartData)
       setCompareOptions(openChartData?.chart_config?.compareOptionInEconomics)
        //onReceiveOpenChartData(openChartData)
        setExistingModalOpen(false)

        // This is the existing URL instance, don't create a new one
        // url.searchParams.set('openChartId', openChartData.chart_id)
        url.searchParams.set('titles', openChartData.title);
        router.push(url, undefined, { scroll: false });
        setChartIdInUpdate(openChartData?.chart_id)
      } else {
        setopenChart([])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  const getSeries = async (): Promise<Highcharts.Options['series']> => {
    const promises: any[] = []

    // compareOptions.forEach((item) => {
      compareOptionInEconomics.forEach((item) => {
    
      

      const cacheKey = `${item?.countryCode}-${item?.indicator}`
      if (cache.has(cacheKey)) return
      promises.push(
        getCountryWiseHistoricalValues(item?.countryCode, item?.indicator).then(
          (i) => [
            cacheKey,
            i.map((j: any) => [new Date(`${j[0]}`).getTime(), j[1]]),
          ]
        )
      )
    })

    const series = []
    const promiseResult = await Promise.all(promises)
    promiseResult.forEach(([cacheKey, data]) => {
      cache.set(cacheKey, data)
    })

    // compareOptions.forEach((i, idx) => {
      compareOptionInEconomics.forEach((i, idx) => {
      const label = `${i.countryCode} - ${i.indicator}`
      series.push({
        id: label,
        name: label,
        data: cache.get(`${i.countryCode}-${i.indicator}`),
        type: 'line',
        showInNavigator: true,
        color: getColorFromIdx(idx, 'normal'),
      })
    })
    return series
  }
  const handleSuccess = (data) => {
    if (data === true) {
      setsuccesscreatepopup(true)
      setTimeout(() => {
        setsuccesscreatepopup(false)
      }, 1500)
    }
  }
  const handleDataFromFinance = (data) => { 
    // setControls([])
    // setControls(data?.chart_config)
    setChartIdInUpdate(data?.chart_id)
    setChartTitleName(data?.title)
  }
  useDeepCompareEffectNoCheck(() => {
    ;(async () => {
      const series = await getSeries()
      setOptions({
        ...defaultOptions,
        ...options,
        series,
      })
    })()
     }, [compareOptionInEconomics])
  // }, [compareOptions])

  useDeepCompareEffect(() => {
    if (technicalIndicators?.length! > 0) {
      setOptions({
        ...options,
        series: [options.series?.[0]!, ...technicalIndicators!],
      })
    }
  }, [technicalIndicators])

  if (query.isLoading) return <LoadingSection />


  const downLoad = async () => {
    try {
      const targetDiv = document.getElementById('economic-chart')

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
        link.download = `economic-chart.png`
        const dataURL = canvas.toDataURL('image/png')
        // console.log(dataURL, 'dataURLllllll')

        // setImageData(dataURL);

        link.click()

        // Clean up
        URL.revokeObjectURL(link.href)
      }, 'image/png')
    } catch (error) {
      console.error('Error capturing screenshot:', error)
    }
  }

  const handleModalStateChange = (isOpen) => {
 
    setIsModalOpen(isOpen)
    handleCapture()
  }
  const handleCapture = async () => {
    try {
      const targetDiv = document.getElementById('economic-chart')

      if (!targetDiv) {
        console.error('Target div not found.')
        return
      }
      setImgLink(targetDiv)
    } catch (error) {
      console.error('Error capturing screenshot:', error)
    }
  }
  return (
    <div>
      <AnimatePresence>
        {isComparisionModalOpen && (
          <AddChartComparisionModal
            // options={compareOptions}
            // addOption={(val) => {
            //   setCompareOptions([...compareOptions, val])
            // }}
            options={compareOptionInEconomics}
            addOption={(val) => {
              setCompareOptions([...compareOptionInEconomics, val])
            }}
            close={() => setIsComparisionModalOpen(false)}
          />
        )}
      </AnimatePresence>
      <div className="is-flex is-justify-content-space-between is-gap" >

      <div className="v-center my-3">
        <Button
          onClick={() => setIsComparisionModalOpen(true)}
          className="is-warning is-small"
        >
          <Icon>
            <FaPlus />
          </Icon>
          <span>Compare</span>
        </Button>
      </div>    
      <div className="is-flex " style={{ gap: '1.5rem' }}>
            <div
              className="is-flex is-justify-content-space-between"
              style={{ marginTop: '0.7rem' }}
            >
              <div>
                <div
                  className="is-flex is-gap"
                  //id={CHARTS_BOTTOM_BUTTONS_WRAPPER_ID}
                  //   ref={() => onLoad()}
                >
                  <Button
                    size="small"
                    className="is-warning is-outlined"
                    onClick={handleClicklist}
                    style={{ padding: '7px' }}
                    // disabled
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
                        //   ref={containerRef}
                        //   onScroll={handleScroll}
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
                    onClick={() =>{ setIsCreateChartModalOpen(true),compareCountryBase()}}
                    style={{ padding: '7px' }}
                    disabled={title1? true : false}
                    // disabled={
                    //   config.chart_items.length === 1 || title || ChartTitle
                    // }
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
                       disabled = {!title1}
                      //disabled={title || ChartTitle ? false : true}
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
                   // disabled={title || ChartTitle ? false : true}
                  >
                    <Icon>
                      <BsShareFill />
                    </Icon>
                    <span>Share</span>
                  </Button> */}
                
                  <ShareChart
                   onModalStateChange={handleModalStateChange}
                   imageData={imageData}
                  />
                  <Button
                    size="small"
                    className="is-warning is-outlined"
                    style={{ padding: '7px' }}
                    //disabled={title || ChartTitle ? false : true}
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
                    disabled={title1? false : true}
                     //onClick={()=>{handleDeleteChart(chartIdInUpdate)}}
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
          </div>
          </div>
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
<div id="economic-chart" style={{background:'#0a0a0a'}}  >

      <div className="tags mb-0 mt-5">
        <AnimatePresence>
          {/* {compareOptions.map( */}
            {compareOptionInEconomics.map(
            
            
            (item, idx) =>
              idx && (
                <motion.span
                  exit={{ opacity: 0 }}
                  layout
                  layoutId={item.countryCode + item.indicator}
                  className="tag is-warning"
                  key={item.countryCode + item.indicator}
                >
                  <b className="mr-1">{item.countryCode}</b> -{' '}
                  {item.indicatorName}
                  {idx > 0 && (
                    <button
                      className="delete is-small"
                      onClick={() =>
                        setCompareOptions((val) => {
                          const updatedState = [...val]
                          updatedState.splice(idx, 1)
                          return updatedState
                        })
                      }
                    ></button>
                  )}
                </motion.span>
              )
          )}
        </AnimatePresence>
      </div>
      {isCreateChartModalOpen && (
          <CreateChartModal
            close={() => setIsCreateChartModalOpen(false)}
             config={{
              compareOptionInEconomics,
               
              }}
            customKey={'ECONOMICS'}
            onSuccessCallback={handleSuccess}
            handleDataFromFinance={handleDataFromFinance}
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
      <HighchartsReact
        constructorType="stockChart"
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
        titlenew={title}
      />
    </div>
    </div>
  )
}
export default Chart