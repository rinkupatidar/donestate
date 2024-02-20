import { Variants } from "framer-motion";

export const OPACITY_VARIANTS: Variants = {
	initial: { opacity: 0 },
	animate: { opacity: 1, transition: { duration: 0.3 } },
	exit: { opacity: 0 },
};
