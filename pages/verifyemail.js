import Head from "next/head";
import { useRouter } from "next/router";
import NotFound from "./404";
import VerifyEmail from "@/components/email/VerifyEmail";

export default function Verify() {
  const router = useRouter();
  const { token } = router.query;
  if (!token) return <NotFound />;
  return (
    <>
      <Head>
        <title>Forget Password</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <VerifyEmail />
    </>
  );
}
