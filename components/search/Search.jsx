import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

const Search = () => {
  const [results, setResults] = useState([]);
  return (
    <div className="p-2">
      <SearchBar setResults={setResults} />
      <SearchResult results={results} />
    </div>
  );
};

export default Search;
