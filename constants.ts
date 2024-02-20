import axios from 'axios'
export const ALLOWED_MODIFIER_KEYS: modifierKeys[] = ['shift', 'ctrl']

export const IS_CLIENT = typeof window !== 'undefined'
export const AXIOS_INSTANCE = axios.create({
  baseURL: 'https://api.donestat.co/rest/v1',
  timeout: 100000,
})
export const baseURLnew = 'https://api.donestat.co/rest/v1';

export const OVERVIEW_DATA = {
  regions: [
    {
      order: 1,
      region_name: 'americas',
      indexes: [
        {
          order: '1',
          index_name: 'japan',
          index_symbol: '',
          country_name: '',
          real_time_data: {
            open: 3150.35,
            current_price: 3140.23,
            change: '5.00%',
            day_change_percentage: '9.99%',
            day_high: 1.45,
            day_low: 3150.96,
          },
          captured_on: '',
        },
        {
          order: '1',
          index_name: 'australia',
          index_symbol: '',
          country_name: '',
          real_time_data: {
            open: 3150.35,
            current_price: 3140.23,
            change: '5.00%',
            day_change_percentage: '9.99%',
            day_high: -3150.45,
            day_low: 3150.96,
          },
          captured_on: '',
        },
        {
          order: '1',
          index_name: 'new zealand',
          index_symbol: '',
          country_name: '',
          real_time_data: {
            open: 3150.35,
            current_price: 3140.23,
            change: '5.00%',
            day_change_percentage: '9.99%',
            day_high: 3150.45,
            day_low: 3150.96,
          },
          captured_on: '',
        },
        {
          order: '1',
          index_name: 'hongkong',
          index_symbol: '',
          country_name: '',
          real_time_data: {
            open: 3150.35,
            current_price: 3140.23,
            change: '5.00%',
            day_change_percentage: '9.99%',
            day_high: 3150.45,
            day_low: 3150.96,
          },
          captured_on: '',
        },
        {
          order: '1',
          index_name: 'india - nse',
          index_symbol: '',
          country_name: '',
          real_time_data: {
            open: 3150.35,
            current_price: 3140.23,
            change: '5.00%',
            day_change_percentage: '9.99%',
            day_high: 3150.45,
            day_low: 3150.96,
          },
          captured_on: '',
        },
      ],
    },
    {
      order: '',
      region_name: 'europe',
      indexes: [
        {
          order: '1',
          index_name: 'japan',
          index_symbol: '',
          country_name: '',
          real_time_data: {
            open: 3150.35,
            current_price: 3140.23,
            change: '5.00%',
            day_change_percentage: '9.99%',
            day_high: 1.45,
            day_low: 3150.96,
          },
          captured_on: '',
        },
        {
          order: '1',
          index_name: 'australia',
          index_symbol: '',
          country_name: '',
          real_time_data: {
            open: 3150.35,
            current_price: 3140.23,
            change: '5.00%',
            day_change_percentage: '9.99%',
            day_high: -3150.45,
            day_low: 3150.96,
          },
          captured_on: '',
        },
        {
          order: '1',
          index_name: 'new zealand',
          index_symbol: '',
          country_name: '',
          real_time_data: {
            open: 3150.35,
            current_price: 3140.23,
            change: '5.00%',
            day_change_percentage: '9.99%',
            day_high: 3150.45,
            day_low: 3150.96,
          },
          captured_on: '',
        },
        {
          order: '1',
          index_name: 'hongkong',
          index_symbol: '',
          country_name: '',
          real_time_data: {
            open: 3150.35,
            current_price: 3140.23,
            change: '5.00%',
            day_change_percentage: '9.99%',
            day_high: 3150.45,
            day_low: 3150.96,
          },
          captured_on: '',
        },
        {
          order: '1',
          index_name: 'india - nse',
          index_symbol: '',
          country_name: '',
          real_time_data: {
            open: 3150.35,
            current_price: 3140.23,
            change: '5.00%',
            day_change_percentage: '9.99%',
            day_high: 3150.45,
            day_low: 3150.96,
          },
          captured_on: '',
        },
      ],
    },
    {
      order: '',
      region_name: 'apac',
      indexes: [
        {
          order: '1',
          index_name: 'japan',
          index_symbol: '',
          country_name: '',
          real_time_data: {
            open: 3150.35,
            current_price: 3140.23,
            change: '5.00%',
            day_change_percentage: '9.99%',
            day_high: 1.45,
            day_low: 3150.96,
          },
          captured_on: '',
        },
        {
          order: '1',
          index_name: 'australia',
          index_symbol: '',
          country_name: '',
          real_time_data: {
            open: 3150.35,
            current_price: 3140.23,
            change: '5.00%',
            day_change_percentage: '9.99%',
            day_high: -3150.45,
            day_low: 3150.96,
          },
          captured_on: '',
        },
        {
          order: '1',
          index_name: 'new zealand',
          index_symbol: '',
          country_name: '',
          real_time_data: {
            open: 3150.35,
            current_price: 3140.23,
            change: '5.00%',
            day_change_percentage: '9.99%',
            day_high: 3150.45,
            day_low: 3150.96,
          },
          captured_on: '',
        },
        {
          order: '1',
          index_name: 'hongkong',
          index_symbol: '',
          country_name: '',
          real_time_data: {
            open: 3150.35,
            current_price: 3140.23,
            change: '5.00%',
            day_change_percentage: '9.99%',
            day_high: 3150.45,
            day_low: 3150.96,
          },
          captured_on: '',
        },
        {
          order: '1',
          index_name: 'india - nse',
          index_symbol: '',
          country_name: '',
          real_time_data: {
            open: 3150.35,
            current_price: 3140.23,
            change: '5.00%',
            day_change_percentage: '9.99%',
            day_high: 3150.45,
            day_low: 3150.96,
          },
          captured_on: '',
        },
      ],
    },
    {
      order: '',
      region_name: 'middle east',
      indexes: [
        {
          order: '1',
          index_name: 'japan',
          index_symbol: '',
          country_name: '',
          real_time_data: {
            open: 3150.35,
            current_price: 3140.23,
            change: '5.00%',
            day_change_percentage: '9.99%',
            day_high: 1.45,
            day_low: 3150.96,
          },
          captured_on: '',
        },
        {
          order: '1',
          index_name: 'australia',
          index_symbol: '',
          country_name: '',
          real_time_data: {
            open: 3150.35,
            current_price: 3140.23,
            change: '5.00%',
            day_change_percentage: '9.99%',
            day_high: -3150.45,
            day_low: 3150.96,
          },
          captured_on: '',
        },
        {
          order: '1',
          index_name: 'new zealand',
          index_symbol: '',
          country_name: '',
          real_time_data: {
            open: 3150.35,
            current_price: 3140.23,
            change: '5.00%',
            day_change_percentage: '9.99%',
            day_high: 3150.45,
            day_low: 3150.96,
          },
          captured_on: '',
        },
        {
          order: '1',
          index_name: 'hongkong',
          index_symbol: '',
          country_name: '',
          real_time_data: {
            open: 3150.35,
            current_price: 3140.23,
            change: '5.00%',
            day_change_percentage: '9.99%',
            day_high: 3150.45,
            day_low: 3150.96,
          },
          captured_on: '',
        },
        {
          order: '1',
          index_name: 'india - nse',
          index_symbol: '',
          country_name: '',
          real_time_data: {
            open: 3150.35,
            current_price: 3140.23,
            change: '5.00%',
            day_change_percentage: '9.99%',
            day_high: 3150.45,
            day_low: 3150.96,
          },
          captured_on: '',
        },
      ],
    },
  ],
}

export const DIVIDENDS_DISPLAY_VALUE = 'Dividends'
export const EARNINGS_DISPLAY_VALUE = 'Earnings'
export const SPLITS_DISPLAY_VALUE = 'Splits'

export const ROUTES = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/login/forgot-password',
  SIGNUP: '/signup',

  PRICING: '/pricing',
  LANDING_PAGE: '/',
  
  Individual_Investor: '/individual-investor',
  Portfolio_Management:'/portfolio-management',
  Publish_Work:'/publish-work',
  Collaboration:'/collaboration',
  FEATURE: '/feature',
  DATA_COVERAGE: '/data-coverage',
  // dashboard
  DASHBOARD: '/dashboard',
  STOCK: '/dashboard/stock',

  BAD_REQUEST: '/bad-request',
  ECONOMICS_DASHBOARD_COUNTRIES: '/dashboard/economics-dashboard/countries',
}
export const EMAIL_VALIDATION_REGEX =
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

export const LOCAL_STORAGE_TOKEN_KEY = 'token'
export const CHARTS_CACHE_KEY = 'charts_cache_key'

export const DEFAULT_DATE_PICKER_OPTIONS = {
  disabledKeyboardNavigation: true,
  popperProps: { strategy: 'fixed' },
  popperPlacement: 'bottom-start',
  peekNextMonth: true,
  showMonthDropdown: true,
  showYearDropdown: true,
  maxDate: new Date(),
  dropdownMode: 'select',
}

export const CHARTS_BOTTOM_BUTTONS_WRAPPER_ID =
  'bottom-section-charts-buttons-wrapper'
export const GET_CHART_TITLES_QUERY_ID = ['get-chart-titles']

export const DEFAULT_TOPIC_CODE = 'TOPIC_0'
