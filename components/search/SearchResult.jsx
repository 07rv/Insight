const SearchResult = ({ results }) => {
  return (
    <>
      {results.length > 0 && (
        <div className="z-40 absolute">
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
