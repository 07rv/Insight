import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Register = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8">
        <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
          <ul className="-mb-px flex flex-wrap">
            <li className="mr-2">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                href="#"
                className={`inline-block rounded-t-lg border-b-2 
              ${
                openTab == 1
                  ? "text-blue-600dark:border-blue-500 border-blue-600 p-4 dark:text-blue-500"
                  : "border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
              >
                Profile
              </a>
            </li>
            <li className="mr-2">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                href="#"
                className={`inline-block rounded-t-lg border-b-2 
              ${
                openTab == 2
                  ? "text-blue-600dark:border-blue-500 border-blue-600 p-4 dark:text-blue-500"
                  : "border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
                aria-current="page"
              >
                Dashboard
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white ">
            <div className="flex-auto px-4 py-5">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <SignIn />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <SignUp />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
