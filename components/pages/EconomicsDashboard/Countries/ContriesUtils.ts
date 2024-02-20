import {
    getCountryDetailsResponseInterface,
    getIndicatorDetailsResponseInterface
} from 'service/DashboardService/DashboardServicesInterface'

export const convertContriesDetailsToList = (
  data: getCountryDetailsResponseInterface
) => {
  return [
    { label: 'Name', value: data.country_name },
    { label: 'Region', value: data.region },
    { label: 'Income level', value: data.income_level },
    { label: 'Capital', value: data.capital_city },
    { label: 'Longitude', value: data.longitude },
    { label: 'Latitude', value: data.latitude },
  ]
}

export const convertIndicatorDetailsToList = (
  data: getIndicatorDetailsResponseInterface
) => {
  return [
    { label: 'Short Definition', value: data.short_definition },
    { label: 'Long Definition', value: data.long_definition },
    { label: 'Source', value: data.related_sources },
    { label: 'Limitation', value: data.limitations },
    { label: 'Unit of Measure', value: data.unit },
    { label: 'Statistical Methodology', value: data.statistical_concept },
    { label: 'License URL', value: data.license_url },
    { label: 'Other Comments', value: data.general_comments },
    { label: 'Aggregation', value: data.aggregation_method },
    { label: 'Base Period', value: data.periodicity },
  ]
}
