import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import * as advancedFormat from 'dayjs/plugin/advancedFormat'
import * as timezone from 'dayjs/plugin/timezone'
import * as utc from 'dayjs/plugin/utc'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { getStockQuote } from 'service/DashboardService/DashboardServices'
import useFetch from '../../../hooks/useFetch'
import addComma from '../../../utilities/addComma'
import { addQueryParamsToUrl } from '../../../utilities/common'
import { round } from '../../../utilities/round'
import Button from '../../Button/Button'
import Icon from '../../Icon/Icon'
import LoaderOverlay from '../../Loader/LoaderOverlay'
import BottomSections from './BottomSection/BottomSections'
import { CompanyProfileResponseInterface } from './BottomSection/BottomSectionTypes'
import Chart from './Chart'
import styles from './index.module.scss'
import { NavItemType } from './types'

interface MainSectionProps {}

dayjs.extend(utc as any)
dayjs.extend(timezone as any)
dayjs.extend(advancedFormat as any)
const MainSection = ({}: MainSectionProps) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const router = useRouter()
  const symbol = router.query.symbol as string
  const shouldFetch = router.isReady
  const stockQuote = useQuery(['getStockQuote'], () => getStockQuote(symbol), {
    enabled: shouldFetch,
    refetchInterval: 1000 * 60,
  })
  const [companyProfileData, isCompanyProfileLoading] = useFetch<
    CompanyProfileResponseInterface | undefined
  >('getCompanyProfile', { symbol }, { shouldFetch })
  const tab: NavItemType = router.query?.tab as NavItemType
  const [activeTab, setActiveTab] = useState<NavItemType>(tab)

  useEffect(() => {
    if (tab) setActiveTab(tab)
    else if (router.isReady)
      router.push(addQueryParamsToUrl({ tab: 'Charts' }))
  }, [tab, router.isReady])

  const shouldClose =
    activeTab === 'Charts' ||
    activeTab === 'Price' ||
    activeTab === 'Estimates' ||
    activeTab === 'Social Sentiment' ||
    activeTab === 'Ownership' ||
    activeTab === 'Financials'

  return (
    <div className={styles.wrapper}>
      <motion.div
        animate={{ height: shouldClose ? 0 : 'auto' }}
        className={styles.top_grid}>
        <div className={styles.top_info}>
          <AnimatePresence>
            {(stockQuote.isLoading || isCompanyProfileLoading) && (
              <LoaderOverlay initial="animate" />
            )}
          </AnimatePresence>

          <div className="is-size-4 is-flex is-justify-content-space-between ">
            <span className="image is-64x64 is-flex is-align-items-center">
              <img ref={imgRef} src={companyProfileData?.company_logo} alt="donestat" />
            </span>
            <div>
              <span>{stockQuote.data?.equity_name ?? 't'}</span>
              <p className="has-text-grey">
                {stockQuote.data?.equity_symbol ?? 't'}
              </p>
            </div>
          </div>
          <div className="my-3">
            <p className="is-size-3 is-family-secondary">
              ${stockQuote.data?.current_price}{' '}
            </p>
            <p className="is-size-7 is-family-secondary ">
              {stockQuote.data?.change} (
              {round(stockQuote.data?.change_percentage!)}%)
            </p>
            <p className="is-size-7">
              Average Volume:{' '}
              <span className="is-family-secondary">
                {addComma(stockQuote.data?.avg_volume)}
              </span>
            </p>
            <p className="is-size-7">
              {/* Last Updatedsssssss: Sep{' '} */}
              Last Updateds: Sep{' '}
              {dayjs(new Date(stockQuote?.data?.captured_on! * 1000)).format(
                'MMM D, YYYY h:m a z'
              )}
            </p>
          </div>
          <div className={`${styles.info_grid} ${styles.border}`}>
            <p className="has-text-left">Close</p>
            <p>CHG</p>
            <p>CHG%</p>
          </div>
          <div className={`${styles.info_grid} is-family-secondary`}>
            <p className="has-text-left">${stockQuote.data?.previous_close}</p>
            <p className="has-text-success">${stockQuote.data?.change}</p>
            <p className="has-text-success">
              ${round(stockQuote.data?.change_percentage!)}
            </p>
          </div>
          <div className={styles.top_info_footer}>
            <Button size="small" className="is-warning has-tw-bold ">
              <span>ADD TO WATCHLIST</span>
              <Icon>
                <FaStar />
              </Icon>
            </Button>
            <Button
              size="small"
              className="is-warning is-outlined has-tw-bold is-flex-1">
              CREATE ALERT
            </Button>
          </div>
        </div>
        <div className="p-3 is-relative">
          <Chart
            symbol={symbol}
            title={`${symbol} Chart`}
            shouldFetch={shouldFetch}
          />
        </div>
      </motion.div>
      <BottomSections
        symbol={symbol}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        companyProfileData={companyProfileData}
        isCompanyProfileLoading={isCompanyProfileLoading}
      />
    </div>
  )
}
export default MainSection
