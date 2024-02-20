import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import ModalCash from './ModalCash'
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
import { BiSave } from 'react-icons/bi'
import { FaPlus, FaSearch, FaTimes } from 'react-icons/fa'
import { getTopWorldCommoditiesInfo } from 'service/DashboardService/DashboardServices'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
import style from './index.module.scss'
import Modal from 'components/Modal/Modal'
import Icon from 'components/Icon/Icon'
import DatePicker from 'react-datepicker'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-datepicker/dist/react-datepicker.css'
import { BsTrash } from 'react-icons/bs'
import { IoMdAdd } from 'react-icons/io'
import { TbMinus } from 'react-icons/tb'
import { MdDateRange } from 'react-icons/md'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import {
  AiOutlineArrowUp,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineArrowDown,
} from 'react-icons/ai'
import Link from 'next/link'
import Button from 'components/Button/Button'
import styles from '../../../components/Modal/index.module.scss'
import axios from 'axios'
import Hamburger from 'components/Navbar/Hamburger'
import ClickAwayListener from 'react-click-away-listener'
import { HiDotsVertical, HiOutlineDotsVertical } from 'react-icons/hi'
import Menu from 'components/Navbar/Menu'
import Example from './Example'
import { useRouter } from 'next/router'
import { ROUTES } from '../../../constants'
import { round } from 'utilities/round'
import { TOP_TO_BOTTOM_MENU_VARIANT } from 'utils/variants'
import List from './listportfolio/[list]'
interface ModalAddPortfolioProps {
  // typedText: string;
  responseData: PortfolioResponseData | {}
  reloadList: () => void
  portFolioList: any
}

interface StockData {
  equity_symbol: string
  equity_name: string
  current_price: number
  change_percentage: number
  date: string
  close: number
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
}

interface PortfolioResponseData {
  portfolio_id?: string
  portfolio_name?: string
}

interface searchQuery {
  equity_name: string
  equity_symbol: string
  timezone: string
}

const ModalAddPortfolio: React.FC<ModalAddPortfolioProps> = ({
  responseData = {},
  reloadList = () => {},
  portFolioList = [],
}: ModalAddPortfolioProps) => {


  const router = useRouter()
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalAdd, setModalAdd] = useState(false)
  const [cashModal, setCashModal] = useState(false)
  const [showStock, SetshowStock] = useState(false)
  const [stockDataArrays, setStockDataArrays] = useState(false)
  const [showInput, setShowInput] = useState(true)
  const [showAddData, setShowAddData] = useState(false)
  const [showAddDataByClick, setShowAddDataByClick] =
    useState<StockData | null>(null)
  const [count, setCount] = useState(0)
  const [purchaseRow, setPurchaseRow] = useState([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editButtonShow, setEditButtonShow] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [checkSearchQuery, setCheckSearchQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<searchQuery[]>([])
  const [startDates, setStartDates] = useState<Date[]>([new Date()])
  const [listKey, setListKey] = useState(0)

  const [addcash, setAddcash] = useState(false)
  const [cashinput, setCashinput] = useState(0)
  const [inputs, setInputs] = useState<InputItem[]>([
    { id: 1, count: 1, startDate: new Date(), priceInput: null },
  ])
  const [editPortfolio, setEditPortfolio] = useState<string>('')
  const [confirmationDeleteModal, setConfirmationDeleteModal] = useState(false)
  const [dateApiResponse, setDateApiResponse] = useState()
  const [cashEntryIsTrue, setCashEntryIsTrue] = useState(false)
  const [showSmallModal, setShowSmallModal] = useState(false)

  // console.log('--........', cashinput)
  const handleDeleteItemClick = () => {
    setConfirmationDeleteModal(true)
  }
  const handleDeleteItemClickfalse = () => {
    setConfirmationDeleteModal(false)
  }

  const handleOpenModal = () => {
    setShowModal(false)
    setModalAdd(true)
    setShowInput(true)
    setShowAddData(false)
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
      console.error('getstock', response.data)
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

  const handleCountChange = (index: number, value: number) => {
    setInputs((prevInputs) =>
      prevInputs.map((input, i) => {
        if (i === index) {
          const newCount = input.count + value
          return { ...input, count: newCount > 0 ? newCount : 1 }
        }
        return input
      })
    )
  }
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

  const handlePriceInputChange = (index: number, value: number) => {
    setInputs((prevInputs) =>
      prevInputs.map((input, i) =>
        i === index
          ? {
              ...input,
              priceInput: value,
              // priceInput: value.trim() !== '' ? value : input.priceInput,
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
    setActiveTab(index)
  }

  const [text, setText] = useState('Hello, World!')

  const repeatText = () => {
    setText((prevText) => prevText + prevText)
  }
  const handleCancel = () => {
    setModalAdd(true)
    setShowModal(false)
    setShowInput(true)
    setShowAddData(false)
    setInputs([{ id: 0, count: 1, startDate: new Date(), priceInput: null }])
    setPurchaseRow([])
    setCount(0)
    setStartDate(null)
    setSearchQuery('')
  }
  
  const handleEditPortfolio = async (data: PortfolioData) => {
    const renameData = {
      portfolio_id: data.portfolio_id,
      portfolio_name: editPortfolio,
    }
    const token = localStorage.getItem('token')
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
      console.log('Post successful:', response.data)
      if (response.status === 200) {
        setEditButtonShow(false)
        setIsEditing(false)
        setListKey((prevKey) => prevKey + 1)
        console.log(response.data, '9999999999999999999999999999999')
        router.push({
          pathname: `/dashboard/portfolio/listportfolio/tab=${response.data.portfolio_id}`,
          // query: { responseData: JSON.stringify(response.data) },
        })
        reloadList(true)
      }

      // setResponseData(response.data)
    } catch (error) {
      console.error('Error posting data:', error)
    }
  }

  const handleEditClick = () => {
    setEditPortfolio(responseData.portfolio_name)
    setEditButtonShow(true)
    setIsEditing(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditPortfolio(e.target.value)
    setEditButtonShow(true)
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

  const dataSend = async (buttonCheckText: string) => {
    const token = localStorage.getItem('token')
    if (inputs.length === 0) {
      console.error('No input data to send.')
      return
    }

    const dataToSend = inputs.map(({ startDate, priceInput, count }) => ({
      purchase_date: formatDate(startDate),
      // equity_type: showAddDataByClick?.equity_name,
      equity_type: 'stock',
      quantity: count,
      // amount: priceInput * count,
      amount: priceInput,
      equity_symbol: showAddDataByClick?.equity_symbol,
    }))
    // console.log('dataToSend', dataToSend)
    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }
    try {
  
      const response = await AXIOS_INSTANCE.post(
        `addInvestments/${responseData?.portfolio_id}`,
        dataToSend,
        { headers }
      )
      if (response.statusText && buttonCheckText === 'anotherMore') {
        setModalAdd(true)
        setShowInput(true)
        SetshowStock(false)
        setShowAddData(false)
        setDateApiResponse(undefined)
        setSearchQuery('')
        setInputs([
          { id: 0, count: 1, startDate: new Date(), priceInput: null },
        ])
      } else if (response.statusText && buttonCheckText === 'save') {
        setModalAdd(false)
        setShowInput(false)
        SetshowStock(false)
        setShowAddData(false)
        setDateApiResponse(undefined)
        setSearchQuery('')
        setInputs([
          { id: 0, count: 1, startDate: new Date(), priceInput: null },
        ])
      }
    } catch (error) {
      console.error('Error posting data:', error)
    }
  }
  const check = () => {
    console.log('ddd')
    setIsMenuOpen(!isMenuOpen)
  }
  
  const deletePortfolioItem = async (portfolioId: number) => {
    const token = localStorage.getItem('token')
    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }

    try {
      const response = await AXIOS_INSTANCE.delete(
        `deletePortFolio?portfolio_id=${portfolioId}`,
        { headers }
      )

      if (response.status === 200) {

        const deletedIndex = portFolioList.findIndex(
          (item) => item.portfolio_id === portfolioId
        )
        console.log('deleteIndex', deletedIndex)
        if (deletedIndex < portFolioList.length - 1) {
          const nextItem = portFolioList[deletedIndex + 1]
          console.log('nextItem', nextItem)
          // router.push({
          //   pathname: `/dashboard/portfolio/listportfolio/tab=${nextItem.portfolio_id}`,
          // })
          checkInvestmentIsTrue(nextItem.portfolio_id)
        } else if (deletedIndex > 0) {
          const previousItem = portFolioList[deletedIndex - 1]
          console.log('previousItem', previousItem)

          // router.push({
          //   pathname: `/dashboard/portfolio/listportfolio/tab=${previousItem.portfolio_id}`,
          // })
          checkInvestmentIsTrue(previousItem.portfolio_id)
        } else {
          router.push({
            pathname: `/dashboard`,
          })
        }
      }
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }
  const checkInvestmentIsTrue = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const headers = {
        X_AUTH_TOKEN: token,
        'Content-Type': 'application/json',
      }

   
      const response = await AXIOS_INSTANCE.get(
        `getInvestments/${id}`,
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

  const handleDeleteClick = (id: number) => {
    deletePortfolioItem(id)
      .then(() => {
        setConfirmationDeleteModal(false)
        // router.push(ROUTES.DASHBOARD);
        reloadList(true)
      })
      .catch((error) => {
        console.error('Error deleting item:', error)
      })
  }
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
        // const [numinput, setNuminput] = useState(null)
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

  const handleManualDateInput = (index: number, inputValue: Date) => {
    const parsedDate = new Date(inputValue)
    if (!isNaN(parsedDate.getTime())) {
      handleDateChange(index, parsedDate)
    } else {
      console.error('Invalid date input')
    }
  }
  const handleManualCountChange = (index, value) => {
    const newCount = parseInt(value, 10)
    const updatedInputs = [...inputs]
    updatedInputs[index] = {
      ...updatedInputs[index],
      count: Math.max(newCount, 0),
    }

    setInputs(updatedInputs)
  }
  const handleAnother = () => {
    dataSend('anotherMore')
    // setSearchQuery()
  }

  const handle_save_cashModal = async (buttonCheckText: string) => {
    // console.log("buttonCheckText", buttonCheckText)
    // if(buttonCheckText === "anotherSaveCashModal"){
    //   setAddcash(false)
    //   SetshowStock(false)
    //   setSearchQuery("")
    // }else{
    //   setModalAdd(false)
    //   setSearchQuery('')
    // }
    // return
    const token = localStorage.getItem('token')
    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }

    const dataToSend = {
      equity_type: 'cash',
      amount: cashinput,
    }
    let dataarray = [dataToSend]
    try {
   
      const response = await AXIOS_INSTANCE.post(
        `addInvestments/${responseData?.portfolio_id}`,
        dataarray,
        { headers }
      )
      if (
        response.status === 200 &&
        buttonCheckText === 'anotherSaveCashModal'
      ) {
        setAddcash(false)
        SetshowStock(false)
        setSearchQuery('')
        setCashEntryIsTrue(true)
      } else if (
        response.status === 200 &&
        buttonCheckText === 'saveCashModal'
      ) {
        setModalAdd(false)
        setSearchQuery('')
        setCashEntryIsTrue(true)
        router.push(
          `/dashboard/portfolio-view?tab=${responseData?.portfolio_id}`
        )
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
  const toggleSmallModal = () => {
    setShowSmallModal(!showSmallModal)
  }
  const handleClickAway = () => {
    setShowSmallModal(false)
  }

  return (
    <div>
      {/* <List key={listKey} /> */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: '13px',
        }}
      >
        {isEditing ? (
          <>
            <div style={{ display: 'flex', marginLeft: '0.75 rem' }}>
              <input
                type="text"
                value={editPortfolio}
                onChange={handleInputChange}
                // onBlur={handleInputBlur}
                className={style.inputedit}
                style={{
                  color: 'hsl(0, 0%, 86%)',
                  fontSize: '0.75rem',
                  backgroundColor: 'rgb(36 36 36)',
                  borderRadius: '2px',
                  border: 'none',
                }}
              />
              {editButtonShow && (
                <div style={{ marginLeft: '0.5rem' }}>
                  <Button
                    onClick={() => handleEditPortfolio(responseData)}
                    size="small"
                    className="is-warning is-outlined"
                  >
                    <span>Submit</span>
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <span
              style={{
                color: 'white',
                fontSize: '1.5rem',
                textTransform: 'capitalize',
                cursor: 'pointer',
              }}
            >
              {/* {editPortfolio ? editPortfolio : responseData.portfolio_name} */}
            </span>
          </>
        )}
        <div>
          {/* <div style={{ display: "flex", marginTop: "6px", ...(isEditing ? { marginLeft: '0px' } : { marginLeft: '20px' }) }}> */}
          {/* <div className="is-flex is-gap" style={{ ...(isEditing ? { marginLeft: '0.5rem' } : { marginLeft: '0.5rem' }) }}>

            <Button onClick={() => handleEditClick()} size="small" className="is-warning is-outlined">
              <Icon>
                <AiOutlineEdit size={16} />
              </Icon>
              <span>Edit</span>
            </Button>
            <Button size="small" className="is-warning is-outlined" onClick={handleDeleteItemClick}>
              <Icon>
                <AiOutlineDelete size={16} />
              </Icon>
              <span>Delete</span>
            </Button>

          </div> */}
          <HiOutlineDotsVertical
            size={25}
            onClick={toggleSmallModal}
            style={{
              cursor: 'pointer',
            }}
          />
          <div>
            <div>
              {showSmallModal && (
                <div>
                  <AnimatePresence>
                    {showSmallModal && (
                      <ClickAwayListener onClickAway={handleClickAway}>
                        <div
                          style={{
                            position: 'relative',
                            marginRight: '0.75rem',
                          }}
                        >
                          <div
                            className={style.menu_wrapper}
                            style={{ zIndex: 999999 }}
                          >
                            <motion.div
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              variants={TOP_TO_BOTTOM_MENU_VARIANT}
                              className={style.menu}
                            >
                              <div
                                role="button"
                                className={style.menu_item_edit}
                                onClick={() => handleEditClick()}
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
                                className={style.menu_item_edit}
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
                            </motion.div>
                          </div>
                        </div>
                      </ClickAwayListener>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {confirmationDeleteModal && (
        <Modal width="30vw" close={() => setConfirmationDeleteModal(false)}>
          <div>
            <p className="is-size-6 has-tw-bold">
              Do you really want to delete this Portfolio?
            </p>

            <div className="buttons is-centered mt-5 are-small">
              <Button onClick={handleDeleteItemClickfalse}>Cancel</Button>
              <Button
                className="is-danger"
                onClick={() => handleDeleteClick(responseData.portfolio_id)}
              >
                Delete Portfolio
              </Button>
            </div>
          </div>
        </Modal>
      )}

      <div className={style.InvestmentContainer}>
        <h3>Nothing in this portfolio yet</h3>
        <p>Add investments to see performance and track returns</p>
        <div style={{ justifyContent: 'center', display: 'flex' }}>
          <Button size="small" className="is-warning" onClick={handleOpenModal}>
            <Icon>
              <IoMdAdd />
            </Icon>
            <span>Add investments </span>
          </Button>
        </div>
      </div>
      {modalAdd && (
        <div
          className={`${styles.modal} ${styles['is-active']}`}
          style={{ overflow: 'visible' }}
        >
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
            style={{ boxShadow: '0 2px 5px -3px #1e374d' }}
          >
            <div className={styles.wrapper} style={{ position: 'relative' }}>
              {/* <div style={{overflow:"auto"}}>       */}
              <FaTimes
                className={styles.closeIcon}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 10,
                  color: 'grey',
                }}
                onClick={() => setModalAdd(false)}
              />
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
                      <div className="">
                        <Tabs>
                          <TabList
                            style={{ display: 'flex', justifyContent: '' }}
                          >
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
                          {addcash && !cashEntryIsTrue && (
                            <div>
                              <div className="flex gap-4 items-center">
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
                                    onClick={() =>
                                      cancel_cashModal_backOption()
                                    }
                                  >
                                    <span>Cancel</span>
                                  </Button>
                                  <Button
                                    className="is-warning is-small has-text-weight-semibold"
                                    onClick={() => handle_another_saveAnother()}
                                  >
                                    <span>Save & add another</span>
                                  </Button>
                                  {/* <Link href={`/dashboard/portfolio-view?tab=${responseData?.portfolio_id}`}> */}
                                  <div>
                                    <Button
                                      className="is-warning is-small has-text-weight-semibold"
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
                                  {/* </Link> */}
                                </div>
                              )}
                            </div>
                          )}

                          <TabPanel>
                            <div>
                              {searchResults.map((data, index) => (
                                <div
                                  onClick={() =>
                                    listStock(data, data?.equity_symbol)
                                  }
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
                                          {/* {"IndexValue"} */}
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
                            {inputs.map((input, index) => (
                              <tr key={input.id} className="input_container">
                                <td>
                                  <div
                                    className={style.changePrice}
                                    id={`countName_${input.id}`}
                                  >
                                    <TbMinus
                                      className={style.btnChangePrizeModal}
                                      onClick={() =>
                                        handleCountChange(index, -1)
                                      }
                                    />
                                    <input
                                      type="number"
                                      value={input.count}
                                      onChange={(e) =>
                                        handleManualCountChange(
                                          index,
                                          e.target.value
                                        )
                                      }
                                      className={style.manualCountInput}
                                      style={{ maxWidth: '50px' }}
                                    />
                                    <IoMdAdd
                                      className={style.btnChangePrizeModal}
                                      onClick={() =>
                                        handleCountChange(index, 1)
                                      }
                                    />
                                  </div>
                                </td>

                                <td id={`dateName_${input.id}`}>
                                  <td
                                    id={`dateName_${input.id}`}
                                    style={{ position: 'relative' }}
                                  >
                                    <div className={style.datePicker}>
                                      <MdDateRange
                                        size={20}
                                        className={style.dateIcon}
                                      />
                                      <DatePicker
                                        selected={inputs[index].startDate}
                                        onChange={(date) =>
                                          handleDateChange(index, date)
                                        }
                                        customInput={
                                          <input
                                            className={style.inputDate}
                                            value={formatDate(
                                              inputs[index].startDate
                                            )}
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
                                </td>

                                <td>
                                  <input
                                    type="number"
                                    name="purchase-price"
                                    value={input.priceInput}
                                    onChange={(e) =>
                                      handlePriceInputChange(
                                        index,
                                        e.target.value
                                      )
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
                        onClick={handleCancel}
                        className="is-warning is-small has-text-weight-semibold"
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
                        onClick={handleAddInput}
                        className="is-warning is-small has-text-weight-semibold"
                      >
                        <Icon>
                          <FaPlus />
                        </Icon>
                        <span>Add More</span>
                      </Button>
                      <Link
                        href={`/dashboard/portfolio-view?tab=${responseData?.portfolio_id}`}
                      >
                        <Button
                          onClick={() => dataSend('save')}
                          className="is-warning is-small has-text-weight-semibold"
                        >
                          <Icon>
                            <BiSave />
                          </Icon>
                          <span>Save</span>
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
export default ModalAddPortfolio
