import { useEffect, useState } from 'react'
import Highcharts, { color } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { AXIOS_INSTANCE } from 'constants'
import { useRouter } from 'next/router'
import {
  generalToolTipStyling,
  getColorFromIdx,
  GREEN,
  GREEN_DARK,
  GREEN_DARKER,
  GREEN_LIGHT,
  GREY_LIGHT,
  GREY_DARK,
  GREY_DARKEST,
  hexWithTransparency,
  PINK,
  BLUE_LIGHT,
  BLUE_DARK,
  BLUE_DARKER,
  PINK_LIGHT,
  PINK_DARKER,
  PINK_DARK,
  RED_DARK,
  YELLOW,
  scrollBarStyling,
  X_AXIS_STYLING,
  YELLOW_DARK,
  YELLOW_LIGHT,
  BLUE,
  Y_AXIS_STYLING,
} from '../../../../../../../highcharts-styling-config'

const Chart = (chartdata) => {
  const {
    chart_items,
    deleteId,
    handleDelete,
    openchart,
    openNew,
    setOpenNew,
    setDateTime,
    chart_format,
    ChartFormatReset,
    ChartFormatRender,
    chartDelete,
    chartDeleteResetState,
    tabChangeDataTrandferToParent,
    compareOptionInEconomics,
  } = chartdata
  const router = useRouter()
  const title = router.query?.titles
  const [FinancialData, setFinancialData] = useState()
  const [FinancialDataTest, setFinancialDataTest] = useState()
  const [newDataTest, setnewdate] = useState([])

  const [minNegativeValue, setMinNegativeValue] = useState(0)

  const getAllHistoricalFinancial = async (symbol: string) => {
    const token = localStorage.getItem('token')
    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }
    const chartItems = chartdata?.chart_items
    const chartrange = chartdata?.chart_range

    if (chartItems && chartItems.length > 0) {
      const storeData: any = []
      for (const item of chartItems) {
        if (item.type === '') {
          continue
        }
        const condition = {
          type: item.item_group,
          endpoint: `getAllHistoricalFinancialData?symbol=${
            item.chart_item_symbol
          }&data_id=${item.item_id}&statement_type=${
            item.item_group
          }&filling_type=${chartdata?.userChangeQ_A}&ratio_analysis_type=${
            item?.ratio_analysis_type || ''
          }&report_type=AS_REPORTED`,
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
          storeData.push({
            valueData,
            name: item.item_name,
            item_id: item.item_id,
            chart_item_symbol: item.chart_item_symbol,
          })

          //
        } catch (error) {
          console.error('Error fetching search results:', error)
        }
      }
      setnewdate(storeData)
      callAPINew(storeData)
      setOpenNew(false)
    }
  }

  const getAllHistoricalFinancialNew = async (symbol: string) => {
    const token = localStorage.getItem('token')
    const headers = {
      X_AUTH_TOKEN: token,
      'Content-Type': 'application/json',
    }

    const chartItems = chart_items

    if (chartItems && chartItems.length > 1) {
      const storeData1: any = []
      var chartItemLastIndex = {}
      if (chartItems.length > 2) {
        chartItemLastIndex = chartItems[chartItems.length - 1]
      } else if (chartItems.length > 1) {
        chartItemLastIndex = chartItems[1]
      }
      let existing = !newDataTest.some(
        // (check) => check.item_id === chartItemLastIndex?.item_id
        (check) =>
          check.item_id === chartItemLastIndex?.item_id &&
          check.chart_item_symbol === chartItemLastIndex?.chart_item_symbol
      )
      if (existing) {
        const condition = {
          type: chartItemLastIndex?.item_group,
          endpoint: `getAllHistoricalFinancialData?symbol=${
            chartItemLastIndex?.chart_item_symbol
          }&data_id=${chartItemLastIndex?.item_id}&statement_type=${
            chartItemLastIndex?.item_group
          }&filling_type=${chartdata?.userChangeQ_A}&ratio_analysis_type=${
            chartItemLastIndex?.ratio_analysis_type || ''
          }&report_type=AS_REPORTED`,
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
          let repData = [
            {
              valueData,
              name: chartItemLastIndex?.item_name,
              item_id: chartItemLastIndex?.item_id,
              chart_item_symbol: chartItemLastIndex?.chart_item_symbol,
            },
          ]
          let preData = [...newDataTest, ...repData]
          if (repData.length > 0) {
            setnewdate((prev) => [...prev, ...repData])
            callAPINew(preData)
          }
          // else{
          //   callAPINew(storeData1);
          // }
        } catch (error) {
          console.error('Error fetching search results:', error)
        }
      }
    }
  }

  // useEffect(() => {
  //   getAllHistoricalFinancial()
  // }, [chartdata?.userChangeQ_A])

  useEffect(() => {
    if (ChartFormatRender === true) {
      getAllHistoricalFinancial()
    }
    setTimeout(() => {
      ChartFormatReset()
    }, 2000)
  }, [ChartFormatRender])
  //   useEffect(() => {
  //     if(chart_format ){
  //       getAllHistoricalFinancial()
  //     }
  // }, [chart_format ])

  const chartEmptyInDelete = () => {
    setnewdate([])
    let options = {
      chart: {
        type: 'column',
        backgroundColor: '#0a0a0a',
      },

      title: {
        text: 'Financial Chart',
        style: {
          color: '#ffff',
        },
      },
    }
    Highcharts.chart('chart-container', options)
    tabChangeDataTrandferToParent(true)
  }
  useEffect(() => {
    if (openNew == true) {
      getAllHistoricalFinancial()
    } else if (chart_items.length > 1) {
      getAllHistoricalFinancialNew()
    }
  }, [chart_items, openNew])
  useEffect(() => {
    if (compareOptionInEconomics) {
      getAllHistoricalFinancial()
    }
  }, [compareOptionInEconomics])
  // }, [chart_items, openchart])
  useEffect(() => {
    if (chart_items.length === 1 && chartDelete === true) {
      chartEmptyInDelete()
    }
    setTimeout(() => {
      chartDeleteResetState()
    }, 1500)
  }, [chartDelete])
  useEffect(() => {
    if (deleteId) {
      setnewdate((prevData) => {
        const updatedData = prevData.filter(
          (item) =>
            item.item_id !== deleteId?.item_id ||
            item.chart_item_symbol !== deleteId?.chart_item_symbol
        )
        callAPINew(updatedData)
        handleDelete('')
        return updatedData
      })
    }
  }, [deleteId])

  useEffect(() => {
    if (newDataTest != null) {
      if (chartdata?.chart_range) {
        const newStoreDataNew = []
        for (let index = 0; index < newDataTest.length; index++) {
          const element = newDataTest[index]
          const dataToSet =
            chartdata?.chart_range === 1
              ? element.valueData
              : element.valueData.slice(0, chartdata?.chart_range)
          newStoreDataNew.push({
            valueData: dataToSet,
            name: element.name,
            item_id: element.item_id,
            chart_item_symbol: element.chart_item_symbol,
          })
        }
        callAPI(newStoreDataNew)
      }
    }
  }, [chartdata?.chart_range])

  const callAPINew = (newData: any) => {
    const range =
      chartdata?.userChangeQ_A === 'ANNUAL'
        ? chartdata?.chart_range || 2
        : chartdata?.chart_range || 8
    const newStoreData = []
    for (let index = 0; index < newData.length; index++) {
      const element = newData[index]

      const dataToSet =
        range === 1 ? element.valueData : element.valueData.slice(0, range)
      newStoreData.push({
        valueData: dataToSet,
        name: element.name,
        item_id: element.item_id,
        chart_item_symbol: element.chart_item_symbol,
      })
    }
    callAPI(newStoreData)
  }
  // const callAPI = (FinancialDataNew: any) => {
  //   setDateTime({
  //     start_date:
  //       FinancialDataNew[0]?.valueData[
  //         FinancialDataNew[0]?.valueData.length - 1
  //       ],
  //     end_date: FinancialDataNew[0]?.valueData[0],
  //   })
  //   let allMinNegativeValues = []
  //   let allMaxValues = []
  //   let allMiniValues=[]
  //   var testMymax = 0
  //   var testMymin = 0
  //   var testMy = 0
  //   if (FinancialDataNew.length > 0) {
  //     const financialKeys = [...FinancialDataNew]
  //     financialKeys.map((financial: any, index) => {

  //       const minNegativeValue = Math.min(
  //         ...financial?.valueData
  //           ?.map((entry: any) => entry[1])
  //           .filter((value) => value !== null && value < 0)
  //       )
  //       const maxValue = Math.max(
  //         ...financial?.valueData
  //           ?.map((entry: any) => entry[1])
  //       )
  //       allMaxValues.push(maxValue)
  //       // console.log(allMaxValues, 'allMaxValues');
  //       const ValuesArray = allMaxValues.filter(
  //         (value) => value > 0
  //       )
  //       if (ValuesArray.length > 0) {
  //         testMymax = Math.max(...ValuesArray)
  //       } else {
  //         testMymax = 0
  //       }
  //       const minValue = Math.min(
  //         ...financial?.valueData
  //           ?.map((entry: any) => entry[1])
  //       )
  //       allMiniValues.push(minValue)
  //       const ValuesArraymin = allMiniValues.filter(
  //         (value) => value > 0
  //       )
  //       if (ValuesArraymin.length > 0) {
  //         testMymin = Math.min(...ValuesArraymin)
  //       } else {
  //         testMymin = 0
  //       }
  //       const yAxisMin =
  //         minNegativeValue !== Infinity ? Math.floor(minNegativeValue) : 0
  //       allMinNegativeValues.push(yAxisMin)
  //       const negativeValuesArray = allMinNegativeValues.filter(
  //         (value) => value < 0
  //       )
  //       if (negativeValuesArray.length > 0) {
  //         testMy = Math.min(...negativeValuesArray)
  //       } else {
  //         testMy = 0
  //       }
  //     })
  //   }
  //   let options
  //   if (FinancialDataNew) {
  //     const aaaaS: any = []
  //     const yAxisData: any = []
  //     const categoriesData: any = []

  //     const seriesColors = [BLUE_DARK, GREEN, PINK_DARK, YELLOW]
  //     if (FinancialDataNew.length > 0) {
  //       const financialKeys = [...FinancialDataNew]
  //       financialKeys.map((financial: any, index) => {
  //         aaaaS.push({
  //           // color: 'red',
  //           // name: financial?.name,
  //           name: `${financial?.name} (${financial?.chart_item_symbol})`,
  //           // type: 'column',
  //           type: (chartdata?.userChangeQ_A === 'ANNUAL' && (chartdata?.chart_range > 15 || chartdata?.chart_range === 1)) ? 'spline' :
  //           (chartdata?.userChangeQ_A !== 'ANNUAL' && (chartdata?.chart_range > 32 || chartdata?.chart_range === 1)) ? 'spline' : 'column',
  //           yAxis: index,
  //           // data:[-1217000000, -1445000000, 231900000, 43700000]
  //           data: financial?.valueData
  //             ?.map((entry: any) => {
  //               return entry[1] !== null ? entry[1] : null
  //             })
  //             .reverse(),
  //         })

  //         // var tickchart_format

  //     //  if(chart_format  === 'THOUSANDS') {
  //     //       tickchart_format  = Math.ceil((testMymax) / 3 / 1000) * 1000;
  //     //     } else if (chart_format  === 'MILLION') {
  //     //       tickchart_format  = Math.ceil((testMymin) / 3 / 1000000) * 1000000;
  //     //     } else if (chart_format  === 'BILLION') {
  //     //       tickchart_format  = Math.ceil(testMymin);
  //     //     }
  //         var postfix: any
  //         if (chart_format === 'THOUSANDS') {
  //           postfix = 'K';
  //         } else if (chart_format === 'MILLION') {
  //           postfix = 'M'
  //         } else if (chart_format === 'BILLION') {
  //           postfix = 'B'
  //         }
  //         var value1:any
  //         if (chart_format  === 'THOUSANDS') {
  //           value1 = 1000;
  //         } else if (chart_format  === 'MILLION') {
  //           value1 = 1000000
  //         } else if (chart_format  === 'BILLION') {
  //           value1 =1000000000
  //         }

  //         yAxisData.push({
  //           //  min: testMy,
  //           //  max: testMymax,
  //           min: (chart_format === 'THOUSANDS') ? allMinNegativeValues[index] :
  //             (chart_format === 'MILLION') ? allMinNegativeValues[index] / 1000 : allMinNegativeValues[index] / (1000 * 1000),
  //           max: (chart_format === 'THOUSANDS') ? allMaxValues[index] :
  //             (chart_format === 'MILLION') ? allMaxValues[index] / 1000 : allMaxValues[index] / (1000 * 1000),
  //          // tickchart_format : ((testMymax)/5),//thousands
  //          // tickchart_format :(tickchart_format ),
  //         //  tickchart_format :round((testMymin)/5),millon

  //           labels: {
  //             formatter: function () {
  //               return (this.value).toFixed(0) + postfix;
  //             },
  //         //   formatter: function() {
  //         //     return this.value / value1 +postfix;
  //         // },
  //             style: {
  //               color:
  //                 index == 0
  //                   ? BLUE_DARK
  //                   : index == 1
  //                   ? GREEN
  //                   : index == 2
  //                   ? PINK_DARK
  //                   : index == 3
  //                   ? YELLOW
  //                   : '',
  //             },
  //           },
  //           title: {
  //             text: ``,
  //             style: {
  //               color:
  //                 index == 0
  //                   ? BLUE_DARK
  //                   : index == 1
  //                   ? GREEN
  //                   : index == 2
  //                   ? PINK_DARK
  //                   : index == 3
  //                   ? YELLOW
  //                   : '',
  //             },
  //           },
  //           opposite: index == 0 || index == 2 ? false : true,
  //         })
  //         categoriesData.push(
  //           financial?.valueData?.map((entry: any) => {
  //             return entry[3] !== null ? entry[3] : null
  //           })
  //         )
  //       })
  //     }

  //     const filterCategories = [...new Set(categoriesData.flat())]

  //     options = {
  //       chart: {
  //         type: 'column',
  //         backgroundColor: '#0a0a0a',
  //       },

  //       title: {
  //         text: chartdata?.chartTitleopen || title,
  //         style: {
  //           color: '#fff',
  //         },
  //       },
  //       xAxis: {
  //         categories: filterCategories.reverse(),
  //         crosshair: true,
  //         // lineColor: '#fff',
  //         // tickColor: '#FFF',
  //         labels: {
  //           style: {
  //             color: '#fff',
  //           }
  //         },
  //       },

  //       yAxis: yAxisData,

  //       colors: seriesColors,
  //       series: aaaaS,
  //       legend:""
  //     }
  //   }

  //   if (options) {
  //     Highcharts.chart('chart-container', options)
  //   }
  // }
  const callAPI = (FinancialDataNew: any) => {
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
    var testMymax = 0
    var testMymin = 0
    var testMy = 0
    if (FinancialDataNew.length > 0) {
      const financialKeys = [...FinancialDataNew]
      financialKeys.map((financial: any, index) => {
        const minNegativeValue = Math.min(
          ...financial?.valueData
            ?.map((entry: any) => entry[1])
            .filter((value) => value !== null && value < 0)
        )
        const maxValue = Math.max(
          ...financial?.valueData?.map((entry: any) => entry[1])
        )
        allMaxValues.push(maxValue)
        // console.log(allMaxValues, 'allMaxValues');
        const ValuesArray = allMaxValues.filter((value) => value > 0)
        if (ValuesArray.length > 0) {
          testMymax = Math.max(...ValuesArray)
        } else {
          testMymax = 0
        }
        const minValue = Math.min(
          ...financial?.valueData?.map((entry: any) => entry[1])
        )
        allMiniValues.push(minValue)
        const ValuesArraymin = allMiniValues.filter((value) => value > 0)
        if (ValuesArraymin.length > 0) {
          testMymin = Math.min(...ValuesArraymin)
        } else {
          testMymin = 0
        }
        const yAxisMin =
          minNegativeValue !== Infinity ? Math.floor(minNegativeValue) : 0
        allMinNegativeValues.push(yAxisMin)
        const negativeValuesArray = allMinNegativeValues.filter(
          (value) => value < 0
        )
        if (negativeValuesArray.length > 0) {
          testMy = Math.min(...negativeValuesArray)
        } else {
          testMy = 0
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
          const financialKeys = [...FinancialDataNew]

          compareOptionInEconomics.forEach((obj) => {
            const { countryCode, valueData, indicatorName, data_type } = obj;
            console.log(compareOptionInEconomics,'financialfinancialfinancial');
              
            const slicedValueData = chartdata?.chart_range === 1 ? valueData : valueData.slice(0, chartdata?.chart_range);
            financialKeys.push({
              name: indicatorName,
              //valueData: valueData.slice(0, chartdata?.chart_range),
              //  valueData: valueData,
              valueData:slicedValueData,
              data_type: data_type,
              countryCode: countryCode,
            })
          })
        
          financialKeys.map((financial: any, index: number) => {
            
            if (financial?.data_type === 'ECONOMICS') {
             
              economicsData.push({actualData: financial?.valueData?.reverse(), index: index });
              aaaaS.push({
                name: ` ${financial?.countryCode} ${financial?.name} (${financial?.chart_item_symbol})`,
                type: 'scatter',
                data: financial?.valueData
                  ?.map((entry: any) => {
                    return entry[1] !== null ? entry[1] : null
                  })
                  .reverse(),
                yAxis: index,
                marker: { enabled: true },
                dashStyle: 'shortdot',
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
                  text: '',
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
                type:
                  chartdata?.userChangeQ_A === 'ANNUAL' &&
                  (chartdata?.chart_range > 15 || chartdata?.chart_range === 1)
                    ? 'spline'
                    : chartdata?.userChangeQ_A !== 'ANNUAL' &&
                      (chartdata?.chart_range > 32 ||
                        chartdata?.chart_range === 1)
                    ? 'spline'
                    : 'column',
                yAxis: index,

                tooltip: {
                  valueSuffix:
                    chart_format === 'THOUSANDS'
                      ? 'K'
                      : chart_format === 'MILLION'
                      ? 'M'
                      : 'B',
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
                postfix = 'K'
              } else if (chart_format === 'MILLION') {
                postfix = 'M'
              } else if (chart_format === 'BILLION') {
                postfix = 'B'
              }

              yAxisData.push({
                min:
                  chart_format === 'THOUSANDS'
                    ? allMinNegativeValues[index]
                    : chart_format === 'MILLION'
                    ? allMinNegativeValues[index] / 1000
                    : allMinNegativeValues[index] / (1000 * 1000),
                max:
                  chart_format === 'THOUSANDS'
                    ? allMaxValues[index]
                    : chart_format === 'MILLION'
                    ? allMaxValues[index] / 1000
                    : allMaxValues[index] / (1000 * 1000),

                labels: {
                  formatter: function () {
                    return this.value.toFixed(0) + postfix
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
                  text: '',
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
              // color: 'red',
              // name: financial?.name,
              name: `${financial?.name} (${financial?.chart_item_symbol})`,
              // type: 'column',
              type:
                chartdata?.userChangeQ_A === 'ANNUAL' &&
                (chartdata?.chart_range > 15 || chartdata?.chart_range === 1)
                  ? 'spline'
                  : chartdata?.userChangeQ_A !== 'ANNUAL' &&
                    (chartdata?.chart_range > 32 ||
                      chartdata?.chart_range === 1)
                  ? 'spline'
                  : 'column',
              yAxis: index,
              // data:[-1217000000, -1445000000, 231900000, 43700000]
              data: financial?.valueData
                ?.map((entry: any) => {
                  return entry[1] !== null ? entry[1] : null
                })
                .reverse(),
            })

            // var tickchart_format

            //  if(chart_format  === 'THOUSANDS') {
            //       tickchart_format  = Math.ceil((testMymax) / 3 / 1000) * 1000;
            //     } else if (chart_format  === 'MILLION') {
            //       tickchart_format  = Math.ceil((testMymin) / 3 / 1000000) * 1000000;
            //     } else if (chart_format  === 'BILLION') {
            //       tickchart_format  = Math.ceil(testMymin);
            //     }
            var postfix: any
            if (chart_format === 'THOUSANDS') {
              postfix = 'K'
            } else if (chart_format === 'MILLION') {
              postfix = 'M'
            } else if (chart_format === 'BILLION') {
              postfix = 'B'
            }
            var value1: any
            if (chart_format === 'THOUSANDS') {
              value1 = 1000
            } else if (chart_format === 'MILLION') {
              value1 = 1000000
            } else if (chart_format === 'BILLION') {
              value1 = 1000000000
            }

            yAxisData.push({
              //  min: testMy,
              //  max: testMymax,
              min:
                chart_format === 'THOUSANDS'
                  ? allMinNegativeValues[index]
                  : chart_format === 'MILLION'
                  ? allMinNegativeValues[index] / 1000
                  : allMinNegativeValues[index] / (1000 * 1000),
              max:
                chart_format === 'THOUSANDS'
                  ? allMaxValues[index]
                  : chart_format === 'MILLION'
                  ? allMaxValues[index] / 1000
                  : allMaxValues[index] / (1000 * 1000),
              // tickchart_format : ((testMymax)/5),//thousands
              // tickchart_format :(tickchart_format ),
              //  tickchart_format :round((testMymin)/5),millon

              labels: {
                formatter: function () {
                  return this.value.toFixed(0) + postfix
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
                text: ``,
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
      // console.log(minrange,'minrange');
      
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
            if (minrange < 0) {
              console.log('negative');
                for (var i = 0; i < Math.abs(minrange); i++) {
                    reviseArray.push(null);
                }
                reviseArray = reviseArray.concat(seriesData1);
                aaaaS1[0].data = reviseArray;
                console.log("Revised data for series", k , ":", reviseArray);
            } else if (minrange > 0) {
              console.log('positive');
              for (var i = 0; i < minrange; i++) {
                            reviseArray[i] = null;
                        }
                        for (var j = i; j < firstrange; j++) {
                            reviseArray[j] = aaaaS1[k].data[j - i];
                        }
                        aaaaS1[k].data = reviseArray;
                        console.log("Revised data for series", k + 1, ":", reviseArray);
            }

           
           
        }
    }
}
}
      const filterCategories = [...new Set(categoriesData.flat())]
      if (economicsData.length > 0) {
        var aaaaS1 = aaaaS;
        const chartitem = economicsData.length;
      
        const seriesToUpdate = Math.min(aaaaS1.length, economicsData.length);
      
        for (let i = 0; i < seriesToUpdate; i++) {
            const reviseArray = filterCategories.map(currentLabel => {
                const matchingData = economicsData[i]?.actualData.find(data => data[3] === currentLabel);
                return matchingData ? matchingData[1] : null;
            });
      
            const dataIndex = economicsData[i]?.index; // Get the index from economicsData
            if (dataIndex !== undefined && dataIndex < aaaaS1.length) {
                aaaaS1[dataIndex].data = reviseArray; 
            }
        }
      }
      // var aaaaS1 = aaaaS
      // if (aaaaS1.length > 1) {
      //     const economocisSeriesData = aaaaS1[1].data;
          
      //     const reviseArray = filterCategories.map(currentLabel => {
      //         const matchingData = economicsData[0]?.actualData.find(data => data[3] === currentLabel);
      //         return matchingData ? matchingData[1] : null;
      //     });
      //     aaaaS1[1].data = reviseArray;
     
      //     console.log("reviseArray", reviseArray);
      //     console.log("Revised data for series222222", 1, ":", aaaaS1[1].data);
      // }

      options = {
        chart: {
          type: 'column',
          backgroundColor: '#0a0a0a',
        },

        title: {
          text: chartdata?.chartTitleopen || title,
          style: {
            color: '#fff',
          },
        },
        xAxis: {
          categories: filterCategories.reverse(),
          crosshair: true,
          // lineColor: '#fff',
          // tickColor: '#FFF',
          labels: {
            style: {
              color: '#fff',
            },
          },
        },

        yAxis: yAxisData,

        colors: seriesColors,
        series: aaaaS,
        legend: '',
      }
    }

    if (options) {
      Highcharts.chart('chart-container', options)
    }
  }
  return (
    <div id="chart-container" style={{ backgroundColor: 'black' }}>
      <div style={{ backgroundColor: '#0a0a0a' }}>
        <HighchartsReact
          highcharts={Highcharts}
          options={{}}
          style={{ backgroundColor: 'black' }}
        />
      </div>
    </div>
  )
}

export default Chart
