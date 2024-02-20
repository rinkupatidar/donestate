import { useInfiniteQuery } from '@tanstack/react-query'
import LoadingSection from 'components/Loader/LoadingSection'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import { getEconomicsNews } from 'service/DashboardService/DashboardServices'
import { getEconomicNewsResponseInterface } from 'service/DashboardService/DashboardServicesInterface'
import styles from './index.module.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  AXIOS_INSTANCE,
  DEFAULT_DATE_PICKER_OPTIONS,
  IS_CLIENT
} from '../../../../constants'

interface NewsProps {
  handleInsideData: any
  newItem:[]
}

const getAllHistoricalStockDataGroupWise = async (pageparams: number, dataObject: Object) => {

if(dataObject.length > 0){
  const token = localStorage.getItem('token');
  const headers = {
    X_AUTH_TOKEN: token,
    'Content-Type': 'application/json',
  };
  try {
 
    const response = await AXIOS_INSTANCE.get(
      `getCompanyStockNews?symbol=${dataObject}&page_no=${pageparams}`,
      { headers }
    )
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
  }
}else {
  return  
}
 
};
 

const useEconomicsNewsQuery = (object: string[]) => {
  const { data, fetchNextPage, isFetching } = useInfiniteQuery(
    ['economics-news'],
    ({ pageParam = 1 }) =>
      getAllHistoricalStockDataGroupWise(pageParam, object),
    {
      enabled: object && object.length > 0,
      getNextPageParam: (_, pages) => {
        return pages.length + 1
      },
    }
  )

  const getProcessedNews = () => {
    const processedNews: getEconomicNewsResponseInterface[] = []
    data?.pages?.forEach((i) => {
      i?.forEach((j: any) => {
        processedNews.push(j)
      })
    })
    return processedNews
  }

  return { data, fetchNextPage, isFetching, getProcessedNews }
}

const News: React.FC<NewsProps> = ({ handleInsideData ,newItemdata }) => {
  const [currentNewItem, setCurrentNewItem] = useState(newItemdata);
  console.log(currentNewItem,'currentNewItem');

  
  
  const [object, setobject] = useState<string[]>([])
  const { data, fetchNextPage, isFetching, getProcessedNews } =
    useEconomicsNewsQuery(object)
    useEffect(() => {
      setCurrentNewItem([]); 
    }, []);

  useEffect(() => {
    const fetchData = async () => {
      // console.log("check code ");
      let dataObject: string[] = []
     
      if (handleInsideData) {
        for (let index = 0; index < handleInsideData?.length; index++) {
          var element = handleInsideData[index].equity_symbol
          dataObject.push(element)
        }
      }
      if (dataObject.length > 0) {
        setobject(dataObject)
      }
    }
    if(handleInsideData.length>0 ){

      fetchData()
      
    }
  }, [handleInsideData,newItemdata])

  const news = getProcessedNews()

  return (
    <div>
      <div className={styles.recent_news}>
        <p className="section-title">Key Update</p>
        <div className={styles.news_item_wrapper}>
          {news.length > 0 ? (
            news.map((i: any) => <NewsItem key={i.order} {...i} />)
          ) : (
            <div className=" has-text-grey is-size-7 has-text-centered ">
              No Data Found{' '}
            </div>
          )}
          <motion.div
            onViewportEnter={() => {
              fetchNextPage()
            }}
          >
            {isFetching && <LoadingSection disableSection className="mt-3" />}
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
      className={styles.news_item}
    >
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
            className={styles.news_title}
          >
            {title}
          </motion.p>
          <p className="is-size-7 has-text-grey mt-2">
            {/* {dayjs(published_date).fromNow()} on {source} */}7 hours ago on
            Bloomberg Markets and Finance
          </p>
        </div>
      </div>

      <motion.div
        variants={{ hover: { height: 'auto' } }}
        className={styles.news_description}
      >
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
