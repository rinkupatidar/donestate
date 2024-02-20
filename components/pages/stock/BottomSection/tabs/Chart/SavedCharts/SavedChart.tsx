import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import Button from 'components/Button/Button'
import Icon from 'components/Icon/Icon'
import Input from 'components/Input/Input'
import LoaderOverlay from 'components/Loader/LoaderOverlay'
import Modal from 'components/Modal/Modal'
import {
  CHARTS_BOTTOM_BUTTONS_WRAPPER_ID,
  GET_CHART_TITLES_QUERY_ID
} from 'constants'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { BiSave } from 'react-icons/bi'
import { FaPlus, FaSearch, FaTimes } from 'react-icons/fa'
import {
  deleteChart,
  getChart,
  getChartTitles,
  updateChart,
  getSearchChartTitles
} from 'service/DashboardService/DashboardServices'
import {
  GetChartResponseInterface,
  GetChartTitlesResponse
} from 'service/DashboardService/DashboardServicesInterface'
import CreateChartModal from './CreateChartModal'
import styles from './index.module.scss'
import { SavedChartConfigInterface } from './SavedChartTypes'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import LoadingSection from 'components/Loader/LoadingSection'


interface SavedChartProps {
  config: SavedChartConfigInterface
  symbol: string
  loadChartConfig: (config: SavedChartConfigInterface) => void
  parentConfig?: GetChartResponseInterface
}

export const SavedChart = ({
  config,
  symbol,
  loadChartConfig,
  parentConfig,
}: SavedChartProps) => {
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCreateChartModalOpen, setIsCreateChartModalOpen] = useState(false)
  const deleteChartMutation = useMutation(deleteChart)
  const [confirmationDeleteModal, setConfirmationDeleteModal] = useState<
    GetChartResponseInterface | undefined
  >()
  const [selectedConfig, setSelectedConfig] = useState<
    GetChartResponseInterface | undefined
  >()
  const routerUrl = useRouter()
  const query = useQuery(
    GET_CHART_TITLES_QUERY_ID,
    () => getChartTitles({ symbol, page: 1, chart_type: "STOCK" }),
    { enabled: !!!parentConfig }
  )

  const handleItemClick = async (id: string) => {
    const chartData = await getChart(id)
    setSelectedConfig(chartData)
    loadChartConfig(chartData.chart_config)
  }

  const autoActive = async (item) => {
    let routerTitles = routerUrl.query.titles as string;
    const filteredItems = item.filter((i) => {
      return i[2] === routerTitles;
    });

    if (filteredItems.length > 0) {
      const id = filteredItems[0][0];
      const chartData = await getChart(id);
      setSelectedConfig(chartData);
      loadChartConfig(chartData.chart_config);
      routerTitles = '';
    } else {
      console.log("No item found with the specified value");
    }
  };

  useEffect(() => {
    if (query.data) {
      autoActive(query.data)
    }
  }, [routerUrl, query.data])

  const handleUpdateChart = async () => {
    setIsLoading(true)
    const data = parentConfig! || selectedConfig
    await updateChart({
      ...data,
      chart_config: config,
    })
    setIsLoading(false)
  }

  const handleDeleteClick = async (e: GetChartTitlesResponse) => {
    const chartData = await getChart(e[0])
    if (chartData.delete_warn_message) setConfirmationDeleteModal(chartData)
    else deleteChartMutation.mutate(e[0], { onSuccess: () => query.refetch() })
  }

  let items = query.data; 

  const { data, fetchNextPage, isFetching } = useInfiniteQuery(
    ['search-chart-titles', search, "STOCK"],
    ({ pageParam = 1 }) => getSearchChartTitles({ search_text: search, chart_type: "STOCK", page: pageParam }),
    {
      enabled: !!search,
      getNextPageParam: (_, pages) => {
        return pages.length + 1
      },
    }
  );

  let searchResults = [];
  data?.pages?.forEach((page) => {
    page?.forEach((item) => {
      if (item[2]?.toLowerCase().includes(search.toLowerCase())) {
        searchResults.push(item);
      }
    });
  });

  const combinedItems = search ? searchResults : items;

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
  };
  // const filteredData = items?.filter(item =>
  //   item[2].toLowerCase().includes(search.toLowerCase())
  // );
  return (
    <div className="v_data_section fill-height is-relative">
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
                      { onSuccess: () => query.refetch() }
                    )
                    setConfirmationDeleteModal(undefined)
                  }}>
                  Delete Chart
                </Button>
              </div>
            </div>
          </Modal>
        )}
        {isCreateChartModalOpen && (
          <CreateChartModal
            close={() => setIsCreateChartModalOpen(false)}
            config={config}
            symbol={symbol}
            key={"STOCK"}
          />
        )}
        {isLoading && <LoaderOverlay />}
      </AnimatePresence>
      <div>
        <p className="is-size-7 has-text-grey mb-2">Saved Charts</p>
        <Input
          // onChange={(e) => setSearch(e.target.value)}
          // value={searchValue}
          onChange={handleSearch}
          value={search}
          placeholder="Search"
          cSize="small"
          icon={
            <Icon>
              <FaSearch />
            </Icon>
          }
        />
      </div>
      <div className={styles.list_wrapper}>
        <div className={styles.list} >
          {combinedItems?.length === 0 && (
            <p className="is-size-7 has-tw-bold is-sizei-7 has-text-centered has-text-gray mt-6">
              No charts found
            </p>
          )}
          <div >
            {combinedItems?.map((i) => (
              <div
                data-selected={selectedConfig?.chart_id === i[0]}
                key={i[0]}
                onClick={() => handleItemClick(i[0])}
                className={styles.item}
              >
                <span>{i[2]}</span>
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
            ))}
            {search && (
              <motion.div
                onViewportEnter={() => {
                  fetchNextPage();
                }}
              >
                <LoadingSection disableSection className="mt-3" />
              </motion.div>
            )}
          </div>
          {/* {
            search
              ? filteredData.map((i) => (
                <div>
                  <div
                    onClick={() => handleItemClick(i[0])}
                    data-selected={selectedConfig?.chart_id === i[0]}
                    key={i[0]}
                    className={styles.item}
                  >
                    <div className="v-center">
                      <span>{i[2]}</span>
                    </div>

                  </div>
                  <motion.div
                    onViewportEnter={() => {
                      fetchNextPage();
                    }}
                  >
                    <LoadingSection disableSection className="mt-3" />
                  </motion.div>
                  
                </div>
              ))
              : items?.map((i) => (
                <div
                  onClick={() => handleItemClick(i[0])}
                  data-selected={selectedConfig?.chart_id === i[0]}
                  key={i[0]}
                  className={styles.item}
                >
                  <div className="v-center">
                    <span>{i[2]}</span>
                  </div>

                </div>
              ))
          } */}

        </div>
      </div>
      {createPortal(
        <>
          <Button
            onClick={() => setIsCreateChartModalOpen(true)}
            size="small"
            className="is-warning is-outlined is-flex-grow-1">
            <Icon>
              <FaPlus />
            </Icon>
            <span>Create</span>
          </Button>
          <Button
            disabled={parentConfig ? !parentConfig : !selectedConfig}
            size="small"
            className="is-warning is-outlined is-flex-grow-1"
            onClick={handleUpdateChart}>
            <Icon>
              <BiSave />
            </Icon>
            <span>Save </span>
          </Button>
        </>,
        document.getElementById(CHARTS_BOTTOM_BUTTONS_WRAPPER_ID) as HTMLElement
      )}
    </div>
  )
}

export default SavedChart;
