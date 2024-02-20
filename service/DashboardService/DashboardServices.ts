import { AXIOS_INSTANCE } from '../../constants'
import {
  getAllCountriesResponseInterface,
  GetChartResponseInterface,
  GetChartTitlesResponse,
  getCountryDetailsResponseInterface,
  getEconomicEventsResponseInterface,
  getEconomicNewsResponseInterface,
  getIndicatorDetailsByTopicResponseInterface,
  getIndicatorDetailsResponseInterface,
  getIndicatorTopicsResponseInterface,
  getRegionWiseIndicatorsResponseInterfae,
  StockInfoResponseType
} from './DashboardServicesInterface'

export const getTopWorldEquityMarketInfo = () =>
  AXIOS_INSTANCE.get('getTopWorldEquityMarketInfo').then(({ data }) => data)

export const getTopWorldCommoditiesInfo = () =>
  AXIOS_INSTANCE.get('getTopWorldCommoditiesInfo').then(({ data }) => data)

export const getTopWorldCurrenciesInfo = () =>
  AXIOS_INSTANCE.get('getTopWorldCurrenciesInfo').then(({ data }) => data)

export const getStockQuote = (symbol: string) =>
  AXIOS_INSTANCE.get<StockInfoResponseType>('getStockQuote', {
    params: { symbol },
  }).then(({ data }) => data)

// export const createChart = (data: {
//   symbol: string
//   title: string
//   chart_config: { [key: string]: any }
// }) => AXIOS_INSTANCE.post('createChart', data).then(({ data }) => data)


export const createChart = (data: {
  symbol: string;
  title: string;
  chart_config: { [key: string]: any };
  chart_type: string; // Add chart_type to the data
}) => AXIOS_INSTANCE.post('createChart', data).then(({ data }) => {
  console.log(data);
  return data;
});
// export const getChartTitles = ({
//   page = 1,
//   symbol,
// }: {
//   symbol?: string
//   page?: number
// }) =>
//   AXIOS_INSTANCE.get<GetChartTitlesResponse[]>('getChartTitles', {
//     params: {
//       page,
//       symbol,
//     },
//   }).then(({ data }) => data)

export const getChartTitles = ({
 
  symbol,
  chart_type,
  page = 1,
}: {
  symbol?: string
  page?: number
  chart_type?: string
}) =>
  AXIOS_INSTANCE.get<GetChartTitlesResponse[]>('getChartTitles', {
    params: {
  
      symbol,
      chart_type,
      page,
    },
  }).then(({ data }) => data);

export const getChart = (chart_id: string) =>
  AXIOS_INSTANCE.get<GetChartResponseInterface>('openChart', {
    params: {
      chart_id,
    },
  }).then(({ data }) => data)

export const deleteChart = (chart_id: string) =>
  AXIOS_INSTANCE.delete('deleteChart', {
    params: {
      chart_id,
    },
  })

export const updateChart = (data: GetChartResponseInterface) =>
  // AXIOS_INSTANCE.post('updateChart', data).then(({ data }) => data)
  AXIOS_INSTANCE.post('updateChart', data).then(({ data }) => {
    return data;
  });

// export const getSearchChartTitles = (data: { search_text: string }) =>
//   AXIOS_INSTANCE.get('searchChartTitles', {
//     params: data,
//   }).then(({ data }) => data)

// export const getSearchChartTitles = (data: { search_text: string, chart_type: string }) =>
//   AXIOS_INSTANCE.get('searchChartTitles', {
//     params: data,
//   }).then(({ data }) => data);

export const getSearchChartTitles = (data: { search_text: string, chart_type: string, page: number }) =>
  AXIOS_INSTANCE.get('searchChartTitles', {
    params: data,
  }).then(({ data }) => data);

  export const getopenChart = (data: {chart_id: string}) =>
  AXIOS_INSTANCE.get('openChart', {
    params: data,
  }).then(({ data }) => data);

export const getEconomicsEvents = (from: string) =>
  AXIOS_INSTANCE.get<getEconomicEventsResponseInterface[]>(
    'getEconomicsEvents',
    {
      params: { from, to: from },
    }
  ).then((res) => res.data)

export const getEconomicsNews = (page: number) =>
  AXIOS_INSTANCE.get<getEconomicNewsResponseInterface[]>('getEconomicsNews', {
    params: {
      page_no: page,
    },
  }).then((res) => res.data)

export const getRegionWiseIndicators = (obj: {
  region: string
  topic: string
}) =>
  AXIOS_INSTANCE.get<getRegionWiseIndicatorsResponseInterfae>(
    'getRegionWiseIndicators',
    { params: obj }
  ).then((res) => res.data)

export const getAllCountries = () =>
  AXIOS_INSTANCE.get<getAllCountriesResponseInterface[]>(
    'getAllCountries'
  ).then((res) => res.data.map((i) => ({ ...i, displayValue: i.country_name })))

export const getCountryDetail = (country_code: string) =>
  AXIOS_INSTANCE.get<getCountryDetailsResponseInterface>('getCountryDetail', {
    params: { country_code },
  }).then((res) => res.data)

export const getIndicatorDetailsByTopic = (topic_id: string) =>
  AXIOS_INSTANCE.get<getIndicatorDetailsByTopicResponseInterface[]>(
    'getIndicatorDetailsByTopic',
    {
      params: { topic_id },
    }
  ).then((res) =>
    res.data.map((i) => ({
      ...i,
      displayValue: i.indicator_name,
    }))
  )

export const getIndicatorTopics = (display_for_dashboard: boolean = true) =>
  AXIOS_INSTANCE.get<getIndicatorTopicsResponseInterface[]>(
    'getIndicatorTopics',
    {
      params: {
        display_for_dashboard,
      },
    }
  ).then((res) =>
    res.data.map((i: any) => ({
      displayValue: i.topic_name,
      type: i.topic_id,
    }))
  )

export const getIndicatorDetail = (indicator_code: string) =>
  AXIOS_INSTANCE.get<getIndicatorDetailsResponseInterface>(
    'getIndicatorDetail',
    {
      params: { indicator_code },
    }
  ).then((res) => res.data)

// export const getCountryWiseHistoricalValues = (
//   country_code: string,
//   indicator_code: string
// ) =>
//   AXIOS_INSTANCE.get('getCountryWiseHistoricalValues', {
//     params: { country_code, indicator_code },
//   }).then((res) => res.data)

export const getCountryWiseHistoricalValues = (
  country_code: string,
  indicator_code: string,
  rangeselect:string
) =>
  AXIOS_INSTANCE.get('getCountryWiseHistoricalValues', {
    params: { country_code, indicator_code,reporting_type:rangeselect},
  }).then((res) => res.data)

export const uploadChartImage = (data: any) =>
  AXIOS_INSTANCE.post('uploadChart', data).then((res) => res.data)

// export const searchCompany =(data:any)=>{
//   AXIOS_INSTANCE.get('searchCompany',)
// }
const searchCompany = async (symbol: string) => {
  const token = localStorage.getItem('token')
  const headers = {
    X_AUTH_TOKEN: token,
    'Content-Type': 'application/json',
  }
  try {
    const response = await AXIOS_INSTANCE.get(
      `searchCompany?search=${symbol}`,
      { headers }
    )
    return response.data
  } catch (error) {
    console.error('Error posting data:', error)
  }
}