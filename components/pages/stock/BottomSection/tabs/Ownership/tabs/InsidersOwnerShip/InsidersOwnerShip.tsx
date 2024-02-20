import styles from "./index.module.scss"
import InsidersOwnerShipTab from "./sections/InsidersOwnerShipTab"
import LastSixMonthsTransactions from "./sections/LastSixMonthsTransactions"

interface InsidersOwnerShipProps {
	symbol: string
}
const InsidersOwnership = ({ symbol }: InsidersOwnerShipProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<LastSixMonthsTransactions symbol={symbol} />
			</div>
			<div className={styles.right}>
				<InsidersOwnerShipTab symbol={symbol} />
			</div>
		</div>
	)
}
export default InsidersOwnership
