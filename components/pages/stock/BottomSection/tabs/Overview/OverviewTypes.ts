export interface SocialSentimentsResponseTypes {
	stocktwits_comments: number;
	stocktwits_likes: number;
	stocktwits_posts: number;
	stocktwits_sentiments: number;
	twitter_comments: number;
	twitter_likes: number;
	twitter_posts: number;
	twitter_sentiments: number;
}
export interface CompanyStockNewsResponseType {
	description: string;
	image: string;
	source: string;
	title: string;
	url: string;
	order: number;
	published_date: number;
}
