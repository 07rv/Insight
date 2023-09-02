import VerifyEmail from "@/components/email/VerifyEmail";
import Head from "next/head";
import { useRouter } from "next/router";
import NotFound from "./404";
export default function Home() {
  const router = useRouter();
  const { token } = router.query;
  if (!token) return <NotFound />;
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
