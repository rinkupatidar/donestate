import styles from "./index.module.scss"
import Breakdown from "./sections/Breakdown"
import HoldingAnalysis from "./sections/HoldingAnalysis"
import InstitutionalOwnerShipSection from "./sections/InstitutionalOwnershipSection"
import MutualFundHoldings from "./sections/MutualFund"

interface InstitutionalOwnershipProps {
	symbol: string
}
const InstitutionalOwnership = ({ symbol }: InstitutionalOwnershipProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<InstitutionalOwnerShipSection symbol={symbol} />
				<Breakdown symbol={symbol} />
			</div>
			<div className={styles.right}>
				<HoldingAnalysis symbol={symbol} />
				<MutualFundHoldings symbol={symbol} />
			</div>
		</div>
	)
}
export default InstitutionalOwnership
