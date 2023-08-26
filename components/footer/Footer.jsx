import Container from "../blog/Container";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import ThemeSwitch from "@/utlities/ThemeSwitch";

const Footer = () => {
  const menu = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
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
  const { data: session } = useSession();
  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="mt-1 flex justify-center gap-1 text-center text-sm text-gray-500 dark:text-gray-600">
        <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link href="/" className="w-28 dark:hidden">
              <span className="block text-center font-Italianno text-5xl font-semibold">
                Stablo
              </span>
            </Link>
            <Link href="/" className="hidden w-28 dark:block">
              <span className="block text-center font-Italianno text-5xl font-semibold">
                Stablo
              </span>
            </Link>
            <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mb-0">
              {menu.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="mr-4 text-lg  hover:text-blue-500 md:mr-6 "
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              {session ? (
                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                    className="cursor-pointer mr-4 text-lg  hover:text-blue-500 md:mr-6 "
                  >
                    Logout
                  </a>
                </li>
              ) : (
                <li>
                  <a
                    href={"/register"}
                    className="mr-4 text-lg  hover:text-blue-500 md:mr-6 "
                  >
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className=" mt-1 flex items-center justify-between ">
            <div className="mt-1"></div>
            <ThemeSwitch />
          </div>
          <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        </div>
      </div>
    </Container>
  );
};

export default Footer;
