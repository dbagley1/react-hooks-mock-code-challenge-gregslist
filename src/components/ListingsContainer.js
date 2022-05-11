import { useEffect, useState, useContext } from "react";
import ListingCard from "./ListingCard";
import { ListingsContext } from "./ListingsContext";

function ListingsContainer(props) {
  const context = useContext(ListingsContext);
  const { listings, searchTerm } = context;

  const [filteredListings, setFilteredListings] = useState(listings);

  useEffect(() => {
    console.debug('ListingsContainer: useEffect');
    const newFilteredListings = listings.filter((listing) => {
      return !searchTerm || listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    });
    console.debug('ListingsContainer: useEffect: filteredListings', newFilteredListings);

    setFilteredListings(newFilteredListings);
  }, [listings, searchTerm]);

  return (
    <main>
      <ul className="cards">
        {filteredListings.map((listing) => {
          return <ListingCard key={listing.id} listing={listing} />;
        })}
      </ul>
    </main>
  );
}

export default ListingsContainer;
