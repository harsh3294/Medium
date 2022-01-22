import Head from 'next/head'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Medium</title>
        <link rel="icon" href="/assets/Images/MediumLinkIcon.png" />
      </Head>

     <Header />
    </div>
  )
}
