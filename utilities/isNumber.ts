// @ts-ignore: isNan accepts a str, same with parseFloat
export const isNumber = (str: number | string | undefined) => !isNaN(str) && !isNaN(parseFloat(str));
