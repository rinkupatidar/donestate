import CloseIcon from "@/icons/cross.svg"
import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import React from "react"
import { createPortal } from "react-dom"
import useKeyPress from "../../hooks/useKey"
import Icon from "../Icon/Icon"
import styles from "./index.module.scss"

interface ModalProps {
	children: React.ReactNode
	// close: React.MouseEventHandler
	isSmall?: boolean
	disableCross?: boolean
	width?: string
	isWhiteCross?: boolean
	disableOverflowHidden?: boolean
}
const Modalclose = ({ children, close, isSmall = false, disableCross = false, width = "", disableOverflowHidden = false }: ModalProps) => {
	useKeyPress("Escape", close)

	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
	  setIsClient(true);
	}, []);
  
	if (!isClient) {
	  return null; // Render nothing on the server-side
	}
	return createPortal(
		<div className={`${styles.modal} ${styles["is-active"]}`}>
			<motion.div className={styles["modal-background"]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} />
			<motion.div
				initial={{ opacity: 0, y: "300px", scale: 0 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				exit={{
					opacity: 0,
					scale: 0,
					y: "300px",
					transition: { duration: 0.2 },
				}}
				className={styles["modal-content"]}
				style={{boxShadow:'0 2px 5px -3px #1e374d', width: width ? width : "", overflow: disableOverflowHidden ? "visible" : undefined }}>
				
				<div className={styles.wrapper} style={{ overflow: disableOverflowHidden ? "visible" : undefined }}>
					{children}
				</div>
			</motion.div>
		</div>,
		document.body
	)
}
export default Modalclose
