import Posts from "@/components/post/Posts";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <Posts />
    </>
  );
}
