import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import ShareButton from "../share/ShareButton";
import Search from "../search/Search";

const Layout = ({ children }) => {
  return (
    <>
      <Search />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ShareButton />
    </>
  );
};

export default Layout;
