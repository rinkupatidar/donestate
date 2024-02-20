import dayjs from 'dayjs'
import download from 'downloadjs'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
    AXIOS_INSTANCE,
    DEFAULT_DATE_PICKER_OPTIONS
} from '../../../../../../constants'
import Button from '../../../../../Button/Button'
import Icon from '../../../../../Icon/Icon'
import Modal from '../../../../../Modal/Modal'
import styles from './index.module.scss'

interface DownloadPriceModalProps {
  close: () => void
  symbol: string
}

const DownloadPriceModal = ({ close, symbol }: DownloadPriceModalProps) => {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const handleDownload = async () => {
    if (fromDate > toDate) {
      setError('From Date cannot be greater than to to date')
      return
    }
    setError('')
    setIsLoading(true)

    const res = await AXIOS_INSTANCE.get('downloadAllHistoricalStockData', {
      params: {
        symbol,
        from: dayjs(fromDate).format('YYYY-MM-DD'),
        to: dayjs(toDate).format('YYYY-MM-DD'),
      },
    })
    await download(
      res.data,
      `${dayjs(fromDate).format('DD-MM-YYYY')}-${dayjs(toDate).format(
        'DD-MM-YYYY'
      )}.csv`,
      'text/plain'
    )
    close()
  }
  return (
    <Modal width="fit-content" close={close}>
      <div className={styles.modal_wrapper}>
        <DatePicker
          {...DEFAULT_DATE_PICKER_OPTIONS}
          wrapperClassName={styles.datepicker_wrapper}
          customInput={
            <div>
              <p className="is-size-7 mb-2">From</p>
              <Button className="is-warning" size="small">
                {dayjs(fromDate).format('D MMM, YYYY')}
              </Button>
            </div>
          }
          selected={fromDate}
          onChange={setFromDate}
        />
        <DatePicker
          {...DEFAULT_DATE_PICKER_OPTIONS}
          wrapperClassName={styles.datepicker_wrapper}
          customInput={
            <div>
              <p className="is-size-7 mb-2">To</p>
              <Button className="is-warning" size="small">
                {dayjs(toDate).format('D MMM, YYYY')}
              </Button>
            </div>
          }
          selected={toDate}
          onChange={setToDate}
        />
      </div>
      <br />
      {error && <p className="is-size-7 has-text-danger mb-2">{error}</p>}
      <Button
        loading={isLoading}
        onClick={handleDownload}
        size="small"
        className="is-warning is-fullwidth">
        <Icon src="download.svg" />
        <span>Download</span>
      </Button>
    </Modal>
  )
}
export default DownloadPriceModal
