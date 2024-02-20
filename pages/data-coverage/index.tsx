interface DataCoverageProps {}
import { FaCheckCircle } from 'react-icons/fa'
import styles from '../index.module.scss'
import Button from 'components/Button/Button'
import Testimonial from 'pages/Testimonial'
import Footer from 'components/Footer/Footer'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const tabsData = [
  {
    id: '1',
    label: 'ETFs',
    content:
      'Analyze the holdings and constituents of ETFs including a breakdown of the performance contribution by stock, sector and industry.',
    image: '/images/landing_page/platform/t1.png',
  },
  {
    id: '2',
    label: 'Mutual Funds',
    content:
      'Keep the best investment in view. Donestat lets you cross-compare performance in stocks, ETFs, and mutual funds, all on one screen.',
    image: '/images/landing_page/platform/p5.png',
  },
  {
    id: '3',
    label: 'Government Yields',
    content:
      'Ramp up your power with real-time price data, business summaries, key analytics metrics, price-performance charts, recent news, earnings estimates — and much more!',
    image: '/images/landing_page/platform/p3.png',
  },
  {
    id: '4',
    label: 'Indicies',
    content:
      'Visualize and compare world index performance with greater clarity across time scales. Tabular rankings fill out the picture.',
    image: '/images/landing_page/platform/p4.png',
  },
  {
    id: '5',
    label: 'Currencies',
    content:
      'Understand the drivers of fx performance by graphing against stocks, ETFs, bond yields or economic data. Analyze price, correlation, beta, or any technical indicator.',
    image: '/images/landing_page/platform/t1.png',
  },
  {
    id: '6',
    label: 'Commodities',
    content:
      'Understand how commodity prices can affect the markets. Analyze stocks, ETFs, bond yields or economic data to analyze price, correlation, beta, or any technical indicator — all in one place.',
    image: '/images/landing_page/platform/p5.png',
  },
  {
    id: '7',
    label: 'Global Economics',
    content:
      'Our calendar provides an overview of global economic data releases segmented by country, along with consensus expectations.',
    image: '/images/landing_page/platform/p3.png',
  },
]
const item1 = [
  {
    desc: 'Historical prices, financials, valuation, analysts ratings, consensus estimates, news of stocks globally.',
  },
  {
    desc: 'Social media trends on stocks from around the world',
  },
  {
    desc:'Tailored to meet every investor’s need',
  },
]
const item2 = [
  {
    desc: 'In depth analysis of ETFs in US market',
  },
  {
    desc: 'Unparalled charting of ETFs, benchmarking and peer reviews',
  },
  {
    desc:'Key metrics for detailed analysis and comparison with Equities',
  },
]
const item3 = [
  {
    desc: 'See global trends and forecast economy and market performance',
  },
  {
    desc: 'Compare economies and indicators using chart, narrate your story on charts. Use economic indicators to show performance of equities. ',
  },
  {
    desc:'Useful dashboards for effective monitoring of global economics movements.',
  },
]
const item4 = [
  {
    desc:'See the Currency data and trends',
  },
  {
    desc:'Use charts and compare performance of two or more currencies',
  },
  {
    desc:'Dashboards for effective monitoring of global currencies',
  },
]
const item5 = [
  {
    desc:'See the commodity data and trends',
  },
  {
    desc:'Use charts to compare with other commodities or forecast commodity trends using charting',
  },
  {
    desc:'Useful dashboards for effective monitoring of global commodities movements.',
  },
]


const DataCoverage = ({}: DataCoverageProps) => {
  // const [wsResponse] = useWebsocket<WebsocketResponseType>(
  // 	'/userDashboard/getMarketTopRealTimeData'
  //   )
  const [activeTab, setActiveTab] = useState('1')
  return (
    <div className={styles.mainLanding}>
      <div className={styles.Maxwidth}>
        
        <div className={styles.heroLanding} style={{paddingTop:'100px' }}>
          <div
            className={styles.leftContainer}
            
          >
            <h1 style={{ marginLeft: '-2px' }}>Data Coverage</h1>
            <p>
              60+ market data, real time stock prices, social media analytics,
              economics data, Commodities, Currencies, ETF and Mutual funds
              data, segmental information, news feeds and much more, all in one
              place.
            </p>
            <div className={styles.ctaContainer}>
              <Button textWeight="bold" type="submit" className={styles.green}>
                Sign up for free
              </Button>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <img
              src="/images/landing_page/platform/p1.png"
              alt="why donestat"
            />
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: '#f6f6f6',padding: '0rem 3rem' }}>
        <div className={styles.Maxwidth} style={{ padding: '7rem 3rem' }}>
        <div className={styles.heroLanding} style={{marginTop: '0px',paddingBottom: '4rem'}}>
          <div
            className={styles.leftContainer1}
            style={{ justifyContent: 'left' }}
          >
           <img src='/images/landing_page/slider/4.png' alt="why donestat"/>
          </div>
          <div className={styles.rightContainer1}>
          <h1 className={styles.textBlue}>Stocks</h1>
            <CarouselContent images={item1} />
          </div>
        </div>
        </div>
        </div>
        <div className={styles.Maxwidth}>
        <div className={styles.heroLanding} style={{marginTop: '0px',paddingBottom: '4rem'}}>
          <div
            className={styles.leftContainer}
          >
            <h1 className={styles.textGreen}>ETFs and Mutual Funds</h1>
            <CarouselContent images={item2} />
          </div>
          <div className={styles.rightContainer}>
            <img
              src="/images/landing_page/slider/5.png"
              alt="why donestat"
            />
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: '#f6f6f6',padding: '0rem 3rem' }}>
        <div className={styles.Maxwidth} style={{ padding: '7rem 3rem' }}>
        <div className={styles.heroLanding} style={{marginTop: '0px',paddingBottom: '4rem'}}>
          <div
            className={styles.leftContainer1}
            style={{ justifyContent: 'left' }}
          >
           <img src='/images/landing_page/slider/1.png' alt="why donestat"/>
          </div>
          <div className={styles.rightContainer1}>
          <h1 className={styles.textBlue}>Global Economics</h1>
            <CarouselContent images={item3} />
          </div>
        </div>
        </div>
        </div>
        <div className={styles.Maxwidth}>
        <div className={styles.heroLanding} style={{marginTop: '0px',marginBottom: '4rem',}}>
          <div
            className={styles.leftContainer}
          >
            <h1 className={styles.textGreen}>Currencies</h1>
            <CarouselContent images={item4} />
          </div>
          <div className={styles.rightContainer}>
            <img
              src="/images/landing_page/slider/1.png"
              alt="why donestat"
            />
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: '#f6f6f6', padding: '0rem 3rem'}}>
        <div className={styles.Maxwidth} style={{ padding: '7rem 3rem' }}>
        <div className={styles.heroLanding} style={{marginTop: '0px',paddingBottom: '4rem'}}>
          <div
            className={styles.leftContainer1}
            style={{ justifyContent: 'left' }}
          >
           <img src='/images/landing_page/slider/3.png' alt="why donestat"/>
          </div>
          <div className={styles.rightContainer1}>
          <h1 className={styles.textBlue}>Global Commodities</h1>
            <CarouselContent images={item5} />
          </div>
        </div>
        </div>
        </div>
      <div style={{ backgroundColor: '#f6f6f6' }}>
        <div className={styles.Maxwidth} style={{ padding: '0rem 3rem' }}>
          <div>
            <div className="v-center" style={{ gap: '80px',overflow:'scroll' }}>
              {tabsData.map((tab) => (
                <p
                  onClick={() => setActiveTab(tab.id)}
                  className={`my-2 has-tw-medium is-size-4 is-clickable has-text-${
                    tab.id === activeTab ? 'info' : 'black'
                  }`}
                  key={tab.id}
                >
                  {tab.label}
                </p>
              ))}
            </div>
            <div className="columns">
              <div className="column is-12">
                <div className="columns">
                  {tabsData.map((tab) => (
                    <div
                      key={tab.id}
                      className={`column is-12 ${
                        tab.id === activeTab ? '1' : 'is-hidden'
                      }`}
                    >
                      <div
                        className={styles.heroLanding}
                        style={{ alignItems: 'flex-start' }}
                      >
                        <div className={styles.leftContainer}>
                          <img
                            style={{ width: '100%' }}
                            src={tab.image}
                            alt="why donestat"
                          />
                        </div>
                        <div className={styles.rightContainer1}>
                          <p className="mx-6"> {tab.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
export default DataCoverage

interface itemProps {
  children: React.ReactNode
  className?: string
}

const CarouselContent = ({ images }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const slideVariants = {
    // hiddenLeft: {
    //   x: '-10%',
    // },
    visible: {
      x: '0',
      transition: {
        duration: 2,
      },
    },
    exit: {
      x: '100%',
      transition: {
        duration: 1,
      },
    },
  }

  return (
    <div className="carousel">
      <div className="carousel-images">
        <AnimatePresence>
          <div
            className={styles.sliderContainer}
            style={{ width: '100%', height: '100px' }}
          >
            <motion.div
              key={currentIndex}
              initial="hiddenLeft"
              animate="visible"
              exit="exit"
              variants={slideVariants}
              className={styles.sliderDiv}
            >
              <div className={styles.leftSliderContainer}>
                <p className="mt-2">{images[currentIndex].desc}</p>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      </div>
    </div>
  )
}


