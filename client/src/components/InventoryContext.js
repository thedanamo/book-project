import React, { useState, useEffect } from "react";

export const InventoryContext = React.createContext(null);

export const InventoryProvider = ({ children }) => {
  const [allBooks, setAllBooks] = useState([]);
  const [status, setStatus] = useState("loading");
  const [inventoryPage, setInventoryPage] = useState(1);
  const [newBook, setNewBook] = useState(false); // Will be used to update list when new book added
  const [lastPage, setLastPage] = useState(1);

  const [selectedlibrary, setSelectedlibrary] = useState(null);

  useEffect(() => {
    const query = selectedlibrary ? "?library=" + selectedlibrary : "";
    fetch("/api/books/pages/" + inventoryPage + query, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((pagination) => {
        const { books, last_page } = pagination;
        setAllBooks([...books]);
        setLastPage(last_page);
        setStatus("success");
      })
      .catch((error) => {
        setStatus("error");
        console.log(error);
      });

    return () => {
      setStatus("loading");
      setNewBook(false);
    };
  }, [newBook, inventoryPage, selectedlibrary]);

  return (
    <InventoryContext.Provider
      value={{
        allBooks,
        status,
        setNewBook,
        page: inventoryPage,
        setPage: setInventoryPage,
        lastPage,
        selectedlibrary,
        setSelectedlibrary,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
