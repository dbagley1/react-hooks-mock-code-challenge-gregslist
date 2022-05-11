import { useContext, useState } from "react";
import { ListingsContext } from "./ListingsContext";

function Search() {
  const context = useContext(ListingsContext);
  const { searchTerm, setSearchTerm } = context;
  const [searchTermValue, setSearchTermValue] = useState(searchTerm);

  function handleChange(event) {
    setSearchTermValue(event.target.value);
    setSearchTerm(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchTermValue);
  }

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input type="text" id="search"
        placeholder="search by name"
        value={searchTermValue}
        onChange={handleChange} />
      <button type="submit">🔍</button>
    </form>
  );
}

export default Search;
