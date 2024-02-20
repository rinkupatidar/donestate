import { SavedChartConfigInterface } from 'components/pages/stock/BottomSection/tabs/Chart/SavedCharts/SavedChartTypes'

export interface StockInfoResponseType {
  avg_volume: number
  captured_on: number
  change: number
  change_percentage: number
  current_price: number
  day_high: number
  day_low: number
  eps: number
  market_cap: number
  open: number
  pe: number
  previous_close: number
  price_avg_50: number
  price_avg_200: number
  shares_outstanding: number
  volume: number
  year_high: number
  year_low: number
  equity_name: string
  equity_symbol: string
  exchange: string
}

export type GetChartTitlesResponse = [string, string, string]

export interface GetChartResponseInterface {
  shared: boolean
  chart_id: string
  symbol: string
  title: string
  image_link: string
  chart_config: SavedChartConfigInterface
  delete_warn_message: string
}


export interface getEconomicEventsResponseInterface {
  order: number
  event_date: number
  country: string
  event: string
  currency: string
  previous: number
  estimate: number
  actual: string | null
  change: null | string
  impact: string
  change_percentage: number
  country_code: string
}
export interface getEconomicNewsResponseInterface {
  order: number
  published_date: number
  title: string
  image: string
  source: string
  description: string
  url: string
}

export interface getRegionWiseIndicatorsResponseInterfae {
  countries: {
    order: 0
    country_id: string
    country_code: string
    country_name: string
  }[]
  indicators: {
    order: 0
    indicator_code: string
    indicator_name: string
  }[]
  values: {
    country_code: string
    indicator_code: string
    value: string
  }[]
}

export interface getAllCountriesResponseInterface {
  country_code: string
  country_name: string
}
export interface getCountryDetailsResponseInterface {
  order: number
  country_code: string
  country_name: string
  region: string
  income_level: string
  lending_type: string
  capital_city: string
  longitude: string
  latitude: string
}

export interface getIndicatorDetailsByTopicResponseInterface {
  code: string
  license_type: string
  indicator_name: string
  indicator_short_name: string
  short_definition: string
  long_definition: string
  source: string
  topic: string
  dataset: string
  unit: string
  periodicity: string
  bse: string
  aggregation_method: string
  statistical_concept: string
  development_relevance: string
  limitations: string
  general_comments: string
  other_notes: string
  notes: string
  related_sources: string
  other_weblinks: string
  license_url: string
}

export interface getIndicatorTopicsResponseInterface {
  topic_id: string
  topic_name: string
}

export interface getIndicatorDetailsResponseInterface {
  aggregation_method: string
  bse: string
  code: string
  dataset: string
  development_relevance: string
  general_comments: string
  indicator_name: string
  indicator_short_name: string
  license_type: string
  license_url: string
  limitations: string
  long_definition: string
  notes: string
  other_notes: string
  other_weblinks: string
  periodicity: string
  related_sources: string
  short_definition: string
  source: string
  statistical_concept: string
  topic: string
  unit: string
}
