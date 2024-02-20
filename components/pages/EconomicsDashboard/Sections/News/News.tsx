import { useInfiniteQuery } from '@tanstack/react-query'
import LoadingSection from 'components/Loader/LoadingSection'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import { getEconomicsNews } from 'service/DashboardService/DashboardServices'
import { getEconomicNewsResponseInterface } from 'service/DashboardService/DashboardServicesInterface'
import styles from './index.module.scss'
interface NewsProps {}

const News = ({}: NewsProps) => {
  // const query = useQuery(['news', page], () => getEconomicsNews(page))

  const { data, fetchNextPage, isFetching } = useInfiniteQuery(
    ['economics-news'],
    ({ pageParam = 1 }) => getEconomicsNews(pageParam),
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1
      },
    }
  )
  const news: getEconomicNewsResponseInterface[] = []
  data?.pages?.forEach((i) => {
    i?.forEach((j) => {
      news.push(j)
    })
  })

  return (
    <div>
      <div className={styles.recent_news}>
        <p className="section-title">Recent News</p>
        <div className={styles.news_item_wrapper}>
          {news?.map((i) => (
            <NewsItem key={i.order} {...i} />
          ))}
          <motion.div
            onViewportEnter={() => {
              fetchNextPage()
            }}>
            <LoadingSection disableSection className="mt-3" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
export default News

export const NewsItem = ({
  description,
  image,
  source,
  title,
  url,
  published_date,
}: getEconomicNewsResponseInterface) => {
  return (
    <motion.a
      onClick={() => window.open(url, title, 'width=600,height=600')}
      target="popup"
      initial="initial"
      whileHover="hover"
      className={styles.news_item}>
      <div className={styles.news_header}>
        <div className={styles.img_wrapper}>
          <motion.img
            variants={{ hover: { scale: 1.2 } }}
            src={image}
            alt={title}
          />
        </div>
        <div className={styles.news_right}>
          <motion.p
            variants={{ hover: { height: 'auto' } }}
            className={styles.news_title}>
            {title}
          </motion.p>
          <p className="is-size-7 has-text-grey mt-2">
            {/* {dayjs(published_date).fromNow()} on {source} */}
            7 hours ago on Bloomberg Markets and Finance
          </p>
        </div>
      </div>

      <motion.div
        variants={{ hover: { height: 'auto' } }}
        className={styles.news_description}>
        <div className="p-3">
          <p className="has-text-grey">{description}</p>
          <span className="has-text-grey is-size-7 is-underlined">
            read more
          </span>
        </div>
      </motion.div>
    </motion.a>
  )
}
