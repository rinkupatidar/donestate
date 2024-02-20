import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { round } from 'utilities/round'
import useFetch from '../../../../../../hooks/useFetch'
import { addOverflowStyle } from '../../../../../../utilities/addOverflowStyle'
import HoriSelectList from '../../../../../HoriSelectList/HoriSelectList'
import LoaderOverlay from '../../../../../Loader/LoaderOverlay'
import PrimaryLoader from '../../../../../Loader/PrimaryLoader'
import PrimaryLoaderTable from 'components/Loader/PrimaryLoaderTable'
// import Grid from '../../../../../Overview/Grid'
import Grid from '../../../../../Overview/AnotherGrid'
import Value from '../../../../../Overview/Value'
import { FinancialsResponseInterface } from './FinancialsInterface'
import styles from './index.module.scss'
import ThreeDotsIcon from './chartIcon/ThreeDotsIcon'
import FinancialsWrapper from './FinancialsWrapper'
import TabNav from 'components/TabNav/TabNav'
import AllDataChart from './AllDataChart'
import ClickIngChartWrapper from './ClickIngChart/ClickIngChartWrapper'
import { useRouter } from 'next/router'

interface Props {
  symbol: string
}

// const statementsData: DropdownItemType[] = [
//   { displayValue: 'Balance Sheet', value: 'BALANCE_SHEET' },
//   { displayValue: 'Profit and Loss', value: 'PnL' },
//   { displayValue: 'Cash Flow', value: 'CASH_FLOW' },
//   { displayValue: 'Ratio', value: 'RATIO_ANALYSIS' }
// ]
const statementsData: DropdownItemType[] = [
  { displayValue: 'Balance Sheet', value: 'BALANCE_SHEET' },
  { displayValue: 'Profit and Loss', value: 'PnL' },
  { displayValue: 'Cash Flow', value: 'CASH_FLOW' },
  { displayValue: 'Ratio', value: 'RATIO_ANALYSIS' }
]
const reportData = [
  { displayValue: 'Reported as is', value: 'AS_REPORTED' },
  { displayValue: 'Standardized', value: 'STANDARDIZED' },
]
const fillingData = [
  { displayValue: 'Quarterly', value: 'QUARTER' },
  { displayValue: 'Annually', value: 'ANNUAL' },
]

const Financials = ({ symbol }: Props) => {
 
  
  const [isLoaderVisible, setIsLoaderVisible] = useState(true)
  const [statementType, _setStatementType] = useState('BALANCE_SHEET')
  const [reportType, _setReportType] = useState('AS_REPORTED')
  const [fillingType, _setFillingType] = useState('QUARTER')
  const [page, setPage] = useState(1)
  const [activeTab, setActiveTab] = useState(null);
  const [chartpage, setChartPage] = useState(false)
  const [financialpage, setFinancialPage] = useState(true)
  const [tab, setTab] = useState('Financial Data')
  const [ppp, setPpp] = useState(true)
  const [titlename, settitle] = useState()
  const [createchartid,setchartid]=useState()
  const [titleexiting, setexitingtitle] = useState()
  const [exitingdata, setexitingdata] = useState({})


  const router = useRouter()
  const titleInURL=router.query.titles
  const handleChartIdUpdate = (newChartId) => {  

    
    setchartid(newChartId);
  };
  
const onReceiveOpenChartData=(data)=>{
 setexitingdata(data)
}

  const handleHover = (index, isHovered) => {
    if (isHovered) {
      setActiveTab(index);
    } else {
      setActiveTab(null);
    }
  };

  const setStatementType = (v: string) => {
    setPage(1)
    _setStatementType(v)
  }
  const setReportType = (v: string) => {
    setPage(1)
    _setReportType(v)
  }
  const setFillingType = (v: string) => {
    setPage(1)
    _setFillingType(v)
  }
  const tabChange=(condition)=>{
    if(condition === true){
      handleTabChange("Financial Data")
    }

  }
  const threedot = (searchList,title) => {
    // console.log("searchList",searchList)
    // console.log("title",title)

    setexitingtitle(searchList[0][2])
    settitle(title)
    setTab("Charts")
    setPpp(false)
    setChartPage(true)
    // setChartPage(condition)
    // setFinancialPage(condition1)
  }
  const renderClickIngChartWrapper = (
    display_name,
    data_id,
    statementType,
    reportType,
    fillingType,
    symbol
  ) => {
    if (data && data.length > 0 && data[0]?.financial_data) {
      const financialData = data[0].financial_data;
      const firstFinancialData = financialData[0];


      return (
        <ClickIngChartWrapper
          // symbol={symbol}
          // data={firstFinancialData.display_name}
          // id={firstFinancialData.data_id}
          // selectedValues={{
          //   statementType,
          //   reportType,
          //   fillingType,
          tabChange={tabChange}
          exitingdata={exitingdata}
          createid={createchartid}
          titleexiting={titleexiting}
          title={titlename}
          symbol={symbol}
          data={display_name}
          id={data_id}
          selectedValues={{
          statementType,
          reportType,
          fillingType,
         
          }}
       
        />
      );
    }
    return null; // Return something appropriate if data is not available
  };


  const [data, isLoading] = useFetch<FinancialsResponseInterface[]>(
    'getFinancialStatements',
    {
      statement_type: statementType,
      filling_type: fillingType,
      report_type: reportType,
      symbol,
      page_no: page,
    },
    {
      initialData: [],
      shouldShowLoadingOnRefetch: true,
      handleResponse: (newData, { page_no }): any => {
        if (newData.length === 0) setIsLoaderVisible(false)
        if (page_no === 1) return newData
        return [...data, ...newData]
      },
    }
  )
  let wrapper = null
  // const cols =
  //   '260px ' + '130px '.repeat(data?.length + (isLoaderVisible ? 1 : 0))
  let cols = '260px 30px '; // Initial width for the first column and fixed width for the second column

  if (data?.length <= 8) {
    cols += '200px '.repeat(data.length + (isLoaderVisible ? 1 : 0));
  } else {
    cols += '130px '.repeat(data.length + (isLoaderVisible ? 1 : 0));
  }
  const values: any[] = []


  for (let i = 0; i < data?.[0]?.financial_data?.length; i++) {
    values.push(
      !!data[0].financial_data[i].amount && (
        <Grid
          highlight={data[0].financial_data[i].total}
          gridColumns={cols}
          key={i}
          className="fit-content"
          onMouseEnter={() => handleHover(i, true)}
          onMouseLeave={() => handleHover(i, false)}
        >
          <Value
            title={data[0].financial_data[i].display_name}
            spanStyle={{ ...addOverflowStyle() }}
            className="has-text-left sticky_tab"
          >
            {data[0].financial_data[i].display_name}
          </Value>
          <Value  >
            <div
              className={activeTab === i ? styles.menuVisible : styles.menuHidden}
              style={{ cursor: "pointer" }}
              key={data[0].financial_data[i].data_id}
            >
              <ThreeDotsIcon onChartIdUpdate={handleChartIdUpdate} size={20} color="blue" className="custom-icon" threedot={threedot} data={data[0].financial_data[i].display_name} id={data[0].financial_data[i].data_id} activeTab={activeTab} selectedValues={{ statementType, reportType, fillingType, symbol }} onReceiveOpenChartData={onReceiveOpenChartData}/>
            </div>
          </Value>
          {data.map((item, index) => {
            const display_type = item.financial_data[i]?.display_type
            let value: any = item.financial_data[i]?.amount
            if (display_type === 'NUMERIC') {
              if (value < 0) {
                value = (
                  <span className="has-text-danger">
                    ({round(value * -1, { comma: true })})
                  </span>
                )
              }
              else if (value == 0) {
                value = (
                  <span >
                    -
                  </span>
                )
              }
            } else if (item.financial_data[i]?.display_type === 'PERCENTAGE') {
              if (value < 0) {
                value = (
                  <span className="has-text-danger ">
                    ({round(value * -1, { comma: true })}%)
                  </span>
                )

              } else if (value == 0) {
                value = (
                  <span >
                    -
                  </span>
                )
              }
              else value = `${value}%`
            }
            return (
              <Value
                key={`${index} ${item.position}`}
                className="is-family-secondary has-text-right"
              >
                {value}
              </Value>
            )
          })}
        </Grid>
      )
    )
  }

  wrapper = (

    <div className="sticky_wrapper1 is-relative fill-width">
      <Grid
        isInfo
        className="fit-content is-capitalized sticky_info"
        gridColumns={cols}
      >
        <Value className="has-text-left sticky_tab is_info ">
          Description (USD) “000s”{' '}
        </Value>
        <Value > <div style={{ width: "50px" }}> </div></Value>
        {data.map((i, idx) => (
          <Value key={idx} className="has-text-right">{i.statement_date}</Value>
        ))}
        {isLoaderVisible && (
          <motion.div
            onViewportEnter={() => setPage(page + 1)}
            className={styles.loader}
          >
            <PrimaryLoaderTable />
          </motion.div>
        )}
      </Grid>
      {values}
    </div>
  )
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);


  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    // Set initial height
    setWindowHeight(window.innerHeight);

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const maxSectionHeight = 0.7 * windowHeight; // 70% of window height
  // const handleTabChange = (newTab) => {

  //   setTab(newTab);

  //   // Your conditions for setting ppp and chartpage
  //   if (newTab === 'Financial Data') {
  //     setPpp(true);
  //     setChartPage(false);
  //     const url = new URL(location.href);
  //     if (url.searchParams.has("titles") || url.searchParams.has("openChartId") || url.searchParams.has("ChartTitle") || url.searchParams.has("chartId")) {
  //       url.searchParams.delete("titles");
  //       url.searchParams.delete("openChartId");
  //       url.searchParams.delete("ChartTitle");
  //       url.searchParams.delete("chartId");

  //     }

  //     router.push(url, undefined, { scroll: false });
  //   } else {
  //     // setPpp(false);
  //     setChartPage(true);
  //   }
  // };
  const handleTabChange = (newTab) => {

    setTab(newTab);

    // Your conditions for setting ppp and chartpage
    if (newTab === 'Financial Data') {
      setPpp(true);
      setChartPage(false);
      const url = new URL(location.href);
      if (url.searchParams.has("titles") || url.searchParams.has("openChartId") || url.searchParams.has("ChartTitle") || url.searchParams.has("chartId") || url.searchParams.has("country_code")) {
        url.searchParams.delete("titles");
        url.searchParams.delete("openChartId");
        url.searchParams.delete("ChartTitle");
        url.searchParams.delete("chartId");
        url.searchParams.delete("country_code");

      }

      router.push(url, undefined, { scroll: false });
    } else {
      // setPpp(false);
      setChartPage(true);
    }
  };
//   const handleTabChangeInURL = () => {
//     setTab("Financial Data");
    
//     const url = new URL(location.href);

//     if (url.searchParams.has("titles")) {
//         url.searchParams.delete("titles");
//         url.searchParams.delete("openChartId");
//         url.searchParams.delete("ChartTitle");
//         url.searchParams.delete("chartId");

//         // Update the URL without triggering a page reload
//         window.history.pushState({}, "", url.toString());
//     }
// };

// useEffect(() => {
//     if (titleInURL) {
//         handleTabChangeInURL();
        
//         // Refresh the page to apply the URL changes
//         window.location.reload();
//     }
// }, [titleInURL]);


  return (
    <>


      {
        financialpage && (
          <div className="fill-width is-relative">
            <TabNav
              items={['Financial Data', 'Charts', 'Statistics']}
              activeItem={tab}
              // setActiveItem={setTab}
              setActiveItem={handleTabChange}
            />
            {/* <AnimatePresence>
        <motion.div {...addOpacityAnimation} key={tab}>
          {tab === 'Data' && (
            <HistoricalData query={countryWiseHisToricalValuesQuery} />
          )}

          {tab === 'Chart' && (
            <Chart
              query={countryWiseHisToricalValuesQuery}
              countryCode={country_code}
              indicator={indicator}
              topic={topic}
            />
          )}
        </motion.div>
      </AnimatePresence> */}

            <AnimatePresence>{isLoading && <LoaderOverlay />}</AnimatePresence>
            <motion.div key={tab}>
              {tab === 'Financial Data' && (
                <>
                  <div className={styles.controls} style={{ marginTop: '0.75rem' }}>
                    <HoriSelectList
                      layoutId="statement"
                      dataArr={statementsData}
                      controlKey="value"
                      value={statementType}
                      onClick={(v) => setStatementType(v.value)}
                    />
                    <div className={styles.right}>
                      <HoriSelectList
                        layoutId="filling"
                        dataArr={fillingData}
                        value={fillingType}
                        onClick={(v) => setFillingType(v.value)}
                        controlKey="value"
                      />
                    </div>
                  </div>

                  <div className="v_data_section fill-width mt-3" style={{ maxHeight: `${maxSectionHeight}px` }}>
                    {data.length > 0 && wrapper}
                    {data.length === 0 && (
                      <div className="section has-text-centered has-text-dark">
                        No data found
                      </div>
                    )}
                  </div>
                </>
              )}

              {tab === "Charts" && ppp ? (
                <FinancialsWrapper symbol={symbol} />
              ) : (
                // chartpage && (<ClickIngChartWrapper symbol={symbol} data={data[0].financial_data[i].display_name} id={data[0].financial_data[i].data_id} selectedValues={{ statementType, reportype, fillingType}} />)
                chartpage && renderClickIngChartWrapper(data[0].financial_data[activeTab]?.display_name,
                  data[0].financial_data[activeTab]?.data_id,
                  statementType,
                  reportType,
                  fillingType,
                  symbol)
              )}
            </motion.div>
          </div>
        )
      }
    </>
  );
};
export default Financials