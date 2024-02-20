import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import Button from 'components/Button/Button'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { IoMdAdd } from 'react-icons/io'

import Icon from 'components/Icon/Icon'
import styles2 from './index.module.scss'
import { useRouter } from 'next/router'
import { NavItemType } from 'components/pages/stock/types'
import { addQueryParamsToUrl } from 'utilities/common'
import Link from 'next/link'
import { AXIOS_INSTANCE } from 'constants'
import ModalAddPortfolio from '../ModalAddPortfolio'


const List = () => {
    const [portFolioList, setPortFolioList] = useState([])
    const [filterAndActive, setFilterAndActive] = useState([])
    const [arrowDisable, setArrowDisable] = useState(true)
    const [arrowDisable1, setArrowDisable1] = useState(false)
    const elementRef = useRef(null)
    const router = useRouter()
    // const tab: NavItemType = router.query?.tab as NavItemType
    // const [activeTab, setActiveTab] = useState<NavItemType>()
    const [activeTab, setActiveTab] = useState<NavItemType>(
        portFolioList.length > 0 ? portFolioList[0].portfolio_id : undefined
    );
    const [reloadAgainList, setReloadAgainList] = useState<boolean>(false)


    const { list, responseData } = router.query;
    const parsedResponseData = responseData ? JSON.parse(responseData) : null;
    // console.log(list)
    const getPortFolioListData = async () => {
        const token = localStorage.getItem('token');
    
        const headers = {
            X_AUTH_TOKEN: token,
            'Content-Type': 'application/json',
        };
    
        try {
            const response = await AXIOS_INSTANCE.get(
                `getPortFolioList`,
                { headers }
              );
    
            if (response.status === 200) {
                const reversedData = response.data.reverse();
                setPortFolioList(reversedData);    
                const routerId = router.query.list;
                const tabValue = routerId ? routerId.split('tab=')[1] : null;    
                if (tabValue) {
                    const filteredData = reversedData.find((item) => {
                        return item.portfolio_id === tabValue;
                    });
    
                    setFilterAndActive(filteredData);
                    setActiveTab(tabValue)
                    setReloadAgainList(false)
                } else {
                    console.log("No 'tab=' value found in the URL parameter");
                }
            } else {
                console.log("Data not found");
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    


    // useEffect(() => {
    //     // console.log(tab,'ddddd')
    //     // if (parsedResponseData) setActiveTab(parsedResponseData.portfolio_id)
    //     // else return
    //     if (filterAndActive) {
    //         setActiveTab(filterAndActive.portfolio_id)
    //     } else {
    //         return
    //     }

    // }, [filterAndActive])
    useEffect(() => {

        const updateOverflowStatus = () => {
            const element = document.getElementById('port');

            if (element) {

                const hasOverflow = element.scrollWidth > element.clientWidth;
                setArrowDisable1(!hasOverflow);
            }
        };

        const handleEvents = () => {
            updateOverflowStatus();
        };

        // Set initial overflow status
        updateOverflowStatus();

        // Attach event listeners for window resize, load, and transitionend
        window.addEventListener('resize', handleEvents);
        window.addEventListener('load', handleEvents);
        window.addEventListener('transitionend', handleEvents);

        // Check for overflow after a small delay
        const timeoutId = setTimeout(() => {
            handleEvents();
        }, 100);

        // Cleanup event listeners on component unmount and clear timeout
        return () => {
            window.removeEventListener('resize', handleEvents);
            window.removeEventListener('load', handleEvents);
            window.removeEventListener('transitionend', handleEvents);
            clearTimeout(timeoutId);
        };
    }, []) // Empty dependency array ensures that this effect runs only once on mount
    useEffect(() => {
        getPortFolioListData()
    }, [reloadAgainList])

    useEffect(()=>{
        const routerId = router.query.list;
        const tabValue = routerId ? routerId.split('tab=')[1] : null;
        console.log("routerId",routerId)
        console.log("portFolioList",portFolioList)

        if (tabValue || portFolioList) {
            const filteredData = portFolioList.find((item) => {
                return item.portfolio_id === tabValue;
            });
            // console.log("filteredData",filteredData)
            setFilterAndActive(filteredData);
            setActiveTab(tabValue)
        } else {
            console.log("No 'tab=' value found in the URL parameter in useEffect");
        }
    },[router,portFolioList])

    const handleHorizantalScroll = (
        element: HTMLDivElement | null,
        speed: number,
        distance: number,
        step: number
    ) => {
        if (!element) return

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

    const CurrentPortfolio = async (id, data) => {
        setActiveTab(id)
        const setRouterQuery = portFolioList.find((item) => item.portfolio_id === id);
        if (setRouterQuery) {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    X_AUTH_TOKEN: token,
                    'Content-Type': 'application/json',
                };

           
                const response = await AXIOS_INSTANCE.get(
                    `getInvestments/${id}`,
                    { headers }
                  );
                if (response.status === 200) {
                    if (response.data.length === 0) {
                        router.push({
                            pathname: `/dashboard/portfolio/listportfolio/tab=${id}`,
                            // query: { responseData: JSON.stringify(setRouterQuery[0]) },
                        });
                        setFilterAndActive(setRouterQuery);
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
    const reloadList = (condition: boolean) => {
        setReloadAgainList(condition)
    }
 
    return (
        <div className={styles2.wrapper} style={{ display: 'grid' }}>

            <div className={`${styles2.buttonContianer} p-3 is-relative`}>
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
                <div id="port" className={styles2.imgContainer} ref={elementRef}>
                    <div className={styles2.bottom_info}>
                        <nav className={styles2.bottom_info_nav}>
                            {portFolioList &&
                                portFolioList.map((portfolio, index) => (
                                    <div
                                        style={{ textTransform: 'capitalize' }}
                                        role="button"
                                        className={`${styles2.nav_item} ${activeTab === portFolioList.portfolio_id ? styles2.active : ''
                                            }`}
                                        key={index}
                                        onClick={() => {
                                            CurrentPortfolio(portfolio.portfolio_id, portfolio)
                                        }}
                                    >
                                        {activeTab === portfolio.portfolio_id && (
                                            <div className={styles2.floating_bg} />
                                        )}
                                        <div className={styles2.overflow_texttab}>
                                            <span>{portfolio.portfolio_name}</span>
                                        </div>
                                    </div>
                                ))}
                            <Link href="/dashboard/portfolio">
                                <Button
                                    className="is-warning is-small has-text-weight-semibold"
                                    //   onClick={openModal}
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

            <ModalAddPortfolio responseData={filterAndActive} reloadList={reloadList} portFolioList={portFolioList} />
        </div>

    )
}

export default List