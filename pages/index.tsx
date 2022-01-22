import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium</title>
        <link rel="icon" href="/assets/Images/MediumLinkIcon.png" />
      </Head>

      <Header />
      <Banner />
    </div>
  );
}
