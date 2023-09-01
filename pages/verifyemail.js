import VerifyEmail from "@/components/email/VerifyEmail";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>VerifyEmail</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <VerifyEmail />
    </>
  );
}
