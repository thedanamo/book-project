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
  const [deleteBook, setDeleteBook] = useState(null);
  const [deletedBook, setDeletedBook] = useState(false);
  const [editBook, setEditBook] = useState(null);

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
      setDeletedBook(false);
    };
  }, [newBook, inventoryPage, selectedlibrary, deletedBook]);

  useEffect(() => {
    const awaitFetch = async () => {
      try {
        let query = deleteBook.libraryId
          ? "/api/books/" +
            deleteBook.bookId +
            "?libraryId=" +
            deleteBook.libraryId
          : "/api/books/" + deleteBook.bookId;

        const res = await fetch(query, {
          method: "Delete",
        });

        const data = await res.json();
        console.log(deleteBook, data);
        setDeletedBook(true);
      } catch (err) {
        setStatus("error");
        console.log(err);
      }
    };

    if (deleteBook) {
      awaitFetch();
    }

    return () => {
      setDeleteBook(null);
    };
  }, [deleteBook]);

  useEffect(() => {
    const awaitFetch = async () => {
      try {
        const libraryQuery = editBook.libraryId
          ? "?libraryId=" + editBook.libraryId
          : "";

        const res = await fetch(
          "/api/books/" + editBook.bookId + libraryQuery,
          {
            method: "PUT",
            body: JSON.stringify({ ...editBook.book }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        console.log(editBook, data);
      } catch (err) {
        setStatus("error");
        console.log(err);
      }
    };

    if (editBook) {
      awaitFetch();
    }

    return () => {
      setStockIncDec(null);
    };
  }, [editBook]);

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
        setDeleteBook,
        setEditBook,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
