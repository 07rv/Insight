import { getSession } from "next-auth/react";
import CreatePost from "@/components/post/CreatePost";
import Head from "next/head";
import UpdatePostPage from "@/components/post/UpdatePostPage";

export default function UpdatePost({ options }) {
  return (
    <>
      <Head>
        <title>Edit</title>
      </Head>
      <UpdatePostPage options={options} />
    </>
  );
}

export async function getServerSideProps({ req }) {
  try {
    const session = await getSession({ req });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categorylist`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    const data = await response.json();
    const options = data.categories;
    if (!session) {
      return {
        redirect: {
          destination: "/",
          permament: false,
        },
      };
    }
    return {
      props: { options },
    };
  } catch (error) {
    return { notFound: true };
  }
}
