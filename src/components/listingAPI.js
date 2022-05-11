// Fetch listings from database
export const getListings = async () => {
  const res = await fetch("http://localhost:6001/listings");
  const data = await res.json();
  return data;
};

// Add a listing to the database
export const addListing = async (listing) => {
  const res = await fetch("http://localhost:6001/listings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(listing)
  });
  const data = await res.json();
  return data;
};

// Delete a listing from the database
export const deleteListing = async (id) => {
  const res = await fetch(`http://localhost:6001/listings/${id}`, {
    method: "DELETE"
  });
  const data = await res.json();
  return data;
};
