import ContactPage from "@/components/contact/ContactPage";
import Head from "next/head";
import Layout from "@/components/layout/Layout";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <Layout>
        <ContactPage />
      </Layout>
    </>
  );
}
