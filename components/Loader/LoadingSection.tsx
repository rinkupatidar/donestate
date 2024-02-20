import styles from "./index.module.scss";
import PrimaryLoader from "./PrimaryLoader";
interface props {
	disableSection?: boolean;
	className?: string;
}
export default function LoadingSection({ disableSection, className }: props) {
	return (
		<div className={`${disableSection ? undefined : "section"} ${styles.loading_section} ${className}`}>
			<PrimaryLoader />
		</div>
	);
}
