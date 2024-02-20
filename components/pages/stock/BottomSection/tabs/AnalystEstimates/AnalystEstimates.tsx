import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import styles from "./index.module.scss";
import AnalystPriceEstimates from "./Sections/AnalystPriceEstimates";
import EarningSurprise from "./Sections/EarningSurprise";
import PriceTargetEstimates from "./Sections/PriceTargetEstimates";
import Snapshot from "./Sections/Snapshot";
import UpgradesAndDowngrades from "./Sections/UpgradesAndDowngrades";

interface AnalystEstimatesProps {
	symbol: string;
}

dayjs.extend(relativeTime as any);
const AnalystEstimates = ({ symbol }: AnalystEstimatesProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<Snapshot symbol={symbol} />
				<PriceTargetEstimates symbol={symbol} />
			</div>
			<div className={styles.right}>
				<AnalystPriceEstimates symbol={symbol} />
				<EarningSurprise symbol={symbol} />
				<UpgradesAndDowngrades symbol={symbol} />
			</div>
		</div>
	);
};
export default AnalystEstimates;
