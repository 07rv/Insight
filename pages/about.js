import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import AboutPage from "@/components/about/AboutPage";
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Navbar />
      <AboutPage />
      <Footer />
    </>
  );
}
