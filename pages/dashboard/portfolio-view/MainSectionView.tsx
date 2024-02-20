import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import Link from 'next/link'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import * as advancedFormat from 'dayjs/plugin/advancedFormat'
import * as timezone from 'dayjs/plugin/timezone'
import HoriSelectList from 'components/HoriSelectList/HoriSelectList'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import * as utc from 'dayjs/plugin/utc'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Input from 'components/Input/Input'
import { useEffect, useRef, useState } from 'react'
import {AXIOS_INSTANCE} from '../../../constants'
import {
  AiOutlineArrowUp,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineArrowDown,
} from 'react-icons/ai'
import { FaStar } from 'react-icons/fa'
import { getStockQuote } from 'service/DashboardService/DashboardServices'
import useFetch from 'hooks/useFetch'
import addComma from 'utilities/addComma'
import { addQueryParamsToUrl } from 'utilities/common'
import { round } from 'utilities/round'
import { roundone } from 'utilities/roundone'
import Button from 'components/Button/Button'
import Icon from 'components/Icon/Icon'
import Modal from 'components/Modal/Modal'
import BottomInfoNav from 'components/pages/stock/BottomSection/BottomInfoNav'
//import News from 'components/pages/EconomicsDashboard/Sections/News/News'
import News from './News/News'
import Right from '@/icons/right.svg'
import { TOP_TO_BOTTOM_MENU_VARIANT } from 'utils/variants'
import { FaDownload } from 'react-icons/fa6'
import Left from '@/icons/left.svg'
import LoaderOverlay from 'components/Loader/LoaderOverlay'
import BottomSections from 'components/pages/stock/BottomSection/BottomSections'
//import Chart from './Chart'
// import Chart from 'components/pages/stock/Chart'
// import Chart from 'components/pages/stock/Chart-port'
import Chart from './Chart-port'
import styles from './index.module.scss'
import { IoMdAdd } from 'react-icons/io'
import { NavItemType } from 'components/pages/stock/types'
import Grid from 'components/Overview/Grid'
import Value from 'components/Overview/Value'
import OverviewSection from './OverviewSection'
import { OVERVIEW_DATA } from '../../../constants'
import axios from 'axios'
import ClickAwayListener from 'react-click-away-listener'
import { BiSave } from 'react-icons/bi'
import PieChart from './pieChart/PieChart'
import LoadingSection from 'components/Loader/LoadingSection'
import { map } from 'highcharts'

interface MainSectionProps { }

dayjs.extend(utc as any)
dayjs.extend(timezone as any)
dayjs.extend(advancedFormat as any)
// interface nagarData {
//   name: string,
//   y: number,
//   color: string
// }

const MainSectionView = ({ }: MainSectionProps) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const router = useRouter()
  // const symbol1 = 'JNJ' as string
  const symbol1 = router.query.symbol as string
  const shouldFetch = router.isReady
  // const stockQuote = useQuery(['getStockQuote'], () => getStockQuote(symbol1), {
  //   enabled: shouldFetch,
  //   refetchInterval: 1000 * 60,
  // })
  const [showModal, setShowModal] = useState(false)
  const [portFolio, setPortFolio] = useState([])
  const reversedPortFolio = [...portFolio].reverse()
  const [showSmallModal, setShowSmallModal] = useState(false)
  const [renameModal, setRenameModal] = useState(false)
  const [typedText, setTypedText] = useState<string | null>(null)


  const [handleInsideData, setHandleInsideData] = useState<string[]>([])
  
  const [getPeerdata, setGetPeerData] = useState([])
  const [peerStockQuotesData, setGetPeerStockQuotesdata] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sectorDataForPieChart, setSectorDataForPieChart] = useState<any>([])
  const [changeLineChart, setChangeLineChart] = useState([])
  

 
  const handleInside = (highlightdata: any) => {
    setHandleInsideData(highlightdata)
    if (highlightdata.length > 0) {
     
      
      const totalOfMarketValue= highlightdata[highlightdata.length - 1];
      const prepareDataPicChart: { name: any; y: number; }[] = [];
      highlightdata.map((item: any) => {
        var calculateValue =  Number(Number(item?.marketValue)/Number(totalOfMarketValue?.sumOfMarketValue)* 100);
        prepareDataPicChart.push({
          name: item?.companyProfile?.sector,
          y:roundToTwoDecimalPlaces(calculateValue)
        })
      })
      setSectorDataForPieChart(prepareDataPicChart);
      setChangeLineChart(highlightdata);
    }
  }
  const roundToTwoDecimalPlaces = (value:any) =>{
    // Ensure the input is a number
    if (typeof value !== 'number') {
      throw new Error('Input must be a number');
    }
    // Round to two decimal places using toFixed and convert back to a number
    const roundedValue = Number(value.toFixed(2));
    return roundedValue;
  }
  const lastIndex = handleInsideData?.length - 1
  // console.log("lastIndex",lastIndex)
  const lastObject = handleInsideData[lastIndex]
  const cashAmount = lastObject?.cashAmount

  // console.log(cashAmount,'cashAmount');
  const lastI = handleInsideData?.length - 1
  // console.log("lastI",lastI)
  const lastO = handleInsideData[lastI]
  const mcap = lastO?.Sum_of_Weighted_M_Cap

  const qty = handleInsideData.map((entry) => entry.quantity)
  const price1 = handleInsideData.map(
    (entry) => entry?.stockquoteData?.current_price
  )

  const one = handleInsideData.map((entry) => entry.oneDayGain2)

  const onegains = handleInsideData.map((entry, index) => {
    const oneGain =
      ((price1[index] * (one[index] / 100)) / (1 + one[index] / 100)) *
      qty[index]

    return oneGain
  })

  const sumOneGains = onegains.reduce(
    (sum, currentValue) => sum + currentValue,
    0
  )
  
  const sumPE = handleInsideData.reduce((sum, entry) => {
    const peCurrent = entry?.companyProfile?.pe_current ?? 0;
    return sum + parseFloat(peCurrent);
  }, 0);
  const peCurrent1 = handleInsideData.map((entry) => entry?.companyProfile?.pe_current)
  // console.log(peCurrent1,'peCurrent1');
  const marketv = handleInsideData.map((entry) => entry.marketValue)
  // console.log(marketv,'marketv');
  
  const amountv = handleInsideData.map((entry) => entry.amount)
  // console.log(amountv, 'amountv')
  const totalGain = marketv.map((value, index) => value - amountv[index])
  const sumTotalGain = totalGain.reduce(
    (acc, currentValue) => acc + currentValue,
    0
  )
  const sumOfMarketValues = marketv.reduce((sum, value) => sum + value, 0)
  
  const peCalculation = handleInsideData.reduce((sum, entry, index) => {
    const entryPECurrent = parseFloat(peCurrent1[index] ?? 0);
    // console.log(entryPECurrent,'entryPECurrent');
    
    const entryMarketValue = marketv[index];
  
    // Calculate PE calculation for each entry
    const entryPECalculation = (entryPECurrent * entryMarketValue) / sumOfMarketValues;
  
    // Add this entry's PE calculation to the running sum
    return sum + entryPECalculation;
  }, 0);
  
  const bystock = (sumOfMarketValues / (sumOfMarketValues + cashAmount)) * 100  
  const bycash = (cashAmount / (sumOfMarketValues + cashAmount)) * 100

  const uptoone =
    (sumOneGains / (sumOfMarketValues + cashAmount - sumOneGains)) * 100

  const amountvsum = amountv.reduce((sum, entry) => sum + entry, 0)
  const uptototal = (sumTotalGain / (amountvsum + cashAmount)) * 100
  const totalSum = handleInsideData?.reduce(
    (acc, item) => acc + item.totalReturn,
    0
  )
  const totalAverageOfTotalReturn = totalSum / (handleInsideData?.length || 1)
  const totolSumOfOneDayGain = handleInsideData?.reduce(
    (acc, item) => acc + item.oneDayGain2,
    0
  )
  const totalAverageOfOneDayGain =
    totolSumOfOneDayGain / (handleInsideData?.length || 1)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypedText(e.target.value)
  }

  const handleCloseModal = () => {
    // router.push(ROUTES.DASHBOARD)
    setRenameModal(false)
  }
  const toggleSmallModal = () => {
    setShowSmallModal(!showSmallModal)
  }
  const handleClickAway = () => {
    setShowSmallModal(false)
  }

  const openModal = () => {
    setShowModal(true)
  }
  // const handleClickTab = (item: NavItemType) => {
  //   const url = new URL(location.href)
  //   url.searchParams.set('tab', item)
  //   router.push(url, undefined, { scroll: false })
  // }
  const handleClickTab= async (id)=>{

    const setRouterQuery = reversedPortFolio.filter((item) => item.portfolio_id === id);
        if (setRouterQuery.length > 0) {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    X_AUTH_TOKEN: token,
                    'Content-Type': 'application/json',
                };

                
                const response = await AXIOS_INSTANCE.get(
                  `getInvestments/${id}`,
                  { headers }
                )
                if (response.status === 200) {
                    if (response.data.length === 0) {
                        router.push({
                            pathname: `/dashboard/portfolio/listportfolio/tab=${id}`,
                            // query: { responseData: JSON.stringify(setRouterQuery[0]) },
                        });

                    } else {
                        router.push(`/dashboard/portfolio-view?tab=${id}`)
                    }
                } else {
                    console.error('Error fetching stock quote data:');
                }
            } catch (error) {
                console.error('Error fetching stock quote data:', error);
            }
        }

  }
  const elementRef = useRef(null)
  const [arrowDisable, setArrowDisable] = useState(true)
  const [arrowDisable1, setArrowDisable1] = useState(false)
  const [confirmationDeleteModal, setConfirmationDeleteModal] = useState(false)
  const [confirmationDeleteModal1, setConfirmationDeleteModal1] =
    useState(false)
  const handleDeleteItemClick1 = () => {
    setConfirmationDeleteModal1(true)
  }
  const handleDeleteItemClickfalse1 = () => {
    setConfirmationDeleteModal1(false)
  }
  const handleDeleteItemClick = () => {
    setConfirmationDeleteModal(true)
  }
  const handleDeleteItemClickfalse = () => {
    setConfirmationDeleteModal(false)
  }
  const unsplashed = 'https://source.unsplash.com/200x200/'

  const handleDeleteItem = async (itemId: number) => {
    try {
      const token = localStorage.getItem('token');
  
      const headers = {
        X_AUTH_TOKEN: token,
        'Content-Type': 'application/json',
      };
  
      const tabvalue = router.query.tab;
      const response = await AXIOS_INSTANCE.delete(
        `deletePortFolio?portfolio_id=${tabvalue}`,
        { headers }
      )
  
      if (response.status === 200) {
        console.log('reversedPortFolio', reversedPortFolio);
        const deletedIndex = reversedPortFolio.findIndex(
          (item) => item.portfolio_id === tabvalue
        );
        console.log('deleteIndex', deletedIndex);
  
        if (deletedIndex < reversedPortFolio.length - 1) {
          const nextItem = reversedPortFolio[deletedIndex + 1];
          console.log('nextItem', nextItem.portfolio_id);
          router.push(`/dashboard/portfolio-view?tab=${nextItem.portfolio_id}`);
          checkInvestmentIsTrue(nextItem.portfolio_id)
        } else if (deletedIndex > 0) {
          const previousItem = reversedPortFolio[deletedIndex - 1];
          console.log('previousItem', previousItem);
          router.push(`/dashboard/portfolio-view?tab=${previousItem.portfolio_id}`);
          checkInvestmentIsTrue(previousItem.portfolio_id)
        } else {
          router.push(`/dashboard`);
        }
      }
  
      setConfirmationDeleteModal(false);
    
      getPortFolio();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const checkInvestmentIsTrue = async (id)=>{
    try {
      const token = localStorage.getItem('token')
      const headers = {
        X_AUTH_TOKEN: token,
        'Content-Type': 'application/json',
      }

    
      const response = await AXIOS_INSTANCE.get(
        `/getInvestments/${id}`,
        { headers }
      )
      if (response.status === 200) {
        if (response.data.length === 0) {
          router.push({
            pathname: `/dashboard/portfolio/listportfolio/tab=${id}`,
            // query: { responseData: JSON.stringify(setRouterQuery[0]) },
          })
        } else {
          router.push(`/dashboard/portfolio-view?tab=${id}`)
        }
      } else {
        console.error('Error fetching stock quote data:')
      }
    } catch (error) {
      console.error('Error fetching stock quote data:', error)
    }
  }

  const renamePortfolio = async () => {
    const token = localStorage.getItem('token')
    const tabvalue = router.query.tab
    const renameData = {
      portfolio_id: tabvalue,
      portfolio_name: typedText,
    }
    const headers = {
      X_AUTH_TOKEN: token,
      // 'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    try {
     
      const response = await AXIOS_INSTANCE.post(
        `renamePortFolio`,
        renameData,
        { headers }
      )
      // console.log('Post successful:', response.data)
      if (response.data) {
        setRenameModal(false)
        getPortFolio()
      }
    } catch (error) {
      console.error('Error posting data:', error)
      setRenameModal(false)
    }
  }
  const handleHorizantalScroll = (
    element: HTMLDivElement | null, // Specify the type as HTMLDivElement or null (if using a ref)
    speed: number,
    distance: number,
    step: number
  ) => {
    if (!element) return // Add a null check to avoid errors if 'element' is null

    let scrollAmount = 0
    const slideTimer = setInterval(() => {
      if (element) {
        element.scrollLeft += step
        scrollAmount += Math.abs(step)
        if (scrollAmount >= distance) {
          clearInterval(slideTimer)
        }
        if (element.scrollLeft === 0) {
          setArrowDisable(true)

          // setArrowDisable1(false);
        } else {
          setArrowDisable(false)
          setArrowDisable1(false)

          // setArrowDisable1(true);
        }
      }
    }, speed)
  }
  const handleHorizantalScroll1 = (
    element: HTMLDivElement | null,
    speed: number,
    distance: number,
    step: number
  ) => {
    if (!element) return

    let scrollAmount = 0
    const maxScroll = element.scrollWidth - element.clientWidth

    const slideTimer = setInterval(() => {
      if (element) {
        element.scrollLeft += step
        scrollAmount += Math.abs(step)

        if (element.scrollLeft === maxScroll) {
          setArrowDisable1(true)
        } else {
          setArrowDisable1(false)
          setArrowDisable(false)
        }

        if (scrollAmount >= distance || element.scrollLeft === maxScroll) {
          clearInterval(slideTimer)
        }
      }
    }, speed)
  }

  const tab: NavItemType = router.query?.tab as NavItemType
  const [activeTab, setActiveTab] = useState<NavItemType>(tab)

  useEffect(() => {
   
    if (tab) setActiveTab(tab)
    else if (router.isReady)
      router.push(
        addQueryParamsToUrl({ tab: '5bcde385-891c-4d12-a1b2-4919ab847b82' })
      )
  }, [tab, router.isReady])

  const getActivePortfolioName = () => {
    const activePortfolio = portFolio.find(
      (portfolio) => portfolio.portfolio_id === activeTab
    )
    return activePortfolio ? activePortfolio.portfolio_name : ''
    
  }


  const getPortFolio = async () => {
    const token = localStorage.getItem('token')

    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }
    try {
  
      const response = await AXIOS_INSTANCE.get(
        `getPortFolioList`,
        { headers }
      )
      setPortFolio(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const getPeerList = async () => {
   
    const equitySymbols = handleInsideData?.map((item) => item.equity_symbol)
    if (equitySymbols.length === 0) {
   
      return
    } else {
      const symbolsParam = equitySymbols.join(',')
      const token = localStorage.getItem('token')
      const headers = {
        X_AUTH_TOKEN: token,
        'Content-Type': 'application/json',
      }
      try {
       
        const response = await AXIOS_INSTANCE.get(
          `getPeerList/?symbol=${symbolsParam}`,
          { headers }
        )

        if (response.status === 200) {
          await getPeerStockQuotes(response.data)
          // setIsLoading(true)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }
  // {bystock && !isNaN(sectorDataForPieChart) && getPeerList()}

  const getPeerStockQuotes = async (symbol: string[]) => {
    const token = localStorage.getItem('token')
    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }

    try {
    
      const response = await AXIOS_INSTANCE.post(
        `getPeerStockQuotes/${symbol}`,
        symbol,
        { headers }
      )
      if (response.status === 200) {
        setTimeout(() => {
          setIsLoading(false)
        }, 3000)
        setGetPeerStockQuotesdata(response.data)
      }
    } catch (error) {
      console.error('Error posting data:', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    if (handleInsideData && handleInsideData.length > 0) {
      // getPeerList();
      const hasStocks = handleInsideData.some(item => item?.equity_type === 'stock');
      if (hasStocks) {
        getPeerList();
      } else {
        setGetPeerStockQuotesdata([])
        
        setIsLoading(false); 
      }
    } else {
      setTimeout(() => {
        setGetPeerStockQuotesdata([])
        setIsLoading(false)
      }, 3000)
    }
  }, [handleInsideData])
  useEffect(() => {
    getPortFolio()
    
  }, [])
  // useEffect(()=>{

  //   // Check if reversedPortFolio is not null or undefined and has a length property
  //   if (reversedPortFolio && reversedPortFolio.length < 20) {
  //     setArrowDisable1(true);
  //   } else {
  //     setArrowDisable1(false);
  //   }
  // },[reversedPortFolio.length])
  useEffect(() => {
    const updateOverflowStatus = () => {
      const element = document.getElementById('port')

      if (element) {
        // Check for overflow and set arrowDisable1 accordingly
        const hasOverflow = element.scrollWidth > element.clientWidth
        setArrowDisable1(!hasOverflow) // Set to true when there is no overflow, false otherwise
      }
    }

    const handleEvents = () => {
      updateOverflowStatus()
    }

    // Set initial overflow status
    updateOverflowStatus()

    // Attach event listeners for window resize, load, and transitionend
    window.addEventListener('resize', handleEvents)
    window.addEventListener('load', handleEvents)
    window.addEventListener('transitionend', handleEvents)

    // Check for overflow after a small delay
    const timeoutId = setTimeout(() => {
      handleEvents()
    }, 100)

    // Cleanup event listeners on component unmount and clear timeout
    return () => {
      window.removeEventListener('resize', handleEvents)
      window.removeEventListener('load', handleEvents)
      window.removeEventListener('transitionend', handleEvents)
      clearTimeout(timeoutId)
    }
  }, []) // Empty dependency array ensures that this effect runs only once on mount

  return (
    <div className={styles.wrapper} style={{ display: 'grid' }}>
      {/* <div className={styles.buttonContianer} style={{
        border: "1px solid hsl(0, 0%, 21%)",
        borderRadius: "4px", padding: "0.75rem"
      }}> */}
      <div className={styles.buttonContianer}>
        <div>
          <Button
            disabled={arrowDisable}
            onClick={() => {
              handleHorizantalScroll(elementRef.current, 25, 100, -10)
            }}
            className="is-small is-warning mt-1"
          >
            <Icon className="is-small">
              <FaChevronLeft />
            </Icon>
          </Button>
        </div>
        <div id="port" className={styles.imgContainer} ref={elementRef}>
          <div className={styles.bottom_info}>
            <nav className={styles.bottom_info_nav}>
              {reversedPortFolio &&
                reversedPortFolio.map((portfolio, index) => (
                  <div
                    style={{ textTransform: 'capitalize' }}
                    role="button"
                    className={`${styles.nav_item} ${activeTab === portfolio.portfolio_id ? styles.active : ''
                      }`}
                    key={index}
                    onClick={() => handleClickTab(portfolio.portfolio_id)}
                  >
                    {activeTab === portfolio.portfolio_id && (
                      <motion.div className={styles.floating_bg} />
                    )}
                    <div className={styles.overflow_texttab}>
                      <span>{portfolio.portfolio_name}</span>
                    </div>
                  </div>
                ))}
              <Link href="/dashboard/portfolio">
                <Button
                  className="is-warning is-small has-text-weight-semibold"
                  onClick={openModal}
                  style={{ marginLeft: '10px' }}
                >
                  <IoMdAdd />
                  <span>New Portfolio</span>
                </Button>
              </Link>
            </nav>
          </div>
        </div>
        <div>
          <Button
            disabled={arrowDisable1}
            onClick={() => {
              handleHorizantalScroll1(elementRef.current, 25, 100, 10)
            }}
            className="is-small is-warning mt-1"
          >
            <Icon className="is-small">
              <FaChevronRight />
            </Icon>
          </Button>
        </div>
      </div>
      <motion.div
        animate={{ height: '443px' }}
        className={styles.top_grid}
      >
        <div className={styles.top_info}>


          {confirmationDeleteModal && (
            <Modal width="30vw" close={() => setConfirmationDeleteModal(false)}>
              <div>
                {portFolio &&
                  portFolio.map((portfolio) =>
                    portfolio.portfolio_id === activeTab ? (
                      <p
                        className="is-size-6 has-tw-bold"
                        key={portfolio.portfolio_id}
                      >
                        Do you really want to delete this Portfolio:{' '}
                        {portfolio.portfolio_name} ?
                      </p>
                    ) : null
                  )}

                <div className="buttons is-centered mt-5 are-small">
                  <Button onClick={handleDeleteItemClickfalse}>Cancel</Button>
                  <Button
                    className="is-danger"
                    onClick={() => handleDeleteItem(1)}
                  >
                    Delete Portfolio
                  </Button>
                </div>
              </div>
            </Modal>
          )}
          {confirmationDeleteModal1 && (
            <Modal
              width="30vw"
              close={() => setConfirmationDeleteModal1(false)}
            >
              <div>
                {portFolio &&
                  portFolio.map((portfolio) =>
                    portfolio.portfolio_id === activeTab ? (
                      <p
                        className="is-size-6 has-tw-bold"
                        key={portfolio.portfolio_id}
                      >
                        Do you really want to delete this Portfolsssssio:{' '}
                        {portfolio.portfolio_name}
                      </p>
                    ) : null
                  )}

                <div className="buttons is-centered mt-5 are-small">
                  <Button onClick={handleDeleteItemClickfalse1}>Cancel</Button>
                  <Button
                    className="is-danger"
                    onClick={() => handleDeleteItem(1)}
                  >
                    Delete Portfolio
                  </Button>
                </div>
              </div>
            </Modal>
          )}
          {renameModal && (
            <Modal close={handleCloseModal} isSmall>
              <p className="is-size-5 mb-3">Rename Portfolio</p>
              <div className={styles.inputPortfolio}>
                <Input
                  type="text"
                  cSize="small"
                  label="Rename Portfolio"
                  onChange={handleInputChange}
                  value={typedText ?? getActivePortfolioName()}
                />
              </div>
              <div className={styles.displayBtn}>
                <Button
                  size="small"
                  className="is-warning"
                  onClick={() => renamePortfolio()}
                >
                  <Icon>
                    <BiSave />
                  </Icon>
                  <span>Rename Portfolio </span>
                </Button>
              </div>
            </Modal>
          )}
 {!isNaN(bystock) && bystock !== 0 ? (
          <div className=" is-relative">
         
            <Chart
              activeid={activeTab}
              symbol={symbol1}
              title={`${symbol1} Chart`}
              shouldFetch={shouldFetch}
              newItem={changeLineChart}
            />
          
          </div>
          ):
        (
          <div className=" has-text-grey is-size-7 has-text-centered mt-2" style={{paddingTop:'200px'}}>
          No Data Found{' '}
        </div>
        )}
        </div>
        <div className="p-3 is-relative">
          <div className={styles.recent_news}>
            <p
              className="section-title is-justify-content-space-between"
              style={{ display: 'flex' }}
            >
              <p>Portfolio highlights</p>

              <HiOutlineDotsVertical
                size={25}
                onClick={toggleSmallModal}
                style={{
                  cursor: 'pointer',
                }}
              />
            </p>

            <div style={{ position: 'absolute', right: 225, top: 36 }}>
              {showSmallModal && (
                <div>
                  <AnimatePresence>
                    {showSmallModal && (
                      <ClickAwayListener onClickAway={handleClickAway}>
                        <div>
                          <div
                            className={styles.menu_wrapper}
                            style={{ zIndex: 999999 }}
                          >
                            <motion.div
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              variants={TOP_TO_BOTTOM_MENU_VARIANT}
                              className={styles.menu}
                            >
                              <div
                                role="button"
                                className={styles.menu_item_edit}
                                onClick={() => setRenameModal(true)}
                                style={{
                                  cursor: 'pointer',
                                }}
                              >
                                <span
                                  style={{
                                    marginRight: '4px',
                                    marginTop: '2px',
                                  }}
                                >
                                  <AiOutlineEdit />
                                </span>
                                Edit Portfolio
                              </div>
                              <div
                                role="button"
                                className={styles.menu_item_edit}
                                // onClick={handleDeleteItemClick}
                                style={{
                                  cursor: 'pointer',
                                }}
                              >
                                <span
                                  style={{
                                    marginRight: '4px',
                                    marginTop: '2px',
                                  }}
                                >
                                  <FaDownload />
                                </span>
                                Download
                              </div>
                              <div
                                role="button"
                                className={styles.menu_item_edit}
                                onClick={handleDeleteItemClick}
                                style={{
                                  cursor: 'pointer',
                                }}
                              >
                                <span
                                  style={{
                                    marginRight: '4px',
                                    marginTop: '2px',
                                  }}
                                >
                                  {' '}
                                  <AiOutlineDelete />
                                </span>
                                Delete
                              </div>

                              {/* {/ </Link> /} */}
                            </motion.div>
                          </div>
                        </div>
                      </ClickAwayListener>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <div style={{width: '250px' }}>
                <div className={styles.table}>
                  <div className={styles.key_metrics_wrapper}>
                    <div className={styles.key_metrics_item}>
                      <div className={`${styles.head} py-2`}>DAY GAIN</div>
                      <div>
                      <div className={`${styles.content} py-1`}>
                          <p
                            style={{
                              fontSize: '1rem',
                              fontWeight: '700',
                              color:
                                isNaN(sumOneGains)
                                  ? 'hsl(141, 99%, 49%)'
                                  : sumOneGains < 0
                                    ? '#f63148'
                                    : 'hsl(141, 99%, 49%)'
                            }}
                          >
                            {isNaN(sumOneGains) || sumOneGains === 0 ? (
                              ' '
                            ) : (
                              !isNaN(sumOneGains) ? (
                                round(sumOneGains) > 0 ? (
                                  <AiOutlineArrowUp />
                                ) : (
                                  <AiOutlineArrowDown />
                                )
                              ) : ' '
                            )}
                            {isNaN(sumOneGains) || sumOneGains === 0 ? '-' : `${round(sumOneGains)}`}
                          </p>


                          {/* {round(sumOneGains)} */}
                        </div>

                        <div
                          className={styles.content}
                          style={{ marginTop: '5px' }}
                        >
                          <p
                            style={{
                              fontSize: '1rem',
                              fontWeight: '700',
                              color:
                                isNaN(uptoone)
                                  ? 'hsl(141, 99%, 49%)'
                                  : uptoone < 0
                                    ? '#f63148'
                                    : 'hsl(141, 99%, 49%)'
                            }}
                          >
                            {isNaN(uptoone) || uptoone === 0 ? (
                              ' '
                            ) : (
                              !isNaN(uptoone) ? (
                                round(uptoone) > 0 ? (
                                  <AiOutlineArrowUp />
                                ) : (
                                  <AiOutlineArrowDown />
                                )
                              ) : ' '
                            )}
                            {isNaN(uptoone) || uptoone === 0 ? '-' : `${round(uptoone)}%`}
                          </p>

                        </div>
                      </div>
                    </div>

                    <div className={styles.key_metrics_item}>
                      <div className={`${styles.head} py-2`}>TOTAL GAIN</div>
                      <div>
                        <div className={`${styles.content} py-1`}>
                          <p
                            style={{
                              fontSize: '1rem',
                              fontWeight: '700',
                              color:
                                isNaN(sumTotalGain)
                                  ? 'hsl(141, 99%, 49%)'
                                  : sumTotalGain < 0
                                    ? '#f63148'
                                    : 'hsl(141, 99%, 49%)'
                            }}
                          >
                            {isNaN(sumTotalGain) || sumTotalGain === 0 ? (
                              ' '
                            ) : (
                              !isNaN(sumTotalGain) ? (
                                round(sumTotalGain) > 0 ? (
                                  <AiOutlineArrowUp />
                                ) : (
                                  <AiOutlineArrowDown />
                                )
                              ) : ' '
                            )}
                            {isNaN(sumTotalGain) || sumTotalGain === 0 ? '-' : `$${round(sumTotalGain)}`}
                          </p>

                        </div>
                        <div
                          className={styles.content}
                          style={{ marginTop: '5px' }}
                        >
                          {/* <span style={{fontSize: "0.75rem",color:"hsl(0, 0%, 48%)",
    textTransform:"uppercase"}}>up</span> {round(uptototal)}% */}
                          <p
                            style={{
                              fontSize: '1rem',
                              fontWeight: '700',
                              color:
                                isNaN(uptototal)
                                  ? 'hsl(141, 99%, 49%)'
                                  : uptototal < 0
                                    ? '#f63148'
                                    : 'hsl(141, 99%, 49%)'
                            }}
                          >
                            {isNaN(uptototal) || uptototal === 0 ? (
                              ' '
                            ) : (
                              !isNaN(uptototal) ? (
                                round(uptototal) > 0 ? (
                                  <AiOutlineArrowUp />
                                ) : (
                                  <AiOutlineArrowDown />
                                )
                              ) : ' '
                            )}



                            {isNaN(uptototal) || uptototal === 0 ? '-' : `${round(uptototal)}%`}
                          </p>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={`${styles.key_metrics_item} py-1` }>
                      {/* <div className={styles.head}> STOCKS</div> */}
                      <div>
                        {/* <div className={styles.content}>
                          {roundone(bystock)}%{' '}
                          <span
                            style={{
                              fontSize: '0.75rem',
                              color: 'hsl(0, 0%, 48%)',
                              textTransform: 'uppercase',
                            }}
                          >
                            STOCKS
                          </span>
                        </div> */}
                       <div className={`${styles.content} pt-5`}>
                          {!isNaN(bystock) && bystock !== 0 ? (
                            <>
                              {roundone(bystock)}%{' '}
                              <span
                                style={{
                                  fontSize: '0.75rem',
                                  color: 'hsl(0, 0%, 48%)',
                                  textTransform: 'uppercase',
                                }}
                              >
                                STOCKS
                              </span>
                            </>
                          ) : (
                            <>
                              {'- '}
                              <span
                                style={{
                                  fontSize: '0.75rem',
                                  color: 'hsl(0, 0%, 48%)',
                                  textTransform: 'uppercase',
                                }}
                              >
                                STOCKS
                              </span>
                            </>
                          )}
                        </div>

                        {/* <div className={`${styles.content} py-4`}>
                          {!isNaN(bycash) && bycash !== 0 ? (
                            <>
                              {roundone(bycash)}%{' '}
                              <span
                                style={{
                                  fontSize: '0.75rem',
                                  color: 'hsl(0, 0%, 48%)',
                                  textTransform: 'uppercase',
                                 
                                }}
                              >
                                cash
                              </span>
                            </>
                          ) : (
                            <>
                              {'- '}
                              <span
                                style={{
                                  fontSize: '0.75rem',
                                  color: 'hsl(0, 0%, 48%)',
                                  textTransform: 'uppercase',
                                }}
                              >
                                cash
                              </span>
                            </>
                          )}
                        </div> */}
                        <div className={`${styles.content} py-4`}>
  {!isNaN(bycash) && bycash !== 0 ? (
    <>
      {roundone(bycash)}%{' '}
      <span
        style={{
          fontSize: '0.75rem',
          color: 'hsl(0, 0%, 48%)',
          textTransform: 'uppercase',
        }}
      >
        cash
      </span>
    </>
  ) : cashAmount !== undefined && cashAmount !== null && cashAmount !== 0 ? (
    <>
   100%{' '}
      <span
        style={{
          fontSize: '0.75rem',
          color: 'hsl(0, 0%, 48%)',
          textTransform: 'uppercase',
        }}
      >
        cash
      </span>
    </>
  ) : (
    <>
      {'- '}
      <span
        style={{
          fontSize: '0.75rem',
          color: 'hsl(0, 0%, 48%)',
          textTransform: 'uppercase',
        }}
      >
        cash
      </span>
    </>
  )}
</div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {/* <PieChart
                  cashPercentage={bycash || 0}
                  stockPercentage={bystock || 0}
                /> */}
               {!isNaN(bystock) && bystock !== 0 ? (
                 <PieChart sectorDataForPieChart={sectorDataForPieChart}
                 />
               ):null }
              </div>
            </div>
            <div style={{ borderBottom: '1px solid hsl(0deg, 0%, 21%)' }}>
              <div className='my-3'>
                <p className={styles.news_title}>Portfolio Market Cap {" "}{isNaN(mcap) || (mcap) === 0 ? '-' : `${round(mcap)}`}</p>
              </div>
            </div>
            <div style={{ borderBottom: '1px solid hsl(0deg, 0%, 21%)' }}>
              <div className='my-3'>
                <p className={styles.news_title}>
                60% Large cap, 30% Mid Cap, 10% Small cap{" "}
                  {/* {isNaN(((60 * mcap) / 100)) || ((60 * mcap) / 100) === 0 ? '-' : `${round(((60 * mcap) / 100))}`} */}
                </p>
              </div>
            </div>
            {/* <div style={{ borderBottom: '1px solid hsl(0deg, 0%, 21%)' }}>
              <div style={{ margin: '10px' }}>
                <p className={styles.news_title}>
                  30% Mid Cap {""}
                  {isNaN(((30 * mcap) / 100)) || ((30 * mcap) / 100) === 0 ? '-' : `${round(((30 * mcap) / 100))}`}
                </p>
              </div>
            </div>
            <div style={{ borderBottom: '1px solid hsl(0deg, 0%, 21%)' }}>
              <div style={{ margin: '10px' }}>
                <p className={styles.news_title}>
                  10% Small Cap {" "}
                  {isNaN(((10 * mcap) / 100)) || ((10 * mcap) / 100) === 0 ? '-' : `${round(((10 * mcap) / 100))}`}
                </p>
              </div>
            </div> */}

            {/* <div style={{ borderBottom: '1px solid hsl(0deg, 0%, 21%)' }}>
              <div style={{ margin: '10px' }}>
                <p className={styles.news_title}>100% Sector Wise Allocation</p>
              </div>
            </div> */}
            <div style={{ borderBottom: '1px solid hsl(0deg, 0%, 21%)' }}>
              <div className='my-3'>
                <p className={styles.news_title}>
                Portfolio P/E{" "}{isNaN(peCalculation) || (peCalculation) === 0 ? '-' : `${round(peCalculation)}`}
                </p>
              </div>
            </div>
            {/* <div style={{ borderBottom: '1px solid hsl(0deg, 0%, 21%)' }}>
              <div style={{ margin: '10px' }}>
                <p className={styles.news_title}>100% Return</p>
              </div>
            </div> */}
          </div>
        </div>
      </motion.div>
      <motion.div
        animate={{ height:'auto' }}
        className={styles.top_grid2}
      >
        <div className={styles.top_info}>
          <OverviewSection onDataReceived={handleInside}/>
        </div>
      </motion.div>
      <div style={{ display: 'flex' }}>
        <div
          className="column is-6"
          style={{
            paddingRight: '0.25rem',
            paddingLeft: '0px',
            paddingTop: '0px',
            paddingBottom: '0px',
          }}
        >
          <div>
            <motion.div
              animate={{ height:'auto' }}
              className={styles.top_grid1}
            >
              <div
                className="px-3 pt-3 pb-2 is-relative"
                style={{ overflowY: 'scroll' }}
              >
                <p className="section-title">RECENTLY SEARCHED</p>
                <div style={{ overflowY: 'scroll', paddingBottom: '0.5rem' }}>
                  {isLoading ? (
                    <LoadingSection />
                  ) : peerStockQuotesData?.length ? (
                    <>
                      <div className="is-flex mt-3 is-gap">
                        {peerStockQuotesData.map((data, index) => (
                          <div key={index} className={styles.port_data_section}>
                            <div>
                              <div className="table_item">
                                <p
                                  style={{
                                    textAlign: 'center',
                                    width: '140px ',
                                  }}
                                  className="section-title"
                                >
                                  {data.equity_symbol}
                                </p>
                                <div
                                  style={{
                                    marginBottom: '4px',
                                    height: '40px',
                                    width: '140px ',
                                  }}
                                  title={data.equity_name}
                                  className={`${styles.overflow_text1} py-2 table_head is-size-7`}
                                >
                                  <span>{data.equity_name}</span>
                                </div>
                                <p
                                  style={{
                                    textAlign: 'center',
                                    fontSize: '1rem',
                                    fontWeight: '700',
                                    color:
                                      data?.current_price < 0
                                        ? '#f63148'
                                        : 'hsl(141, 99%, 49%)',
                                  }}
                                >
                                  ${round(data?.current_price)}
                                </p>
                                <div>
                                  <p
                                    style={{
                                      textAlign: 'center',
                                      fontSize: '1rem',
                                      fontWeight: '700',
                                      color:
                                        data.previous_close < 0
                                          ? '#f63148'
                                          : 'hsl(141, 99%, 49%)',
                                    }}
                                  >
                                    {round(data.previous_close) > 0 ? (
                                      <AiOutlineArrowUp />
                                    ) : (
                                      <AiOutlineArrowDown />
                                    )}
                                    {round(data.previous_close)}%
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className=" has-text-grey is-size-7 has-text-centered mt-2">
                      No Data Found{' '}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div
          className="column is-6"
          style={{
            paddingLeft: '0.25rem',
            paddingRight: '0px',
            paddingTop: '0px',
            paddingBottom: '0px',
          }}
        >
          <div>
            <motion.div
              animate={{ height: 'auto' }}
              className={styles.top_grid1}
            >
              <div
                className="px-3 pt-3 pb-2 is-relative"
                style={{ overflowY: 'scroll' }}
              >
                <p className="section-title">Discover More</p>
                <div style={{ overflowY: 'scroll', paddingBottom: '0.5rem' }}>
                  {isLoading ? (
                    <LoadingSection />
                  ) : peerStockQuotesData?.length ? (
                    <>
                      <div className="is-flex mt-3 is-gap">
                        {peerStockQuotesData.map((data, index) => (
                          <div key={index} className={styles.port_data_section}>
                            <div>
                              <div className="table_item">
                                <p
                                  style={{
                                    textAlign: 'center',
                                    width: '140px ',
                                  }}
                                  className="section-title"
                                >
                                  {data.equity_symbol}
                                </p>
                                <div
                                  style={{
                                    marginBottom: '4px',
                                    height: '40px',
                                    width: '140px ',
                                  }}
                                  title={data.equity_name}
                                  className={`${styles.overflow_text1} py-2 table_head is-size-7`}
                                >
                                  <span>{data.equity_name}</span>
                                </div>
                                <p
                                  style={{
                                    textAlign: 'center',
                                    fontSize: '1rem',
                                    fontWeight: '700',
                                    color:
                                      data?.current_price < 0
                                        ? '#f63148'
                                        : 'hsl(141, 99%, 49%)',
                                  }}
                                >
                                  ${round(data?.current_price)}
                                </p>
                                <div>
                                  <p
                                    style={{
                                      textAlign: 'center',
                                      fontSize: '1rem',
                                      fontWeight: '700',
                                      color:
                                        data.previous_close < 0
                                          ? '#f63148'
                                          : 'hsl(141, 99%, 49%)',
                                    }}
                                  >
                                    {round(data.previous_close) > 0 ? (
                                      <AiOutlineArrowUp />
                                    ) : (
                                      <AiOutlineArrowDown />
                                    )}
                                    {round(data.previous_close)}%
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className=" has-text-grey is-size-7 has-text-centered mt-2">
                      No Data Found{' '}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
        animate={{ height:'auto' }}
        className={styles.top_grid2}
      >
        <div className={styles.grid}>
          {/* <News handleInsideData={handleInsideData} /> */}
          {!isNaN(bystock) && bystock !== 0 ? (
            <News 
            handleInsideData={handleInsideData} 
            newItemdata={changeLineChart}  />
          ) : (
            <div>
              <div className={styles.recent_news1}>
                <p className="section-title">Key Update</p>
                <div className={styles.news_item_wrapper}>
                  <div className=" has-text-grey is-size-7 has-text-centered mt-2 mb-2">
                    No Data Found{' '}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
export default MainSectionView
