import { deleteListing } from "./listingAPI";
import { useState, useContext } from "react";
import { ListingsContext } from "./ListingsContext";

function ListingCard(props) {
  const { listing } = props;
  const { id, price, image, description, location } = listing;
  const [isFavorite, setIsFavorite] = useState(false);

  const context = useContext(ListingsContext);
  const { listings, setListings, searchTerm } = context;

  const searchRegex = new RegExp(`(.*)(${searchTerm})(.*)`, 'i');
  const searchMatch = searchTerm && description.toLowerCase().match(searchRegex);
  const highlightedDescription = searchMatch && description.replace(searchRegex, `$1<span class="highlight">$2</span>$3`);
  const test = searchMatch && description.replace(searchRegex, `$1<span class="highlight">$2</span>$3`);
  /* 
    function highlightedDescription() {
      if (searchMatch) {
        return <span dangerouslySetInnerHTML={{ __html: highlightSpan }} />;
      }
      return description;
    } */

  const handleDelete = () => {
    console.debug('ListingCard: handleDelete');
    // Remove listing from database and update state
    deleteListing(id).then(() => {
      const newListings = listings.filter((listing) => {
        return listing.id !== id;
      });
      setListings(newListings);
    });
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <li className="card">
      <div className="image">
        <span className="price">${price}</span>
        <img src={image} alt={"description"} />
      </div>
      <div className="details">
        <FavoriteButton isFavorite={isFavorite} onFavorite={handleFavorite} />
        <strong dangerouslySetInnerHTML={{ __html: highlightedDescription || description }} />
        <br />
        <span>{location}</span>
        <DeleteButton listing={listing} onDelete={handleDelete} />
      </div>
    </li>
  );
}

function FavoriteButton(props) {
  const { isFavorite, onFavorite } = props;

  return (
    <button
      className={['emoji-button', 'favorite', isFavorite && 'active'].filter(Boolean).join(' ')}
      onClick={onFavorite}
    >
      {isFavorite ? '★' : '☆'}
    </button>
  );
}

function DeleteButton(props) {
  const { onDelete } = props;

  return (
    <button
      className="emoji-button delete"
      onClick={onDelete}
    >
      🗑❌
    </button>
  );
}

export default ListingCard;
