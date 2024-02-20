import React from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import Button from 'components/Button/Button'
import Icon from 'components/Icon/Icon'
import Input from 'components/Input/Input'
import LoaderOverlay from 'components/Loader/LoaderOverlay'
import Modal from 'components/Modal/Modal'
// import {
//     CHARTS_BOTTOM_BUTTONS_WRAPPER_ID,
//     GET_CHART_TITLES_QUERY_ID
// } from 'constants'

import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { BiSave } from 'react-icons/bi'
import { FaPlus, FaSearch, FaTimes } from 'react-icons/fa'
import {
    deleteChart,
    getChart,
    getChartTitles,
    updateChart
} from 'service/DashboardService/DashboardServices'
import {
    GetChartResponseInterface,
    GetChartTitlesResponse
} from 'service/DashboardService/DashboardServicesInterface'
// import CreateChartModal from './CreateChartModal'
import CreateChartModal from '../Chart/SavedCharts/CreateChartModal'

import styles from './index.module.scss'
// import { SavedChartConfigInterface } from './SavedChartTypes'
import { SavedChartConfigInterface } from '../Chart/SavedCharts/SavedChartTypes'

interface SavedChartProps {
  config: SavedChartConfigInterface
  symbol: string
  loadChartConfig: (config: SavedChartConfigInterface) => void
  parentConfig?: GetChartResponseInterface
}

const FinancialSavedchart = () => {

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
//   const query = useQuery(
//     GET_CHART_TITLES_QUERY_ID,
//     () => getChartTitles({ symbol, page: 1 }),
//     { enabled: !!!parentConfig }
//   )

//   const handleItemClick = async (id: string) => {
//     const chartData = await getChart(id)
//     setSelectedConfig(chartData)
//     loadChartConfig(chartData.chart_config)
//   }

//   const handleUpdateChart = async () => {
//     setIsLoading(true)
//     const data = parentConfig! || selectedConfig
//     await updateChart({
//       ...data,
//       chart_config: config,
//     })
//     setIsLoading(false)
//   }

//   const handleDeleteClick = async (e: GetChartTitlesResponse) => {
//     const chartData = await getChart(e[0])
//     if (chartData.delete_warn_message) setConfirmationDeleteModal(chartData)
//     else deleteChartMutation.mutate(e[0], { onSuccess: () => query.refetch() })
//   }
// //   let items = query.data
//   if (search)
//     // items = query.data?.filter((i) =>
//     //   i[2].toLowerCase().includes(search.toLowerCase())
//     // )
  return (
    <div className="v_data_section fill-height is-relative">
      {/* <AnimatePresence>
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
          />
        )}
        {isLoading && <LoaderOverlay />}
      </AnimatePresence> */}
      <div>
        <p className="is-size-7 has-text-grey mb-2">Saved Charts</p>
        <Input
          onChange={(e) => setSearch(e.target.value)}
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
        <div className={styles.list}>
        <p className="is-size-7 has-tw-bold is-sizei-7 has-text-centered has-text-gray mt-6">
              No charts found
            </p>
          {/* {items?.length === 0 && (
            <p className="is-size-7 has-tw-bold is-sizei-7 has-text-centered has-text-gray mt-6">
              No charts found
            </p>
          )}
          {items?.map((i) => (
            <div
              data-selected={selectedConfig?.chart_id === i[0]}
              key={i[0]}
              onClick={() => handleItemClick(i[0])}
              className={styles.item}>
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
          ))} */}
        </div>
      </div>
      {/* {createPortal(
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
      )} */}
    </div>
      )
}

export default FinancialSavedchart