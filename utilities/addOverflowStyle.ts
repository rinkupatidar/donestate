export const addOverflowStyle = (width: string = "100%"): React.CSSProperties => ({
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	display: "block",
	float: "left",
	width,
})
