import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useSession } from "next-auth/react";

const Layout = ({ children }) => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <p>Welcome, {session.user.email}!</p>
      ) : (
        <p>Please sign in to access your account.</p>
      )}
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
