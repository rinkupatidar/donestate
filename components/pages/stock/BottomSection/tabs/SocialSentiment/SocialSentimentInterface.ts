export interface SocialSentimentInterface {
	date: string;
	hourly_info_list: {
		stocktwits_posts: number;
		stocktwits_comments: number;
		stocktwits_likes: number;
		stocktwits_sentiments: number;
		twitter_posts: number;
		twitter_comments: number;
		twitter_likes: number;
		twitter_sentiments: number;
		stocktwits_impressions: number;
		twitter_impressions: number;
		date: string;
		time: string;
	}[];
	summary_info: {
		stocktwits_posts: number;
		stocktwits_comments: number;
		stocktwits_likes: number;
		stocktwits_sentiments: number;
		twitter_posts: number;
		twitter_comments: number;
		twitter_likes: number;
		twitter_sentiments: number;
		stocktwits_impressions: number;
		twitter_impressions: number;
	};
}
