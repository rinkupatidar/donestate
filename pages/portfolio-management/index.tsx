interface PortfolioManagementProps {}
import { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import styles from '../index.module.scss'
import Button from 'components/Button/Button'
import Testimonial from 'pages/Testimonial'
import Footer from 'components/Footer/Footer'

const PortfolioManagement = ({}: PortfolioManagementProps) => {
  return (
    <div className={styles.mainLanding}>
      <div className={styles.Maxwidth}>
        <div className={styles.heroLanding} style={{paddingTop:'100px',paddingBottom:'4rem'}}>
          <div
            className={styles.leftContainer}
          >
            <h1 style={{ marginLeft: '-2px' }}>
              Maintain Your Edge in Servicing Your Clients
            </h1>
            <p>
              DoneStat supports PMS service providers, bloggers and vloggers
              remain upto date with data, research, customization and
              publication for client servicing and more.
            </p>
            <p>
              Impress your clients and reach out to your audience with good
              quality write ups, charts and first hand research.
            </p>
            <div className={styles.ctaContainer}>
              <Button textWeight="bold" type="submit" className={styles.green}>
                Sign up for free
              </Button>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <img
              src="/images/landing_page/portfolio-management/11.jpg"
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
                src="/images/landing_page/portfolio-management/p2.png"
                alt="why donestat"
              />
            </div>
            <div className={styles.rightContainer1}>
              <h1 style={{ marginLeft: '-2px' }}>
                Use Power Search and automate Charts{' '}
              </h1>
              <p>Work on research that is your core speciation and interest.</p>
              <p>
                Define charts and automate charts, include the power of
                statistical tools and save your charts. Get automatic updates on
                your charts, send quicker and frequent updates to your clients.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.Maxwidth} style={{ padding: '7rem 3rem' }}>
        <div className={styles.heroLanding} style={{
              marginTop: '0px',
              marginBottom: '0px',
            }}>
          <div
            className={styles.leftContainer}
          >
            <h1 style={{ marginLeft: '-2px' }}>
              Make Better Analysis and Investment Decisions
            </h1>
            <p>
              Quicker and faster insights from original source of financials.
              Use historical financials and market data.
            </p>
            <p>
              Access analyst estimates from all major brokers, fillings, news,
              social media sentiments.
            </p>
            <p>
              Data available for In-depth analysis, peer comparison, valuation
              and third party research.
            </p>
          </div>
          <div className={styles.rightContainer}>
            <img
              src="/images/landing_page/portfolio-management/p3.png"
              alt="why donestat"
            />
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
export default PortfolioManagement

interface itemProps {
  children: React.ReactNode
  className?: string
}
