import { useQuery } from '@tanstack/react-query'
import Button from 'components/Button/Button'
import Dropdown from 'components/Dropdown/Dropdown'
import Icon from 'components/Icon/Icon'
import { useEffect } from 'react'
import Modal from 'components/Modal/Modal'
import { DEFAULT_TOPIC_CODE } from '../../../../constants'
import Countrydropdown from 'components/pages/stock/BottomSection/tabs/Financials/chartIcon/countrysearch/dropdown'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import {
  getAllCountries,
  getIndicatorDetailsByTopic,
  getIndicatorTopics,
} from 'service/DashboardService/DashboardServices'
import { CompareOptionsInterface } from './Chart'

interface AddChartComparisionModalProps {
  close: () => void
  options: CompareOptionsInterface[]
  addOption: (option: CompareOptionsInterface) => void
}

const AddChartComparisionModal = ({
  close,
  options,
  addOption,
}: AddChartComparisionModalProps) => {
  // const optionsLength = options.length

  // const [countryCode, setCountryCode] = useState(
  //   options[optionsLength - 1].countryCode
  // )

  const [countryCode,setCountryCode]=useState()
  const [indicator, setIndicator] = useState('')
  const [topic, setTopic] = useState(DEFAULT_TOPIC_CODE)

  const [error, setError] = useState('')

  const contriesQuery = useQuery(['countries'], () => getAllCountries(), {
    onSuccess: (res) => {
      if (!countryCode) {
        setCountryCode(res[0].country_code)
      }
    },
  })
  // console.log("setCountryCode",countryCode)
  // const indicatorListQuery = useQuery(
  //   ['indicators'],
  //   () => getIndicatorDetailsByTopic(topic),
  //   {
  //     enabled: !!topic,
  //     onSuccess: (res) => {
  //       if (!indicator) {
  //         setIndicator(res[0].code)
  //       }
  //     },
  //   }
  // )
  // const indicatorTopicQuery = useQuery(
  //   ['indicator topics'],
  //   () => getIndicatorTopics(false),
  //   { onSuccess: (res) => {} }
  // )
  const indicatorListQuery = useQuery(
    ['indicators', topic],
    () => getIndicatorDetailsByTopic(topic),
    {
      enabled: !!topic,
      onSuccess: (res) => {
        setIndicator(res[0].code)
        // if (!indicator) {
        //   setIndicator(res[0].code);
        // }
      },
    }
  )
  const indicatorTopicQuery = useQuery(
    ['indicator topics'],
    () => getIndicatorTopics(false),
    { onSuccess: (res) => {} }
  )

  const handleSave = () => {
    for (let option of options) {
      if (
        option.countryCode === countryCode &&
        option.indicator === indicator
      ) {
        setError('This option is already selected')
        return
      }
    }
    const indicatorObj = indicatorListQuery.data?.find(
      (i) => i.code === indicator
    )
    addOption({
      countryCode,
      indicator,
      indicatorName:
        indicatorObj?.indicator_short_name || indicatorObj?.indicator_name,
    })
    close()
  }
  useEffect(()=>{
  
      setIndicator("GC.DOD.TOTL.GD.ZS")
    }
  ,[])
  return (
    <Modal disableOverflowHidden close={close} isSmall>
      <p className="is-size-4 has-text-weight-medium has-text-grey">
        Add new comparision
      </p>
      <div className="is-flex is-flex-direction-column is-gap mt-3">
        <div>
          <p className="is-size-7 has-text-grey mb-2">Country</p>
          {/* <Dropdown
            value={countryCode}
            controlKey="country_code"
            onClick={(val) => setCountryCode(val.country_code)}
            dropdownAlign="left"
            dataArr={contriesQuery.data!}
            maxHeight="300px"
          /> */}

          <Countrydropdown
            value={countryCode}
            controlKey="country_code"
            onClick={(val) => setCountryCode(val.country_code)}
            dropdownAlign="left"
            dataArr={contriesQuery.data!}
            maxHeight="300px"
          />
        </div>
        {/* <div>
          <p className="is-size-7 has-text-grey mb-2">Topic </p>
          <Dropdown
            value={topic}
            controlKey="type"
            onClick={(val) => setTopic(val.type)}
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
            onClick={(val) => setIndicator(val.code)}
            dropdownAlign="left"
            dataArr={indicatorListQuery.data!}
            maxHeight="300px"
          />
        </div> */}
        <div>
                      <p className="is-size-7 has-text-grey mb-2">Topic </p>
                      <Dropdown
                        value={topic}
                        controlKey="type"
                        onClick={(val) => setTopic(val.type)}
                        dropdownAlign="left"
                        //dataArr={sampleyear}
                        dataArr={indicatorTopicQuery.data!}
                        maxHeight="300px"
                      />
                    </div>
                    <div>
                      <p className="is-size-7 has-text-grey mb-2">Indicator </p>
                      <Dropdown
                        value={indicator}
                        controlKey="code"
                        onClick={(val) => setIndicator(val.code)}
                        dropdownAlign="left"
                        dataArr={indicatorListQuery.data!}
                        //dataArr={sampleyear}
                        maxHeight="300px"
                      />
                    </div>
      </div>

      {error && <p className="has-text-danger is-size-7 mt-3">{error}</p>}
      <div className="is-flex is-justify-content-flex-end">
        <Button onClick={handleSave} className="is-warning">
          <Icon>
            <FaPlus />
          </Icon>
          <span>Add</span>
        </Button>
      </div>
    </Modal>
  )
}
export default AddChartComparisionModal
