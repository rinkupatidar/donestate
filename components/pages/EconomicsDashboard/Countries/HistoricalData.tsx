import { UseQueryResult } from '@tanstack/react-query'
import LoadingSection from 'components/Loader/LoadingSection'
import Grid from 'components/Overview/Grid'
import Value from 'components/Overview/Value'

interface HistoricalDataProps {
  query: UseQueryResult<any, unknown>
}

const gridColumnsVal = '1fr 1fr'
const HistoricalData = ({ query }: HistoricalDataProps) => {
  if (query.isLoading) return <LoadingSection />
  const { data } = query

  if (!data) return <div className="p-6">No data found</div>

  const middleIdx = Math.ceil(data.length / 2)
  const fHalf = data.slice(0, middleIdx)
  const lHalf = data.slice(middleIdx, data.length)

  return (
    <div className="columns mt-3">
      <div className="column is-6">
        <div className="v_data_section">
          <Grid isInfo gridColumns={gridColumnsVal}>
            <Value className="has-text-left">Year</Value>
            <Value>Value</Value>
          </Grid>
          {fHalf?.map((i, idx) => (
            <Grid key={i[0]} gridColumns={gridColumnsVal}>
              <Value className="has-text-left">{`${i[0]}`}</Value>
              <Value>{i[2]}</Value>
            </Grid>
          ))}
        </div>
      </div>
      <div className="column is-6">
        <div className="v_data_section">
          <Grid isInfo gridColumns={gridColumnsVal}>
            <Value className="has-text-left">Year</Value>
            <Value>Value</Value>
          </Grid>
          {lHalf?.map((i, idx) => (
            <Grid key={i[0]} gridColumns={gridColumnsVal}>
              <Value className="has-text-left">{`${i[0]}`}</Value>
              <Value>{i[2]}</Value>
            </Grid>
          ))}
        </div>
      </div>
    </div>
  )
}
export default HistoricalData
