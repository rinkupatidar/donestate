import styles from "./index.module.scss"
import SenateTradingTab from "./sections/SenateTradingTab"

interface InsidersOwnerShipProps {
	symbol: string
}
const SenateTrading = ({ symbol }: InsidersOwnerShipProps) => {
	return (
		<div className={styles.container}>
			<SenateTradingTab symbol={symbol} />
		</div>
	)
}
export default SenateTrading
