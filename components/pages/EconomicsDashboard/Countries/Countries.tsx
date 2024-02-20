import { useQuery } from '@tanstack/react-query'
import { addOpacityAnimation } from 'animation'
import Dropdown from 'components/Dropdown/Dropdown'
import LoadingSection from 'components/Loader/LoadingSection'
import TabNav from 'components/TabNav/TabNav'
 import Countrydropdown from 'components/pages/stock/BottomSection/tabs/Financials/chartIcon/countrysearch/dropdown'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
    getAllCountries,
    getCountryDetail,
    getCountryWiseHistoricalValues,
    getIndicatorDetail,
    getIndicatorDetailsByTopic,
    getIndicatorTopics
} from 'service/DashboardService/DashboardServices'
import { DEFAULT_TOPIC_CODE } from '../../../../constants'
import Chart from './Chart'
import { convertContriesDetailsToList } from './ContriesUtils'
import HistoricalData from './HistoricalData'
import styles from './index.module.scss'
import IndicatorDetails from './IndicatorDetails'

interface CountriesProps {}

const Countries = ({}: CountriesProps) => {
  const router = useRouter()
  const [tab, setTab] = useState('Chart')
  let {
    country_code,
    indicator = DEFAULT_TOPIC_CODE,
    topic,
  } = router.query as Record<string, string>

  const contriesQuery = useQuery(['countries'], () => getAllCountries())

  const indicatorListQuery = useQuery(
    ['indicators', topic],
    () => getIndicatorDetailsByTopic(topic),
    {
      enabled: !!topic,
      onSuccess: (res) => {
              if (!indicator) {
                router.push({
                  query: { ...router.query, indicator: res[0].code },
                })
              }
            },
    }
  )
  const indicatorTopicQuery = useQuery(
    ['indicator topics'],
    () => getIndicatorTopics(false),
    { onSuccess: (res) => {} }
  )
  // const indicatorListQuery = useQuery(
  //   ['indicators'],
  //   () => getIndicatorDetailsByTopic(topic),
  //   {
  //     enabled: !!topic,
  //     onSuccess: (res) => {
  //       if (!indicator) {
  //         router.push({
  //           query: { ...router.query, indicator: res[0].code },
  //         })
  //       }
  //     },
  //   }
  // )
  // const indicatorTopicQuery = useQuery(['indicator topics'], () =>
  //   getIndicatorTopics(false)
  // )

  const contriesDetailsQuery = useQuery(
    ['countries', country_code],
    () => getCountryDetail(country_code),
    { enabled: !!country_code }
  )

  const indicatorDetailsQuery = useQuery(
    ['indicators', indicator],
    () => getIndicatorDetail(indicator),
    { enabled: !!indicator }
  )
  const countryWiseHisToricalValuesQuery = useQuery(
    ['countries', country_code, indicator],
    () => getCountryWiseHistoricalValues(country_code, indicator),
    { enabled: !!country_code && !!indicator }
  )

  if (
    contriesQuery.isLoading ||
    contriesDetailsQuery.isLoading ||
    indicatorTopicQuery.isLoading ||
    indicatorDetailsQuery.isLoading
  )
    return <LoadingSection />
  return (
    <div className="p-3">
      <div className="is-flex is-align-items-center is-gap mb-3">
        <div>
          <p className="is-size-7 has-text-grey mb-2">Country</p>
          {/* <Dropdown
            value={country_code}
            controlKey="country_code"
            onClick={(i) =>
              router.push({
                query: { ...router.query, country_code: i.country_code },
              })
            }
            dropdownAlign="left"
            dataArr={contriesQuery.data!}
            maxHeight="300px"
          /> */}
           <Countrydropdown
           value={country_code}
            controlKey="country_code"
            onClick={(i) =>
              router.push({
                query: { ...router.query, country_code: i.country_code },
              })
            }
            dropdownAlign="left"
            dataArr={contriesQuery.data!}
            maxHeight="300px"
          />
        </div>
        <div>
          <p className="is-size-7 has-text-grey mb-2">Topic </p>
          <Dropdown
            value={topic}
            controlKey="type"
            onClick={(i) =>
              router.push({
                query: { ...router.query, topic: i.type },
              })
            }
            dropdownAlign="left"
            dataArr={indicatorTopicQuery.data!}
            maxHeight="300px"
          />
        </div>
        <div>
          <p className="is-size-7 has-text-grey mb-2">Indicator </p>
          <Dropdown
            value={indicator}
            controlKey="code"
            onClick={(i) =>
              router.push({
                query: { ...router.query, indicator: i.code },
              })
            }
            dropdownAlign="left"
            dataArr={indicatorListQuery.data!}
            maxHeight="300px"
          />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          <IndicatorDetails data={indicatorDetailsQuery.data!} />
        </div>
        <div className={styles.grid}>
          <div>
            <div className={styles.key_metrics_wrapper}>
              {convertContriesDetailsToList(contriesDetailsQuery.data!).map(
                (i, idx) => (
                  <div key={idx} className={styles.key_metrics_item}>
                    <div className={styles.head}>{i.label}</div>
                    <div className={styles.content}>{i.value}</div>
                  </div>
                )
              )}
              {indicatorDetailsQuery.data?.periodicity && (
                <div className={styles.key_metrics_item}>
                  <div className={styles.head}>Base Period</div>
                  <div className={styles.content}>
                    {indicatorDetailsQuery.data?.periodicity}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3"></div>
      <TabNav
        items={['Data', 'Chart', 'Statistics']}
        activeItem={tab}
        setActiveItem={setTab}
      />
      <AnimatePresence>
        <motion.div {...addOpacityAnimation} key={tab}>
          {tab === 'Data' && (
            <HistoricalData query={countryWiseHisToricalValuesQuery} />
          )}

          {tab === 'Chart' && (
            <Chart
              query={countryWiseHisToricalValuesQuery}
              countryCode={country_code}
              indicator={indicator}
              topic={topic}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
export default Countries
