import { GetStaticProps } from "next";
import React, { useState } from "react";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import Head from "next/head";
import { Post } from "../../typing";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from "react-hook-form";
interface Props {
  post: Post;
}
interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}
function Post({ post }: Props) {
  console.log(post);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setSubmitted(true);
      })
      .catch((err) => console.log(err));
  };
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
      <hr className="max-w-3xl my-5 mx-auto border border-yellow-500" />
      {submitted ? (
        <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold">
            Thank you for submitting your comment!
          </h3>
          <p>Once it has been approved, it will appear below!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
        >
          <h3 className="text-sm text-yellow-500">Enjoyed this article!</h3>
          <h4 className="text-3xl font-bold">Leave a comment below!</h4>
          <hr className="py-3 mt-2" />
          <input
            type="hidden"
            {...register("_id")}
            name="_id"
            value={post._id}
          />
          <label className="block mb-5">
            <span className="text-gray-700">Name</span>
            <input
              {...register("name", { required: true })}
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring outline-none "
              type="text"
              placeholder="Enter your Name"
            />
            <div className="flex flex-col p-5 py-2">
              {errors.name && (
                <span className="text-red-500">Name is required</span>
              )}
            </div>
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Email</span>
            <input
              {...register("email", { required: true })}
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring outline-none "
              type="email"
              placeholder="your@example.com"
            />
            <div className="flex flex-col p-5 py-2">
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Comment</span>
            <textarea
              {...register("comment", { required: true })}
              className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 focus:ring outline-none "
              placeholder="Comment..."
              rows={8}
            />
            <div className="flex flex-col p-5 py-2">
              {errors.comment && (
                <span className="text-red-500">Comment is required</span>
              )}
            </div>
          </label>

          <input
            type="submit"
            className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
          />
        </form>
      )}

      <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2">
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2" />

        {post.comments.map((comment) => (
          <div key={comment._id}>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xl text-yellow-500">
                {comment.name}
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(comment._createdAt).toLocaleString()}
              </p>
            </div>
            <p className="pl-5 text-gray-800">{comment.comment}</p>
            <hr />
          </div>
        ))}
      </div>
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
