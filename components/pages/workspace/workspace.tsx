import { useMutation, useQuery } from '@tanstack/react-query'
import Button from 'components/Button/Button'
import Icon from 'components/Icon/Icon'
import Input from 'components/Input/Input'
import { useInfiniteQuery } from '@tanstack/react-query'
import Modal from 'components/Modal/Modal'
import { GET_CHART_TITLES_QUERY_ID } from 'constants'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { useEffect } from 'react'

import {
    deleteChart,
    getChart,
    getChartTitles,
    getSearchChartTitles
} from 'service/DashboardService/DashboardServices'
import {
    GetChartResponseInterface,
    GetChartTitlesResponse
} from 'service/DashboardService/DashboardServicesInterface'
import ChartsWrapper from '../stock/BottomSection/tabs/Chart/ChartsWrapper'
import styles from './index.module.scss'

const Workspace = () => {
  const [items, setItems] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [disableFinance, setDisableTabOne] = useState(false);
  const [disableStock, setDisableTabTwo] = useState(false);
  const [disableEconomic, setDisableTabThree] = useState(false);

  
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
   
    const containsFinance = items?.some((i) => i[3] === 'FINANCE' && i[2].toLowerCase().includes(value));
    const containsStock = items?.some((i) => i[3] === 'STOCK' && i[2].toLowerCase().includes(value));
    const containsEconomic = items?.some((i) => i[3] === 'ECONOMIC' && i[2].toLowerCase().includes(value));
  
    if (containsFinance) {
      setActiveTab('Finance');
      setDisableTabOne(false);
      setDisableTabTwo(true);
      setDisableTabThree(true);
    } 
    else if (value === '') {
      setActiveTab('all');
      setDisableTabOne(false);
      setDisableTabTwo(false);
      setDisableTabThree(false);
    }
    else if (containsStock) {
      setActiveTab('Stock');
      setDisableTabOne(true);
      setDisableTabTwo(false);
      setDisableTabThree(true);
    } else if (containsEconomic) {
      setActiveTab('Economic');
      setDisableTabOne(true);
      setDisableTabTwo(true);
      setDisableTabThree(false);
    }  else {
      setActiveTab('all');
      setDisableTabOne(false);
      setDisableTabTwo(false);
      setDisableTabThree(false);
    }
};

  

 
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selectedConfig, setSelectedConfig] = useState<
    GetChartResponseInterface | undefined
  >()

  const [confirmationDeleteModal, setConfirmationDeleteModal] = useState<
    GetChartResponseInterface | undefined
  >()

  const deleteChartMutation = useMutation(deleteChart)
  const chartTitles = useQuery([GET_CHART_TITLES_QUERY_ID], () =>
    getChartTitles({ page })
  )

  const searchChartTitles = useQuery(
    ['search-chart-titles', searchValue],
    () => getSearchChartTitles({ search_text: searchValue }),
    {
      enabled: !!searchValue,
    }
  )
  // const { data, fetchNextPage, isFetching } = useInfiniteQuery(
  //   ['search-chart-titles', searchValue, "STOCK"],
  //   ({ pageParam = 1 }) => getSearchChartTitles({ search_text: searchValue, chart_type: "STOCK", page: pageParam }),
  //   {
  //     enabled: !!search,
  //     getNextPageParam: (_, pages) => {
  //       return pages.length + 1
  //     },
  //   }
  // );

  // let searchResults = [];
  // data?.pages?.forEach((page) => {
  //   page?.forEach((item) => {
  //     if (item[2]?.toLowerCase().includes(search.toLowerCase())) {
  //       searchResults.push(item);
  //     }
  //   });
  // });

  //const combinedItems = search ? searchResults : items;
  const filteredData = items?.filter(item =>
    item[2].toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleDeleteClick = async (e: GetChartTitlesResponse) => {
    const chartData = await getChart(e[0])
    if (chartData.delete_warn_message) setConfirmationDeleteModal(chartData)
    else
      deleteChartMutation.mutate(e[0], {
        onSuccess: () => chartTitles.refetch(),
      })
  }

  const handleItemClick = async (id: string) => {
    const chartData = await getChart(id)
    setSelectedConfig(chartData)
  }
  useEffect(() => {
    
    if (searchValue) {
      setItems(searchChartTitles.data);
    } else {
      setItems(chartTitles.data);
    }
  }, [search,chartTitles.data,searchChartTitles.data]);
  // let items = search ? searchChartTitles.data : chartTitles.data
  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {confirmationDeleteModal && (
          <Modal
            width="30vw"
            close={() => setConfirmationDeleteModal(undefined)}>
            <div>
              <p className="is-size-6 has-tw-bold">
                {confirmationDeleteModal.delete_warn_message}
              </p>
              <div className="buttons is-centered mt-5 are-small">
                <Button onClick={() => setConfirmationDeleteModal(undefined)}>
                  Cancel
                </Button>
                <Button
                  className="is-danger"
                  onClick={() => {
                    deleteChartMutation.mutate(
                      confirmationDeleteModal.chart_id,
                      { onSuccess: () => chartTitles.refetch() }
                    )
                    setConfirmationDeleteModal(undefined)
                  }}>
                  Delete Chart
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
      <div className="p-3">
        {/* <div className="mb-2">
          <Input
            isLoading={searchChartTitles.isFetching}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search"
            icon={
              <Icon>
                <FaSearch />
              </Icon>
            }
          />
        </div> */}
       <div className="mb-2">
       <Input
        isLoading={searchChartTitles.isFetching}
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={handleSearch}
      />
    
        <div>
            <button
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('Finance')}
              disabled={disableFinance}
            >
           Finance
            </button>
            <button
              onClick={() => setActiveTab('Stock')}
              disabled={disableStock}
            >
             Stock
            </button>
            <button
              onClick={() => setActiveTab('Economic')}
              disabled={disableEconomic}
            >
           Economic
            </button>
          </div>
      <div>
      <p className="is-size-7 has-text-grey mt-2 mb-2">Saved Charts</p>
      {activeTab === 'all' && (
  searchValue
    ? filteredData.map((i) => (
      <div
      onClick={() => handleItemClick(i[0])}
      data-selected={selectedConfig?.chart_id === i[0]}
      key={i[0]}
      className={styles.item}>
      <div className="v-center">
        <span>{i[2]} </span>
        <span className={styles.desc}>({i[1]})</span>
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation()
          handleDeleteClick(i)
        }}>
        <Icon className="has-text-grey">
          <FaTimes />
        </Icon>
      </div>
    
    </div>
    
      ))
    : items?.map((i) => (
        <div
        onClick={() => handleItemClick(i[0])}
        data-selected={selectedConfig?.chart_id === i[0]}
        key={i[0]}
        className={styles.item}>
        <div className="v-center">
          <span>{i[2]} </span>
          <span className={styles.desc}>({i[1]})</span>
        </div>
  
        <div
          onClick={(e) => {
            e.stopPropagation()
            handleDeleteClick(i)
          }}>
          <Icon className="has-text-grey">
            <FaTimes />
          </Icon>
        </div>
      </div>
      ))
)}

{activeTab === 'Finance' && (
  searchValue
    ? filteredData.map((i) => (
      //<div key={index}>{item[2]}</div>
      <div
      onClick={() => handleItemClick(i[0])}
      data-selected={selectedConfig?.chart_id === i[0]}
      key={i[0]}
      className={styles.item}>
      <div className="v-center">
        <span>{i[2]} </span>
        <span className={styles.desc}>({i[1]})</span>
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation()
          handleDeleteClick(i)
        }}>
        <Icon className="has-text-grey">
          <FaTimes />
        </Icon>
      </div>
    </div>
      ))
    : items?.map((i) => i[3] === 'FINANCE' && (
       // <div key={i[0]}>{i[2]}</div>
       <div
       onClick={() => handleItemClick(i[0])}
       data-selected={selectedConfig?.chart_id === i[0]}
       key={i[0]}
       className={styles.item}>
       <div className="v-center">
         <span>{i[2]} </span>
         <span className={styles.desc}>({i[1]})</span>
       </div>
 
       <div
         onClick={(e) => {
           e.stopPropagation()
           handleDeleteClick(i)
         }}>
         <Icon className="has-text-grey">
           <FaTimes />
         </Icon>
       </div>
     </div>
      ))
)}

{activeTab === 'Stock' && (
  searchValue
    ? filteredData.map((i) => (
    //  <div key={index}>{item[2]}</div>
    <div
    onClick={() => handleItemClick(i[0])}
    data-selected={selectedConfig?.chart_id === i[0]}
    key={i[0]}
    className={styles.item}>
    <div className="v-center">
      <span>{i[2]} </span>
      <span className={styles.desc}>({i[1]})</span>
    </div>

    <div
      onClick={(e) => {
        e.stopPropagation()
        handleDeleteClick(i)
      }}>
      <Icon className="has-text-grey">
        <FaTimes />
      </Icon>
    </div>
  </div>
      ))
    : items?.map((i) => i[3] === 'STOCK' && (
        //<div key={i[0]}>{i[2]}</div>
        <div
        onClick={() => handleItemClick(i[0])}
        data-selected={selectedConfig?.chart_id === i[0]}
        key={i[0]}
        className={styles.item}>
        <div className="v-center">
          <span>{i[2]} </span>
          <span className={styles.desc}>({i[1]})</span>
        </div>
  
        <div
          onClick={(e) => {
            e.stopPropagation()
            handleDeleteClick(i)
          }}>
          <Icon className="has-text-grey">
            <FaTimes />
          </Icon>
        </div>
      </div>
      ))
)}
{activeTab === 'Economic' && (
  searchValue
    ? filteredData.map((i) => (
      // <div key={index}>{item[2]}</div>
      <div
      onClick={() => handleItemClick(i[0])}
      data-selected={selectedConfig?.chart_id === i[0]}
      key={i[0]}
      className={styles.item}>
      <div className="v-center">
        <span>{i[2]} </span>
        <span className={styles.desc}>({i[1]})</span>
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation()
          handleDeleteClick(i)
        }}>
        <Icon className="has-text-grey">
          <FaTimes />
        </Icon>
      </div>
    </div>
      ))
    : items?.map((i) => i[3] === 'ECONOMIC' && (
      <div
      onClick={() => handleItemClick(i[0])}
      data-selected={selectedConfig?.chart_id === i[0]}
      key={i[0]}
      className={styles.item}>
      <div className="v-center">
        <span>{i[2]} </span>
        <span className={styles.desc}>({i[1]})</span>
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation()
          handleDeleteClick(i)
        }}>
        <Icon className="has-text-grey">
          <FaTimes />
        </Icon>
      </div>
    </div>
      ))
)}



     
      </div>
    </div>

        {/* <p className="is-size-7 has-text-grey mb-2">Saved Charts</p> */}
        {/* {items?.map((i) => (
          <div
            onClick={() => handleItemClick(i[0])}
            data-selected={selectedConfig?.chart_id === i[0]}
            key={i[0]}
            className={styles.item}>
            <div className="v-center">
              <span>{i[2]} </span>
              <span className={styles.desc}>({i[1]})</span>
            </div>

            <div
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteClick(i)
              }}>
              <Icon className="has-text-grey">
                <FaTimes />
              </Icon>
            </div>
          </div>
        ))} */}
      </div>
      <div className="px-3 py-6">
        {!selectedConfig?.symbol && (
          <div className="v-center is-justify-content-center fill-height">
            <p className="has-text-grey has-text-center">
              Please select a chart.
            </p>
          </div>
        )}
        {selectedConfig?.symbol && (
          <ChartsWrapper
            symbol={selectedConfig?.symbol}
            config={selectedConfig}
            disableSavedCharts
          />
        )}
      </div>
    </div>
  )
}

export default Workspace
