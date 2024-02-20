import styles from "./index.module.scss";

import React from "react";

interface SubSectionWrapperProps {
	children: React.ReactNode;
}

const SubSectionWrapper = ({ children }: SubSectionWrapperProps) => {
	return <div className={styles.sub_section_wrapper}>{children}</div>;
};
export default SubSectionWrapper;
