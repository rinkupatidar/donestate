interface IconProps {
	src?: string;
}

const Icon = ({
	src,
	className,
	children,
	...leftOverProps
}: IconProps & JSX.IntrinsicElements["span"]) => {
	return (
		<span {...leftOverProps} className={`icon ${className}`}>
			{children ?? <img src={`/icons/${src}`} alt={src} />}
		</span>
	);
};
export default Icon;
