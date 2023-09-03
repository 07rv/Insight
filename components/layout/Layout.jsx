import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import ShareButton from "../share/ShareButton";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ShareButton />
    </>
  );
};

export default Layout;
