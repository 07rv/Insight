const SearchResult = ({ results }) => {
  return (
    <>
      {results.length > 0 && (
        <div className="z-50">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="p-4 space-y-6">
              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {results.map((result, id) => {
                  return <div key={id}>{result.name}</div>;
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResult;
