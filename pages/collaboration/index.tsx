interface CollaborationProps {}
import { useState } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import styles from "../index.module.scss";
import Button from "components/Button/Button";
import Footer from 'components/Footer/Footer';
import Testimonial from 'pages/Testimonial';


const Collaboration = ({}: CollaborationProps) => {

	return (
		<div className={styles.mainLanding}>
		<div className={styles.Maxwidth}>
		<div className={styles.heroLanding} style={{paddingTop:'100px',marginBottom:'4rem'}}>
        <div className={styles.leftContainer}>
          <h1 style={{marginLeft:'-2px'}}>Collaboration across teams</h1>
		  <p>For quality controls and review mechanism, set up workflow across teams. Gain access to premium news and opinion content.</p>
      <div className={styles.ctaContainer}>
              <Button textWeight="bold" type="submit" className={styles.green}>
                Sign up for free
              </Button>
            </div>
        </div>
        <div className={styles.rightContainer} >
          <img  src="/images/landing_page/collaboration/c1.png" alt="why donestat" />
        </div>
     </div>
</div>
     <div style={{backgroundColor: "#f6f6f6",padding:'0rem 0rem'}}>
      <div className={styles.Maxwidth} style={{padding:'7rem 3rem'}}>
     <div className={styles.heroLanding} style={{marginTop:'0px',paddingBottom:'4rem'}}>
        <div className={styles.leftContainer11} style={{justifyContent:'left'}}>
           <img src="/images/landing_page/collaboration/c2.png" alt="why donestat" />
           
        </div>
        <div className={styles.rightContainer1}>
        <h1 style={{marginLeft:'-2px'}}>Manage Multiple portfolio Clients</h1>
		  <p>DoneStat supports research desk and PMS providers handling multiple clients. Run independent portfolios, service clients, run independent risk management and scenarios.</p>
      <p>Meaningful and up to date service catalogue for clients.
</p>
     
        </div>
      </div>
      </div>
      </div>
      <div className={styles.Maxwidth} style={{padding:'7rem 3rem'}}>
      <div className={styles.heroLanding}>
        <div className={styles.leftContainer}>
          <h1 style={{marginLeft:'-2px'}}>Corporate Actions</h1>
		  <p>DoneStat provides an edge with real-time access to market intelligence, global fundamental data including corporate actions, instant valuation and modeling for new business segment opportunities, and collaboration tools.</p>
    
     
         
        </div>
        <div className={styles.rightContainer} >
          <img  src="/images/landing_page/collaboration/c3.png" alt="why donestat" />
        </div>
     </div>
     </div>
     <Testimonial/>
     {/* <div className={styles.landingFooter}>
        <Footer/>
        </div> */}
      </div>
      
    
	);
};
export default Collaboration;

interface itemProps {
	children: React.ReactNode;
	className?: string;
}


