import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import ContactPage from "@/components/contact/ContactPage";
import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <Navbar />
      <ContactPage />
      <Footer />
    </>
  );
}
