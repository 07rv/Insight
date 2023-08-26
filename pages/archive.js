import Archivepage from "@/components/archive/Archivepage";
import Head from "next/head";
import Layout from "@/components/layout/Layout";

export default function Archive() {
  return (
    <>
      <Head>
        <title>Archive</title>
      </Head>
      <Layout>
        <Archivepage />
      </Layout>
    </>
  );
}
