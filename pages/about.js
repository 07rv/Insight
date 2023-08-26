import AboutPage from "@/components/about/AboutPage";
import Head from "next/head";
import Layout from "@/components/layout/Layout";

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Layout>
        <AboutPage />
      </Layout>
    </>
  );
}
