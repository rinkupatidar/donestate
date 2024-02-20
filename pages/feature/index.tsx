interface FeatureProps {}
import { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import styles from '../index.module.scss'
import Button from 'components/Button/Button'
import Testimonial from 'pages/Testimonial'
import Footer from 'components/Footer/Footer'

const Feature = ({}: FeatureProps) => {
  return (
    <div className={styles.mainLanding}>
      <div className={styles.Maxwidth}>
        <div className={styles.heroLanding} style={{paddingTop:'100px',marginBottom:'4rem'}} >
          <div
            className={styles.leftContainer}
          >
            <h1 className={styles.textGreen} style={{ marginLeft: '-2px' }}>Simplicity</h1>
            <p>
            DoneStat is made such that it is easy to use by all Investors and students alike. Analysis can be performed intuitively and with relative ease.
            </p>
          </div>
          <div className={styles.rightContainer}>
            <img
              src="/images/landing_page/feature/f1.png"
              alt="why donestat"
            />
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: '#f6f6f6', padding: '0rem 0rem'}}>
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
                src="/images/landing_page/feature/f2.png"
                alt="why donestat"
              />
            </div>
            <div className={styles.rightContainer1}>
              <h1 className={styles.textBlue} style={{ marginLeft: '-2px' }}>Advanced Charts</h1>
              <p>
              Create Charts like no where else. Our innovative solution helps you to compare chart lines with  unparalled data points that will help you narrate your story through charts.
              </p>
             
            </div>
          </div>
        </div>
      </div>
      <div className={styles.Maxwidth}>
        <div className={styles.heroLanding} style={{marginTop: '0px',marginBottom: '4rem'}}>
          <div
            className={styles.leftContainer}
          >
            <h1 className={styles.textGreen} style={{ marginLeft: '-2px' }}>Financial review</h1>
            <p>
            Perform deep dive analysis over the company’s Balance sheet, Profit and Loss, Cash Flow and Ratio analysis. Perform peer review, key stakeholders, news analysis, and much more.
            </p>
           
          </div>
          <div className={styles.rightContainer}>
            <img
              src="/images/landing_page/feature/f3.png"
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
                src="/images/landing_page/feature/f4.png"
                alt="why donestat"
              />
            </div>
            <div className={styles.rightContainer1}>
              <h1 className={styles.textBlue} style={{ marginLeft: '-2px' }}>Global Economic insights</h1>
              <p>
              Key tab on global economics, review definition, perform econometric study and create econometric models to project outlook.
              </p>
             
            </div>
          </div>
        </div>
      </div>
      <div className={styles.Maxwidth} >
        <div className={styles.heroLanding} style={{marginTop: '0px',marginBottom: '4rem'}}>
          <div
            className={styles.leftContainer}
          >
            <h1 className={styles.textGreen} style={{ marginLeft: '-2px' }}>Publication on Social Media</h1>
            <p>
            Easy to create your content and publish your charts and write up on social media, automate social media updates using our powerful AI and Boost your profile.
            </p>
           
          </div>
          <div className={styles.rightContainer}>
            <img
              src="/images/landing_page/feature/f5.png"
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
                src="/images/landing_page/feature/f6.png"
                alt="why donestat"
              />
            </div>
            <div className={styles.rightContainer1}>
              <h1 className={styles.textBlue} style={{ marginLeft: '-2px' }}>Online Statistical tool and AI</h1>
              <p>
              Define your econometric models and automate your models with ease. Intelligent Statistical analysis on the cloud for the first time.
              </p>
             
            </div>
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
export default Feature

interface itemProps {
  children: React.ReactNode
  className?: string
}
