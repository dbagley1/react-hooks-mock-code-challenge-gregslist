import { useEffect, useState } from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";
import { getListings } from "./listingAPI";
import { ListingsContext } from "./ListingsContext";

function App() {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function updateListings() {
    console.debug('ListingsContainer: updateListings');
    getListings().then((listings) => {
      setListings(listings);
    });
  };

  useEffect(() => {
    console.debug('ListingsContainer: useEffect');
    updateListings();
  }, []);

  return (
    <ListingsContext.Provider value={{ listings, setListings, searchTerm, setSearchTerm, updateListings }}>
      <div className="app">
        <Header />
        <ListingsContainer />
      </div>
    </ListingsContext.Provider>
  );
}

export default App;
