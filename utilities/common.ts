export const addQueryParamsToUrl = (params: any) => {
	const urlObject = new URL(location.href)
	Object.keys(params).forEach((key) => urlObject.searchParams.append(key, params[key]))
	return urlObject.toString()
}
