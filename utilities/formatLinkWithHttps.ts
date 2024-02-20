export const formatLinkWithHttps = (url: string | undefined) => {
	if (!url) return url;
	if (!/^https?:\/\//i.test(url)) {
		url = "http://" + url;
	}
	return url;
};
