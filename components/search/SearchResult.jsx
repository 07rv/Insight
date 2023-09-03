const SearchResult = ({ results }) => {
  return (
    <>
      {results.map((result, id) => {
        return <div key={id}>{result.name}</div>;
      })}
    </>
  );
};

export default SearchResult;
