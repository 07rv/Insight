import Layout from "@/components/layout/Layout";
import Register from "@/components/register/Register";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Layout>
        <Register />
      </Layout>
    </>
  );
}
