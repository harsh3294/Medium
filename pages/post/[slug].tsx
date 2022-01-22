import { GetStaticProps } from "next";
import React from "react";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import Head from "next/head";
import { Post } from "../../typing";
import PortableText from "react-portable-text";
interface Props {
  post: Post;
}
function Post({ post }: Props) {
  return (
    <main>
      <Head>
        <title>Medium</title>
        <link rel="icon" href="/assets/Images/MediumLinkIcon.png" />
      </Head>
      <Header />

      <img
        src={urlFor(post.mainImage).url()!}
        className="w-full h-80 object-fill"
        alt=""
      />

      <article className="max-w-5xl mx-auto p-5">
        <h1 className="text-4xl mt-10 mb-3 font-bold">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">
          {post.description}
        </h2>
        <div className="flex items-center space-x-3">
          <img
            src={urlFor(post.author.image).url()!}
            className="rounded-full h-10 w-10"
            alt=""
          />
          <p className="font-extralight text-sm">
            {" "}
            Blog post by{" "}
            <span className="text-green-500 cursor-pointer">
              {post.author.name}{" "}
            </span>{" "}
            - published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div>
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            className="mt-10"
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold my-5" {...props} />
              ),
              image: ({ asset }: any) => (
                <div className="flex items-center justify-center text-center">
                  <img
                    className="flex items-center text-center mt-5 mb-2 border border-black"
                    src={urlFor(asset._ref).url()!}
                    alt=""
                  />
                </div>
              ),
              h2: (props: any) => (
                <h2 className="text-xl font-bold my-5" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="special-list-item">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-black-500 underline ">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
    </main>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type=="post"]{
        _id,
        slug{
            current
        }
    }`;
  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type=="post" && slug.current==$slug][0]{
            _id,
            _createdAt,
            title,
            slug,
            author->{
                name,
                image
            },
            'comments':*[_type=="comment" && post._ref==^._id && approved==true],
            description,
            mainImage,
            slug,
            body,
        }`;
  const post = await sanityClient.fetch(query, { slug: params?.slug });
  if (!post) {
    return { notFound: true };
  }
  return { props: { post }, revalidate: 60 };
};
