import React from "react";

interface ButtonProps {
	loading?: boolean;
	className?: React.ReactNode;
	children: React.ReactNode;
	textWeight?: "bold" | "semibold" | "medium";
	size?: "normal" | "small" | "medium" | "large";
	[x: string]: any;
}

const Button = (props: JSX.IntrinsicElements["button"] & ButtonProps) => {
	const { loading, children, className, textWeight, size, type = "button", ...leftOverProps } = props;
	return (
		<button {...leftOverProps} type={type} className={`button ${textWeight ? `has-text-weight-${textWeight}` : ""} ${loading ? "is-loading" : ""} ${size ? `is-${size}` : ""} ${className ?? ""}`}>
			{children}
		</button>
	);
};
export default Button;
