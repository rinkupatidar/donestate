import type { NextPage } from 'next'

import styles from '../index.module.scss'
import Button from 'components/Button/Button'
import Hamburger from 'components/Navbar/Hamburger'
import { useEffect, useState } from 'react'
import Footer from 'components/Footer/Footer'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import TopBarLogin from 'components/Navbar/TopBar/TopBarLogin'


const Testimonial: NextPage = () => {
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


  return (
    <div className={styles.mainLanding} style={{paddingBottom:'4rem'}}>

    
    
      
      {/* Investors */}
    
      <div className={styles.Maxwidth} style={{padding:'0rem 3rem'}}>
        {/* Here */}
        <Carousel images={testimonialsContent} />
        </div>
      </div>
     
  )
}



export default Testimonial

// const Carousel = ({ images }: any) => {
  const Carousel = ({ images }: { images: { name: string; title: string; content: string }[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  

  const slideVariants = {
    hiddenLeft: {
      x: '100%',
    },
    visible: {
      x: '0',
      transition: {
        duration: 2,
      },
    },
    exit: {
      x: '100%',
      transition: {
        duration: 0.5,
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
          {/* <div>
            <motion.div
              key={currentIndex}
              initial="hiddenLeft"
              animate="visible"
              exit="exit"
              variants={slideVariants}
              className={styles.sliderDiv}
            > */}
   <div className={styles.leftSliderContainer1}  >
   

    <div className={styles.investors} style={{backgroundColor:'transparent'}}>
    <div>
    <div>
            <motion.div
              key={currentIndex}
              initial="hiddenLeft"
              animate="visible"
              exit="exit"
              variants={slideVariants}
              className={styles.sliderDiv}
            >

      <div className={styles.boxMasterContainer} style={{marginBottom:'4px'}}>
      {images.map((testimonial, index) => (
        <div className={styles.boxContainerNew}  key={index} >
          <div className={styles.boxMasterHeight}>
        <h6>"{testimonial.content}"</h6>
        </div>
          <div className={styles.font}>{testimonial.name}</div>
          <p>{testimonial.title}</p>
        </div>
        ))}
      </div>
      </motion.div>
    </div>
    </div>
    </div>
   
  
 
    </div>
    </AnimatePresence>
    {/* </div> */}
    </div>
    </div>
  )
}








