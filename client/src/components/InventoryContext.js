import React, { useEffect } from "react";

export const InventoryContext = React.createContext(null);

export const InventoryProvider = ({ children }) => {
  const [allBooks, setAllBooks] = React.useState([]);
  const [status, setStatus] = React.useState("loading");
  const [inventoryPage, setInventoryPage] = React.useState(1);
  const [newBook, setNewBook] = React.useState(false); // Will be used to update list when new book added
  const [lastPage, setLastPage] = React.useState(1);

  useEffect(() => {
    fetch("/api/books/pages/" + inventoryPage, {
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
  }, [newBook, inventoryPage]);

  return (
    <InventoryContext.Provider
      value={{
        allBooks,
        status,
        setNewBook,
        page: inventoryPage,
        setPage: setInventoryPage,
        lastPage,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
