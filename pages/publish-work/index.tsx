interface PublishWorkProps {}
import { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import styles from '../index.module.scss'
import Button from 'components/Button/Button'
import Testimonial from 'pages/Testimonial'
import Footer from 'components/Footer/Footer'
const PublishWork = ({}: PublishWorkProps) => {
  return (
    <div className={styles.mainLanding}>
      <div className={styles.Maxwidth}>
        <div className={styles.heroLanding}  style={{paddingTop:'100px',paddingBottom:'4rem'}}>
          <div
            className={styles.leftContainer}
          >
            <h1 style={{ marginLeft: '-2px' }}>Sharing your work made easy</h1>
            <p>
              It is very easy to show the world what you do with DoneStat. Use
              the power of statistics and make your forecast.
            </p>
            <p>
              One Done, download the chart, post it on Social Media. Create
              content for your channel or Podcast your work using DoneStat.
            </p>
            <div className={styles.ctaContainer}>
              <Button textWeight="bold" type="submit" className={styles.green}>
                Sign up for free
              </Button>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <img
              src="/images/landing_page/publish-work/w1.png"
              alt="why donestat"
            />
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: '#f6f6f6', padding: '0rem 0rem' }}>
        <div className={styles.Maxwidth} style={{ padding: '0rem 3rem' }}>
          <div
            className={styles.heroLanding}
            style={{
              marginTop: '0px',
              paddingBottom: '4rem',
            }}
          >
            <div
              className={styles.leftContainer11}
              style={{ justifyContent: 'left' }}
            >
              <img
                src="/images/landing_page/publish-work/w2.png"
                alt="why donestat"
              />
            </div>
            <div className={styles.rightContainer1}>
              <h1 style={{ marginLeft: '-2px' }}>Real time Statistical tool</h1>
              <p>
                Create Multifactor regression equation on economic indicators.
                Test your regression with statistical tests.
              </p>
              <p>
                Create and automate multifactor regression on Stock returns and
                explain the returns of stock on real time basis.
              </p>
              <p>Automate your statistical models using DoneStat engines.</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.Maxwidth} style={{ padding: '7rem 3rem' }}>
        <div className={styles.heroLanding}  style={{marginTop: '0px',marginBottom: '0px'}}>
          <div
            className={styles.leftContainer}
          >
            <h1 style={{ marginLeft: '-2px' }}>Create variety of Charts</h1>
            <p>
              Experiment forecasting techniques using technical indicators and
              the power of statistics.
            </p>
            <p>
              Produce professional charts and use data for writeups. Impress
              your audience with insights.
            </p>
          </div>
          <div className={styles.rightContainer}>
            <img
              style={{ width: '90%' }}
              src="/images/landing_page/publish-work/w3.png"
              alt="why donestat"
            />
          </div>
        </div>
      </div>
      <Testimonial/>
      {/* <div className={styles.landingFooter}>
        <Footer />
      </div> */}
    </div>
  )
}
export default PublishWork

interface itemProps {
  children: React.ReactNode
  className?: string
}
