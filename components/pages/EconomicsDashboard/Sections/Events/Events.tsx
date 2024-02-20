import { useQuery } from '@tanstack/react-query'
import Icon from 'components/Icon/Icon'
import LoaderOverlay from 'components/Loader/LoaderOverlay'
import Grid from 'components/Overview/Grid'
import Value from 'components/Overview/Value'

// @ts-ignore
import Button from 'components/Button/Button'
import getCountryISO2 from 'country-iso-3-to-2'
import dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaCalendar } from 'react-icons/fa'
import { getEconomicsEvents } from 'service/DashboardService/DashboardServices'
import { DEFAULT_DATE_PICKER_OPTIONS } from '../../../../../constants'
import { addOverflowStyle } from '../../../../../utilities/addOverflowStyle'
import styles from './index.module.scss'

interface EventsProps {}

dayjs.extend(relativeTime as any)
const gridColumnsVal = '200px 80px 300px repeat(7, 1fr)'
const Events = ({}: EventsProps) => {
  const [date, setDate] = useState(new Date())
  const query = useQuery(
    ['events', date],
    () => getEconomicsEvents(dayjs(date).format('YYYY-MM-DD')),
    {
      keepPreviousData: true,
    }
  )

  return (
    <div className="v_data_section is-relative">
      <AnimatePresence>
        {query.isFetching && <LoaderOverlay loaderTop />}
      </AnimatePresence>
      <div className="is-flex is-justify-content-space-between">
        <p>Economics Calendar</p>
        <div>
          <ReactDatePicker
            {...DEFAULT_DATE_PICKER_OPTIONS}
            minDate={dayjs().subtract(3, 'month').toDate()}
            maxDate={dayjs().add(3, 'month').toDate()}
            customInput={
              <Button className="is-small is-warning">
                <Icon>
                  <FaCalendar />
                </Icon>
                <span className="has-tw-medium">
                  {dayjs(date).format('YYYY-MM-DD')}
                </span>
              </Button>
            }
            selected={date}
            onChange={setDate}
          />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.key_metrics_wrapper}>
          <Grid isInfo gridColumns={gridColumnsVal} className={styles.grid}>
            <Value className="has-text-left">Date</Value>
            <Value className="has-text-left">Country</Value>
            <Value className="has-text-left">Event</Value>
            <Value>Currency</Value>
            <Value>Previous</Value>
            <Value>Estimate</Value>
            <Value>Actual</Value>
            <Value>Change</Value>
            <Value>Impact</Value>
            <Value>Change (%)</Value>
          </Grid>
          {query.data?.length === 0 && (
            <p className="is-size-6 has-text-grey my-6 has-text-centered">
              No Events for the date, please select another date.
            </p>
          )}
          {query.data?.map((val) => (
            <Grid
              className={styles.grid}
              gridColumns={gridColumnsVal}
              key={val.order}
            >
              <Value className="has-text-left">
                {dayjs(val.event_date).format('YYYY-MM-DD hh:mm A')}
              </Value>
              <Value title={val.country} className="has-text-left">
                {val.country_code ? (
                  <>
                    <ReactCountryFlag
                      countryCode={getCountryISO2(val.country_code)}
                      className="is-size-4 mr-2"
                    />
                    {val.country_code}
                  </>
                ) : (
                  '-'
                )}
              </Value>
              <Value
                className="has-text-left"
                spanStyle={addOverflowStyle('100%')}
                title={val.event}
              >
                {val.event}
              </Value>
              <Value>{val.currency}</Value>
              <Value>{val.previous ?? '-'}</Value>
              <Value>{val.estimate ?? '-'}</Value>
              <Value>{val.actual ?? '-'}</Value>
              <Value>{val.change ?? '-'}</Value>
              <Value>{val.impact}</Value>
              <Value>{val.change_percentage}</Value>
            </Grid>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Events
