import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { IS_CLIENT, OVERVIEW_DATA } from '../../../constants'
import LoadingSection from 'components/Loader/LoadingSection'
import Modal from 'components/Modal/Modal'
import Grid from 'components/Overview/Grid'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { GoPencil } from 'react-icons/go'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { IoMdAdd } from 'react-icons/io'
import SectionWrapper from 'components/Overview/SectionWrapper'
import SubSectionWrapper from 'components/Overview/SubSectionWrapper'
import Value from 'components/Overview/Value'
import Button from 'components/Button/Button'
import styles from './index.module.scss'
import useFetch from '../../../hooks/useFetch'
import { round } from 'utilities/round'
import { CiMenuKebab } from 'react-icons/ci'
import { RxHamburgerMenu } from 'react-icons/rx'
import { RxCross2 } from 'react-icons/rx'
import LoaderOverlay from '../../../components/Loader/LoaderOverlay'
import convertNumberToReadable from 'utilities/convertNumberToReadable'
import { AXIOS_INSTANCE } from '../../../constants'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import ModalAddPortfolio from './ModalAddPortfolio'
import Link from 'next/link'
import { MdDateRange, MdDelete } from 'react-icons/md'
import axios from 'axios'
import { useRouter } from 'next/router'
import Input from 'components/Input/Input'
import Icon from 'components/Icon/Icon'
import { BiSave } from 'react-icons/bi'
import DatePicker from 'react-datepicker'
import { TbMinus } from 'react-icons/tb'
import { getAllHistoricalDataResponseInterface } from '../../../components/pages/stock/BottomSection/tabs/Price/PriceTypes'

interface CompanyProfileData {
  industry: string
  sector: string
  market_cap: number | string
  market_size: number | string
}

interface StockQuoteData {
  current_price: number | string
}
interface getAllHistorical {
  previews: number | string
  week: number | string
  year: number | string
  month: number | string
}
interface GroupedData {
  [key: string]: InvestmentData[]
}

interface InvestmentData {
  equity_symbol: string
  quantity: number
  amount: number
  price: number
  purchase_date: string
  equity_type: string
  portfolio_item_id: string
  companyProfile: CompanyProfileData
  stockquotedata: StockQuoteData
  getallhistorical: getAllHistorical
}
interface RecordPurchase {
  count: number
  date: Date | null
  purchasePrice: number
  portfolioItemId: string | ' '
}
interface Recordcash {
  amount: number
  portfolioItemId: string | ' '
}
interface StockData {
  date: string
  close: number
}

const STATIC_OVERVIEW_DATA = {
  regions: [
    {
      region_name: 'Region 1',
      indexes: [
        /*Add index data here */
      ],
    },
    {
      region_name: 'Region 2',
      indexes: [
        /*Add index data here */
      ],
    },
    // Add more regions as needed
  ],
}

const localStorageKey = 'overviewAccordion'
let initialAccordion = {}
if (IS_CLIENT && localStorage.getItem(localStorageKey)) {
  initialAccordion = JSON.parse(localStorage.getItem(localStorageKey) || '{}')
}

const OverviewSection = ({ onDataReceived }) => {
  const router = useRouter()
  const [cashAmount, setCashAmount] = useState(0)

  const [isHovering, setIsHovering] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showModalInvestment, setShowModalInvestment] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState(
    STATIC_OVERVIEW_DATA.regions[0].region_name
  )
  const item = STATIC_OVERVIEW_DATA.regions.find(
    (i) => i.region_name === selectedRegion
  )
  const [groupedData, setGroupedData] = useState<InvestmentData[]>([])

  const [insideData, setInsideData] = useState<InvestmentData[]>([])
  const [isItemOpen, setItemOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [openIndexs, setOpenIndexs] = useState<number | null>(null)
  const [isArrowDown, setArrowDown] = useState(true)
  const [showText, setShowText] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showMenuOptions, setShowMenuOptions] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false)
  const [deleteIconHoverIndex, setdeleteIconHoverIndex] =
    useState<boolean>(false)
  const [apiResponse, setApiResponse] = useState<InvestmentData[]>([])
  const [recordModalShow, seteRcordModalShow] = useState<boolean>(false)
  const [cashModalShow, setcashModalShow] = useState<boolean>(false)
  const [purchaseData, setPurchaseData] = useState<RecordPurchase>({
    count: 1,
    date: new Date(),
    purchasePrice: 0,
  })
  // console.log(purchaseData,'purchaseDataaaaa');
  const [cashData, setCashData] = useState<Recordcash>()

  const [saveRecordData, setSaveRecordData] = useState<InvestmentData[]>([])
  const [confirmationDeleteModal1, setConfirmationDeleteModal1] =
    useState(false)
  const [getinvest, setgetinvest] = useState()
  const [addcash, setAddcash] = useState(false)
  const [cashinput, setCashinput] = useState(0)
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null)
  const [allInvestmentDeleteString, setAllInvestmentDeleteString] = useState('')
  const [
    confirmationDeleteAllInvestmentModal,
    SetConfirmationDeleteAllInvestmentModal,
  ] = useState(false)
  const [plusIconAddModal, setPlusIconAddModal] = useState(false)
  const [particularDeleteInvestment, setParticularDeleteInvestment] =
    useState('')
  const [fullInvestmentDeleteModal, SetFullInvestmentDeleteModal] =
    useState(false)
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [dateApiResponse, setDateApiResponse] = useState()
  const [sumOfCost, SetSumOfCost] = useState()
  const [cashObjectIsTrue, SetCashDataIsTrue] = useState(false)

  const handleDeleteItemClick = (itemId: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // document.documentElement.style.overflow = 'hidden';
    setSelectedItemId(itemId)
    setConfirmationDeleteModal1(true)
  }
  const modalOpenAddInvestment_AllDelete = () => {
    setPlusIconAddModal(!plusIconAddModal)
  }
  const handleDeleteItemClickfalse = () => {
    setConfirmationDeleteModal1(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // document.documentElement.style.overflow = 'auto';
  }
  const fullInvestmentModal = () => {
    setPlusIconAddModal(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    SetFullInvestmentDeleteModal(true)
  }

  const handleCiMenuKebabClick = () => {
    setShowDropdown(!showDropdown)
  }

  useEffect(() => {
    const fetchData = async () => {
      setInsideData([])
      setCashAmount(0)
      try {
        const token = localStorage.getItem('token')
        const headers = {
          X_AUTH_TOKEN: token,
          'Content-Type': 'application/json',
        }
        const tabValue = router.query.tab
        if (tabValue === undefined) {
          return null
        } else {
          const response = await AXIOS_INSTANCE.get<InvestmentData[]>(
            `getInvestments/${tabValue}`,
            { headers }
          )

          setgetinvest(response.data)
          console.log('response', response.data)
          setPlusIconAddModal(false)
          return response.data
        }
      } catch (error) {
        console.error('Error fetching stock quote data:', error)
      }
    }
    const updateStateWithData = async () => {
      try {
        setIsLoading(true)
        const apiResponseData = await fetchData()

        if (apiResponseData) {
          const mergeData = apiResponseData.reduce((acc, obj) => {
            const equity_symbol = obj.equity_symbol

            if (!acc[equity_symbol]) {
              acc[equity_symbol] = []
            }

            acc[equity_symbol].push(obj)

            return acc
          }, {})

          setTimeout(() => {
            setIsLoading(false)
          }, 3000)
          setDeleteSuccess(false)
          setGroupedData(mergeData)
        }
      } catch (error) {
        setIsLoading(false)
        console.error('An error occurred:', error)
      }
    }

    if (IS_CLIENT) {
      updateStateWithData()
    }
  }, [deleteSuccess, router.query.tab])

  useEffect(() => {
    const getAllHistoricalStockDataGroupWisenew = async (symbol: symbol) => {
      const token = localStorage.getItem('token')
      const headers = {
        X_AUTH_TOKEN: token,
        'Content-Type': 'application/json',
      }
      try {
        const response = await AXIOS_INSTANCE.get(
          `getAllHistoricalStockDataGroupWise?symbol=${symbol}`,
          { headers }
        )
        return response.data
      } catch (error) {
        console.error('Error posting data:', error)
      }
    }

    const getMarketOpenStatus = async (symbol: string) => {
      const token = localStorage.getItem('token')
      const headers = {
        X_AUTH_TOKEN: token,
        'Content-Type': 'application/json',
      }
      try {
        const response = await AXIOS_INSTANCE.get(
          `getMarketOpenStatus?symbol=${symbol}`,
          { headers }
        )
        return response.data
      } catch (error) {
        console.error('Error posting data:', error)
      }
    }

    const fetchData = async () => {
      if (groupedData) {
        let totalCost = 0
        let totalMarketValue = 0

        const groupingData: InvestmentData[] = await Promise.all(
          Object.entries(groupedData).map(async ([equity_symbol, data]) => {
            let pp = null
            if (equity_symbol === 'undefined' || equity_symbol === undefined) {
              const cash = data.reduce((sum, item) => sum + item.amount, 0)

              setCashAmount(cash)
              const cashdata = {
                cashAmount: cash,
              }
              SetCashDataIsTrue(true)
              return cashdata
            } else {
              // console.log('elseee')
              const quantity = data.reduce(
                (sum, entry: InvestmentData) => sum + entry.quantity,
                0
              )

              let amount = data.reduce(
                (sum, entry: InvestmentData) =>
                  sum + entry.amount * entry.quantity,
                0
              )

              const equity_type = data.length > 0 ? data[0].equity_type : ''
              const price = data.reduce(
                (sum, entry: InvestmentData) =>
                  sum + entry.amount * entry.quantity,
                0
              )

              const companyProfileApiResponse = await getCompanyProfileList(
                equity_symbol
              )

              const companyProfileData: CompanyProfileData = {
                industry: companyProfileApiResponse?.industry ?? 'N/A',
                sector: companyProfileApiResponse?.sector ?? 'N/A',
                market_cap:
                  companyProfileApiResponse?.basic_key_metrics?.market_cap,
                market_size:
                  companyProfileApiResponse?.company_valuation
                    ?.latest_annual_enterprise_value?.market_capitalization ??
                  'N/A',
                pe_current:
                  companyProfileApiResponse?.company_valuation?.pe_current ??
                  'N/A',
              }

              const market_cap_billionFormat = convertNumberToReadable(
                companyProfileData.market_size
              )
              const market_cap = parseFloat(
                market_cap_billionFormat.replace('B', '')
              )

              const stockQuoteDataApi = await getStockQuoteData(equity_symbol)
              const stockQuoteDataApidata: StockQuoteData = {
                current_price: stockQuoteDataApi?.current_price || 0,
                equity_name: stockQuoteDataApi?.equity_name,
              }
              const getall = await getAllHistoricalStockDataGroupWisenew(
                equity_symbol
              )

              const oneWeekData = await Promise.all(
                [getall].map(async (yearObject) => {
                  console.log("yearObject", yearObject)
                  const currentDate = new Date()
                  let dateFormate = formatDate2(currentDate)
                  const isMarketOpen = await getMarketOpenStatus(equity_symbol)
                  if (isMarketOpen.market_open) {
                    const years = Object.keys(getall)
                    const year = Object.keys(yearObject)[years.length - 1]
                    const months = Object.values(yearObject[year])
                    const allMonthData = months.flatMap(
                      (monthObject) => monthObject
                    )
                    const oneWeekDate = allMonthData[6].close
                    return oneWeekDate
                  } else {
                    const years = Object.keys(getall)
                    const year = Object.keys(yearObject)[years.length - 1]
                    // console.log('year', year)
                    const months = Object.values(yearObject[year])
                    console.log("month", months)
                    if (months.length > 5) {
                      console.log('ppppp')
                      const allMonthData = months.flatMap(
                        (monthObject) => monthObject
                      )
                      const oneWeekDate = allMonthData[5].close
                      return oneWeekDate

                    } else {
                      const year = Object.keys(yearObject)[years.length - 2]
                      // console.log('year', year)
                      const months = Object.values(yearObject[year])
                      const allMonthData = months.flatMap(
                        (monthObject) => monthObject
                      )
                      // console.log('allMonthData[5].close', allMonthData[5].close)
                      const oneWeekDate = allMonthData[5].close
                      return oneWeekDate

                    }

                  }
                })
              )
              // const oneWeekData = await Promise.all(
              //   [getall].map(async (yearObject) => {
              //     const currentDate = new Date()
              //     let dateFormate = formatDate2(currentDate)
              //     const isMarketOpen = await getMarketOpenStatus(equity_symbol)
              //     if (isMarketOpen.market_open) {
              //       const years = Object.keys(getall)
              //       const year = Object.keys(yearObject)[years.length - 1]
              //       const months = Object.values(yearObject[year])
              //       const allMonthData = months.flatMap(
              //         (monthObject) => monthObject
              //       )
              //       const oneWeekDate = allMonthData[6].close
              //       return oneWeekDate
              //     } else {
              //       const years = Object.keys(getall)
              //       const year = Object.keys(yearObject)[years.length - 1]
              //       // console.log('year', year)
              //       const months = Object.values(yearObject[year])
              //       const allMonthData = months.flatMap(
              //         (monthObject) => monthObject
              //       )
              //       const oneWeekDate = allMonthData[5].close
              //       return oneWeekDate
              //     }
              //   })
              // )


              const monthArray = [
                'JANUARY',
                'FEBRUARY',
                'MARCH',
                'APRIL',
                'MAY',
                'JUNE',
                'JULY',
                'AUGUST',
                'SEPTEMBER',
                'OCTOBER',
                'NOVEMBER',
                'DECEMBER',
              ]
              const oneDayGain = [getall].map(() => {
                const years = Object.keys(getall);
                const lastYear = years[years.length - 1];
                const currentDate = new Date();
                const oneDayAgo = new Date();
                oneDayAgo.setDate(oneDayAgo.getDate() - 2);
                const lastDayAgoDate = formatDate2(oneDayAgo);
                const dateSplit = lastDayAgoDate.split('-');
                const date = dateSplit[1];
                const lastDayAgoDateMonthNumber = monthArray[date - 1];
                const lastDate = getall[lastYear][lastDayAgoDateMonthNumber];
                if (lastDate.length > 5) {
                  let datatata = lastDate.find((item: any) => item.date == lastDayAgoDate);
                  // console.log('datatata', datatata);
              
                  if (datatata === undefined) {
                    const lastDateBefore = lastDate.filter(
                      (item: any) => new Date(item.date) < oneDayAgo
                    );
              
                    lastDateBefore.sort((a, b) => new Date(b.date) - new Date(a.date));
              
                    if (lastDateBefore.length > 0) {
                      return (datatata = lastDateBefore[0].close);
                    }
                  }
                  return datatata?.close;
                } else {
                  const lastYear = years[years.length - 2];
                  const lastDayAgoDateMonthNumber = monthArray["11"];
                  const lastDate = getall[lastYear][lastDayAgoDateMonthNumber];
                  const elseReturnValue = lastDate[0]?.close
                  return elseReturnValue;
                }
              });
              
              // const oneDayGain = [getall].map(() => {
              //   const years = Object.keys(getall)
              //   const lastYear = years[years.length - 1]
              //   console.log(lastYear,'lastYearrrrr');
                
              //   const currentDate = new Date()
              //   console.log(currentDate,'currentDate');
                
              //   const oneDayAgo = new Date()
              //   oneDayAgo.setDate(oneDayAgo.getDate() - 2)
              //   const lastDayAgoDate = formatDate2(oneDayAgo)
              //   const dateSplit = lastDayAgoDate.split('-')
              //   const date = dateSplit[1]
              //   const lastDayAgoDateMonthNumber = monthArray[date - 1]
              //   const lastDate = getall[lastYear][lastDayAgoDateMonthNumber]
              //   console.log(lastDate,'lastDate');
                
              //   let datatata = lastDate.find(
              //     (item: any) => item.date == lastDayAgoDate
              //   )
              //   if (datatata === undefined) {
              //     const lastDateBefore = lastDate.filter(
              //       (item: any) => new Date(item.date) < oneDayAgo
              //     )
              //     lastDateBefore.sort(
              //       (a, b) => new Date(b.date) - new Date(a.date)
              //     )
              //     if (lastDateBefore.length > 0) {
              //       return (datatata = lastDateBefore[0].close)
              //     }
              //   }
              //   return datatata?.close
              // })

              const data365DaysAgo = [getall].map((data) => {
                const currentDate = new Date()
                const oneYearAgo = new Date()
                oneYearAgo.setDate(oneYearAgo.getDate() - 365)
                const currentDateFormatted = currentDate
                  .toISOString()
                  .split('T')[0]
                const oneYearAgoFormatted = oneYearAgo
                  .toISOString()
                  .split('T')[0]
                const years = Object.keys(getall)
                const lastYear = Object.keys(data)[years.length - 2]
                const lastYearData = getall[lastYear]
                const lastYearDateSplit = oneYearAgoFormatted.split('-')[1]
                const lastYearMonth = monthArray[lastYearDateSplit - 1]
                let lyear = lastYearData[lastYearMonth]
                let lastdata = lyear.find(
                  (item: any) => item.date === oneYearAgoFormatted
                )
                if (lastdata == undefined) {
                  const earlierDates = lyear.filter(
                    (item: any) =>
                      new Date(item.date) < new Date(oneYearAgoFormatted)
                  )
                  earlierDates.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                  )
                  if (earlierDates.length > 0) {
                    return (lastdata = earlierDates[0].close)
                  } else {
                    const afterDates = lyear.filter(
                      (item: any) =>
                        new Date(item.date) > new Date(oneYearAgoFormatted)
                    )
                    return afterDates[afterDates.length - 1].close
                  }
                }
                return lastdata?.close
              })

              const lastMonthAgoData = [getall].map(() => {
                const years = Object.keys(getall)
                const lastYear = Object.keys(getall)[years.length - 1]
                const oneMonthAgo = new Date()
                oneMonthAgo.setDate(oneMonthAgo.getDate() - 30)
                let lastMonthAgoDate = formatDate2(oneMonthAgo)
                let dateSplit = lastMonthAgoDate.split('-')
                let lastMonthYear = dateSplit[0]
                let lastMonth = dateSplit[1]
                let lastMonthNumber = monthArray[lastMonth - 1]
                let lastMonthData = getall[lastMonthYear][lastMonthNumber]
                let datatata1 = lastMonthData.find(
                  (item) => item.date == lastMonthAgoDate
                )
                if (datatata1 === undefined) {
                  const earlierMonthDatesBefore = lastMonthData.filter(
                    (item) => new Date(item.date) < new Date(lastMonthAgoDate)
                  )
                  earlierMonthDatesBefore.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                  )
                  if (earlierMonthDatesBefore.length > 0) {
                    return (datatata1 = earlierMonthDatesBefore[0].close)
                  } else {
                    const afterDatesMonth = lastMonthData.filter(
                      (item) => new Date(item.date) > oneMonthAgo
                    )
                    return (datatata1 =
                      afterDatesMonth[afterDatesMonth.length - 1].close)
                  }
                }
                return datatata1?.close
              })

              const getallDataApidata: getAllHistorical = {
                previews: Number(oneDayGain),
                week: Number(oneWeekData),
                year: Number(data365DaysAgo),
                month: Number(lastMonthAgoData),
              }
              const oneDayGain2 =
                (stockQuoteDataApidata?.current_price / oneDayGain - 1) * 100
              const oneWeekDate2 =
                (stockQuoteDataApidata?.current_price / oneWeekData - 1) * 100
              const oneMonthAgo2 =
                (stockQuoteDataApidata?.current_price / lastMonthAgoData - 1) *
                100
              const data365DaysAgoDate =
                (stockQuoteDataApidata?.current_price / data365DaysAgo - 1) *
                100

              const marketValue = data.reduce(
                (sum, entry: InvestmentData) =>
                  sum + stockQuoteDataApidata?.current_price * entry.quantity,
                0
              )

              const totalReturn = (marketValue / amount - 1) * 100
              const totalGainByIndividual = marketValue - amount

              return {
                equity_symbol: equity_symbol,
                amount: amount,
                price: price,
                equity_type: equity_type,
                quantity: quantity,
                purchaseDate: '',
                companyProfile: companyProfileData,
                stockquoteData: stockQuoteDataApidata,
                previews: getallDataApidata,
                totalReturn: totalReturn,
                oneDayGain2: oneDayGain2,
                marketValue: marketValue,
                oneMonthAgo2: oneMonthAgo2,
                data365DaysAgoDate: data365DaysAgoDate,
                oneWeekDate2: oneWeekDate2,
                totalGainByIndividual: totalGainByIndividual,
                market_cap: market_cap,
                // cashAunt:cash,
                //  sumOfCost: totalCost,
                // sumOfMarketValue: totalMarketValue
              }
            }
          })
        )
        // const filteredArray = groupingData.filter(
        //   (item) =>
        //     item !== undefined &&
        //     item !== null &&
        //     item !== true &&
        //     !item.cashAmount
        // )
        // const sumOfCost = filteredArray.reduce(
        //   (sum, entry) => sum + entry.amount,
        //   0
        // )
        // const sumOfMarketValue = filteredArray.reduce(
        //   (sum, entry) => sum + entry.marketValue,
        //   0
        // )
        // const sumOfTotalGain_of_Individual = filteredArray.reduce(
        //   (sum, entry) => sum + entry.totalGainByIndividual,
        //   0
        // )
        // const Weighted_M_Cap = filteredArray.map(
        //   (item) =>
        //     +((item.market_cap * item.marketValue) / sumOfMarketValue).toFixed(
        //       2
        //     )
        // )
        // const Sum_of_Weighted_M_Cap = Weighted_M_Cap.reduce(
        //   (sum, value) => sum + value,
        //   0
        // )
        // const cashAmountObject = groupingData.find(
        //   (item) => item.cashAmount !== undefined
        // )

        // if (filteredArray.length > 0) {
        //   const lastObject = filteredArray[filteredArray.length - 1]
        //   lastObject.sumOfCost = sumOfCost
        //   lastObject.sumOfMarketValue = sumOfMarketValue
        //   lastObject.sumOfTotalGain_of_Individual = sumOfTotalGain_of_Individual
        //   lastObject.Sum_of_Weighted_M_Cap = Sum_of_Weighted_M_Cap

        //   if (cashAmountObject && cashAmountObject.cashAmount) {
        //     lastObject.cashAmount = cashAmountObject.cashAmount
        //   } else {
        //     lastObject.cashAmount = 0
        //   }
        // }

        // onDataReceived(filteredArray)
        // setInsideData(filteredArray)
        // if (groupingData.length === 1 && groupingData[0]?.cashAmount > 0) {
        if (groupingData.length === 1 && groupingData[0]?.cashAmount > 0) {
          console.log(groupingData, 'groupingData')

          const datatatata = groupingData.map((item) => item)
          onDataReceived(datatatata, 'ss')
          return datatatata
        } else {
          const filteredArray = groupingData.filter(
            (item) =>
              item !== undefined &&
              item !== null &&
              item !== true &&
              !item.cashAmount
          )

          const sumOfCost = filteredArray.reduce(
            (sum, entry) => sum + entry.amount,
            0
          )

          const sumOfMarketValue = filteredArray.reduce(
            (sum, entry) => sum + entry.marketValue,
            0
          )

          const sumOfTotalGain_of_Individual = filteredArray.reduce(
            (sum, entry) => sum + entry.totalGainByIndividual,
            0
          )

          const Weighted_M_Cap = filteredArray.map(
            (item) =>
              +(
                (item.market_cap * item.marketValue) /
                sumOfMarketValue
              ).toFixed(2)
          )

          const Sum_of_Weighted_M_Cap = Weighted_M_Cap.reduce(
            (sum, value) => sum + value,
            0
          )

          const cashAmountObject = groupingData.find(
            (item) => item.cashAmount !== undefined
          )

          if (filteredArray.length > 0) {
            const lastObject = filteredArray[filteredArray.length - 1]
            lastObject.sumOfCost = sumOfCost
            lastObject.sumOfMarketValue = sumOfMarketValue
            lastObject.sumOfTotalGain_of_Individual =
              sumOfTotalGain_of_Individual
            lastObject.Sum_of_Weighted_M_Cap = Sum_of_Weighted_M_Cap
            if (cashAmountObject && cashAmountObject.cashAmount) {
              lastObject.cashAmount = cashAmountObject.cashAmount
            } else {
              lastObject.cashAmount = 0
            }
          }

          onDataReceived(filteredArray, 'ss')

          setInsideData(filteredArray)
          return filteredArray
        }
      }
    }

    fetchData()
  }, [groupedData])

  const getStockQuoteData = async (symbol: string) => {
    const token = localStorage.getItem('token')
    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }

    try {
      const response = await AXIOS_INSTANCE.get(
        `getStockQuote?symbol=${symbol}`,
        { headers }
      )
      return response.data
    } catch (error) {
      console.error('Error fetching search results:', error)
    }
  }
  const getCompanyProfileList = async (symbol: string) => {
    const token = localStorage.getItem('token')
    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }

    try {
      const response = await AXIOS_INSTANCE.get(
        `getCompanyProfile?symbol=${symbol}`,
        { headers }
      )

      return response.data
    } catch (error) {
      console.error('Error fetching data:', error)
      return null
    }
  }

  const InvestmentOpenModal = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // document.body.style.overflow = 'hidden';
    // document.documentElement.style.overflow = 'hidden';
    setPlusIconAddModal(false)
    setShowModalInvestment(true)
  }
  const InvestmentCloseModal = () => {
    // document.body.style.overflow = 'auto';
    setPlusIconAddModal(false)
    setShowModalInvestment(false)
  }

  const handleItemClick = () => {
    setItemOpen(!isItemOpen)
  }

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  const displayMenu = (index: number) => {
    setOpenIndexs((prevIndex) => (prevIndex === index ? null : index))
    setShowMenuOptions(!showMenuOptions)
  }

  const leavemouse = () => {
    setIsHovered(false)
    setShowMenuOptions(false)
  }

  const formatDate = (purchaseDate: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }
    const formattedDate = new Date(purchaseDate).toLocaleDateString(
      'en-US',
      options
    )
    return formattedDate
  }
  const formatDate2 = (date: Date | null) => {
    if (date) {
      const year = date.getFullYear()
      const month = `${date.getMonth() + 1}`.padStart(2, '0')
      const day = `${date.getDate()}`.padStart(2, '0')
      return `${year}-${month}-${day}`
    }
    return ''
  }
  const formatDate3 = (date: Date | null) => {
    if (date) {
      const month = `${date.getMonth() + 1}`.padStart(2, '0')
      const day = `${date.getDate()}`.padStart(2, '0')
      const year = date.getFullYear()
      return `${month}/${day}/${year}`
    }
    return ''
  }

  const handleDelete = async (portfolioItemId: string) => {
    // console.log('ddddd')
    try {
      const token = localStorage.getItem('token')
      const headers = {
        X_AUTH_TOKEN: token,
        'Content-Type': 'application/json',
      }
      const tabValue = router.query.tab

      const response = await AXIOS_INSTANCE.delete(
        `deleteInvestment/${tabValue}/${portfolioItemId}`,
        { headers }
      )
      setDeleteSuccess(true)
      setConfirmationDeleteModal1(false)
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  const handleSingleInvestmentDelete = async (key: string) => {
    const single = groupedData[key]
    let deleteDataObjectId = []
    const data = single.map((item: any) => item.portfolio_item_id)

    try {
      const token = localStorage.getItem('token')
      const headers = {
        X_AUTH_TOKEN: token,
        'Content-Type': 'application/json',
      }
      const tabvalue = router.query.tab

      const response = await AXIOS_INSTANCE.delete(
        `deleteInvestments/${tabvalue}`,
        {
          headers: headers,
          data: data,
        }
      )

      setAllInvestmentDeleteString('')
      setDeleteSuccess(true)
      SetConfirmationDeleteAllInvestmentModal(false)
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  const handle_particular_investment_delete = (object: any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const key = object.equity_symbol
    SetConfirmationDeleteAllInvestmentModal(true)
    setAllInvestmentDeleteString(key)
  }
  // const cashModal = async (data: InvestmentData) => {
  //    setcashModalShow(true)
  //   console.log(data,'ddddddddddddddddddd');
  //   window.scrollTo({ top: 0, behavior: 'smooth' })
  //   if (data) {
  //     try {
  //       const response = await getStockQuoteData(data?.equity_type)
  //       console.log(response,'responseeeeeeeeee');

  //       if (response) {
  //         setCashData({
  //           amount: response.amount,
  //           equity_type: equity_type,
  //           portfolioItemId:portfolioItemId,
  //           quantity:0,
  //         })
  //         seteRcordModalShow(true)
  //         setSaveRecordData(data)
  //       }
  //     } catch (error) {
  //       console.error('Error in recordModal:', error)
  //     }
  //   }

  const cashModal = (data) => {
    setcashModalShow(true)
    // count: data.,
    // date: new Date(),
    // purchasePrice: 0,
    // amount:cashAmount,
    // portfolio_item_id: purchaseData.portfolioItemId,
    setCashData({
      amount: data.amount,
      equity_type: data.equity_type,
      portfolio_item_id: data.portfolio_item_id,
      quantity: 0,
    })

    // setcashdata(response)
  }
  const handleCloseModal = () => {
    seteRcordModalShow(false)
    setcashModalShow(false)
  }

  const handle_save_cashModal = async (buttonCheckText: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const token = localStorage.getItem('token')
    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }

    const dataToSend = {
      equity_type: 'cash',
      amount: cashinput,
    }
    let casharray = [dataToSend]
    try {
      const tabvalue = router.query.tab

      const response = await AXIOS_INSTANCE.post(
        `addInvestments/${tabvalue}`,
        casharray,
        { headers }
      )

      setcashModalShow(false)
      setDeleteSuccess(true)
      setSearchQuery('')
      propsFunction(true, buttonCheckText)
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }
  // const handleCountChange = (amount: number) => {
  //   setPurchaseData((prevData) => ({
  //     ...prevData,
  //     count: Math.max(1, prevData.count + amount),
  //   }))
  // }
  // const handleManualCountChange = (newValue) => {
  //   const parsedValue = parseInt(newValue, 10)
  //   if (!isNaN(parsedValue)) {
  //     setPurchaseData((prevData) => ({
  //       ...prevData,
  //       count: parsedValue,
  //     }))
  //   }
  // }
  const handleCountChange = (amount: number) => {
    setPurchaseData((prevData) => ({
      ...prevData,
      count: Math.max(1, prevData.count + amount),
    }))
  }
  const handleManualCountChange = (newValue) => {
    const parsedValue = parseInt(newValue, 10)
    if (newValue !== undefined && newValue !== '') {
      if (!isNaN(parsedValue)) {
        setPurchaseData((prevData) => ({
          ...prevData,
          count: parsedValue,
        }))
      }
    } else {
      setPurchaseData((prevData) => ({
        ...prevData,
        count: undefined,
      }))
    }
  }
  const getAllHistoricalStockDataGroupWise = async (symbol: string) => {
    if (symbol) {
      const token = localStorage.getItem('token')
      const headers = {
        X_AUTH_TOKEN: token,
        'Content-Type': 'application/json',
      }
      try {
        const response = await AXIOS_INSTANCE.get(
          `getAllHistoricalStockDataGroupWise?symbol=${symbol}`,
          { headers }
        )
        setDateApiResponse(response.data)
      } catch (error) {
        console.error('Error posting data:', error)
      }
    }
  }
  useEffect(() => {
    if (saveRecordData) {
      getAllHistoricalStockDataGroupWise(saveRecordData?.equity_symbol)
    } else {
      return
    }
  }, [saveRecordData])
  // useEffect(() => {
  //   if (onDataReceived) {
  //     onDataReceived(insideData)
  //   }
  // }, [insideData, onDataReceived])

  const handleDateChange = async (date: Date | null) => {
    if (date) {
      if (saveRecordData) {
        try {
          // const getAllHistoricalStockData =
          //   await getAllHistoricalStockDataGroupWise(
          //     saveRecordData?.equity_symbol
          //   )
          const monthArray = [
            'JANUARY',
            'FEBRUARY',
            'MARCH',
            'APRIL',
            'MAY',
            'JUNE',
            'JULY',
            'AUGUST',
            'SEPTEMBER',
            'OCTOBER',
            'NOVEMBER',
            'DECEMBER',
          ]

          const datevalue = formatDate2(date)
          const dateSplit = datevalue.split('-')
          const yearWiseData = dateApiResponse?.[dateSplit[0]]
          let stdata: StockData | undefined = undefined
          if (yearWiseData) {
            let selectedMonth = monthArray[Number(dateSplit[1]) - 1]
            let filterData = yearWiseData[selectedMonth]
            stdata = filterData.find((item: any) => item.date === datevalue)
          }
          if (stdata || stdata === undefined || stdata === 'undefined') {
            setPurchaseData((prevData) => ({
              ...prevData,
              date,
              purchasePrice: stdata?.close || 0,
            }))
          }
        } catch (error) {
          console.error('Error fetching or processing data:', error)
        }
      }
    }
  }

  const handlePriceInputChange = (value: number) => {
    setPurchaseData((prevData) => ({ ...prevData, purchasePrice: value }))
  }

  // const recordModal = async (data: InvestmentData,portfolioItemId:any,) => {

  //   window.scrollTo({ top: 0, behavior: 'smooth' })
  //   if (data) {
  //     try {
  //       const response = await getStockQuoteData(data?.equity_symbol)
  //       if (response) {
  //         setPurchaseData({
  //           count: 1,
  //           date: new Date(),
  //           purchasePrice: response.current_price,
  //           portfolioItemId:portfolioItemId
  //         })
  //         seteRcordModalShow(true)
  //         setSaveRecordData(data)
  //       }
  //     } catch (error) {
  //       console.error('Error in recordModal:', error)
  //     }
  //   }

  //   // setPurchaseData({
  //   //   count: 1,
  //   //   date: new Date(),
  //   //   purchasePrice: data.amount,
  //   // });
  // }
  const recordModal = async (
    data: InvestmentData,
    portfolioItemId: any,
    checkString: string
  ) => {

    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (data) {
      try {
        const response = await getStockQuoteData(data?.equity_symbol)
        if (response) {
          setPurchaseData({
            count: 1,
            date: new Date(),
            purchasePrice: response.current_price,
            portfolioItemId: portfolioItemId,
            ...(checkString && { stringCheck: checkString }),
          })
          seteRcordModalShow(true)
          setSaveRecordData(data)
        }
      } catch (error) {
        console.error('Error in recordModal:', error)
      }
    }

    // setPurchaseData({
    //   count: 1,
    //   date: new Date(),
    //   purchasePrice: data.amount,
    // });
  }
  // console.log('saveRecordData', saveRecordData)
  const addRecordPurchase = async () => {
    const token = localStorage.getItem('token')
    const dataArray = []
    const data = {
      purchase_date: formatDate2(purchaseData.date),
      equity_type: saveRecordData?.equity_type,
      quantity: purchaseData.count,
      amount: purchaseData.purchasePrice,
      equity_symbol: saveRecordData?.equity_symbol,
    }
    dataArray.push(data)
    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }

    try {
      const tabvalue = router.query.tab

      const response = await AXIOS_INSTANCE.post(
        `addInvestments/${tabvalue}`,
        dataArray,
        { headers }
      )

      // console.log('Post successful:', response.data)
      seteRcordModalShow(false)
      setSaveRecordData([])
      setDeleteSuccess(true)
    } catch (error) {
      console.error('Error posting data:', error)
    }
  }

  const editRecordPurchase = async () => {
    if (purchaseData.stringCheck === 'add') {
      const token = localStorage.getItem('token')
      const dataArray = []
      const data = {
        purchase_date: formatDate2(purchaseData.date),
        equity_type: saveRecordData?.equity_type,
        quantity: purchaseData.count,
        amount: purchaseData.purchasePrice,
        equity_symbol: saveRecordData?.equity_symbol,
      }
      dataArray.push(data)
      //const data = {
      //   amount: cashData.amount,
      //   equity_type: cashData.equity_type,
      //   portfolio_item_id: cashData.portfolio_item_id,
      //   quantity: 0,
      // }
      //  console.log('purchaseData  ',data);

      const headers = {
        X_AUTH_TOKEN: token,
        'Content-Type': 'application/json',
      }

      try {
        const portfolio_id = router.query.tab

        const response = await AXIOS_INSTANCE.post(
          `addInvestments/${portfolio_id}`,
          dataArray,
          { headers }
        )

        // console.log('Post successful:', response.data)
        seteRcordModalShow(false)
        setSaveRecordData([])
        setDeleteSuccess(true)
      } catch (error) {
        console.error('Error posting data:', error)
      }
    } else {
      const token = localStorage.getItem('token')
      const dataArray = []
      const data = {
        purchase_date: formatDate2(purchaseData.date),
        equity_type: saveRecordData?.equity_type,
        quantity: purchaseData.count,
        amount: purchaseData.purchasePrice,
        equity_symbol: saveRecordData?.equity_symbol,
        portfolio_item_id: purchaseData.portfolioItemId,
      }
      //const data = {
      //   amount: cashData.amount,
      //   equity_type: cashData.equity_type,
      //   portfolio_item_id: cashData.portfolio_item_id,
      //   quantity: 0,
      // }
      //  console.log('purchaseData  ',data);

      const headers = {
        X_AUTH_TOKEN: token,
        'Content-Type': 'application/json',
      }

      try {
        const portfolio_id = router.query.tab

        const response = await AXIOS_INSTANCE.put(
          `updateInvestment/${portfolio_id}`,
          data,
          { headers }
        )

        // console.log('Post successful:', response.data)
        seteRcordModalShow(false)
        setSaveRecordData([])
        setDeleteSuccess(true)
      } catch (error) {
        console.error('Error posting data:', error)
      }
    }
  }

  const handleManualDateInput = (inputValue: Date) => {
    return
    const parsedDate = new Date(inputValue)
    if (!isNaN(parsedDate.getTime())) {
      handleDateChange(parsedDate)
    } else {
      console.error('Invalid date input')
    }
  }
  const propsFunction = (
    booleanCondition: boolean,
    buttonCheckText: string
  ) => {
    setDeleteSuccess(booleanCondition)
    if (buttonCheckText === 'save' || buttonCheckText === 'saveCashModal') {
      setShowModalInvestment(false)
      setDeleteSuccess(booleanCondition)
    }
  }

  const handleAllInvestmentDelete = async () => {
    try {
      const token = localStorage.getItem('token')
      const headers = {
        X_AUTH_TOKEN: token,
        'Content-Type': 'application/json',
      }
      const tabvalue = router.query.tab

      const response = await AXIOS_INSTANCE.delete(
        `deleteAllInvestments/${tabvalue}`,
        { headers }
      )
      if (response.status === 200) {
        setPlusIconAddModal(false)
        setDeleteSuccess(true)
        router.push({
          pathname: `/dashboard/portfolio/listportfolio/tab=${tabvalue}`,
          // query: { responseData: JSON.stringify(setRouterQuery[0]) },
        })
      }
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  return (
    <div>
      {isLoading ? (
        <LoadingSection />
      ) : getinvest?.length ? (
        <motion.div
          style={{ width: '100%' }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          <SectionWrapper>
            {/* <SubSectionWrapper> */}
            <div>
              <Grid
                isInfo
                gridColumns="0.6fr 1fr 1fr 1fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr  0.6fr 0.6fr  "
              >
                <Value className={styles.overflow_texts}>Symbol</Value>
                <Value className="has-text-left">Name</Value>
                <Value className="has-text-left">Sector</Value>
                <Value className="has-text-left">Industry</Value>
                <Value
                  className="has-text-right"
                  title={'Market Capitalization'}
                >
                  M Cap
                </Value>
                <Value className="has-text-right" title={'Quantity'}>
                  Qty
                </Value>
                <Value
                  className="has-text-right"
                  title={'Purchase Price Per Quantity'}
                >
                  P Price
                </Value>
                <Value className="has-text-right">Cost</Value>
                <Value
                  className="has-text-right"
                  title={'Close Price Per Quantity'}
                >
                  Cl Price
                </Value>
                <Value className="has-text-right" title={'Market Value'}>
                  Value
                </Value>
                <Value className="has-text-right" title={'1 Day Returns'}>
                  1D
                </Value>
                <Value className="has-text-right" title={'1 Week Returns'}>
                  1W
                </Value>
                <Value className="has-text-right" title={'1 Month Returns'}>
                  1M
                </Value>
                <Value className="has-text-right" title={'1 Year Returns'}>
                  1Y
                </Value>
                <Value className="has-text-right" title={'Total Returns'}>
                  Total
                </Value>

                {/* <Value title={'Market Cup'}>MarketC..</Value>
                     <Value title={'Market Size'}>Market..</Value> */}
                <Value>
                  {' '}
                  <Button
                    className="is-warning is-small has-text-weight-semibold"
                    //   onClick={openModal}
                    style={{
                      marginLeft: '10px',
                      padding: 'calc(0.5em - 0px)',
                      fontSize: '0.55rem',
                    }}
                  >
                    {/* <IoMdAdd
                    size={18}
                   
                    onClick={modalOpenAddInvestment_AllDelete}
                    style={{
                      cursor: 'pointer',
                    }}
                  /> */}
                    {plusIconAddModal ? (
                      <RxCross2
                        size={18}
                        onClick={modalOpenAddInvestment_AllDelete}
                        style={{
                          cursor: 'pointer',
                          transform: plusIconAddModal
                            ? 'rotate(90deg)'
                            : 'rotate(0)',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    ) : (
                      <RxHamburgerMenu
                        size={18}
                        onClick={modalOpenAddInvestment_AllDelete}
                        style={{
                          cursor: 'pointer',
                          transform: plusIconAddModal
                            ? 'rotate(90deg)'
                            : 'rotate(0)',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    )}
                  </Button>
                </Value>
              </Grid>
              {plusIconAddModal && (
                <ul
                  className={styles.menuContainer}
                  style={{ marginLeft: '322px', marginTop: '-30px' }}
                >
                  <li
                    style={{ display: 'flex' }}
                    onClick={() => InvestmentOpenModal()}
                  >
                    <IoMdAdd
                      style={{
                        fontSize: '20px',
                        marginRight: '12px',
                        color: ' rgb(252, 159, 29)',
                      }}
                    />
                    <Link href={'#'}>Add-Investment</Link>
                  </li>
                  <li
                    style={{ display: 'flex' }}
                    onClick={() => fullInvestmentModal()}
                  >
                    <MdDelete
                      style={{
                        fontSize: '20px',
                        marginRight: '12px',
                        color: ' rgb(252, 159, 29)',
                      }}
                    />
                    <Link href={'#'}>All-Investment</Link>
                  </li>
                </ul>
              )}

              <div style={{ maxHeight: '240px', overflowY: 'scroll' }}>
                {insideData.map((item: InvestmentData, index: number) => (
                  <div key={index} className="accordion-item">
                    <div
                      className="accordion-header"
                      style={{
                        backgroundColor:
                          openIndex === index
                            ? 'hsl(0, 0%, 12%)'
                            : 'transparent',
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* <Grid gridColumns="repeat(10, 1fr)"> */}
                      <Grid
                        isDark={isHovering && index % 2 !== 0}
                        key={index}
                        className="is-capitalized sticky_info"
                        gridColumns="0.6fr 1fr 1fr 1fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr  0.6fr 0.6fr  "
                      >
                        <Value
                          title={item.equity_symbol}
                          className={`${styles.overflow_text} is-capitalized has-text-left`}
                        >
                          {item.equity_symbol}
                        </Value>

                        <Value
                          title={item?.stockquoteData?.equity_name}
                          className={`${styles.overflow_text} has-text-left`}
                        >
                          {item?.stockquoteData?.equity_name}
                        </Value>

                        <Value
                          title={item.companyProfile.sector}
                          className={`${styles.overflow_text} has-text-left`}
                        >
                          {item.companyProfile.sector}
                        </Value>
                        <Value
                          title={item.companyProfile.industry}
                          className={`${styles.overflow_text}  has-text-left`}
                        >
                          {item.companyProfile.industry}
                        </Value>
                        <Value className="is-family-secondary has-text-right ">
                          {convertNumberToReadable(
                            item.companyProfile.market_size
                          )}
                        </Value>
                        <Value className="is-family-secondary has-text-right">
                          {item.quantity}
                        </Value>
                        <Value className="is-family-secondary has-text-right">
                          {item.price / item.quantity}
                        </Value>
                        <Value className="is-family-secondary has-text-right">
                          {item.amount}
                        </Value>
                        <Value className="is-family-secondary has-text-right">
                          {item?.stockquoteData?.current_price}
                        </Value>
                        <Value className="is-family-secondary has-text-right">
                          {item.marketValue}
                        </Value>

                        <Value className="is-family-secondary has-text-right">
                          {/* {round(item.oneDayGain2) > 0
                            ? round(item.oneDayGain2) + '%'
                            : '(' + round(item.oneDayGain2) + ')%'} */}
                          {item.oneDayGain2 !== 0 ? (
                            round(item.oneDayGain2) > 0 ? (
                              <span>
                                {round(item.oneDayGain2) + '%'}
                              </span>
                            ) : (
                              <span className="has-text-danger">
                                {'(' + round(item.oneDayGain2) + ')%'}
                              </span>
                            )
                          ) : (
                            '-'
                          )}
                        </Value>

                        <Value className="is-family-secondary has-text-right">
                          {/* {round(item.oneWeekDate2) > 0
                            ? round(item.oneWeekDate2) + '%'
                            : '(' + round(item.oneWeekDate2) + ')%'} */}
                          {item.oneWeekDate2 !== 0 ? (
                            round(item.oneWeekDate2) > 0 ? (
                              <span>
                                {round(item.oneWeekDate2) + '%'}
                              </span>
                            ) : (
                              <span className="has-text-danger">
                                {'(' + round(item.oneWeekDate2) + ')%'}
                              </span>
                            )
                          ) : (
                            '-'
                          )}
                        </Value>
                        <Value className="is-family-secondary has-text-right">
                          {/* {round(item.oneMonthAgo2) > 0
                            ? round(item.oneMonthAgo2) + '%'
                            : '(' + round(item.oneMonthAgo2) + ')%'} */}
                          {item.oneMonthAgo2 !== 0 ? (
                            round(item.oneMonthAgo2) > 0 ? (
                              <span>
                                {round(item.oneMonthAgo2) + '%'}
                              </span>
                            ) : (
                              <span className="has-text-danger">
                                {'(' + round(item.oneMonthAgo2) + ')%'}
                              </span>
                            )
                          ) : (
                            '-'
                          )}
                        </Value>
                        <Value className="is-family-secondary has-text-right">
                          {/* {round(item.data365DaysAgoDate) > 0
                            ? round(item.data365DaysAgoDate) + '%'
                            : '(' + round(item.data365DaysAgoDate) + ')%'} */}
                          {item.data365DaysAgoDate !== 0 ? (
                            round(item.data365DaysAgoDate) > 0 ? (
                              <span >
                                {round(item.data365DaysAgoDate) + '%'}
                              </span>
                            ) : (
                              <span className="has-text-danger">
                                {'(' + round(item.data365DaysAgoDate) + ')%'}
                              </span>
                            )
                          ) : (
                            '-'
                          )}
                        </Value>

                        <Value className="is-family-secondary has-text-right">
                          {/* {round(item.totalReturn, 2)}% */}
                          {item.totalReturn !== 0 ? (
                            item.totalReturn > 0 ? (
                              <span className="has-text-green">
                                {round(item.totalReturn, 2)}%
                              </span>
                            ) : (
                              <span className="has-text-red">
                                {'(' + round(item.totalReturn, 2) + ')%'}
                              </span>
                            )
                          ) : (
                            '-'
                          )}
                        </Value>

                        <Value
                          className="is-family-secondary"
                          spanStyle={{ position: 'relative' }}
                        >
                          {openIndex === index ? (
                            <IoIosArrowUp
                              onClick={() => toggleItem(index)}
                              style={{ cursor: 'pointer' }}
                            />
                          ) : (
                            <IoIosArrowDown
                              onClick={() => toggleItem(index)}
                              style={{ cursor: 'pointer' }}
                            />
                          )}
                          {hoveredIndex === index && (
                            <CiMenuKebab
                              style={{
                                cursor: 'pointer',
                                marginLeft: '0.55rem',
                              }}
                              onClick={handleCiMenuKebabClick}
                            />
                          )}
                        </Value>
                        {/* <Value className="is-family-secondary ">
                          {item.amount}
                        </Value> */}
                        {/* <Value className="is-family-secondary">
                              
                             </Value> */}
                      </Grid>
                      {showDropdown && hoveredIndex === index && (
                        <ul
                          className={styles.menuContainer}
                          style={{ marginLeft: '322px', marginTop: '-70px' }}
                        >
                          <li
                            style={{ display: 'flex' }}
                            onClick={() => recordModal(item, '', 'add')}
                          >
                            <IoMdAdd
                              style={{
                                fontSize: '20px',
                                marginRight: '12px',
                                color: ' rgb(252, 159, 29)',
                              }}
                            />
                            <Link href={'#'}>Record a purchase</Link>
                          </li>
                          <li style={{ display: 'flex', cursor: 'pointer' }}>
                            <MdDelete
                              style={{
                                fontSize: '20px',
                                marginRight: '12px',
                                color: ' rgb(252, 159, 29)',
                              }}
                            />
                            <span
                              style={{
                                color: '#000',
                              }}
                              onClick={() =>
                                handle_particular_investment_delete(item)
                              }
                            >
                              Delete
                            </span>
                          </li>
                        </ul>
                      )}
                    </div>

                    {openIndex === index && (
                      <div className={styles.accordionContent}>
                        <div
                          style={{ backgroundColor: 'hsl(15, 77%, 19%) ' }}
                          className={styles.hoverHeaderInside}
                        >
                          <Grid gridColumns="1fr 1fr 1fr 1fr 0.2fr">
                            <Value className="has-text-left">Date</Value>
                            <Value className="has-text-right">Qty</Value>
                            <Value
                              className="has-text-right"
                              title={'Purchase Price'}
                            >
                              Pr price
                            </Value>
                            {/* <Value>EquityType</Value> */}
                            <Value className="has-text-right">Tot cost</Value>
                          </Grid>
                        </div>
                        {(groupedData[item.equity_symbol] || []).map(
                          (detail: InvestmentData, detailIdx: number) => (
                            <div
                              className={styles.hoverdelete}
                              key={detailIdx}
                              onMouseEnter={() =>
                                setdeleteIconHoverIndex(detailIdx)
                              }
                              onMouseLeave={() => setdeleteIconHoverIndex(null)}
                              style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr 1fr 0.2fr',
                                gridAutoFlow: 'column',
                                gap: '0.5rem',
                              }}
                            >
                              <div
                                className="is-family-secondary has-text-left"
                                style={{ color: 'hsl(35, 97%, 55%)' }}
                              >
                                {formatDate(detail.purchase_date)}
                              </div>
                              <div
                                className="is-family-secondary"
                                style={{
                                  textAlign: 'right',
                                  color: 'hsl(35, 97%, 55%)',
                                }}
                              >
                                {detail.quantity}
                              </div>
                              <div
                                className="is-family-secondary"
                                style={{
                                  textAlign: 'right',
                                  color: 'hsl(141, 99%, 49%)',
                                }}
                              >
                                {detail.amount}
                              </div>
                              {/* {/ <div className="is-family-secondary is-capitalized">{detail.equity_type}</div> /} */}
                              <div
                                className="is-family-secondary"
                                style={{
                                  textAlign: 'right',
                                  color: 'hsl(141, 99%, 49%)',
                                }}
                              >
                                {detail.amount * detail.quantity}
                              </div>
                              {deleteIconHoverIndex === detailIdx && (
                                <div
                                  className="is-family-secondary"
                                  style={{
                                    textAlign: 'center',
                                    color: 'hsl(35, 97%, 55%)',
                                  }}
                                >
                                  {/* {hoveredIndex === index && ( */}
                                  <GoPencil
                                    style={{
                                      marginLeft: '2px',
                                      paddingTop: '3px',
                                      cursor: 'pointer',
                                    }}
                                    onClick={() =>
                                      recordModal(
                                        item,
                                        detail.portfolio_item_id,
                                        ''
                                      )
                                    }
                                  />
                                  {/* )} */}
                                  <MdDelete
                                    style={{
                                      fontSize: '16px',
                                      textAlign: 'center',
                                      marginTop: '5px',
                                      cursor: 'pointer',
                                    }}
                                    onClick={() =>
                                      handleDeleteItemClick(
                                        detail.portfolio_item_id
                                      )
                                    }
                                  />
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {cashAmount !== 0 ? (
                <div style={{ maxHeight: '240px', overflowY: 'scroll' }}>
                  <div>
                    <Grid
                      className="is-capitalized sticky_info"
                      gridColumns="0.6fr 1fr 1fr 1fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr  0.6fr 0.6fr  "
                    >
                      <Value
                        className={`${styles.overflow_text} is-capitalized has-text-left`}
                      ></Value>
                      <Value className="has-text-left">Cash</Value>
                      <Value></Value>
                      <Value></Value>
                      <Value className="is-family-secondary"></Value>
                      <Value className="is-family-secondary"></Value>
                      <Value className="is-family-secondary "></Value>
                      <Value
                        className="is-family-secondary has-text-right"
                        title={cashAmount}
                      >
                        {round(cashAmount)}
                      </Value>
                      <Value className="is-family-secondary"></Value>
                      <Value className="is-family-secondary has-text-right">
                        {round(cashAmount)}
                      </Value>
                      <Value className="is-family-secondary "></Value>
                      <Value className="is-family-secondary"></Value>
                      <Value></Value>
                      <Value className="is-family-secondary"></Value>
                      <Value className="is-family-secondary"></Value>
                      {cashAmount !== 0 && (
                        <Value className="is-family-secondary">
                          {Object.values(groupedData).map((itemsArray) =>
                            itemsArray.map((item) => (
                              <div
                                key={item.portfolio_item_id}
                                className="is-family-secondary"
                                style={{
                                  textAlign: 'center',
                                  color: 'hsl(35, 97%, 55%)',
                                }}
                              >
                                {item.equity_type === 'cash' && (
                                  <>
                                    <GoPencil
                                      style={{
                                        marginLeft: '2px',
                                        paddingTop: '3px',
                                        cursor: 'pointer',
                                      }}
                                      onClick={() => cashModal(item)}
                                    />

                                    <MdDelete
                                      style={{
                                        fontSize: '16px',
                                        textAlign: 'center',
                                        marginTop: '5px',
                                        cursor: 'pointer',
                                      }}
                                      onClick={() =>
                                        handleDeleteItemClick(
                                          item.portfolio_item_id
                                        )
                                      }
                                    />
                                  </>
                                )}
                              </div>
                            ))
                          )}
                        </Value>
                      )}
                    </Grid>
                  </div>
                </div>
              ) : (
                ''
              )}
              {insideData.map((item: InvestmentData, index: number) => (
                <div
                  key={index}
                  style={{ maxHeight: '240px', overflowY: 'scroll' }}
                >
                  {item && item.sumOfCost !== undefined && (
                    <div style={{ borderTop: '1px solid rgb(54, 54, 54)' }}>
                      <Grid
                        className="is-capitalized sticky_info"
                        gridColumns="0.6fr 1fr 1fr 1fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr  0.6fr 0.6fr  "
                      >
                        <Value
                          className={`${styles.overflow_text} is-capitalized has-text-left`}
                        ></Value>
                        <Value className="has-text-left">Total</Value>

                        <Value></Value>
                        <Value></Value>
                        <Value className="is-family-secondary"></Value>
                        <Value className="is-family-secondary"></Value>
                        <Value className="is-family-secondary "></Value>

                        <Value className="is-family-secondary has-text-right">
                          {round(item?.sumOfCost + cashAmount)}
                        </Value>

                        <Value className="is-family-secondary"></Value>
                        <Value className="is-family-secondary has-text-right">
                          {round(item?.sumOfMarketValue + cashAmount)}
                        </Value>
                        <Value className="is-family-secondary "></Value>
                        <Value className="is-family-secondary"></Value>
                        <Value></Value>
                        <Value className="is-family-secondary"></Value>
                        <Value className="is-family-secondary"></Value>
                        <Value className="is-family-secondary"></Value>
                      </Grid>
                    </div>
                  )}
                </div>
              ))}

              {confirmationDeleteModal1 && (
                <Modal
                  width="30vw"
                  close={() => setConfirmationDeleteModal1(false)}
                >
                  <div>
                    <p
                      className="is-size-6 has-tw-bold"
                      style={{ textAlign: 'center' }}
                    >
                      Do you really want to delete this?
                    </p>
                    <div className="buttons is-centered mt-5 are-small">
                      <Button onClick={handleDeleteItemClickfalse}>
                        Cancel
                      </Button>
                      <Button
                        className="is-danger"
                        onClick={() => handleDelete(selectedItemId)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Modal>
              )}
              {confirmationDeleteAllInvestmentModal && (
                <Modal
                  width="30vw"
                  close={() => SetConfirmationDeleteAllInvestmentModal(false)}
                >
                  <div>
                    <p
                      className="is-size-6 has-tw-bold"
                      style={{ textAlign: 'center' }}
                    >
                      Do you really want to delete All-Investment{' '}
                      {allInvestmentDeleteString}?
                    </p>
                    <div className="buttons is-centered mt-5 are-small">
                      <Button
                        onClick={() =>
                          SetConfirmationDeleteAllInvestmentModal(false)
                        }
                      >
                        Cancel
                      </Button>
                      <Button
                        className="is-danger"
                        onClick={() =>
                          handleSingleInvestmentDelete(
                            allInvestmentDeleteString
                          )
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Modal>
              )}

              {fullInvestmentDeleteModal && (
                <Modal
                  width="30vw"
                  close={() => SetFullInvestmentDeleteModal(false)}
                >
                  <div>
                    <p
                      className="is-size-6 has-tw-bold"
                      style={{ textAlign: 'center' }}
                    >
                      Do you really want to delete All-Investment?
                    </p>
                    <div className="buttons is-centered mt-5 are-small">
                      <Button
                        onClick={() => SetFullInvestmentDeleteModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="is-danger"
                        onClick={() => handleAllInvestmentDelete()}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Modal>
              )}
              {recordModalShow && (
                <Modal close={handleCloseModal} isSmall>
                  <p className="is-size-5 mb-3">Record Purchase</p>
                  <motion.div
                    className={styles['modal-background']}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    onClick={close}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: '300px', scale: 0 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                      y: '300px',
                      transition: { duration: 0.2 },
                    }}
                    className={styles['modal-content']}
                  >
                    <div>
                      <div>
                        <table>
                          <div className="container">
                            <table>
                              <thead>
                                <tr>
                                  <th
                                    style={{
                                      textAlign: 'left',
                                      paddingLeft: '1px',
                                    }}
                                    className="is-size-7 has-text-grey"
                                  >
                                    Quantity
                                  </th>
                                  <th
                                    style={{
                                      textAlign: 'left',
                                      paddingLeft: '7px',
                                    }}
                                    className="is-size-7 has-text-grey"
                                  >
                                    Purchase date
                                  </th>
                                  <th
                                    style={{
                                      textAlign: 'left',
                                      paddingLeft: '7px',
                                    }}
                                    className="is-size-7 has-text-grey"
                                  >
                                    Purchase price
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="input_container">
                                  <td>
                                    <div
                                      className={styles.changePrice}
                                      style={{ width: '190px' }}
                                    >
                                      <TbMinus
                                        className={styles.btnChangePrizeModal}
                                        onClick={() => handleCountChange(-1)}
                                      />
                                      <input
                                        type="number"
                                        value={purchaseData.count}
                                        onChange={(e) =>
                                          handleManualCountChange(
                                            e.target.value
                                          )
                                        }
                                        className={styles.manualCountInput}
                                        style={{ maxWidth: '50px' }}
                                      />
                                      <IoMdAdd
                                        className={styles.btnChangePrizeModal}
                                        onClick={() => handleCountChange(1)}
                                      />
                                    </div>
                                  </td>
                                  <td style={{ position: 'relative' }}>
                                    <div
                                      className={styles.inputPortfolio}
                                      style={{ marginBottom: '0.75rem' }}
                                    >
                                      <MdDateRange
                                        className={styles.dateIcon}
                                        size={20}
                                        style={{
                                          position: 'absolute',
                                          left: 160,
                                          top: 12,
                                        }}
                                      />
                                      <DatePicker
                                        className={styles.datePicker}
                                        selected={purchaseData.date}
                                        onChange={(date) =>
                                          handleDateChange(date)
                                        }
                                        customInput={
                                          <input
                                            className={styles.inputDate}
                                            value={formatDate3(
                                              purchaseData.date
                                            )}
                                            placeholder="mm/dd/yyyy"
                                            // onChange={(e) => handleManualDateInput(e.target.value)}
                                            style={{
                                              width: '190px',
                                              height: '36px',
                                              border: '1px solid #696969',
                                            }}
                                          />
                                        }
                                        maxDate={new Date()}
                                        dropdownMode="select"
                                        showMonthDropdown
                                        showYearDropdown
                                        adjustDateOnChange
                                      />
                                      <span
                                        className="has-text-grey"
                                        style={{
                                          position: 'absolute',
                                          left: 12,
                                          top: 42,
                                          fontSize: '11px',
                                        }}
                                      >
                                        MM/DD/YYYY
                                      </span>
                                    </div>
                                  </td>

                                  <td>
                                    <input
                                      type="number"
                                      name="purchase-price"
                                      value={purchaseData.purchasePrice}
                                      onChange={(e) =>
                                        handlePriceInputChange(e.target.value)
                                      }
                                      className={styles.datePicker}
                                      style={{
                                        width: '190px',
                                        height: '36px',
                                      }}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </table>
                        <div className="is-flex is-justify-content-flex-end  is-gap">
                          <Button
                            className="is-warning is-small has-text-weight-semibold"
                            onClick={() => seteRcordModalShow(false)}
                          >
                            <span>Cancel</span>
                          </Button>

                          <Link href="#">
                            <Button
                              onClick={() => editRecordPurchase()}
                              className="is-warning is-small has-text-weight-semibold"
                            >
                              <Icon>
                                <BiSave />
                              </Icon>
                              <span>Save</span>
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Modal>
              )}

              {cashModalShow && (
                <Modal close={handleCloseModal} isSmall>
                  <div>
                    <div className="flex gap-4 items-center">
                      <Input
                        type="number"
                        cSize="small"
                        label="Cash Amount"
                        onChange={(e) => {
                          setCashinput(e.target.value)
                        }}
                      />
                    </div>
                    {cashinput > 0 && (
                      <div className="is-flex is-justify-content-flex-end mt-3 is-gap">
                        {/* <Button
                                    className='is-warning is-small has-text-weight-semibold'
                                    // onClick={() => cancel_cashModal_backOption()}
                                  >
                                    <span>Cancel</span>
                                  </Button>
                                  <Button
                                    className='is-warning is-small has-text-weight-semibold'
                                    onClick={() => handle_another_saveAnother()}
                                  >
                                    <span>Save & add another</span>
                                  </Button> */}
                        {/* <Link href={`/dashboard/portfolio-view?tab=${responseData?.portfolio_id}`}> */}
                        <div>
                          <Button
                            className="is-warning is-small has-text-weight-semibold"
                            // onClick={() => handle_save_cashModal("saveCashModal")}
                            onClick={() => editRecordPurchase()}
                          >
                            <Icon>
                              <BiSave />
                            </Icon>
                            <span>Save</span>
                          </Button>
                        </div>
                        {/* </Link> */}
                      </div>
                    )}
                  </div>
                </Modal>
              )}
            </div>
            {/* </SubSectionWrapper> */}
          </SectionWrapper>
          {showModalInvestment && (
            <Modal
              disableOverflowHidden
              close={() => InvestmentCloseModal()}
              isSmall
            >
              {/* <ModalAddPortfolio propsFunction={propsFunction} /> */}
              <ModalAddPortfolio
                propsFunction={propsFunction}
                cashObjectIsTrue={cashObjectIsTrue}
              />
            </Modal>
          )}
        </motion.div>
      ) : (
        <div style={{ position: 'relative' }}>
          <div className="section has-text-grey is-size-7 has-text-centered">
            No Data Found{' '}
          </div>
          <div
            style={{
              textAlign: 'center',
              position: 'absolute',
              right: 0,
              top: 0,
            }}
          >
            {showModalInvestment && (
              <Modal
                disableOverflowHidden
                close={() => InvestmentCloseModal()}
                isSmall
              >
                <ModalAddPortfolio
                  propsFunction={propsFunction}
                  cashObjectIsTrue={cashObjectIsTrue}
                />
              </Modal>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default OverviewSection
