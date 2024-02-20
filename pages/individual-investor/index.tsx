interface IndividualInvestorProps {}
import { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import styles from '../index.module.scss'
import Button from 'components/Button/Button'
import Testimonial from 'pages/Testimonial'
import Footer from 'components/Footer/Footer'

const IndividualInvestor = ({}: IndividualInvestorProps) => {
  return (
    <div className={styles.mainLanding}>
      <div className={styles.Maxwidth}>
        <div className={styles.heroLanding} style={{paddingTop:'100px',marginBottom:'4rem'}}>
          <div
            className={styles.leftContainer}
          >
            <h1 style={{ marginLeft: '-2px' }}>
              Data Intelligence technology developed for investors, research
              students, academicians, regulators and auditors
            </h1>
            <p>
              DoneStat helps congregate both financial and nonfinancial sources
              into a single, innovative AI-powered platform to help investors,
              academicians, and regulators discover unique insights about
              corporates around the world
            </p>
            <div className={styles.ctaContainer}>
              <Button textWeight="bold" type="submit" className={styles.green}>
                Sign up for free
              </Button>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <img
              src="/images/landing_page/individual-investor/i1.png"
              alt="why donestat"
            />
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: '#f6f6f6', padding: '0rem 0rem' }}>
        <div className={styles.Maxwidth} style={{ padding: '7rem 3rem' }}>
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
                src="/images/landing_page/individual-investor/i2.png"
                alt="why donestat"
              />
            </div>
            <div className={styles.rightContainer1}>
              <h1 style={{ marginLeft: '-2px' }}>
                Dashboards for quick daily updates
              </h1>
              <p>
                Smart research begins with smart overall market recap. Stay up
                to date, customize your dashboard.
              </p>
              <p>
                Multi screen dash boards for what matters to you. Open Dashboard
                on two different screen for full scope coverage of what's
                happening in market.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.Maxwidth}>
        <div className={styles.heroLanding} style={{marginTop:"0px",marginBottom:'4rem'}}>
          <div
            className={styles.leftContainer}
          >
            <h1 style={{ marginLeft: '-2px' }}>
              Explain market movements with abstract data
            </h1>
            <p>
              Create and define charts that are explained by economic indicators
              and social sentiments.
            </p>
            <p>
              Smart Screeners and unique search capabilities across industries
              to quickly spot and quantify trends.
            </p>
            <p>
              Create simple visualizations using charts comparing market
              movement with social media trends and economic indicators.
            </p>
          </div>
          <div className={styles.rightContainer}>
            <img
              src="/images/landing_page/individual-investor/i3.png"
              alt="why donestat"
            />
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: '#f6f6f6', padding: '0rem 0rem' }}>
        <div className={styles.Maxwidth} style={{ padding: '7rem 3rem' }}>
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
                src="/images/landing_page/individual-investor/i2.png"
                alt="why donestat"
              />
            </div>
            <div className={styles.rightContainer1}>
              <h1 style={{ marginLeft: '-2px' }}>Research for Short sellers</h1>
              <p>
                Create Red flags over financials compared to peers and monitor
                for short selling ideas.
              </p>
              <p>
                Monitor trends over social media and predict potential short
                ideas.
              </p>
              <p>Create custom technical indicators for short ideas.</p>
            </div>
          </div>
        </div>
      </div>
     <Testimonial/>
     {/* <div className={styles.landingFooter}>
        <Footer/>
        </div> */}
    </div>
  )
}
export default IndividualInvestor

interface itemProps {
  children: React.ReactNode
  className?: string
}
