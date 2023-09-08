import React from "react";

const SearchButton = () => {
  return (
    <div className="block">
      <button
        type="button"
        className="relative w-full border border-gray-300 text-gray-400 bg-[#f4f4f5] rounded-lg text-sm p-2 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2 dark:bg-gray-700 dark:border-gray-600"
      >
        <svg
          className="w-4 h-4 ml-1 mr-3 text-gray-500 dark:text-gray-400"
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
        Search...
      </button>
    </div>
  );
};

export default SearchButton;
