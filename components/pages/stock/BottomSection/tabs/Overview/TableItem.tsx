import addComma from "../../../../../../utilities/addComma";
import { isNumber } from "../../../../../../utilities/isNumber";
import styles from "./index.module.scss";

interface ValueProps {
	val: { [key: string]: string };
}

const TableItem = ({ val }: ValueProps) => {
	return (
		<>
			<div className={styles.key_metrics_item}>
				{Object.keys(val).map((key) => (
					<div key={key}>
						<div className={styles.head}>{key}</div>
						<div className={styles.content}>{isNumber(val[key]) ? addComma(parseInt(val[key])) : val[key]}</div>
					</div>
				))}
			</div>
		</>
	);
};
export default TableItem;
