import { ShareIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Share from "./Share";

const ShareButton = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        id="sidebar-multi-level-sidebar"
        className="fixed top-1/2 left-0 z-40 w-24 transition-transform animate fadeInLeft three"
        aria-label="Sidebar"
        onClick={() => {
          setShow(!show);
        }}
      >
        <div className="h-full py-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-r-full">
          <ul className="space-y-2 font-medium">
            <li>
              <div
                href="#"
                className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <div className="w-5 h-5">
                  <ShareIcon />
                </div>
                <span className="flex-1 ml-3 whitespace-nowrap">Share</span>
              </div>
            </li>
          </ul>
        </div>
      </button>
      {show && <Share open={show} setShow={setShow} />}
    </>
  );
};

export default ShareButton;
