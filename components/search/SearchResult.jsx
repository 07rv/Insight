const SearchResult = ({ results }) => {
  return (
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          {results.map((result, key) => (
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
              <td class="px-6 py-4">Silver</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchResult;
