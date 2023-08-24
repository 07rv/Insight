import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Register from "@/components/register/Register";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Navbar />
      <Register />
      <Footer />
    </>
  );
}
