import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";

const SearchResult = ({ results }) => {
  const itemsPerPage = 5;
  return <Pagination results={results} itemsPerPage={itemsPerPage} />;
};

const Pagination = ({ results, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = results.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedData = results.slice(startIndex, endIndex);

  return (
    <>
      <div class="h-80 relative">
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
              {displayedData.map((result, key) => (
                <tr
                  key={key}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {result.name}
                  </th>
                  <td class="px-6 py-4">
                    <div className="relative h-5 w-5 flex-shrink-0">
                      <Link href={"/"}>
                        <ArrowTopRightOnSquareIcon />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {displayedData.length > 0 && (
          <div className="mt-5 flex items-center justify-center absolute bottom-0 inset-x-0">
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={() =>
                  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                }
                disabled={currentPage === 1}
                className="relative inline-flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
              >
                <ChevronLeftIcon className="h-3 w-3" aria-hidden="true" />
                <span>Previous</span>
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prevPage) =>
                    Math.min(prevPage + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
              >
                <span>Next</span>
                <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
              </button>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResult;
