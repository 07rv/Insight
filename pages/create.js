import { getSession } from "next-auth/react";
import CreatePost from "@/components/post/CreatePost";
import Head from "next/head";

export default function Create() {
  return (
    <>
      <Head>
        <title>Create</title>
      </Head>
      <CreatePost />
    </>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permament: false,
      },
    };
  }
  return {
    props: { session },
  };
}
