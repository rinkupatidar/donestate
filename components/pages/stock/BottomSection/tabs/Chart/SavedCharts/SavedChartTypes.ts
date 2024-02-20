import { ControlInterface } from '../ChartsWrapper'
import { DisplayInterface } from '../chartTypes'

export interface SavedChartConfigInterface {
  controls: ControlInterface[]
  display: DisplayInterface
  frequency: IntervalTypes
  range: number
  toDate: string
  fromDate: string
}
