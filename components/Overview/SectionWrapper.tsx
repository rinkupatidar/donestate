import styles from "./index.module.scss";
interface SectionWrapperProps {
	children: React.ReactNode;
}

const SectionWrapper = ({ children }: SectionWrapperProps) => {
	return <div className={styles.section_wrapper}>{children}</div>;
};
export default SectionWrapper;
