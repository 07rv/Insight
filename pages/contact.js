import ContactPage from "@/components/contact/ContactPage";
import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <ContactPage />
    </>
  );
}
