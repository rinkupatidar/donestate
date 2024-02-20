import { useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { BiSave } from 'react-icons/bi'
import { FaPlus, FaSearch, FaTimes } from 'react-icons/fa'
import { round } from 'utilities/round'
import Input from 'components/Input/Input'
import {AXIOS_INSTANCE} from '../../../constants'
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import Button from 'components/Button/Button'
import Icon from 'components/Icon/Icon'
import { getTopWorldCommoditiesInfo } from 'service/DashboardService/DashboardServices'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
// import style from './portfolio.module.scss'
import style from './index.module.scss'
import Modal from 'components/Modal/Modal'
import DatePicker from 'react-datepicker'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-datepicker/dist/react-datepicker.css'
import { BsTrash } from 'react-icons/bs'
import { IoMdAdd } from 'react-icons/io'
import { TbMinus } from 'react-icons/tb'
import { MdDateRange } from 'react-icons/md'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'

interface StockData {
  date: string
  close: number
  equity_symbol: string
  equity_name: string
  current_price: number
  change_percentage: number
  year_high: number
}
interface searchQuery {
  equity_name: string
  equity_symbol: string
  timezone: string
}
interface InputItem {
  id: number
  count: number
  startDate: Date | null
  priceInput: number | null
}
interface PortfolioData {
  portfolio_id?: string
  portfolio_name?: string
  // Add other properties with their respective types
}
interface ModalAddPortfolioProps {
  propsFunction: (booleanCondition: boolean, buttonCheckText: string) => void
  cashObjectIsTrue: boolean
}
const ModalAddPortfolio: React.FC<ModalAddPortfolioProps> = ({
  propsFunction,
  cashObjectIsTrue,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [modalAdd, setModalAdd] = useState(false)
  const [showStock, SetshowStock] = useState(false)
  const [stockDataArrays, setStockDataArrays] = useState(false)
  const [showInput, setShowInput] = useState(true)
  const [showAddData, setShowAddData] = useState(false)
  const [count, setCount] = useState(0)
  const [purchaseRow, setPurchaseRow] = useState([])

  //=======================================================
  const [addcash, setAddcash] = useState(false)
  const [cashinput, setCashinput] = useState(0)

  const [inputs, setInputs] = useState<InputItem[]>([
    { id: 1, count: 1, startDate: new Date(), priceInput: null },
  ])

  const [showAddDataByClick, setShowAddDataByClick] =
    useState<StockData | null>(null)
  const initialPriceInput = showAddDataByClick?.current_price || 0
  const [priceInput, setPriceInput] = useState(initialPriceInput)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<searchQuery[]>([])
  const [startDates, setStartDates] = useState<Date[]>([new Date()])
  const [dateApiResponse, setDateApiResponse] = useState()
  const [checkSearchQuery, setCheckSearchQuery] = useState<string>('')
  const router = useRouter()
  // const displayPurchase = () => {
  //   setPurchaseRow([...purchaseRow])
  //   setCount(1)
  //   setStartDate(null)
  //   setPriceInput(1)
  // }
  // console.log(purchaseRow)
  // const handleOpenModal = () => {
  //   setModalAdd(true)
  //   setShowInput(true)
  //   setShowAddData(false)

  // }
  const handleCancel = () => {
    setShowInput(true)
    setModalAdd(false)
    setShowAddData(false)
    setInputs([{ id: 0, count: 1, startDate: new Date(), priceInput: null }])
    setPurchaseRow([])
    setCount(0)
    setStartDate(null)
    setPriceInput(0)
    setSearchQuery('')
  }

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
     

      console.error('response', response.data)
      const defaultPrice = response.data?.current_price || 0
      setShowAddDataByClick(response.data)
    } catch (error) {
      console.error('Error fetching search results:', error)
    }
  }

  const listStock = (data: searchQuery, symbol: string) => {
    getStockQuoteData(symbol)
    setShowAddData(true)
    SetshowStock(false)
    setShowInput(false)
  }
  // const handleAddInput = () => {
  //   const newInput = {
  //     id: inputs.length,
  //     count: 1, // Set the default count to 1 for each new input
  //     startDate: null,
  //     priceInput: 0,
  //   }
  //   setInputs([...inputs, newInput])
  // }

  const handleAddInput = () => {
    const newInput: InputItem = {
      id: inputs.length,
      count: 1,
      startDate: null,
      priceInput: null,
      // startDate: new Date(),
      // priceInput: showAddDataByClick?.current_price || 0,
    }
    setInputs([...inputs, newInput])
  }

  const getAllHistoricalStockDataGroupWise = async (symbol: string) => {
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

  const handleDateChange = async (index: number, date: Date | null) => {
    if (date) {
      try {
        // const getAllHistoricalStockData = await getAllHistoricalStockDataGroupWise(showAddDataByClick?.equity_symbol);
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

        const datevalue = formatDate(date)
        const dateSplit = datevalue.split('-')
        const yearWiseData = dateApiResponse?.[dateSplit[0]]
        let stdata: StockData | undefined = undefined
        if (yearWiseData) {
          let selectedMonth = monthArray[Number(dateSplit[1]) - 1]
          let filterData = yearWiseData[selectedMonth]
          stdata = filterData.find((item: any) => item.date === datevalue)
        }
        if (stdata || stdata === undefined || stdata === 'undefined') {
          setInputs((prevInputs) =>
            prevInputs.map((input, i) =>
              i === index
                ? {
                    ...input,
                    startDate: date || new Date(),
                    priceInput: stdata?.close || 0,
                  }
                : input
            )
          )
        }
      } catch (error) {
        console.error('Error fetching or processing data:', error)
      }
    }
  }

  const handleCountChange = (index: number, value: number) => {
    // console.log("index",index,"value",value)
    setInputs((prevInputs) =>
      prevInputs.map((input, i) => {
        if (i === index) {
          const newCount = input.count + value
          // console.log("newcount",newCount)
          return { ...input, count: newCount > 0 ? newCount : 1 }
        }
        return input
      })
    )
  }

  const handlePriceInputChange = (index: number, value: number) => {
    console.log(index, value, 'index, value')
    setInputs((prevInputs) =>
      prevInputs.map((input, i) =>
        i === index
          ? {
              ...input,
              // priceInput: Math.max(parseInt(value, 10) || 0, 0), // Ensure price is not negative
              priceInput: value,
            }
          : input
      )
    )
  }

  const handleDeleteRow = (index: number) => {
    console.log('indexindex', index)
    setInputs((prevInputs) => prevInputs.filter((_, i) => i !== index))
  }

  const formatDate = (date: Date | null) => {
    if (date) {
      const year = date.getFullYear()
      const month = `${date.getMonth() + 1}`.padStart(2, '0')
      const day = `${date.getDate()}`.padStart(2, '0')
      return `${year}-${month}-${day}`
    }
    return ''
  }

  const dataSend = async (buttonCheckText: string) => {
    const token = localStorage.getItem('token')
    if (inputs.length === 0) {
      console.error('No input data to send.')
      return
    }
    // multiple object
    const dataToSend = inputs.map(({ startDate, priceInput, count }) => ({
      purchase_date: formatDate(startDate),
      equity_type: 'stock',
      // equity_type: showAddDataByClick?.equity_name,
      quantity: count,
      // amount: priceInput * count,
      amount: priceInput,
      equity_symbol: showAddDataByClick?.equity_symbol,
    }))
    console.log('dataToSend', dataToSend)

    const headers = {
      X_AUTH_TOKEN: token,
      // 'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }

    try {
      const tabvalue = router.query.tab
    
      const response = await AXIOS_INSTANCE.post(
        `addInvestments/${tabvalue}`,
        dataToSend,
        { headers }
      )
      if (response.statusText && buttonCheckText === 'anotherMore') {
        setModalAdd(true)
        setShowInput(true)
        // SetshowStock(false);
        // setShowAddData(false);
        setDateApiResponse(undefined)
        setInputs([
          { id: 0, count: 1, startDate: new Date(), priceInput: null },
        ])
        propsFunction(true, buttonCheckText)
        // window.location.reload();
      } else if (response.statusText && buttonCheckText === 'save') {
        setModalAdd(false)
        setShowInput(false)
        // SetshowStock(false)
        // setShowAddData(false)
        setDateApiResponse(undefined)
        setInputs([
          { id: 0, count: 1, startDate: new Date(), priceInput: null },
        ])
        propsFunction(true, buttonCheckText)
        // window.location.reload();
      }
      console.log('Post successful:', response.data)
      // window.location.reload()
    } catch (error) {
      console.error('Error posting data:', error)
    }
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setSearchQuery(inputValue)
    if (
      inputValue === 'cash' ||
      inputValue === 'Cash' ||
      inputValue === 'CASH'
    ) {
      handleTabClick(2)
      setModalAdd(true)
      setAddcash(true)
    } else {
      setSearchQuery(inputValue)
      setCheckSearchQuery('Stock')
      setModalAdd(true)
      setAddcash(false)
      handleTabClick(1)
    }
  }

  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: SetStateAction<number>) => {
    setActiveTab(index) // Update the active tab when clicked
  }

  const [text, setText] = useState('Hello, World!')

  const repeatText = () => {
    setText((prevText) => prevText + prevText)
  }

  const stockDataArray = [
    {
      id: 1,
      name: 'Dow Jones Industrial Average',
      symbol: 'DJI',
      index: 'INDEXDJX',
      value: '33,141.38',
      change_percent: '0.62%',
    },
    {
      id: 2,
      name: 'Roblox Corp',
      symbol: 'RBLX',
      index: 'NYSE (US)',
      value: '$32.72',
      change_percent: '7.03%',
    },
  ]
  useEffect(() => {
    setInputs((prevInputs) => {
      return prevInputs.map((input) => {
        return {
          ...input,
          priceInput: showAddDataByClick?.current_price || 0,
        }
      })
    })
    if (showAddDataByClick) {
      getAllHistoricalStockDataGroupWise(showAddDataByClick?.equity_symbol)
    }
  }, [showAddDataByClick])
  useEffect(() => {
    const searchCompanyList = async () => {
      const token = localStorage.getItem('token')
      const headers = {
        X_AUTH_TOKEN: token,
        'Content-Type': 'application/json',
      }
      try {
        
     
        const response = await AXIOS_INSTANCE.get(
          `searchCompany?search=${searchQuery}`,
          { headers }
        )

        setSearchResults(response.data)
        SetshowStock(true)
      } catch (error) {
        console.error('Error fetching search results:', error)
      }
    }

    if (searchQuery.trim() !== '') {
      searchCompanyList()
    } else {
      SetshowStock(false)
    }
  }, [searchQuery])

  const handle_save_cashModal = async (buttonCheckText: string) => {
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
      if (
        response.status === 200 &&
        buttonCheckText === 'anotherSaveCashModal'
      ) {
        setAddcash(false)
        SetshowStock(false)
        setSearchQuery('')
        propsFunction(true, buttonCheckText)
      } else if (
        response.status === 200 &&
        buttonCheckText === 'saveCashModal'
      ) {
        setModalAdd(false)
        setSearchQuery('')
        propsFunction(true, buttonCheckText)
      }
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  const handle_another_saveAnother = () => {
    handle_save_cashModal('anotherSaveCashModal')
  }

  const cancel_cashModal_backOption = () => {
    setAddcash(false)
    SetshowStock(false)
    setSearchQuery('')
    // setSearchQuery("")
  }

  const handleManualCountChange = (index, value) => {
    // console.log("index",index,value)
    const newCount = parseInt(value, 10)

    const updatedInputs = [...inputs]
    updatedInputs[index] = {
      ...updatedInputs[index],
      count: Math.max(newCount, 0),
    }

    setInputs(updatedInputs)
  }
  const handleManualDateInput = (index: number, inputValue: Date) => {
    const parsedDate = new Date(inputValue)
    if (!isNaN(parsedDate.getTime())) {
      handleDateChange(index, parsedDate)
    } else {
      console.error('Invalid date input')
    }
  }
  const handleAnother = () => {
    dataSend('anotherMore')
  }

  return (
    <div>
      <div>
        <p className="is-size-5 mb-3">Add to</p>

        <div className={style.stockContainer}>
          {showInput && (
            <div className={style.inputPortfolio}>
              <Input
                onChange={handleSearchInputChange}
                cSize="small"
                label="Type an investment name or symbol or cash"
                value={searchQuery}
              />
            </div>
          )}
          {showStock && (
            <div className={style.cardDrropdown}>
              <div className={style.cardaddstock}>
                <Tabs>
                  <TabList style={{ display: 'flex', justifyContent: '' }}>
                    <Tab
                      className={
                        activeTab === 0
                          ? `${style.tabsStock} ${style.activeTab}`
                          : style.tabsStock
                      }
                      action="active"
                      //onClick={() => handleTabClick(0)}
                    >
                      All
                    </Tab>
                    <Tab
                      className={
                        activeTab === 1
                          ? `${style.tabsStock} ${style.activeTab}`
                          : style.tabsStock
                      }
                      action="active"
                      //onClick={() => handleTabClick(1)}
                    >
                      Stock
                    </Tab>
                    {/* <Tab
                      className={
                        activeTab === 2
                          ? `${style.tabsStock} ${style.activeTab}`
                          : style.tabsStock
                      }
                      action="active"
                      onClick={() => handleTabClick(2)}
                    >
                      Cash
                    </Tab> */}
                    {(searchQuery ==="cash" || searchQuery ==="Cash" || searchQuery ==="CASH")  &&
                           <Tab
                           className={
                             activeTab === 2
                               ? `${style.tabsStock} ${style.activeTab}`
                               : style.tabsStock
                           }
                           action="active"
                          //  onClick={() => handleTabClick(2)}
                         >
                           cash
                         </Tab>
                           
                           } 
                  </TabList>
                  <h6 className={style.suggesitonTxt}>
                    About these suggestions
                    <IoMdInformationCircleOutline
                      style={{ marginLeft: '12px' }}
                    />
                  </h6>
                  <TabPanel>
                    <div>
                      {searchResults.map((data, index) => (
                        <div
                          onClick={() => listStock(data, data?.equity_symbol)}
                          key={index}
                        >
                          <div className={style.dOH8Ue}>
                            <div>
                              <p className={style.nameStock}>
                                {data.equity_name}
                              </p>
                              <div style={{ display: 'flex' }}>
                                <p className={style.headingSymbol}>
                                  {data.equity_symbol} :
                                </p>

                                <p className={style.nameStock}>
                                  {/* {data.index} */}
                                  {checkSearchQuery}
                                </p>
                              </div>
                            </div>
                            {/* <div style={{ display: 'flex' }}>
                              <button className={style.Changevalue}>
                                {"456"}
                              </button>
                              <button
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                                className={style.ChangePerentage}
                              >
                                <AiOutlineArrowUp />
                                {"1.67%"}
                              </button>
                            </div> */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabPanel>

                  {addcash && !cashObjectIsTrue && (
                    <div>
                      <div className="flex gap-4 items-center mt-2">
                        <Input
                          type="number"
                          cSize="small"
                          label="Cash Amount in $"
                          onChange={(e) => {
                            setCashinput(e.target.value)
                          }}
                        />
                      </div>
                      {cashinput > 0 && (
                        <div className="is-flex is-justify-content-flex-end mt-3 is-gap">
                          <Button
                            className="is-warning is-small has-text-weight-semibold"
                            onClick={() => cancel_cashModal_backOption()}
                          >
                            <span>Cancel</span>
                          </Button>
                          <Button
                            className="is-warning is-small has-text-weight-semibold"
                            // onClick={() => CashHandlerSave(cashinput)}
                            onClick={() => handle_another_saveAnother()}
                          >
                            <span>Save & add another</span>
                          </Button>
                          <Button
                            className="is-warning is-small has-text-weight-semibold"
                            // onClick={cashhandlersave}
                            onClick={() =>
                              handle_save_cashModal('saveCashModal')
                            }
                          >
                            <Icon>
                              <BiSave />
                            </Icon>
                            <span>Save</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </Tabs>
              </div>
            </div>
          )}
        </div>
        {showAddData && (
          <div>
            <div className={style.CrPloe}>
              <div>
                <button className={style.applBtn}>
                  {showAddDataByClick?.equity_symbol}
                </button>
                <span style={{ color: 'white' }}>
                  {' '}
                  {showAddDataByClick?.equity_name}
                </span>
              </div>
              <div style={{ display: 'flex' }}>
                <button className={style.btnVOXKNedoller}>
                  ${showAddDataByClick?.current_price}
                </button>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color:
                      showAddDataByClick?.change_percentage < 0
                        ? '#f63148'
                        : 'hsl(141, 99%, 49%)',
                  }}
                  className={style.btnVOXKNe}
                >
                  {showAddDataByClick?.change_percentage < 0 ? (
                    <AiOutlineArrowDown />
                  ) : (
                    <AiOutlineArrowUp />
                  )}
                  {round(showAddDataByClick?.change_percentage)}%
                </button>
              </div>
            </div>

            <table>
              <div className="container">
                <table>
                  <thead>
                    <tr>
                      <th
                        style={{ textAlign: 'left', paddingLeft: '1px' }}
                        className=" is-size-7 has-text-grey"
                      >
                        Quantity
                      </th>
                      <th
                        style={{ textAlign: 'left', paddingLeft: '7px' }}
                        className=" is-size-7 has-text-grey"
                      >
                        Purchase date
                      </th>
                      <th
                        style={{ textAlign: 'left', paddingLeft: '7px' }}
                        className="is-size-7 has-text-grey"
                      >
                        Purchase price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {inputs.map((input, index) => (
                      <tr key={input.id} className="input_container">
                        <td>
                          <div
                            className={style.changePrice}
                            id={`countName_${input.id}`}
                          >
                            <TbMinus
                              className={style.btnChangePrizeModal}
                              onClick={() => handleCountChange(index, -1)}
                            />
                            <input
                              type="number"
                              value={input.count}
                              onChange={(e) =>
                                handleManualCountChange(index, e.target.value)
                              }
                              className={style.manualCountInput}
                              style={{ maxWidth: '50px' }}
                            />
                            <IoMdAdd
                              className={style.btnChangePrizeModal}
                              onClick={() => handleCountChange(index, 1)}
                            />
                          </div>
                        </td>
                        <td
                          id={`dateName_${input.id}`}
                          style={{ position: 'relative' }}
                        >
                          <div className={style.datePicker}>
                            <MdDateRange
                              className={style.dateIcon}
                              size={20}
                              style={{ left: 160, top: 18 }}
                            />
                            <DatePicker
                              selected={inputs[index].startDate}
                              onChange={(date) => handleDateChange(index, date)}
                              customInput={
                                <input
                                  className={style.inputDate}
                                  value={formatDate(inputs[index].startDate)}
                                  placeholder="dd/mm/yy"
                                  // onChange={(e) => handleManualDateInput(index, e.target.value)}
                                />
                              }
                              maxDate={new Date()}
                              dropdownMode="select"
                              showMonthDropdown
                              showYearDropdown
                              adjustDateOnChange
                            />
                          </div>
                          <span
                            className="has-text-grey"
                            style={{
                              position: 'absolute',
                              left: 10,
                              top: 42,
                              fontSize: '11px',
                            }}
                          >
                            MM/DD/YYYY
                          </span>
                        </td>
                        <td>
                          <input
                            type="number"
                            name="purchase-price"
                            value={input.priceInput}
                            onChange={(e) =>
                              handlePriceInputChange(index, e.target.value)
                            }
                            className={style.datePicker}
                            style={{ height: '36px' }}
                          />
                        </td>
                        <td>
                          <BsTrash
                            className={style.trashbin}
                            onClick={() => handleDeleteRow(index)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </table>
          </div>
        )}

        <div className="is-flex is-justify-content-flex-end mt-3 is-gap">
          {showAddData && (
            <>
              <Button
                className="is-warning is-small has-text-weight-semibold"
                onClick={handleCancel}
              >
                <span>Cancel</span>
              </Button>
              <Button
                onClick={handleAnother}
                className="is-warning is-small has-text-weight-semibold"
              >
                <span>Save & add another</span>
              </Button>

              <Button
                className="is-warning is-small has-text-weight-semibold"
                onClick={handleAddInput}
              >
                <Icon>
                  <FaPlus />
                </Icon>
                <span>Add More</span>
              </Button>

              {/* <Link href="/dashboard/portfolio-view"> */}
              <Button
                // onClick={() => shareToTwitter(imgLink, title, description)}
                onClick={() => dataSend('save')}
                className="is-warning is-small has-text-weight-semibold"
              >
                <Icon>
                  <BiSave />
                </Icon>
                <span>Save</span>
              </Button>
            </>
          )}
          {/* </Link> */}
        </div>
      </div>
      {/* </Modal> */}
    </div>
  )
}
export default ModalAddPortfolio
