import React, { useState, useEffect } from "react";

export const InventoryContext = React.createContext(null);

export const InventoryProvider = ({ children }) => {
  const [allBooks, setAllBooks] = useState([]);
  const [status, setStatus] = useState("loading");
  const [inventoryPage, setInventoryPage] = useState(1);
  const [newBook, setNewBook] = useState(false); // Will be used to update list when new book added
  const [lastPage, setLastPage] = useState(1);
  const [selectedlibrary, setSelectedlibrary] = useState(null);
  const [stockIncDec, setStockIncDec] = useState(null);

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

  useEffect(() => {
    const awaitFetch = async () => {
      try {
        const res = await fetch(
          "/api/books/" +
            stockIncDec.mode +
            "/" +
            stockIncDec.bookId +
            "?libraryId=" +
            stockIncDec.libraryId,
          {
            method: "PUT",
          }
        );

        const data = await res.json();
        console.log(stockIncDec, data);
      } catch (err) {
        setStatus("error");
        console.log(err);
      }
    };

    if (stockIncDec) {
      awaitFetch();
    }

    return () => {
      setStockIncDec(null);
    };
  }, [stockIncDec]);

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
        setStockIncDec,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
