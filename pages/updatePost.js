import { getSession } from "next-auth/react";
import CreatePost from "@/components/post/CreatePost";
import Head from "next/head";

export default function UpdatePost({ options }) {
  return (
    <>
      <Head>
        <title>Create</title>
      </Head>
      <CreatePost options={options} />
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
