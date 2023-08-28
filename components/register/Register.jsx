import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Register = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="mx-auto flex flex-col items-center justify-center px-6">
        <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
          <ul className="-mb-px flex flex-wrap">
            <li className="ml-2 mr-2">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                href="#"
                className={`inline-block rounded-t-lg border-b-2 text-lg 
              ${
                openTab == 1
                  ? "text-blue-600dark:border-blue-500 border-blue-600 p-4 dark:text-blue-500"
                  : "border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
              >
                Sign In
              </a>
            </li>
            <li className="mr-2">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                href="#"
                className={`inline-block rounded-t-lg border-b-2 text-lg 
              ${
                openTab == 2
                  ? "text-blue-600dark:border-blue-500 border-blue-600 p-4 dark:text-blue-500"
                  : "border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
                aria-current="page"
              >
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded  ">
            <div className="flex-auto px-4">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <SignIn setOpenTab={setOpenTab} />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <SignUp setOpenTab={setOpenTab} />
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
