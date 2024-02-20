import { useQuery } from '@tanstack/react-query'
import Dropdown from 'components/Dropdown/Dropdown'
import LoaderOverlay from 'components/Loader/LoaderOverlay'
import PrimaryLoader from 'components/Loader/PrimaryLoader'
import Grid from 'components/Overview/Grid'
import Value from 'components/Overview/Value'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import {
  getIndicatorTopics,
  getRegionWiseIndicators,
} from 'service/DashboardService/DashboardServices'
import { addOverflowStyle } from 'utilities/addOverflowStyle'
import { DEFAULT_TOPIC_CODE, ROUTES } from '../../../../../constants'
import styles from './index.module.scss'
// @ts-ignore
import getCountryISO2 from 'country-iso-3-to-2'
interface EcoDashboardProps {}

const tabsData = [
  {
    label: 'Americas',
    value: 'Americas',
  },
  {
    label: 'Europe',
    value: 'Europe',
  },
  {
    label: 'Asia',
    value: 'Asia',
  },
  {
    label: 'Middle East',
    value: 'Middle_East',
  },
]

const EcoDashboard = ({}: EcoDashboardProps) => {
  const router = useRouter()
  const [tab, setTab] = useState(tabsData[0].value)
  const [topic, setTopic] = useState(DEFAULT_TOPIC_CODE)

  const dropdownQuery = useQuery(['topcis-dropdown-query'], () =>
    getIndicatorTopics()
  )
  const query = useQuery(
    ['reigion wise indicator', tab, topic],
    () => getRegionWiseIndicators({ region: tab, topic }),
    {
      enabled: !!topic,
    }
  )

  const tabData = tabsData.find((i) => i.label === tab)

  let gridColumns = `repeat(1, 1fr)`
  if (query.data?.indicators?.length) {
    gridColumns = `100px repeat(${query.data?.indicators?.length}, 180px)`
  }

  const handleRedirect = (
    country_code: string,
    indicator: string | undefined = undefined
  ) => {
    router.push({
      pathname: ROUTES.ECONOMICS_DASHBOARD_COUNTRIES,
      query: {
        country_code,
        indicator,
        topic,
      },
    })
  }

  return (
    <div
      className={`v_data_section fill-width is-relative ${styles.wrapper}`}
      style={{ overflow: 'hidden' }}
    >
      <div className="is-flex is-justify-content-space-between mb-2">
        <div className="px-3 v-center" style={{ gap: '16px' }}>
          {tabsData.map((i) => (
            <p
              onClick={() => setTab(i.value)}
              className={`has-tw-medium is-clickable has-text-${
                i.value === tab ? 'info' : 'white'
              }`}
              key={i.value}
            >
              {i.label}
            </p>
          ))}
        </div>
        {dropdownQuery.data ? (
          <Dropdown
            dropdownAlign="right"
            controlKey="type"
            value={topic}
            maxHeight="150px"
            dataArr={dropdownQuery.data}
            onClick={(v) => setTopic(v.type)}
            className="is-warning is-small"
          />
        ) : (
          <PrimaryLoader />
        )}
      </div>
      {query.isFetching ? (
        <LoaderOverlay />
      ) : (
        <div className="fill-width">
          {query.data?.indicators ? (
            <Grid
              isInfo
              gridColumns={gridColumns}
              className="fit-content is-capitalized sticky_info"
            >
              <Value
                className="has-text-left sticky_tab is_info is-clickable"
                onClick={() =>
                  handleRedirect(query.data.countries[0].country_code)
                }
              >
                Country
              </Value>
              {query.data?.indicators?.map((i) => (
                <Value
                  className="is-clickable"
                  onClick={() =>
                    handleRedirect(
                      query.data.countries[0].country_code,
                      i.indicator_code
                    )
                  }
                  key={i.indicator_code}
                  title={i.indicator_name}
                  spanStyle={addOverflowStyle('180px')}
                >
                  {i.indicator_name}
                </Value>
              ))}
            </Grid>
          ) : (
            <p className="px-3">No content found</p>
          )}
          {query.data?.countries?.map((i, idx) => (
            <Grid className="fit-content" gridColumns={gridColumns} key={idx}>
              <Value
                className="has-text-left sticky_tab is-clickable"
                onClick={() => handleRedirect(i.country_code)}
              >
                <ReactCountryFlag
                  className="is-size-4 mr-1"
                  countryCode={getCountryISO2(i.country_code)}
                />
                {i.country_code}
              </Value>
              {query.data.values.map(
                (j, idx) =>
                  j.country_code == i.country_code && (
                    <Value
                      className="is-clickable"
                      onClick={() =>
                        handleRedirect(i.country_code, j.indicator_code)
                      }
                      key={idx}
                    >
                      {j.value ? j.value : '-'}
                    </Value>
                  )
              )}
            </Grid>
          ))}
        </div>
      )}
    </div>
  )
}
export default EcoDashboard
