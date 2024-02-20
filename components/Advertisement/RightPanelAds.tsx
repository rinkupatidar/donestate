import styles from "./index.module.scss";
interface RightPanelAdsProps {}

const RightPanelAds = ({}: RightPanelAdsProps) => {
	return (
		<div className={styles.advertisement}>
			<p>Advertisement</p>
		</div>
	);
};
export default RightPanelAds;
