import React, { useEffect, useRef, useState } from 'react'
import {
  AiOutlineEllipsis,
  AiOutlineEdit,
  AiOutlineDelete,
} from 'react-icons/ai'
import Modalclose from 'components/Modal/Modal_without_close'
import { motion, AnimatePresence } from 'framer-motion'
import style from './index.module.scss'
import ClickAwayListener from 'react-click-away-listener'
import { MdOutlineBarChart, MdAddChart } from 'react-icons/md'
import { IoStatsChart } from 'react-icons/io5'
import { GoPencil } from 'react-icons/go'
import Modal from 'components/Modal/Modal'
import { GET_CHART_TITLES_QUERY_ID } from 'constants'
import axios from 'axios'
import { FaPlus, FaSearch, FaTimes } from 'react-icons/fa'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import Icon from 'components/Icon/Icon'
import LoadingSection from 'components/Loader/LoadingSection'
import { getSearchChartTitles } from 'service/DashboardService/DashboardServices'
import debounce from 'lodash/debounce'
import { useForm } from 'react-hook-form'
import { useImmer } from 'use-immer'
import { createChart } from 'service/DashboardService/DashboardServices'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { getopenChart,updateChart } from 'service/DashboardService/DashboardServices'

// const ThreeDotsIcon = ({ size = 16, color = 'black', className = '', threedot, data, i, activeTab }) => {
const ThreeDotsIcon = ({
  size = 16,
  color = 'black',
  className = '',
  threedot,
  data,
  id,
  activeTab,
  selectedValues,
  onChartIdUpdate,
  onReceiveOpenChartData,
}) => {
  const { statementType, reportType, fillingType, symbol } = selectedValues

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const item = {
    chart_data_type: fillingType,
    chart_range: fillingType === 'ANNUAL' ? 2 : 8,
    
    chart_items: [
      { displayValue: symbol, type: '', controlType: 'symbol' },
      {
        item_order: 1,
        item_type: 'FINANCIAL',
        item_group: statementType,
        item_name: data,
        chart_item_symbol: symbol,
        item_id: id!,
        item_component_type: 'BAR',
        // item_color: "Blue",
      },
    ],
    // chart_range: '1',
    // chart_type:"FINANCIAL",
  }


  // useEffect(() => {
  //   setControls(draft => {
  //     draft[0].displayValue = data;
  //     draft[0].type = id;
  //     draft[0].controlType = statementType;
  //     draft[0].duration = fillingType;
  //   });
  // }, [data, id, statementType, fillingType]);

  const [showMenu, setShowMenu] = useState(false)
  const [checkmoreitem, setCheckmoreitem] = useState(false)
  const [sameitem, setSameitem] = useState("");
  const [createModalShow, setCreateModalShow] = useState(false)
  const [existingModalOpen, setExistingModalOpen] = useState(false)
  const [showSearchListData, setShowSearchListData] = useState(false)
  const [search, setSearch] = useState('')
  const [searchList, setSearchList] = useState([])
  const [popdata, setPopdata] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef()
  const [chartid, setchartid] = useState()
  const [page, setPage] = useState(1)
  const [successpopup, setSuccessPopup] = useState(false)

  const handleEditClick = () => {
    setShowMenu(false)
    setCreateModalShow(true)
  }

  const handleSearchClick = () => {
    setShowMenu(false)
    setExistingModalOpen(true)
  }

  const handleClickAway = () => {
    setShowMenu(false)
  }

  const openModal = () => {
    setShowMenu(!showMenu)
  }
  const createModalShowClose = () => {
    setCreateModalShow(false)
  }

  const queryClient = useQueryClient()
  const mutation = useMutation(createChart)
  const router = useRouter()
  const onSubmit = handleSubmit(({ title }) => {
    mutation.mutate(
      {
        title,
        chart_type: 'FINANCIAL',
        // chart_data_type:fillingType,
        // chart_range:1,
        chart_config: item,
        symbol,
        // chart_type: "FINANCIAL",
      },
      
      {
        onSuccess: async (data) => {
          if (data.response_code && data.response_code === '200') {
            setSuccessPopup(true);
          setTimeout(() => {
            setSuccessPopup(false);
          }, 1500);
        }
        
          queryClient.invalidateQueries(GET_CHART_TITLES_QUERY_ID)
          close()
          const url = new URL(location.href)

          url.searchParams.set('titles', title)
          router.push(url, undefined, { scroll: false })

          const token = localStorage.getItem('token')
          const headers = {
            X_AUTH_TOKEN: token,
            'Content-Type': 'application/json',
          }
          try {
            const response = await axios.get(
              `https://api.donestat.co/rest/v1/getChartTitles?symbol=${symbol}&chart_type=FINANCIAL&page=1`,
              { headers }
            )
            if (response.status === 200) {
              const extractedData = response.data[0][0]
              setchartid(extractedData)

              onChartIdUpdate(extractedData)

              try {
                const secondResponse = await getopenChart({
                  chart_id: extractedData,
                })
                onReceiveOpenChartData(secondResponse)
              } catch (error) {
                console.error('Error calling second API:', error)
              }
            }
          } catch (error) {
            console.error('Error calling another API:', error)
          }
          threedot(title)
        },
      }
    )
  })

  const handleItemClick = async (clickedItemText) => {
    try {
      const secondResponse = await getopenChart({
        chart_id: clickedItemText,
      });

      const mergedatathree=(secondResponse.chart_config.chart_items.length+secondResponse.chart_config.compareOptionInEconomics.length)
        if (secondResponse && secondResponse.chart_config && mergedatathree < 5) {
        const dataa = secondResponse  
        const item = secondResponse.chart_config.chart_items?.findIndex((i:any) => i.item_id === id)
        if (item === -1) {
          dataa?.chart_config.chart_items.push({
            item_id: id!,
            item_name: data,
            item_type: 'FINANCIAL',
            item_group: statementType,
            chart_item_symbol: symbol,
            item_component_type: 'BAR',
          })
      
          await updateChart({
            ...dataa,
            symbol,
            chart_format:secondResponse?.chart_config?.chart_format,
            chart_id:secondResponse?.chart_id,
          })

              const url = new URL(location.href);
              url.searchParams.set('titles', dataa?.title);
              url.searchParams.set('chartId', dataa?.chart_id);
              router.push(url, undefined, { scroll: false });
              onReceiveOpenChartData(secondResponse);
              threedot(secondResponse?.title);
            }
        else {
              // setSameitem(secondResponse.chart_config.chart_items?.item_name)
              setCheckmoreitem(true)
              setExistingModalOpen(false)
            }    
      }
      else{
        setPopdata(true);
        setExistingModalOpen(false)
      }
    } catch (error) {
      console.error('Error calling second API:', error);
    }
  }
  
  useEffect(() => {
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

  const handleSearch = (e) => {
    const inputValue = e.target.value.trim()

    setSearch(e.target.value)
    if (inputValue) {
      setShowSearchListData(true)
    } else {
      setShowSearchListData(false)
    }
  }
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
        search_text: search,
        chart_type: 'FINANCIAL',
        page: page + 1,
        symbol: symbol,
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

 
  return (
    <div className={`bar-chart-icon ${className}`}>
      <motion.div
        className="three-dots-icon"
        whileHover={{ scale: 1.1 }}
        onClick={() => openModal()}
      >
        <MdOutlineBarChart />
      </motion.div>
      {popdata && (
          <Modal width="30vw" close={() => setPopdata(false)}>
            <div>
              <p className="help mt-2 is-danger is-size-6 has-tw-bold is-centered ">
             
                <p className='is-centered '>This chart already contains maximum items. Please create another chart.</p>
              </p>
             
            
            </div>
          </Modal>

        )}
          {successpopup && (
                    <Modalclose width="30vw">
                      <div>
                        <p className="help mt-2 is-scheme-invert is-size-6 has-tw-bold is-centered ">
                          <p className="is-centered ">
                          Your chart is created successfully. You can share media account by clicking on the 'Share' button.
                          </p>
                        </p>
                      </div>
                    </Modalclose>
                  
                  )}
      {checkmoreitem && (
    <Modal width="30vw" close={() => setCheckmoreitem(false)}>
      <div>
      
        <p className="help mt-2 is-danger is-size-6 has-tw-bold">
         
          <span>This item is already defined within this chart.</span>
        </p>
      
        {/* <div className="buttons is-centered mt-5 are-small ">
          <Button onClick={() => setCheckmoreitem(false)} >Cancel</Button>
      
        </div> */}
      </div>
    </Modal>
  )
  }

      <AnimatePresence>
        {showMenu && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <div
              style={{
                position: 'relative',
                marginRight: '0.75rem',
              }}
            >
              <div className={style.menu_wrapper} style={{ zIndex: 999999 }}>
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  // Replace with your animation variants
                  className={style.menu}
                >
                  {/* <div
                    role="button"
                    className={style.menu_item_edit}
                    onClick={handleEditClick}
                    style={{
                      cursor: 'pointer',
                    }}
                  > Create Chart
                    <span style={{ marginLeft: '24px', marginTop: '2px' }}>
                    <FaPlus />
                    </span>
                   
                  </div> */}
                  <div
                    role="button"
                    className={style.menu_item_edit}
                    onClick={handleEditClick}
                  >
                    Create Chart
                    <FaPlus
                      // onClick={handleEditClick}
                      // className={styles.plus}
                      style={{ marginLeft: 'auto' }}
                    />
                  </div>

                  <div
                    role="button"
                    className={style.menu_item_edit}
                    onClick={handleSearchClick}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    Add to Existing Chart
                    <span style={{ marginLeft: '4px', marginTop: '2px' }}>
                      <GoPencil />
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </ClickAwayListener>
        )}
      </AnimatePresence>
      {createModalShow && (
        <Modal close={() => createModalShowClose()}>
          <p className="is-size-5 mb-3">Add a title to your chart</p>

          <form onSubmit={onSubmit}>
            <Input
              {...register('title', {
                required: 'Title is required',
              })}
              placeholder="Create Chart Title"
              cSize="small"
              label="Chart Title"
              error={errors.title}
            />
            <div className="is-flex is-justify-content-flex-end ">
              <Button className="is-warning mt-3" size="small" type="submit">
                <Icon>
                  <FaPlus />
                </Icon>
                <span>Save</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
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
                  onClick={() => handleItemClick(item[0])}
                >
                  {item[2]}
                </p>
              ))}
              {searchList.length === 0 && (
                <div className="is-size-7 has-tw-bold is-sizei-7 has-text-centered has-text-gray mt-6 mb-6">
                  No Record found
                </div>
              )}
              {isLoading && <LoadingSection />}
            </div>
          )}
          <div className="is-flex is-justify-content-flex-end"></div>
        </Modal>
      )}
    </div>
    
  )
}

export default ThreeDotsIcon
