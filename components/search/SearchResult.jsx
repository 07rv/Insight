const SearchResult = ({ results }) => {
  return (
    <>
      {results.length > 0 && (
        <div className="absolute top-1/8 left-0 z-40 w-64 px-2">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="p-4 space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
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
