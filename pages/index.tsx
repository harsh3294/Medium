import Head from "next/head";
import Link from "next/link";
import Banner from "../components/Banner";
import Header from "../components/Header";
import PostPreview from "../components/PostPreview";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typing";
interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium</title>
        <link rel="icon" href="/assets/Images/MediumLinkIcon.png" />
      </Head>

      <Header />
      <Banner />
      <PostPreview posts={posts} />
    </div>
  );
}
export const getServerSideProps = async () => {
  const query = `*[_type=="post"]{
  _id,title,slug,author->{
  name,image
},description,mainImage,slug,body
}`;

  const posts = await sanityClient.fetch(query);
  return { props: { posts } };
};
