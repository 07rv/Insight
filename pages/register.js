import Register from "@/components/register/Register";
import Head from "next/head";
import { getSession } from "next-auth/react";
export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <Register />
    </>
  );
}

export async function getServerSideProps({ req }) {
  try {
    const session = await getSession({ req });
    if (session) {
      return {
        redirect: {
          destination: "/",
          permament: false,
        },
      };
    }
    return {
      props: { session },
    };
  } catch (error) {
    return { notFound: true };
  }
}
