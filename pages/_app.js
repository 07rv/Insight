"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import "react-quill/dist/quill.snow.css";
import Layout from "@/components/layout/Layout";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}
