import BellIcon from '@/icons/bell.svg'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { ROUTES } from '../../constants'
import { authContext } from '../../context/authContext'
import throttle from '../../utilities/throttle'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import Hamburger from './Hamburger'
import styles from './index.module.scss'
import Menu from './Menu'
import SearchInput from './Search/SearchInput'
import TopBar from './TopBar/TopBar'
import TopBarLogin from './TopBar/TopBarLogin'
import Footer from 'components/Footer/Footer'

interface NavbarProps {
  children: React.ReactNode
  shouldDisplay?: boolean
}

const NavbarWrapper = ({ children, shouldDisplay }: NavbarProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const { isLoggedIn } = useContext(authContext)
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const page = router.pathname
  const isLandingPage = [ROUTES.PRICING, ROUTES.LANDING_PAGE].includes(page)
  const scroll = useScroll()

  const handleChange = throttle((val: any) => {
    if (val <= 0) setIsNavbarVisible(true)
    else if (val > scroll.scrollY.getPrevious()) setIsNavbarVisible(false)
    else setIsNavbarVisible(true)
  },400)

  const routes = ['/login', '/signup']
  const isNavbarDisabled = routes.includes(page)

  useEffect(() => {
    setIsNavbarVisible(true)

    if (isNavbarDisabled) scroll.scrollY.clearListeners()
    else scroll.scrollY.onChange(handleChange)

    return () => {
      scroll.scrollY.clearListeners()
    }
  }, [page])



  return (
    <>
     {!isLoggedIn && (
   <motion.nav
   onAnimationComplete={() => {
    if (window.scrollY === 0) setIsNavbarVisible(true)
  }}
  animate={{
    boxShadow: !isNavbarDisabled && isNavbarVisible ? '0':'0 2px 18px 0 rgba(129, 162, 182, 0.2)',
  }}
  className={styles.navbarNew}>
        <div className={styles.mainLanding}>
          {/* Navbar */}
          {!isLoggedIn && (
          <div className={styles.Maxwidth}>
          <div className={styles.landingNavbar}>
        
            <div style={{ display: 'flex' }}>
             
              <div>
              <Link href={isLoggedIn ? ROUTES.DASHBOARD : ROUTES.LANDING_PAGE}>
              <figure
                  className={styles.navbarLogo}
                  style={{ width: '150px' }}
                >
                  <img src="/icons/done.png" alt="donestat" />
                </figure>
              </Link>
              
              </div>
              
            </div>
            <div
          className={styles.hamburgernew}
          // onClick={() => {
          //   setIsNavOpen(!isNavOpen)
          // }}
        >
          <Hamburger isOpen={isNavOpen} />
        </div>
        
            <div className={styles.navBarItemsContainer}>
              <TopBarLogin/>
              {!isLoggedIn && (
                <>
                  <Link href="/signup">
                    <Button
                      textWeight="bold"
                      type="submit"
                      className="has-tw-bold is-info"
                      style={{ fontSize: '16px' }}
                    >
                      Sign up for free
                    </Button>
                  </Link>
                </>
              )}
           
            </div>
          </div>
          </div>
          )}
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
          {/* {showAlternateNavbar && (
            
            <>
            <div className={styles.landingNavbar1}>
            {!isLoggedIn && (
              <div  style={{justifyContent: 'space-between', alignItems:'center',
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
                {!isLoggedIn && (
                  <>
                    <Link href="/signup">
                      <Button
                        textWeight="bold"
                        type="submit"
                        className="has-tw-bold is-info"
                        style={{ fontSize: '16px' }}
                      >
                        Sign up for free
                      </Button>
                    </Link>
                  </>
                )}
             
              </div>
            </div>
            )}
          
           
           </div> </>
          )} */}
        </div>
        
      </motion.nav>
     )}





       {isLoggedIn && (
          <>
      <motion.nav
        onAnimationComplete={() => {
          if (window.scrollY === 0) setIsNavbarVisible(true)
        }}
        animate={{
          marginTop: !isNavbarDisabled && isNavbarVisible ? 0 : '-4.5rem',
        }}
        className={styles.navbar}
        style={{ padding: isLandingPage ? '.5rem 4.5rem' : '.5rem 1rem' }}
        >

          
     
          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`${styles.navbar_item} is-relative`}>
              
            <Hamburger isOpen={isMenuOpen} />
            <AnimatePresence>
              {isMenuOpen && (
                <ClickAwayListener onClickAway={() => setIsMenuOpen(false)}>
                  <Menu closeMenu={() => setIsMenuOpen(false)} />
                </ClickAwayListener>
              )}
            </AnimatePresence>
          </div>
           <div className={styles.navbar_item}>
           <Link href={isLoggedIn ? ROUTES.DASHBOARD : ROUTES.LANDING_PAGE}>
             <figure className="image">
               <img src="/icons/logo.svg" alt="donestat" />
             </figure>
           </Link>
         </div>
         <div className={styles.middle}>
          <SearchInput />
        </div>
        <div className={styles.navbar_item}>
              <Icon>
                <BellIcon />
              </Icon>
            </div>

            <div className={styles.navbar_item}>
              <p className="is-size-7 has-text-right has-text-white">
                "The journey of a thousand miles begins with one step" <br />-
                steve jobs
              </p>
            </div>       
      </motion.nav>
      </>
        )}
        {/* {router.pathname !== '/login' ? ( */}
        {isLoggedIn ? (
      <motion.div
      animate={{
        paddingTop: isNavbarVisible && !isNavbarDisabled ? '4.5rem' : '0rem',
        paddingBottom: isNavbarVisible && !isNavbarDisabled ? '0rem' : '3.5rem',
      }}
        >
        {children}
      </motion.div>
       )
      :
      // {router.pathname !== '/login' && (
       <motion.div
       animate={{
         paddingTop: isNavbarVisible && !isNavbarDisabled ? '3.5rem' : '3.5rem',
       }}
       >
       {children}
     </motion.div>
      }
      {router.pathname !== '/login' && (
      <div className={styles.landingFooter}>
        <Footer />
      </div>
      )}
    </>
  )
}
export default NavbarWrapper
