export const checkIfImgIsBlack = (img: HTMLImageElement) => {
	debugger
	const canvas = document.createElement("canvas")
	canvas.width = img.width
	canvas.height = img.height
	const ctx = canvas.getContext("2d")
	ctx.drawImage(img, 0, 0)
	const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
	const isBlack = data.every((pixel) => pixel === 0)
}
