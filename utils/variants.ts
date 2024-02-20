import { Variants } from "framer-motion";

export const TOP_TO_BOTTOM_MENU_VARIANT: Variants = {
	initial: { opacity: 0, rotateX: -20, transformOrigin: "top" },
	animate: { opacity: 1, rotateX: 0 },
	exit: { opacity: 0, rotateX: -20 },
};

export const OPACITY_VARIANT: Variants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};

export const OPACITY_DELAY_VARIANT: Variants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0, transition: { delay: 0.2 } },
};
