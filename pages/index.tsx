import type { NextPage } from 'next'

import styles from './index.module.scss'
import Button from 'components/Button/Button'
import Hamburger from 'components/Navbar/Hamburger'
import { useEffect, useState } from 'react'
import Footer from 'components/Footer/Footer'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import TopBarLogin from 'components/Navbar/TopBar/TopBarLogin'
import Testimonial from './Testimonial'

const Home: NextPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [openSliderIndex, setOpenSliderIndex] = useState(0)
  const [showAlternateNavbar, setShowAlternateNavbar] = useState(false)

  const sliderContent = [
    {
      heading: ' Surface Insights Fast with a Financial Search Engine',
      content:
        ' With Sentieo’s machine learning and natural language processing (NLP) applied to your search process, you can uncover insights faster than possible using “Control-F”. With smarter search, analysts can reinvest 100s of hours spent looking for information into deeper and broader coverage.',
    },
    {
      heading: ' Surface Insights Fast with a Financial Search Engine',
      content:
        ' With Sentieo’s machine learning and natural language processing (NLP) applied to your search process, you can uncover insights faster than possible using “Control-F”. With smarter search, analysts can reinvest 100s of hours spent looking for information into deeper and broader coverage.',
    },
    {
      heading: ' Surface Insights Fast with a Financial Search Engine',
      content:
        ' With Sentieo’s machine learning and natural language processing (NLP) applied to your search process, you can uncover insights faster than possible using “Control-F”. With smarter search, analysts can reinvest 100s of hours spent looking for information into deeper and broader coverage.',
    },
  ]

  const testimonialsContent = [
    {
      name: ' Chris Jordan',
      title: 'Head of Sales Department',
      content:
        ' With Sentieo’s machine learning and natural language processing (NLP) applied to your search process, you can uncover insights faster than possible using “Control-F”. With smarter search, analysts can reinvest 100s of hours spent looking for information into deeper and broader coverage.',
    },
    {
      name: ' Nelon Jordan',
      title: 'Head of Engineering Department',
      content:
        'I would definitely recommend Sentieo as a financial research platform. It’s intuitive and doesn’t require the many hours of training that Bloomberg requires to get proficient. Plus, I’ve found the support to be highly responsive and useful.',
    },
    {
      name: ' Apple Jordan',
      title: 'Head of Rock Department',
      content:
        'Sentieo makes it much easier to tag and track management language across time so we can identify common patterns of language across a sector—saving our research team valuable time and uncovering insights more efficiently. And moving to a centralised RMS portal also allows us to better track our views on a stock as they evolve.',
    },
  ]
  const item = [
    {
      title: 'Suitable for Academic research',
      desc: 'Powerful statistical tool allows real time analysis of sock price movement and conduct Statistical Tests',
    },
    {
      title: 'Automate Research',
      desc: 'Easy to automate daily research tasks, followup on charts and easily publish and download charts,',
    },
    {
      title: 'Cutting edge',
      desc: 'Conduct detailed analysis at individual stock level, portfolio level. Conduct research and predict economic models.',
    },
  ]
  const item1 = [
    {
      title: 'Create your charts',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et nulla in eros congue tempus.',
      image: '/images/landing_page/slider/1.png',
    },
    {
      title: 'Powerful analytics',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et nulla in eros congue tempus.',
      image: '/images/landing_page/slider/2.png',
    },
    {
      title: 'AI powered analytics',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et nulla in eros congue tempus.',
      image: '/images/landing_page/slider/3.png',
    },
    {
      title: 'Share it on Social Media and boost your profile',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et nulla in eros congue tempus.',
      image: '/images/landing_page/slider/4.png',
    },
    {
      title: 'Assess market sentiments from social media feeds',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et nulla in eros congue tempus.',
      image: '/images/landing_page/slider/5.png',
    },
    {
      title: 'All news single point',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et nulla in eros congue tempus.',
      image: '/images/landing_page/slider/6.png',
    },
    {
      title: 'Advanced analytics for economic indicators',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et nulla in eros congue tempus.',
      image: '/images/landing_page/slider/7.png',
    },
    {
      title: 'Compare stock price with social media sentiments',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et nulla in eros congue tempus.',
      image: '/images/landing_page/slider/8.png',
    },
    {
      title: 'Financial data across 60+ markets',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et nulla in eros congue tempus.',
      image: '/images/landing_page/slider/9.png',
    },
  ]
  const item2 = [
    {
      title:
        'Promote investor awareness and financial and data learning, enable advanced analytics and investor discipline.',
      image: '/images/landing_page/slider/demo.png',
    },
    {
      title:
        'Support Governance and Financial empowerment through democratization of data and research.',
      image: '/images/landing_page/slider/gover.jpg',
    },
    {
      title: 'Promote equity for Women and marginal segments',
      image: '/images/landing_page/slider/women1.png',
    },
  ]
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        // Change the scroll threshold as needed
        setShowAlternateNavbar(true)
      } else {
        setShowAlternateNavbar(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div className={styles.mainLanding}>
      {/* Navbar */}
      <div className={styles.Maxwidth}>
      <div className={styles.landingNavbar}>
        <figure className={styles.navbarLogo} style={{ width: '150px' }}>
          <img src="/icons/done.png" alt="donestat" />
        </figure>
        <div
          className={styles.hamburger}
          // onClick={() => {
          //   setIsNavOpen(!isNavOpen)
          // }}
        >
          <Hamburger isOpen={isNavOpen} style={{color:"black"}} />
        </div>
        <div className={styles.navBarItemsContainer}>
          <TopBarLogin />
          <Link href="/signup">
            <Button
              textWeight="bold"
              type="submit"
              className="has-tw-bold is-info"
              style={{fontSize:'16px'}}
            >
              Sign up for free
            </Button>
          </Link>
        </div>
      </div>
      </div>

      {showAlternateNavbar && (
        <div className={styles.landingNavbar1}>
          <div style={{justifyContent: 'space-between', alignItems:'center',
    display: 'flex',
    width:'1300px',
    margin:'auto',
    padding:'0px 40px'
          }}>
          <figure className={styles.navbarLogo} style={{ width: '150px' }}>
            <img src="/icons/done.png" alt="donestat" />
          </figure>
          <div
            className={styles.hamburger}
            onClick={() => {
              setIsNavOpen(!isNavOpen)
            }}
          >
            <Hamburger isOpen={isNavOpen} />
          </div>
          <div className={styles.navBarItemsContainer}>
            <TopBarLogin />
            <Link href="/signup">
              <Button
                textWeight="bold"
                type="submit"
                className="has-tw-bold is-info"
                style={{fontSize:'16px'}}
              >
                Sign up for free
              </Button>
            </Link>
          </div>
        </div>
        </div>
      )}
      {/* {isNavOpen && (
        <div className={styles.navBarMenu}>
          <p>Solution</p>
          <p>Platform</p>
          <p>Knowledge center</p>
          <Link href="/pricing">
			    <p>Pricing</p>
			    </Link>
      <Link href="/login">
            <p>Login</p>
          </Link>
          <div className={styles.navBtnContainer}>
       
            <Link href="/signup">
              <Button
                textWeight="bold"
                type="submit"
                className="has-tw-bold is-info"
              >
                Sign up for free
              </Button>
            </Link>
          </div>
        </div>
      )} */}
      {isNavOpen && (
  <div className={styles.Maxwidth1}>
<TopBarLogin/>
 <Link href="/signup">
 <Button
   textWeight="bold"
   type="submit"
   className="has-tw-bold is-info"
   style={{fontSize:'16px'}}
 >
   Sign up for free
 </Button>
</Link>
</div>
)}
      {/* Hero Section */}
      <div className={styles.Maxwidth}>
        <div className={styles.heroLanding}>
          <div
            className={styles.leftContainer}
          >
            <h1 style={{ marginLeft: '-2px' }}>
              Built to address needs of every investor
            </h1>
            <CarouselBuild images={item} />
           
            {/* <div className={styles.blurringTextWrapper}>
      <span>{item.title}</span>
    </div> */}
            <div className={styles.ctaContainer}>
              <Button
                textWeight="bold"
                type="submit"
                className="has-tw-bold is-info"
              >
                See platform overview
              </Button>
              <Button textWeight="bold" type="submit" className={styles.green}>
                Sign up for free
              </Button>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <img src="/images/landing_page/image3.png" alt="why donestat" />
          </div>
        </div>
        <div className={styles.heroLanding} style={{marginTop: '0px',marginBottom: '0px',
        // height: 'calc(70vh - 80px)'
        }}>
          <div
            className={styles.leftContainer1}
            style={{ justifyContent: 'left' }}
          >
            <CarouselImage images={item1} />
          </div>
          <div className={styles.rightContainer1}>
            <CarouselContent images={item1} />

            <div className={styles.ctaContainer}>
              <Button
                textWeight="bold"
                type="submit"
                className="has-tw-bold is-info"
              >
                See platform overview
              </Button>
              <Button textWeight="bold" type="submit" className={styles.green}>
                Sign up for free
              </Button>
            </div>
          </div>
        </div>
        
        <div
          className={styles.heroLanding}
          style={{
            marginTop: '0px',
            marginBottom: '0px',
            // height: 'calc(70vh - 80px)',
          }}
        >
          <div
            className={styles.leftContainer}
          >
            <h1>Mission Statement</h1>
            <CarouselContent1 images={item2} />
            <div className={styles.ctaContainer}>
              <Button
                textWeight="bold"
                type="submit"
                className="has-tw-bold is-info"
              >
                See platform overview
              </Button>
              <Button textWeight="bold" type="submit" className={styles.green}>
                Sign up for free
              </Button>
            </div>
          </div>
          <div className={styles.rightContainer2}>
            <CarouselImage images={item2} />
          </div>
        </div>
      </div>

      {/* Investors */}
      <div style={{ padding: '0px' }}>
        <div className={styles.investors}>
          <div className={styles.Maxwidth} style={{ padding: '5rem 3rem' }}>
            <p style={{paddingTop:'4rem'}}>SOLUTIONS FOR INVESTORS</p>
            <h2>
              Empower your team to surface, visualize, and share alpha-driving
              insights
            </h2>

            <div className={styles.boxMasterContainer}  style={{ paddingBottom: '4rem' }}>
              <div className={styles.boxContainerNew}>
                <h4>For Analysts</h4>
                <p>Save time and surface insights other miss</p>
                <div className={styles.btnContainer}>
                  <TextButton text="Learn more" />
                </div>
              </div>

              <div className={styles.boxContainerNew}>
                <h4>For Portfolio Managers</h4>
                <p>
                  Improve team productivity and standardize your research
                  process
                </p>
                <div className={styles.btnContainer}>
                  <TextButton text="Learn more" />
                </div>
              </div>

              <div className={styles.boxContainerNew}>
                <h4>For Operational Innovation</h4>
                <p>Modernize and secure your research process</p>
                <div className={styles.btnContainer}>
                  <TextButton text="Learn more" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className={styles.Maxwidth} style={{ padding: '6rem 3rem' }}> */}
          {/* Here */}
          <div>
          {/* <Carousel images={testimonialsContent} /> */}
          <Testimonial/>
          </div>
        {/* </div> */}
      </div>
      {/* Footer */}
      <div className={styles.landingFooter}>
        <Footer />
      </div>
      {/* <div className={styles.lowerFooter}>
          <p> Copyright © 2023 Sentieo Inc. All Rights Reserved</p>
          <p>Terms of Service</p>
          <p> Privacy Policy</p>
        </div> */}
    </div>
  )
}

const TextButton = ({ text }: { text: string }) => {
  return <p>{text}</p>
}

export default Home

// const Carousel = ({ images }: any) => {


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
        duration: 12,
      },
    },
  }

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(currentIndex)
      if (currentIndex == 2) setCurrentIndex(0)
      else setCurrentIndex(currentIndex + 1)
    }, 12000)

    return () => {
      clearInterval(interval)
    }
  }, [currentIndex])

  return (
    <div className="carousel">
      <div className="carousel-images">
        <AnimatePresence>
          <div
            className={styles.sliderContainer}
            style={{ width: '100%' }}
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
               
                  {/* <span>
                    <b>{images[currentIndex].title}</b>
                  </span> */}
                    <div className={styles.blurringTextWrapper}>
                  
      <span style={{ color: 'hsla(205, 94%, 51%, 1)' }}><b>{images[currentIndex].title}</b></span>
   <br/>
      <span className="mt-3">{images[currentIndex].desc}</span>
    </div>
               
                {/* <p className="mt-2">{images[currentIndex].desc}</p> */}
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      </div>
    </div>
  )
}
const CarouselContent1 = ({ images }: any) => {
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
        duration: 12,
      },
    },
  }

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(currentIndex)
      if (currentIndex == 2) setCurrentIndex(0)
      else setCurrentIndex(currentIndex + 1)
    }, 12000)

    return () => {
      clearInterval(interval)
    }
  }, [currentIndex])

  return (
    <div className="carousel">
      <div className="carousel-images">
        <AnimatePresence>
          <div
            className={styles.sliderContainer}
            style={{ width: '100%' }}
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
                {/* <h1>Mission Statement</h1> */}
{/* 
                <p className="mt-2">{images[currentIndex].title}</p> */}
                  <div className={styles.blurringTextWrapper}>
      <span>{images[currentIndex].title}</span>
    </div>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      </div>
    </div>
  )
}
const CarouselImage = ({ images }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const slideVariants = {
    // hiddenLeft: {
    //   x: '-10%',
    // },
    visible: {
      x: '0',
      transition: {
        duration: 2,
        ease: 'easeInOut',
      },
    },
    exit: {
      x: '100%',
      transition: {
        duration: 2,
        ease: 'easeInOut',
      },
    },
  }

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(currentIndex)
      if (currentIndex == 2) setCurrentIndex(0)
      else setCurrentIndex(currentIndex + 1)
    }, 12000)

    return () => {
      clearInterval(interval)
    }
  }, [currentIndex])

  return (
    <div className="carousel">
      <div className="carousel-images">
        <AnimatePresence>
          <div
            className={styles.sliderContainer}
          >
            <motion.div
              key={currentIndex}
              initial="hiddenLeft"
              animate="visible"
              exit="exit"
              variants={slideVariants}
              className={styles.sliderDiv}
            >
                {/* <img src={images[currentIndex].image} /> */}
                <motion.img
                src={images[currentIndex].image}
                initial={{ opacity: 0.1}}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.1 }}
                transition={{ duration: 2, ease: 'easeInOut'  }}
                // initial={{ filter: 'blur(8px)' }}
                // animate={{ filter: 'blur(0px)' }}
                // transition={{ duration: 2, ease: 'easeInOut'  }}
              />
             
            </motion.div>
          </div>
        </AnimatePresence>
      </div>
    </div>
  )
}
const CarouselBuild = ({ images }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const slideVariants = {
    //    hiddenLeft: {
    //   x: '10%',
    // },
    visible: {
      x: '0',
      transition: {
        duration: 2,
        ease: 'easeInOut',
      },
    },
    exit: {
      x: '0',
      transition: {
        duration: 2,
        ease:'easeInOut',
      },
    },
  }

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(currentIndex)
      if (currentIndex == 2) setCurrentIndex(0)
      else setCurrentIndex(currentIndex + 1)
    }, 12000)

    return () => {
      clearInterval(interval)
    }
  }, [currentIndex])

  return (
    <div className="carousel">
      <div className="carousel-images">
        <AnimatePresence>
          <div
            className={styles.sliderContainer}
            style={{ width: '100%', }}
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
                <p style={{ color: 'hsla(205, 94%, 51%, 1)' }}>
                <div className={styles.blurringTextWrapper}>
      <span><b>{images[currentIndex].title}</b></span>
    </div>
                  {/* <span>
                    <b>{images[currentIndex].title}</b>
                  </span> */}
                </p>
                <div className={styles.blurringTextWrapper}>
      <span className="mt-2">{images[currentIndex].desc}</span>
    </div>
                {/* <p className="mt-2">{images[currentIndex].desc}</p> */}
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      </div>
    </div>
  )
}
