import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useRouter } from 'next/router'
import axios from 'axios'
import LoadingSection from 'components/Loader/LoadingSection'
import { BiLogoLinkedin } from 'react-icons/bi'
import {
  BLUE_DARK,
  GREEN,
  GREY_DARK,
  PINK_DARK,
  RED_DARKER,
  YELLOW,
} from 'highcharts-styling-config'
import { AXIOS_INSTANCE } from 'constants'
import { AnimatePresence } from 'framer-motion'
import LoaderOverlay from 'components/Loader/LoaderOverlay'
import { round } from 'utilities/round'
import { log } from 'console'

const AllDataChart = ({
  createNew,
  setcreateNew,
  config,
  symbol,
  deleteId,
  rangeselect,
  chart_range,
  deleteIdResetState,
  setDateTime,
  userChangeAnnual_Quater_After_Open,
  chartTitleName,
  saveClickRenderChart,
  saveButtonStateReset,
  UserChangeRangeSelectReset,
  chart_format,
  ChartFormatRender,
  ChartFormatReset,
  compareOptionInEconomics


}) => {
  const {
    chart_items,
    rangedata,
    // display,
    toDate,
    fromDate,
  } = config
  
  const [currentopenchart, setCurrentopenchart] = useState({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const title = router.query.titles
  const ChartTitle = router.query.ChartTitle
  const [newDataTest, setnewdate] = useState([])
  const [revise, setrevise] = useState(null)
  
  const [FinancialData, setFinancialData] = useState()
  const [FinancialDataTest, setFinancialDataTest] = useState()
  const [minNegativeValue, setMinNegativeValue] = useState(0)
  const [groupitem, setgroupitem] = useState('BALANCE_SHEET')





  const getAllHistoricalFinancial = async () => {

    const token = localStorage.getItem('token')
    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }

    const chartItems = chart_items

    if (chartItems && chartItems.length > 1) {


      setLoading(true)
      const storeData1: any = []
      var chartItemLastIndex = {}
      
      
      if (chartItems.length > 2) {
        chartItemLastIndex = chartItems[chartItems.length - 1]
        setgroupitem(chartItemLastIndex?.item_group)
      } else if (chartItems.length > 1) {
        chartItemLastIndex = chartItems[1]
        setgroupitem(chartItemLastIndex?.item_group)
      }
     
      let existing = !newDataTest.some(
        (check) => check.item_id === chartItemLastIndex?.item_id && check.chart_item_symbol===chartItemLastIndex?.chart_item_symbol
        // (check) => check.name === chartItemLastIndex?.item_name
      )
     
      if (existing) {
        const condition = {
          type: chartItemLastIndex?.item_group,
          endpoint: `getAllHistoricalFinancialData?symbol=${chartItemLastIndex?.chart_item_symbol}&data_id=${chartItemLastIndex?.item_id}&statement_type=${chartItemLastIndex?.item_group}&filling_type=${rangeselect}&ratio_analysis_type=${chartItemLastIndex?.ratio_analysis_type|| ""}&report_type=AS_REPORTED`,
          setFunction: setFinancialData,
        
        }
        try {
          const response = await AXIOS_INSTANCE.get(condition.endpoint, {
            headers,
          })

          setFinancialDataTest(response.data.reverse())
          let opp = response.data.reverse()
          await condition.setFunction(opp)
          let valueData = opp.reverse()
          // storeData1.push({ valueData, name: chartItemLastIndex?.item_name });
          
          let repData = [{ valueData, name: chartItemLastIndex?.item_name, item_id:chartItemLastIndex?.item_id, chart_item_symbol:chartItemLastIndex?.chart_item_symbol }]
          let preData = [...newDataTest, ...repData]

          if (repData.length > 0) {
            setnewdate((prev) => [...prev, ...repData])
            callAPINew(preData)
          }
          // else{
          //   callAPINew(storeData1);
          // }
          setLoading(false)

        } catch (error) {
          console.error('Error fetching search results:', error)
        }
      }
    } else {
    

      setnewdate([])
     let options = {
        chart: {
          type: 'column',
          backgroundColor: '#0a0a0a',
        },

        title: {
          text:  'Financial Chart',
          style: {
            color: "#ffff"
          }
        },
        // xAxis: {
        //   categories: filterCategories.reverse(),
        //   crosshair: true,
        //   labels: {
        //     style: {
        //       color: '#fff',
        //     }
        //   },
        // },

        // yAxis: yAxisData,

        // colors: seriesColors,
        // series: aaaaS,
        // legend: ""
      }
      Highcharts.chart('chart-container', options)
    }
  }
  const getAllHistoricalFinancialNew = async () => {
    const token = localStorage.getItem('token')
    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }
    const chartItems = chart_items
    const chartrange = chart_range

    if (chartItems && chartItems.length > 0) {
      setLoading(true)

      const storeData: any = []
      for (const item of chartItems) {
        setgroupitem(item.item_group)
        if (item.type === '') {
          continue
        }
        const condition = {
          type: item.item_group,
          endpoint: `getAllHistoricalFinancialData?symbol=${item.chart_item_symbol}&data_id=${item.item_id}&statement_type=${item.item_group}&filling_type=${rangeselect}&ratio_analysis_type=${item?.ratio_analysis_type|| ""}&report_type=AS_REPORTED`,
          setFunction: setFinancialData,
          
        }

        try {
          const response = await AXIOS_INSTANCE.get(condition.endpoint, {
            headers,
          })

          setFinancialDataTest(response.data.reverse())
          let opp = response.data.reverse()
          // const dataToSet = chartrange === 1 ? opp : opp.slice(0, chartrange)
          // await condition.setFunction(dataToSet.reverse())
          await condition.setFunction(opp)
          let valueData = opp.reverse()
          storeData.push({ valueData, name: item.item_name, item_id:item?.item_id, chart_item_symbol:item.chart_item_symbol })
        
          
          setLoading(false)

          //
        } catch (error) {
          console.error('Error fetching search results:', error)
        }
      }
      
      setnewdate(storeData)
      callAPINew(storeData)
      setcreateNew(false)
    }
  }


  useEffect(() => {
    if (userChangeAnnual_Quater_After_Open === true) {
      getAllHistoricalFinancialNew()
    }
    setTimeout(() => {
      UserChangeRangeSelectReset()
    }, 2000);

  }, [userChangeAnnual_Quater_After_Open])


  useEffect(() => {
    if (ChartFormatRender === true) {
      getAllHistoricalFinancialNew()
    }
    setTimeout(() => {
      ChartFormatReset()
    }, 2000);

  }, [ChartFormatRender])

  useEffect(() => {
    if (saveClickRenderChart === true) {
      getAllHistoricalFinancialNew()
    }
    setTimeout(() => {
      saveButtonStateReset("resetButton")
    }, 2000);
  }, [saveClickRenderChart])

  useEffect(() => {
    if (createNew == true) {
      getAllHistoricalFinancialNew()
    }
    else if (chart_items) {
      getAllHistoricalFinancial()
    }
  }, [chart_items])
  // useEffect(() => {
  //   chart_items.forEach(item => {
  //       if (item.item_group) {
  //         setgroupitem(item.item_group)
  //       }
  //   });
  // }, [chart_items]);

  useEffect(() => {
    if (deleteId) {
      setnewdate((prevData) => {
        const updatedData = prevData.filter(
          (item) => item.item_id !== deleteId?.item_id || item.chart_item_symbol !== deleteId?.chart_item_symbol
        )
        
        callAPINew(updatedData)
        deleteIdResetState('')
        setLoading(false)
        return updatedData
      })
    }
  }, [deleteId])

  useEffect(() => {
    if (compareOptionInEconomics) {
      getAllHistoricalFinancialNew()

    }

  }, [compareOptionInEconomics])

  useEffect(() => {
    if (newDataTest != null) {
      if (chart_range) {
        const newStoreDataNew = []
        for (let index = 0; index < newDataTest.length; index++) {
          const element = newDataTest[index]
          
          const dataToSet =
            chart_range === 1
              ? element.valueData
              : element.valueData.slice(0, chart_range)
          newStoreDataNew.push({ valueData: dataToSet, name: element.name, item_id:element.item_id, chart_item_symbol:element.chart_item_symbol })
        }
        callAPI(newStoreDataNew)
      }
    }
  }, [chart_range])


  const callAPINew = (newData: any) => {
    const range =
      rangeselect === 'ANNUAL'
        ? chart_range || 2
        : chart_range || 8
    const newStoreData = []
    for (let index = 0; index < newData.length; index++) {
      const element = newData[index]

      const dataToSet =
        range === 1 ? element.valueData : element.valueData.slice(0, range)
      newStoreData.push({ valueData: dataToSet, name: element.name, item_id:element.item_id, chart_item_symbol:element.chart_item_symbol })
    }
    callAPI(newStoreData)
  }
  const callAPI = (FinancialDataNew) => {
    setDateTime({
      start_date:
        FinancialDataNew[0]?.valueData[
        FinancialDataNew[0]?.valueData.length - 1
        ],
      end_date: FinancialDataNew[0]?.valueData[0],
    })
    let allMinNegativeValues = []
    let allMaxValues = []
    let allMiniValues = []
    var finalcialPositiveDataMax = 0
    var finalcialPositiveDataMin = 0
    var finalcialNegativeDataMax = 0

    if (FinancialDataNew.length > 0) {
      const financialKeys = [...FinancialDataNew]
      financialKeys.map((financial: any, index) => {

        const minNegativeValue = Math.min(
          ...financial?.valueData
            ?.map((entry: any) => entry[1])
            .filter((value) => value !== null && value < 0)
        )
        const maxValue = Math.max(
          ...financial?.valueData
            ?.map((entry: any) => entry[1])
        )
        allMaxValues.push(maxValue)

        const ValuesArray = allMaxValues.filter(
          (value) => value > 0
        )
        if (ValuesArray.length > 0) {
          finalcialPositiveDataMax = Math.max(...ValuesArray)
        } else {
          finalcialPositiveDataMax = 0
        }
        const minValue = Math.min(
          ...financial?.valueData
            ?.map((entry: any) => entry[1])
        )
        allMiniValues.push(minValue)

        const ValuesArraymin = allMiniValues.filter(
          (value) => value > 0
        )
        if (ValuesArraymin.length > 0) {
          finalcialPositiveDataMin = Math.min(...ValuesArraymin)
        } else {
          finalcialPositiveDataMin = 0
        }


        const yAxisMin =
          minNegativeValue !== Infinity ? Math.floor(minNegativeValue) : 0
        allMinNegativeValues.push(yAxisMin)

        const negativeValuesArray = allMinNegativeValues.filter(
          (value) => value < 0
        )

        if (negativeValuesArray.length > 0) {
          finalcialNegativeDataMax = Math.min(...negativeValuesArray)
        } else {
          finalcialNegativeDataMax = 0
        }
      })
    }

    let options
    if (FinancialDataNew) {
      const aaaaS: any = []
      const yAxisData: any = []
      let categoriesData: any = []
      const categoriesDataNew: any = []
      const economicsData: any = []
      const maxDataRange :any=[]



      const seriesColors = [BLUE_DARK, GREEN, PINK_DARK, YELLOW]
      if (FinancialDataNew.length > 0) {

        
        if (compareOptionInEconomics && compareOptionInEconomics.length > 0) {
          // if (revise !== null) {
          const financialKeys = [...FinancialDataNew]

          compareOptionInEconomics.forEach(obj => {
            const { countryCode, valueData, indicatorName, data_type } = obj;
            const slicedValueData = chart_range === 1 ? valueData : valueData.slice(0, chart_range);
            financialKeys.push({
              name: indicatorName,
              // valueData: valueData.slice(0, chart_range),
             valueData:slicedValueData,
              data_type: data_type,
              countryCode: countryCode
            })
          });
          
          financialKeys.map((financial: any, index: number) => {
            if (financial?.data_type === "ECONOMICS") {
              
              economicsData.push({actualData: financial?.valueData?.reverse(), index: index });
              
              aaaaS.push({
                name: ` ${financial?.countryCode} ${financial?.name} (${symbol})`,
                type: "scatter",
                 data: financial?.valueData?.map((entry: any) => {
                  return entry[1] !== null ? entry[1] : null
                }).reverse(),
                // data:revise.map((entry: any) => {
                //    return entry !== null ? entry : null
                //    }),
                yAxis: index,
                marker: { enabled: true },
                dashStyle: "shortdot",
              })
             




              yAxisData.push({
                // min: (chart_format === 'THOUSANDS') ? allMinNegativeValues[index] :
                //   (chart_format === 'MILLION') ? allMinNegativeValues[index] / 1000 : allMinNegativeValues[index] / (1000 * 1000),
                // max: (chart_format === 'THOUSANDS') ? allMaxValues[index] :
                //   (chart_format === 'MILLION') ? allMaxValues[index] / 1000 : allMaxValues[index] / (1000 * 1000),

                labels: {
                  // formatter: function () {
                  //   return (this.value).toFixed(0);
                  // },

                  //   formatter: function() {
                  //     return this.value / value1 +postfix;
                  // },
                  style: {
                    color:
                      index == 0
                        ? BLUE_DARK
                        : index == 1
                          ? GREEN
                          : index == 2
                            ? PINK_DARK
                            : index == 3
                              ? YELLOW
                              : '',
                  },
                },
                title: {
                  text: "",
                  style: {
                    color:
                      index == 0
                        ? BLUE_DARK
                        : index == 1
                          ? GREEN
                          : index == 2
                            ? PINK_DARK
                            : index == 3
                              ? YELLOW
                              : '',
                  },
                },
                opposite: index == 0 || index == 2 ? false : true,
              })
              // categoriesData.push(
              //   financial?.valueData?.map((entry: any) => {
              //     return entry[3] !== null ? entry[3] : null
              //   })
              // )
            } else {
              aaaaS.push({
                name: `${financial?.name} (${financial?.chart_item_symbol})`,
                // type: 'column',
                type: (rangeselect === 'ANNUAL' && (chart_range > 15 || chart_range === 1)) ? 'spline' :
                  (rangeselect !== 'ANNUAL' && (chart_range > 32 || chart_range === 1)) ? 'spline' : (groupitem === 'RATIO_ANALYSIS')? 'spline': 'column',
                yAxis: index,

                tooltip: {
                  valueSuffix: (chart_format === 'THOUSANDS') ? 'K' :
                    (chart_format === 'MILLION') ? 'M' : 'B'
                },
                data: financial?.valueData
                  ?.map((entry: any) => {
                    if (chart_format === 'THOUSANDS') {
                      return entry[1] !== null ? entry[1] : null
                    } else if (chart_format === 'MILLION') {
                      return entry[1] !== null ? entry[1] / 1000 : null
                    } else if (chart_format === 'BILLION') {
                      return entry[1] !== null ? entry[1] / (1000 * 1000) : null
                    }

                  })
                  .reverse(),
              })
          

              var postfix: any
              if (chart_format === 'THOUSANDS') {
                postfix = 'K';
              } else if (chart_format === 'MILLION') {
                postfix = 'M'
              } else if (chart_format === 'BILLION') {
                postfix = 'B'
              }


              yAxisData.push({
                min: (chart_format === 'THOUSANDS') ? allMinNegativeValues[index] :
                  (chart_format === 'MILLION') ? allMinNegativeValues[index] / 1000 : allMinNegativeValues[index] / (1000 * 1000),
                max: (chart_format === 'THOUSANDS') ? allMaxValues[index] :
                  (chart_format === 'MILLION') ? allMaxValues[index] / 1000 : allMaxValues[index] / (1000 * 1000),

                labels: {
                  formatter: function () {
                    return (this.value).toFixed(0) + postfix;
                  },

                  //   formatter: function() {
                  //     return this.value / value1 +postfix;
                  // },
                  style: {
                    color:
                      index == 0
                        ? BLUE_DARK
                        : index == 1
                          ? GREEN
                          : index == 2
                            ? PINK_DARK
                            : index == 3
                              ? YELLOW
                              : '',
                  },
                },
                title: {
                  text: "",
                  style: {
                    color:
                      index == 0
                        ? BLUE_DARK
                        : index == 1
                          ? GREEN
                          : index == 2
                            ? PINK_DARK
                            : index == 3
                              ? YELLOW
                              : '',
                  },
                },
                opposite: index == 0 || index == 2 ? false : true,
              })
              // categoriesData.push(
              //   financial?.valueData?.map((entry: any) => {
              //     return entry[3] !== null ? entry[3] : null
              //   })
              // )
              maxDataRange.push(
                financial?.valueData?.map((entry: any) => {
                  return entry[3] !== null ? entry[3] : null
                })
              )
              
            const categoriesDatanew=(maxDataRange.reduce((max, array) => array.length > max.length ? array : max, []))
          
                categoriesData =categoriesDatanew
            }

          })
        
        } else {
          const financialKeys = [...FinancialDataNew]
          financialKeys.map((financial: any, index) => {
            aaaaS.push({
              name: `${financial?.name} (${symbol})`,
              // type: 'column',
              type: (rangeselect === 'ANNUAL' && (chart_range > 15 || chart_range === 1)) ? 'spline' :
                (rangeselect !== 'ANNUAL' && (chart_range > 32 || chart_range === 1)) ? 'spline' :(groupitem === 'RATIO_ANALYSIS')? 'spline': 'column',
              yAxis: index,

              tooltip: {
                valueSuffix: (chart_format === 'THOUSANDS') ? 'K' :
                  (chart_format === 'MILLION') ? 'M' : 'B'
              },
              data: financial?.valueData
                ?.map((entry: any) => {
                  if (chart_format === 'THOUSANDS') {
                    return entry[1] !== null ? entry[1] : null
                  } else if (chart_format === 'MILLION') {
                    return entry[1] !== null ? entry[1] / 1000 : null
                  } else if (chart_format === 'BILLION') {
                    return entry[1] !== null ? entry[1] / (1000 * 1000) : null
                  }

                })
                .reverse(),
            })
          

            var postfix: any
            if (chart_format === 'THOUSANDS') {
              postfix = 'K';
            } else if (chart_format === 'MILLION') {
              postfix = 'M'
            } else if (chart_format === 'BILLION') {
              postfix = 'B'
            }
            yAxisData.push({
              min: (chart_format === 'THOUSANDS') ? allMinNegativeValues[index] :
                (chart_format === 'MILLION') ? allMinNegativeValues[index] / 1000 : allMinNegativeValues[index] / (1000 * 1000),
              max: (chart_format === 'THOUSANDS') ? allMaxValues[index] :
                (chart_format === 'MILLION') ? allMaxValues[index] / 1000 : allMaxValues[index] / (1000 * 1000),

              labels: {
                formatter: function () {
                  return (this.value).toFixed(0) + postfix;
                },

                //   formatter: function() {
                //     return this.value / value1 +postfix;
                // },
                style: {
                  color:
                    index == 0
                      ? BLUE_DARK
                      : index == 1
                        ? GREEN
                        : index == 2
                          ? PINK_DARK
                          : index == 3
                            ? YELLOW
                            : '',
                },
              },
              title: {
                text: "",
                style: {
                  color:
                    index == 0
                      ? BLUE_DARK
                      : index == 1
                        ? GREEN
                        : index == 2
                          ? PINK_DARK
                          : index == 3
                            ? YELLOW
                            : '',
                },
              },
              opposite: index == 0 || index == 2 ? false : true,
            })
            
            // categoriesData.push(
            //   financial?.valueData?.map((entry: any) => {
            //     return entry[3] !== null ? entry[3] : null
            //   })
            // )
            maxDataRange.push(
              financial?.valueData?.map((entry: any) => {
                return entry[3] !== null ? entry[3] : null
              })
            )
            console.log(maxDataRange,'maxDataRangemaxDataRange');
          const categoriesDatanew=(maxDataRange.reduce((max, array) => array.length > max.length ? array : max, []))
          console.log(categoriesDatanew.length,'categoriesDatanew');
              categoriesData =categoriesDatanew
          })
        }


      }
    var aaaaS1 = aaaaS;
// const firstrange = aaaaS1[0]?.data?.length;

// for (var k = 0; k < aaaaS1.length; k++) {
//     if (aaaaS1.length > 1) {
//         var seriesData = aaaaS1[k].data;
//         const minrange = firstrange - (seriesData?.length || 0);
//         let reviseArray = [];
//         for (var i = 0; i < minrange; i++) {
//             reviseArray[i] = null;
//         }
//         for (var j = i; j < firstrange; j++) {
//             reviseArray[j] = aaaaS1[k].data[j - i];
//         }
//         aaaaS1[k].data = reviseArray;
//           console.log(minrange,'minrange');
//         console.log("Revised data for series", k + 1, ":", aaaaS1[k].data);
//     }
// }
// const firstrange = aaaaS1[0]?.data?.length;


const maxDataArray11 = aaaaS1.reduce((max, obj) => obj.data.length > max.data.length ? obj : max, aaaaS1[0])||0;


if (maxDataArray11 !== 0) {
const firstrange = maxDataArray11.data.length;


if (firstrange !== undefined) {
    for (var k = 0; k < aaaaS1.length; k++) {
        if (aaaaS1.length > 1) {
          var seriesData1 = aaaaS1[0].data;
            var seriesData = aaaaS1[k].data;
            
            const minrange = firstrange - (seriesData?.length || 0);
        
          
            let reviseArray = [];
            // if (minrange < 0) {
            //   console.log('negative');
            //     for (var i = 0; i < Math.abs(minrange); i++) {
            //         reviseArray.push(null);
            //     }
            //     reviseArray = reviseArray.concat(seriesData1);
            //     aaaaS1[k].data = reviseArray;
            //     console.log("Revised data for series", k , ":", reviseArray);
            // } else if (minrange > 0) {
              console.log('positive');
              for (var i = 0; i < minrange; i++) {
                            reviseArray[i] = null;
                        }
                        for (var j = i; j < firstrange; j++) {
                            reviseArray[j] = aaaaS1[k].data[j - i];
                        }
                        aaaaS1[k].data = reviseArray;
                        console.log("Revised data for series", k + 1, ":", reviseArray);
            // }

           

           
        }
    }
}
}

const filterCategories = [...new Set(categoriesData.flat())]
  
    console.log(filterCategories.length,'filterCategories');
      

// if (economicsData.length > 0) {
//       var aaaaS1 = aaaaS
 
   
// if (aaaaS1.length > 1) {
//   const lastSeriesIndex = aaaaS1.length - 1;
//     const economocisSeriesData = aaaaS1[lastSeriesIndex].data;
//     for (i = 0; i < economicsData.length ; i++) {
//     const reviseArray = filterCategories.map(currentLabel => {
//         const matchingData = economicsData[i]?.actualData.find(data => data[3] === currentLabel);
//         return matchingData ? matchingData[1] : null;
//     });
//     aaaaS1[lastSeriesIndex].data = reviseArray;
//     console.log("reviseArray11", reviseArray);
// }
// }
// }
if (economicsData.length > 0) {
  var aaaaS1 = aaaaS;
  const chartitem = economicsData.length;


  const seriesToUpdate = Math.min(aaaaS1.length, economicsData.length);
  
  for (let i = 0; i < seriesToUpdate; i++) {
      const reviseArray = filterCategories.map(currentLabel => {
          const matchingData = economicsData[i]?.actualData.find(data => data[3] === currentLabel);
          return matchingData ? matchingData[1] : null;
      });

      const dataIndex = economicsData[i]?.index;
      if (dataIndex !== undefined && dataIndex < aaaaS1.length) {
          aaaaS1[dataIndex].data = reviseArray; 
      }
  }
}



	  // if (aaaaS1.length > 1) {
	  //   var economocisSeriesData =  aaaaS1[1].data
    
		// let reviseArray = []
		
		// var i
		// var j
		// for (i = 0; i < filterCategories.length ; i++) {
		//    var currentLabel = filterCategories[i];
		  
		//    for (j = 0; j < economicsData[0]?.actualData.length; j++) {
    //      console.log(economicsData[0]?.actualData[j][3],'label[3]');
		// 	if (economicsData[0]?.actualData[j][3] === currentLabel) {
		// 		reviseArray[i] = economicsData[0]?.actualData[j][1]
    //     //aaaaS1[k].data =reviseArray
    //     setrevise(reviseArray)
      
		// 	} else {
		// 		reviseArray[i] = null
		// 	}
		//    }

		// }
		
	  //   console.log("reviseArray", reviseArray)
	  // }

      

      options = {
        chart: {
          type: 'column',
          backgroundColor: '#0a0a0a',
        },

        title: {
          text: chartTitleName || 'Financial Chart',
          style: {
            color: "#ffff"
          }
        },
        xAxis: {
          categories: filterCategories.reverse(),
          crosshair: true,
          labels: {
            style: {
              color: '#fff',
            }
          },
        },

        yAxis: yAxisData,

        colors: seriesColors,
        series: aaaaS,
        legend: ""
      }
    }
    if (options) {
      Highcharts.chart('chart-container', options)
    }
  }
  



  return (
    <>
      <div style={{ backgroundColor: '#0a0a0a' }}>
        {/* <AnimatePresence>
          {loading && <LoaderOverlay lOpacity initial="animate" />}
        </AnimatePresence> */}
        <div id="chart-container" style={{ backgroundColor: 'black' }}>
          <HighchartsReact
            highcharts={Highcharts}
            options={{}}
            style={{ backgroundColor: 'black' }}
          />
        </div>
      </div>
    </>
  )
}

export default AllDataChart