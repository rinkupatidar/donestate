import styles from "./index.module.scss";
import { authContext } from '../../context/authContext'
import { useContext, useEffect, useState } from 'react'

interface HamburgerProps {
	isOpen: boolean;
}

const Hamburger = ({ isOpen }: HamburgerProps) => {
	const { isLoggedIn } = useContext(authContext)
	return (
		<div role="button" className={`${styles.hamburger} ${isOpen ? styles.checked : ""}`}>
			   {!isLoggedIn ? (
				<>
			<span className={styles.line_1}></span>
			<span className={styles.line_2}></span>
			<span className={styles.line_3}></span>
			</>
			   ):
			   <>
			   <p className={styles.line_1}></p>
			<p className={styles.line_2}></p>
			<p className={styles.line_3}></p> 
			</>}
		</div>
	);
};
export default Hamburger;
