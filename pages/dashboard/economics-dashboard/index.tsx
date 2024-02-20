import EcoDashboard from 'components/pages/EconomicsDashboard/Sections/EcoDashboard/EcoDashboard'
import Events from 'components/pages/EconomicsDashboard/Sections/Events/Events'
import News from 'components/pages/EconomicsDashboard/Sections/News/News'
import styles from './index.module.scss'

interface indexProps {}

const index = ({}: indexProps) => {
  return (
    <div className="fill-width my-3">
      <div className={styles.grid}>
        <EcoDashboard />
        <News />
      </div>
      <Events />
    </div>
  )
}
export default index
