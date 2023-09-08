import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import SearchButton from "../search/SearchButton";
import SearchModal from "../search/SearchModal";

const menu = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Archive",
    href: "/archive",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearchMenu, setOpenSearchMenu] = useState(true);
  const { data: session } = useSession();
  return (
    <nav className=" border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="font-Italianno self-center text-5xl font-semibold whitespace-nowrap dark:text-white">
            Insight
          </span>
        </Link>
        <div className="flex md:order-2">
          <button
            onClick={(e) => {
              setOpenMenu(!openMenu);
            }}
            type="button"
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>

          <div
            onClick={(e) => {
              setOpenSearchMenu(true);
            }}
            className="relative hidden md:block"
          >
            <SearchButton />
          </div>
          <button
            onClick={(e) => {
              setOpenMenu(!openMenu);
            }}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            openMenu ? "" : "hidden"
          }`}
          id="navbar-search"
        >
          <div
            onClick={(e) => {
              setOpenSearchMenu(true);
            }}
            className="relative mt-3 md:hidden"
          >
            <SearchButton />
          </div>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:border-gray-700">
            {menu.map((item, key) => (
              <li key={key}>
                <Link
                  href={item.href}
                  className="hover:text-blue-500 block py-2 pl-3 pr-4 font-medium rounded md:bg-transparent  md:p-0 text-gray-600  dark:text-gray-400 dark:hover:text-blue-500 "
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {session ? (
              <>
                <li>
                  <Link
                    href={`/author/${session.user._id}`}
                    className="hover:text-blue-500 block py-2 pl-3 pr-4 font-medium rounded md:bg-transparent  md:p-0 text-gray-600  dark:text-gray-400 dark:hover:text-blue-500 "
                  >
                    Profile
                  </Link>
                </li>
                <li
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  <div className="hover:text-blue-500 block py-2 pl-3 pr-4 font-medium rounded md:bg-transparent  md:p-0 text-gray-600  dark:text-gray-400 dark:hover:text-blue-500 ">
                    Logout
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href={"/register"}
                    className="hover:text-blue-500 block py-2 pl-3 pr-4 font-medium rounded md:bg-transparent  md:p-0 text-gray-600  dark:text-gray-400 dark:hover:text-blue-500 "
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <SearchModal
        openSearchMenu={openSearchMenu}
        setOpenSearchMenu={setOpenSearchMenu}
      />
    </nav>
  );
};

export default Navbar;
