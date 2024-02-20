import Head from 'next/head'
import { useRouter } from 'next/router'

interface testProps {}

const Test = ({}: testProps) => {
  const router = useRouter()
  const title = router.query.title as string
  return (
    <Head>
      <meta
        property="og:url"
        content="https://donestat.co"
      />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content="How much does culture influence creative thinking?"
      />
      <meta
        property="og:image"
        content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg"
      />
    </Head>
  )
}
export default Test
