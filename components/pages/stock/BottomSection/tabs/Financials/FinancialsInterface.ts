export interface FinancialsResponseInterface {
  position: number
  statement_date: string
  statement_type: string
  report_type: string
  financial_data: {
    position: number
    display_name: string
    amount: number
    total: boolean
    display_type: 'NUMERIC' | 'PERCENTAGE'
  }[]
}
