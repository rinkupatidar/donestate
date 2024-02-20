import { useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { SetStateAction, useEffect, useState } from 'react'
import { getTopWorldCommoditiesInfo } from 'service/DashboardService/DashboardServices'
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect'
import style from './index.module.scss'
import Modal from 'components/Modal/Modal'
import DatePicker from 'react-datepicker'
import Button from 'components/Button/Button'
import Input from 'components/Input/Input'
import Icon from 'components/Icon/Icon'
import 'react-datepicker/dist/react-datepicker.css'
import { BsTrash } from 'react-icons/bs'
import { AXIOS_INSTANCE, IS_CLIENT, ROUTES } from '../../../constants'
import { baseURLnew } from '../../../constants'
import { IoMdAdd } from 'react-icons/io'
import { TbMinus } from 'react-icons/tb'
import { MdDateRange } from 'react-icons/md'
import ModalAddPortfolio from './ModalAddPortfolio'
import Link from 'next/link'
import { BiSave } from 'react-icons/bi'
import { useRouter } from 'next/router'
import axios from 'axios'
import LoaderOverlay from '../../../components/Loader/LoaderOverlay'
import List from './listportfolio/[list]'

const Portfolio = () => {
  const router = useRouter()
  const [showAddStock, setAddStock] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [displayValue, setDisplayValue] = useState('')
  const name = 'jiji'
  const [typedText, setTypedText] = useState<string | null>(null);
  const [responseData, setResponseData] = useState('')
  const [loading, setLoading] = useState(true);

  // const handleInputChange = (e: {
  //   target: { value: SetStateAction<string> }
  // }) => {
  //   setTypedText(e.target.value)
  // }
  // const handleInputChange = (e) => {
  //   setTypedText(e.target.value);
  // };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypedText(e.target.value);
  };


  const AddStock = async () => {
    const token = localStorage.getItem('token');
    setTypedText(typedText);
    setDisplayValue(inputValue);
    setAddStock(true);
    setShowModal(false);
    // console.log('Input Value:', inputValue);

    const headers: Record<string, string> = {
      'X_AUTH_TOKEN': token || '', // Use an empty string if token is null
      'Content-Type': 'application/json',
    };
  
    try {
      //const response = await fetch('https://api.donestat.co/rest/v1/createPortFolio', {
        const response = await fetch(`${baseURLnew}/createPortFolio`, {
        method: 'POST',
        headers: headers,
        body: typedText,
      });
     

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json(); 
      if (responseData) {
        setResponseData(responseData);
        // router.push(`/dashboard/portfolio/listportfolio/${responseData.portfolio_id}`);
        router.push({
          pathname: `/dashboard/portfolio/listportfolio/tab=${responseData.portfolio_id}`,
          // query: { responseData: JSON.stringify(responseData) },
         
        });
       
      } else {
        console.error('API call was not successful:', responseData);
      }
      
      // Use response.text() for plain text response
      // console.log('Post successful:', responseData);
      // setResponseData(responseData);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };


  const AddStockNone = () => {
    setAddStock(false)
  }

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [showModal, setShowModal] = useState(true)
  const [changeName, setChangeName] = useState('')
  const [portfolioName, setPortfolioName] = useState('')



  const [ck, setCk] = useState('')
  // console.log('displayValue', displayValue)
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString().slice(-2)
    return `${day}/${month}/${year}`
  }

  const handleCloseModal = () => {
    router.push(ROUTES.DASHBOARD)
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoading(false);
      setShowModal(true);
      clearInterval(intervalId);
    }, 1000);

    return () => clearInterval(intervalId); 
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      AddStock();
    }
  };

  return (
    <div>
      {loading && <LoaderOverlay/>}
      {showModal && (
        <Modal close={handleCloseModal} isSmall>
          <p className="is-size-5 mb-3">
            Create a Portfolio
          </p>
         

          <div className={style.inputPortfolio}>
            <Input
              type="text"
              cSize="small"
              label="Enter Portfolio"
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className={style.displayBtn}>
            {/* <Button size="small" className="mt-3 is-warning" onClick={AddStock}>
              <Icon>
                <BiSave />
              </Icon>
              <span>Save </span>
            </Button> */}
            <Button
            size="small"
            className="button is-small is-warning mt-3"
            onClick={AddStock}>
            <Icon>
              <BiSave />
            </Icon>
            <span>Save </span>
          </Button>
          </div>
        </Modal>
      )}  
      {/* {/ {/ typedText={typedText} /} /} */}

      {/* {showAddStock && 
      <>
      <List/>
      <ModalAddPortfolio  responseData={responseData} 
      />
      </>
      } */}
    </div>
  )
}
export default Portfolio
