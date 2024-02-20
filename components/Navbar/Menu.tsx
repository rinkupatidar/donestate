import SettingsIcon from '@/icons/settings.svg'
import UserIcon from '@/icons/user.svg'
// import DollerIcon from '@icon/doller.svg'
import MoneyIcon from '@/icons/money.svg'
import { motion } from 'framer-motion'
import useKeyPress from 'hooks/useKey'
import Link from 'next/link'
import { MouseEvent, useContext, useEffect, useState } from 'react'
import { AiOutlineStock } from 'react-icons/ai'
import { AiOutlineDollar } from 'react-icons/ai'
import { AiOutlineSetting } from 'react-icons/ai'
import { BsFillBarChartFill } from 'react-icons/bs'
import { TOP_TO_BOTTOM_MENU_VARIANT } from 'utils/variants'
import { authContext } from '../../context/authContext'
import styles from './index.module.scss'
import Modal from 'components/Modal/Modal'
import Dropdown from 'components/Dropdown/Dropdown'
import { AXIOS_INSTANCE } from 'constants'
import ModalPortfolio from 'components/Modal/ModalPortfolio'
import { IoMdAdd } from 'react-icons/io'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { IoIosPricetag } from 'react-icons/io'
import { FaMoneyCheckDollar } from 'react-icons/fa6'
import axios from 'axios'
import { useRouter } from 'next/router'
interface MenuProps {
  closeMenu: () => void
}
interface PortfolioData {
  portfolio_id: string
  portfolio_name: string
}

const Menu = ({ closeMenu }: MenuProps) => {
  const [showModal, setShowModal] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [apiData, setApiData] = useState<PortfolioData[]>([])
  const router = useRouter()

  const showSixthPortfolio = () => {
    if (apiData && apiData.length > 5) {
      const sixthPortfolioId = apiData[5]?.portfolio_id

      console.log('Display the sixth portfolio with ID', sixthPortfolioId)
    }
  }

  const openModal = () => {
    setShowModal(true)
  }
  const { logout } = useContext(authContext)
  useKeyPress('Escape', closeMenu)

  const fetchData = async () => {
    const token = localStorage.getItem('token')

    const headers = {
      X_AUTH_TOKEN: token,
      // 'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    try {
     
      const response = await AXIOS_INSTANCE.get(
        `getPortFolioList`,
        { headers }
      )
      setApiData(response.data.reverse())
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  const checkInvestmentShowMore = async (id: string) => {
    const setRouterQuery = apiData.filter((item) => item.portfolio_id === id)
    if (setRouterQuery.length > 0) {
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
  }


  const checkInvestmentParticular = async (id:string)=>{
    const setRouterQuery = apiData.filter((item) => item.portfolio_id === id)
   
    if (setRouterQuery.length > 0) {
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

  }

  return (
    <div>
      {' '}
      <div className={styles.menu_wrapper} style={{ overflowY: 'auto' }}>
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={TOP_TO_BOTTOM_MENU_VARIANT}
          className={styles.menu}
        >
          <Link href="/account">
            <div role="button" className={styles.menu_item}>
              <UserIcon />
              Account
            </div>
          </Link>

          <Link href="/dashboard/workspace">
            <div role="button" className={styles.menu_item}>
              <BsFillBarChartFill />
              Workspace
            </div>
          </Link>
          <Link href="/dashboard/economics-dashboard">
            <div role="button" className={styles.menu_item}>
              <AiOutlineStock />
              Economis Dashboard
            </div>
          </Link>
          <Link href="/settings">
            <div role="button" className={styles.menu_item}>
              <SettingsIcon style={{ width: '24px', height: '24px' }} />
              Settings
            </div>
          </Link>

          <Link href="/dashboard/portfolio">
            <div role="button" className={styles.menu_item1}>
              <MoneyIcon
                style={{ width: '24px', height: '24px', stroke: '#171717' }}
              />
              Portfolio
              <IoMdAdd
                onClick={openModal}
                className={styles.plus}
                style={{ marginLeft: 'auto' }}
              />
            </div>
          </Link>

          {apiData &&
            apiData.slice(0, showMore ? apiData.length : 5).map((item) => (
              <div
                key={item.portfolio_id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  // marginLeft: '25px',
                }}
              >
                {/* <Link href={`/dashboard/portfolio-view?tab=${item.portfolio_id}`}> */}
                <div role="button" className={styles.menu_item_new}  onClick={() => checkInvestmentParticular(item.portfolio_id)}>
                  <div>
                    <span
                      style={{
                        textTransform: 'capitalize',
                        overflowWrap: 'break-word',
                        wordWrap: 'break-word',
                        wordBreak: 'break-word',
                        // marginLeft: '60px'
                        marginLeft: '25px',
                      }}
                     
                    >
                      {item.portfolio_name.length > 10
                        ? `${item.portfolio_name.slice(0, 10)}...`
                        : item.portfolio_name}
                    </span>
                  </div>
                </div>
                {/* </Link> */}
              </div>
            ))}
          {apiData && apiData[5] && (            
            // <Link href={`/dashboard/portfolio-view/?tab=${apiData[apiData.length - 1].portfolio_id}`}>
            <div role="button" className={styles.menu_item}>
              <div>
                <span
                  style={{
                    textTransform: 'capitalize',
                    overflowWrap: 'break-word',
                    wordWrap: 'break-word',
                    wordBreak: 'break-word',
                    marginLeft: '25px',
                  }}

                  // onClick={() => checkInvestment(apiData && apiData.length > 0 ? apiData[apiData.length - 1].portfolio_id : null)}
                  onClick={() => checkInvestmentShowMore(apiData[0].portfolio_id)}
                >
                  Show more...
                </span>
              </div>
            </div>
            // {/* </Link> */}
          )}

          <div onClick={logout} role="button" className={styles.menu_item}>
            Logout
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Menu
