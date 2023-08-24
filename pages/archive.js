import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Archivepage from "@/components/archive/Archivepage";
import Head from "next/head";

export default function Archive() {
  return (
    <>
      <Head>
        <title>Archive</title>
      </Head>
      <Navbar />
      <Archivepage />
      <Footer />
    </>
  );
}
