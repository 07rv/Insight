import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const Layout = ({ children, session }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
