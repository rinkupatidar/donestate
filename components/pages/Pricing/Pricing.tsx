interface PricingProps {}
import { FaCheckCircle } from 'react-icons/fa'
import Button from '../../Button/Button'
import Icon from '../../Icon/Icon'
import styles from './index.module.scss'
// import Grid from 'components/Overview/Grid'
import Grid from './Grid'
// import p from 'components/Overview/p'
import { useState } from 'react'
import Value from 'components/Overview/Value'
const jsonData = [
  {
    "id": 1,
    "field1": "Global equities, fundamentals & valuation",
    "field2": "Yes/upto 5 stocks in a day",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 2,
    "field1": "Segmental information",
    "field2": "null",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 3,
    "field1": "Peer review",
    "field2": "null",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 4,
    "field1": "Download Historical Prices/Fundamentals",
    "field2": "null",
    "field3": "Limited to 5 stocks",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 5,
    "field1": "Download Financial Statements",
    "field2": "null",
    "field3": "null",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 6,
    "field1": "Download Of Fields And Information Created",
    "field2": "Yes/upto 5 stocks in a day",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 7,
    "field1": "Download Graphs",
    "field2": "Yes/upto 5 stocks in a day",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 8,
    "field1": "Global Bonds, Yield Curves & FX",
    "field2": "yes",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 9,
    "field1": "Advanced Charting",
    "field2": "yes",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 10,
    "field1": "Market Dashboards",
    "field2": "yes",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 11,
    "field1": "Economic Calendar",
    "field2": "yes",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 12,
    "field1": "Security Overview & Description",
    "field2": "Yes/upto 5 stocks in a day",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },

  {
    "id": 13,
    "field1": "US Mutual Fund Data",
    "field2": "null",
    "field3": "null",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 14,
    "field1": "Global Indicies",
    "field2": "yes",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 15,
    "field1": "Company Profile Information/Meta Data",
    "field2": "Yes/upto 5 stocks in a day",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 16,
    "field1": "Red Flags",
    "field2": "null",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },

]
const jsonData1 = [
  {
    "id": 1,
    "field1": "Market Movers",
    "field2": "Yes",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 2,
    "field1": "Scatter Plot (X,Y)",
    "field2": "Yes/upto 5 stocks in a day",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 3,
    "field1": "Analyst Price Targets",
    "field2": "Yes/upto 5 stocks in a day",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 4,
    "field1": "Consensus Wall St Estimates",
    "field2": "Yes/upto 5 stocks in a day",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 5,
    "field1": "Earnings History & Surprises",
    "field2": "Yes/upto 5 stocks in a day",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 6,
    "field1": "Dividend Summary",
    "field2": "Yes/upto 5 stocks in a day",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 7,
    "field1": "ETF Exposure",
    "field2": "Yes/upto 5 stocks in a day",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 8,
    "field1": "ETF Holdings",
    "field2": "Yes/upto 5 stocks in a day",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
 
]
const jsonData2 = [
  {
    "id": 1,
    "field1": "News From The Web",
    "field2": "Yes",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 2,
    "field1": "Global Market News",
    "field2": "Yes",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 3,
    "field1": "Company News",
    "field2": "null",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 4,
    "field1": "Premium News And Opinion",
    "field2": "null",
    "field3": "null",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 5,
    "field1": "Company Filings",
    "field2": "null",
    "field3": "null",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 6,
    "field1": "Transcripts",
    "field2": "Yes/upto 5 stocks in a day",
    "field3": "Yes/upto 5 stocks in a day",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 7,
    "field1": "Custom News Screens",
    "field2": "null",
    "field3": "null",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 8,
    "field1": "Document Search",
    "field2": "null",
    "field3": "null",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 9,
    "field1": "Social Media Updates And News",
    "field2": "null",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 10,
    "field1": "Get Alerts",
    "field2": "null",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
]
const jsonData3 = [
  {
    "id": 1,
    "field1": "Financial Statements History",
    "field2": "Last 3 years",
    "field3": "Last 5 years",
    "field4": "Full history",
    "field5": "Full history"
  },
  {
    "id": 2,
    "field1": "Portfolio Creation And Functionality",
    "field2": "Yes upto 5 stocks and 1 portfolio",
    "field3": "Unlimited stocks and 1 Portfolio",
    "field4": "Full features/multiple portfolios",
    "field5": "Full features/multiple portfolios"
  },
  {
    "id": 3,
    "field1": "Watchlists",
    "field2": "Yes upto 5 stocks",
    "field3": "Full features",
    "field4": "Full features",
    "field5": "Full features"
  },
  {
    "id": 4,
    "field1": "Dashboard",
    "field2": "yes",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 5,
    "field1": "Chart Templates",
    "field2": "yes",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 6,
    "field1": "Field Creation Like Beta, Multi-Factor Regression Etc",
    "field2": "Yes/ only 1 field for 5 stocks",
    "field3": "Yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 7,
    "field1": "Custom Financial Analysis Templates",
    "field2": "yes",
    "field3": "yes",
    "field4": "yes",
    "field5": "yes"
  },
  {
    "id": 8,
    "field1": "Collaboration Function",
    "field2": "null",
    "field3": "null",
    "field4": "null",
    "field5": "null"
  },

]
const jsonData4 = [
  {
    "id": 1,
    "field1": "Customer Support",
    "field2": "Community",
    "field3": "Community",
    "field4": "Standard email",
    "field5": "Priority email"
  },
]
const Pricing = ({}: PricingProps) => {
  const [isHovering, setIsHovering] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className={styles.mainLanding}>
      <div className={styles.Maxwidth}>
        <div style={{padding: "3rem 0rem"}}>
          <p className="is-size-2 has-tw-bold has-text-centered">
            Flexible Pricing Options for <br />
            Diverse Professions
          </p>
          <div className="buttons is-centered mt-6">
            <Button className="is-info has-tw-bold is-medium is-rounded">
              Request a demo
            </Button>
          </div>
          <div className="py-6">
            <div className="columns">
              <div className="column is-3">
                <div className={styles.item}>
                  <p className="is-size-4 has-tw-bold mb-4">Corporate</p>
                  <p>starting from</p>
                  <p className="is-size-3 has-tw-bold">
                    <sup className="is-size-5">$</sup>
                    2,000
                  </p>
                  <div className="my-5">
                    <Button className="is-info has-tw-bold is-medium is-rounded is-fullwidth">
                      Subscribe
                    </Button>
                  </div>
                  <div>
                    <Item>All Enterprise features</Item>
                    <Item>Extended API credits</Item>
                    <Item>Extended WS credits</Item>
                    <Item>Flexible support</Item>
                    <Item>Volume pricing solutions</Item>
                  </div>
                </div>
              </div>
              <div className="column is-3">
                <div className={styles.item}>
                  <p  className="is-size-4 has-tw-bold mb-4">Corporate</p>
                  <p>starting from</p>
                  <p className="is-size-3 has-tw-bold">
                    <sup className="is-size-5">$</sup>
                    2,000
                  </p>
                  <div className="my-5">
                    <Button className="is-info has-tw-bold is-medium is-rounded is-fullwidth">
                      Subscribe
                    </Button>
                  </div>
                  <div>
                    <Item>All Enterprise features</Item>
                    <Item>Extended API credits</Item>
                    <Item>Extended WS credits</Item>
                    <Item>Flexible support</Item>
                    <Item>Volume pricing solutions</Item>
                  </div>
                </div>
              </div>
              <div className="column is-3">
                <div className={styles.item}>
                  <p className="is-size-4 has-tw-bold mb-4">Corporate</p>
                  <p>starting from</p>
                  <p className="is-size-3 has-tw-bold">
                    <sup className="is-size-5">$</sup>
                    2,000
                  </p>
                  <div className="my-5">
                    <Button className="is-info has-tw-bold is-medium is-rounded is-fullwidth">
                      Subscribe
                    </Button>
                  </div>
                  <div>
                    <Item>All Enterprise features</Item>
                    <Item>Extended API credits</Item>
                    <Item>Extended WS credits</Item>
                    <Item>Flexible support</Item>
                    <Item>Volume pricing solutions</Item>
                  </div>
                </div>
              </div>
              <div className="column is-3">
                <div className={styles.item}>
                  <p className="is-size-4 has-tw-bold mb-4">Corporate</p>
                  <p>starting from</p>
                  <p className="is-size-3 has-tw-bold">
                    <sup className="is-size-5">$</sup>
                    2,000
                  </p>
                  <div className="my-5">
                    <Button className="is-info has-tw-bold is-medium is-rounded is-fullwidth">
                      Subscribe
                    </Button>
                  </div>
                  <div>
                    <Item>All Enterprise features</Item>
                    <Item>Extended API credits</Item>
                    <Item>Extended WS credits</Item>
                    <Item>Flexible support</Item>
                    <Item>Volume pricing solutions</Item>
                  </div>
                </div>
              </div>
            </div>
          </div>

    
     
      <div style={{
   backgroundColor:'#fff',
    borderRadius: "10px"}}>
       <div className={styles.overflow}>
      <Grid className={styles.table} gridColumns="repeat(5 ,1fr)">
            <Value className="has-text-left">Feature</Value>
            <Value>Free</Value>
            <Value>Student</Value>
            <Value>Standard</Value>
            <Value>Corporate</Value>
          </Grid>
         
          <p
            className= "my-2 has-tw-bold is-size-4 is-clickable has-text-info" style={{padding:"0rem 0.4rem"}}>
       Core data & functionality
          </p>
          {jsonData.map((item) => (
         <Grid className={styles.tablewidth} key={item.id}  gridColumns="repeat(5, 1fr)">
          <p className="is-capitalized has-text-left " style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
            {item.field1}
          </p>
                      <p style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
              {item.field2 === 'yes' ? (
        <FaCheckCircle style={{ color: '#8fb440' }} />
      ) : item.field2 === 'null' ? (
       '-'
      ) : (
        item.field2
      )}
          </p>
                      <p style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
             {item.field3=== 'yes' ? (
        <FaCheckCircle style={{ color: '#8fb440' }} />
      ) : item.field3=== 'null' ? (
       '-'
      ) : (
        item.field3
      )}
          </p>
                      <p style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
             {item.field4 === 'yes' ? (
        <FaCheckCircle style={{ color: '#8fb440' }} />
      ) : item.field4 === 'null' ? (
       '-'
      ) : (
        item.field4
      )}
          </p>
                      <p style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
             {item.field5 === 'yes' ? (
        <FaCheckCircle style={{ color: '#8fb440' }} />
      ) : item.field4 === 'null' ? (
       '-'
      ) : (
        item.field4
      )}
          </p>
        </Grid>
      ))}
        <p
            className= "my-2 has-tw-bold is-size-4 is-clickable has-text-info" style={{padding:"0rem 0.4rem"}}>
       Snapshots & analytics
          </p>
          {jsonData1.map((item) => (
         <Grid className={styles.tablewidth} key={item.id} isDark={isHovering} gridColumns="repeat(5, 1fr)">
           <p className="is-capitalized has-text-left" style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
            {item.field1}
          </p>
                      <p style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
              {item.field2 === 'yes' ? (
        <FaCheckCircle style={{ color: '#8fb440' }} />
      ) : item.field2 === 'null' ? (
       '-'
      ) : (
        item.field2
      )}
          </p>
                      <p style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
             {item.field3=== 'yes' ? (
        <FaCheckCircle style={{ color: '#8fb440' }} />
      ) : item.field3=== 'null' ? (
       '-'
      ) : (
        item.field3
      )}
          </p>
                      <p style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
             {item.field4 === 'yes' ? (
        <FaCheckCircle style={{ color: '#8fb440' }} />
      ) : item.field4 === 'null' ? (
       '-'
      ) : (
        item.field4
      )}
          </p>
                      <p style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
             {item.field5 === 'yes' ? (
        <FaCheckCircle style={{ color: '#8fb440' }} />
      ) : item.field5 === 'null' ? (
       '-'
      ) : (
        item.field5
      )}
          </p>
        </Grid>
      ))}
        <p
            className= "my-2 has-tw-bold is-size-4 is-clickable has-text-info" style={{padding:"0rem 0.4rem"}}>
    News, filings & transcripts
          </p>
          {jsonData2.map((item) => (
         <Grid className={styles.tablewidth} key={item.id} isDark={isHovering} gridColumns="repeat(5, 1fr)">
           <p className="is-capitalized has-text-left" style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
            {item.field1}
          </p>
                      <p style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
              {item.field2 === 'yes' ? (
        <FaCheckCircle style={{ color: '#8fb440' }} />
      ) : item.field2 === 'null' ? (
       '-'
      ) : (
        item.field2
      )}
          </p>
                      <p style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
             {item.field3=== 'yes' ? (
        <FaCheckCircle style={{ color: '#8fb440' }} />
      ) : item.field3=== 'null' ? (
       '-'
      ) : (
        item.field3
      )}
          </p>
                      <p style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
             {item.field4 === 'yes' ? (
        <FaCheckCircle style={{ color: '#8fb440' }} />
      ) : item.field4 === 'null' ? (
       '-'
      ) : (
        item.field4
      )}
          </p>
                    <p style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
             {item.field5 === 'yes' ? (
        <FaCheckCircle style={{ color: '#8fb440' }} />
      ) : item.field5 === 'null' ? (
       '-'
      ) : (
        item.field5
      )}
          </p>
        </Grid>
      ))}
       <p
            className= "my-2 has-tw-bold is-size-4 is-clickable has-text-info" style={{padding:"0rem 0.4rem"}}>
   Advanced data & functionality
          </p>
          {jsonData3.map((item) => (
         <Grid className={styles.tablewidth} key={item.id} isDark={isHovering} gridColumns="repeat(5, 1fr)">
           <p className="is-capitalized has-text-left" style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
            {item.field1}
          </p>
                      <p style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
              {item.field2 === 'yes' ? (
        <FaCheckCircle style={{ color: '#8fb440' }} />
      ) : item.field2 === 'null' ? (
       '-'
      ) : (
        item.field2
      )}
          </p>
                      <p style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
             {item.field3=== 'yes' ? (
        <FaCheckCircle style={{ color: '#8fb440' }} />
      ) : item.field3=== 'null' ? (
       '-'
      ) : (
        item.field3
      )}
          </p>
                      <p style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
             {item.field4 === 'yes' ? (
        <FaCheckCircle style={{ color: '#8fb440' }} />
      ) : item.field4 === 'null' ? (
       '-'
      ) : (
        item.field4
      )}
          </p>
                      <p style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
             {item.field5 === 'yes' ? (
        <FaCheckCircle style={{ color: '#8fb440' }} />
      ) : item.field5 === 'null' ? (
       '-'
      ) : (
        item.field5
      )}
          </p>
        </Grid>
      ))}
       <p
            className= "my-2 has-tw-bold is-size-4 is-clickable has-text-info" style={{padding:"0rem 0.4rem"}}>
      Support
          </p>
          {jsonData4.map((item) => (
         <Grid className={styles.tablewidth} key={item.id} isDark={isHovering} gridColumns="repeat(5, 1fr)">
           <p className="is-capitalized has-text-left" style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
            {item.field1}
          </p>
                      <p style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
              {item.field2 === 'yes' ? (
        <FaCheckCircle style={{ color: '#8fb440' }} />
      ) : item.field2 === 'null' ? (
       '-'
      ) : (
        item.field2
      )}
          </p>
                      <p style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
             {item.field3=== 'yes' ? (
        <FaCheckCircle style={{ color: '#8fb440' }} />
      ) : item.field3=== 'null' ? (
       '-'
      ) : (
        item.field3
      )}
          </p>
                      <p style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
             {item.field4 === 'yes' ? (
        <FaCheckCircle style={{ color: '#8fb440' }} />
      ) : item.field4 === 'null' ? (
       '-'
      ) : (
        item.field4
      )}
          </p>
                    <p style={{ fontSize:'1rem',padding:"0rem 0.4rem" ,textAlign:'center',color:'#000'}}>
             {item.field5 === 'yes' ? (
        <FaCheckCircle style={{ color: '#8fb440' }} />
      ) : item.field5 === 'null' ? (
       '-'
      ) : (
        item.field5
      )}
          </p>
        </Grid>
      ))}
       </div>
        </div>
      </div>
      </div>
    </div>
  )
}
export default Pricing

interface itemProps {
  children: React.ReactNode
  className?: string
}

const Item = ({ children, className }: itemProps) => (
  <div className={styles.feature_item}>
    <Icon>
      <FaCheckCircle size={22} />
    </Icon>
    <p>{children}</p>
  </div>
)
