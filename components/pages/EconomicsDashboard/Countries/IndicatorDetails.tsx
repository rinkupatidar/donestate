import ReadMoreSection from 'components/ReadMoreSection'
import { getIndicatorDetailsResponseInterface } from 'service/DashboardService/DashboardServicesInterface'
import styles from './index.module.scss'

interface IndicatorDetailsProps {
  data: getIndicatorDetailsResponseInterface
}

const IndicatorDetails = ({ data }: IndicatorDetailsProps) => {
  if (!data)
    return (
      <p className="has-text-gray is-size-7">
        No data found for this indicator
      </p>
    )
  return (
    <div style={{ height: 250, overflow: 'auto' }}>
      {data.long_definition && (
        <>
          <p className={styles.title}>Defination</p>
          <ReadMoreSection text={data.long_definition} />
        </>
      )}

      {data.limitations && (
        <>
          <p className={styles.title}>Limitation</p>
          <ReadMoreSection text={data.limitations} />
        </>
      )}

      {data.source && (
        <>
          <p className={styles.title}>Source</p>
          <p>{data.source}</p>
        </>
      )}

      {data.statistical_concept && (
        <>
          <p className={styles.title}>Statistical Methodology</p>
          <ReadMoreSection text={data.statistical_concept} />
        </>
      )}

      {data.general_comments && (
        <>
          <p className={styles.title}>Other Comments</p>
          <ReadMoreSection text={data.general_comments} />
        </>
      )}

      {data.aggregation_method && (
        <>
          <p className={styles.title}>Aggregation</p>
          <ReadMoreSection text={data.aggregation_method} />
        </>
      )}
    </div>
  )
}
export default IndicatorDetails
