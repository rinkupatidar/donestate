import { useState } from 'react'
import OverviewSection from '../../components/Overview/OverviewSection'
import { WebsocketResponseType } from '../../components/pages/Dashboard/types'
import WorldCommoditiesSection from '../../components/pages/Dashboard/WorldCommoditiesSection'
import WorldCurrenciesSection from '../../components/pages/Dashboard/WorldCurrenciesSection'
import WorldEquityMarketsSection from '../../components/pages/Dashboard/WorldEquityMarketsSection'
import { OVERVIEW_DATA } from '../../constants'
import useWebsocket from '../../hooks/useWebSocket'

interface indexProps {}
const tabsData = [
  {
    label: 'Equities',
    component: WorldEquityMarketsSection,
    wsKey: 'indexes',
  },
  {
    label: 'Commodities',
    component: WorldCommoditiesSection,
    wsKey: 'commodities',
  },
  {
    label: 'Rates',
    component: () => <OverviewSection data={OVERVIEW_DATA} />,
  },
  {
    label: 'FX',
    component: WorldCurrenciesSection,
    wsKey: 'currencies',
  },
]

const Index = ({}: indexProps) => {
  const [wsResponse] = useWebsocket<WebsocketResponseType>(
    '/userDashboard/getMarketTopRealTimeData'
  )
  const [tab, setTab] = useState(tabsData[0].label)

  const tabData = tabsData.find((i) => i.label === tab)
  const _tabComponent = tabData?.component
  return (
    <div style={{ backgroundColor: 'black', height: '100vh',overflow: "auto" }}>
      <div className="px-3 v-center" style={{ gap: '16px' }}>
        {tabsData.map((i) => (
          <p
            onClick={() => setTab(i.label)}
            className={`my-2 has-tw-medium is-size-7 is-clickable has-text-${
              i.label === tab ? 'info' : 'white'
            }`}
            key={i.label}>
            {i.label}
          </p>
        ))}
      </div>

      <div className="columns px-3">
        <div className="column is-12">
          <div className={'columns'}>
            <div className="column is-6">
              {_tabComponent && (
                <_tabComponent
                  wsData={
                    wsResponse?.[tabData?.wsKey as keyof WebsocketResponseType]
                  }
                />
              )}
            </div>
            <div className="column is-6"></div>
          </div>
        </div>
        {/* <div className="column is-2">
				<RightPanelAds />
			</div> */}
      </div>
    </div>
  )
}
export default Index
