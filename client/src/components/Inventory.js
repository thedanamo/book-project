import styled from "styled-components";
import { useState, useContext } from "react";
import { InventoryContext } from "./InventoryContext";
import BookCard from "./BookCard";
import Paginator from "./Paginator";
import Loading from "./Loading";
import AddBook from "./AddBook";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

function Inventory() {
  const {
    status,
    allBooks,
    page,
    setPage,
    lastPage,
    selectedlibrary,
    setSelectedlibrary,
    setStockIncDec,
    setDeleteBook,
    setEditBook,
    addBook,
    setAddBook,
    notifications,
  } = useContext(InventoryContext);

  const [addMode, setAddMode] = useState(false);
  const [addBookInfo, setAddBookInfo] = useState(null);

  return (
    <div>
      <InventoryContainer>
        <span>View Library stock: </span>
        <StyledDropDown
          id="dropdown-basic-button"
          title="Choose Library"
          onSelect={(eventKey) => {
            setSelectedlibrary(eventKey);
            setPage(1);
          }}
        >
          <Dropdown.Item eventKey="">All Books (Book Repo)</Dropdown.Item>
          {/* map through libraries */}
          <Dropdown.Item eventKey="1">St.Do Brary</Dropdown.Item>
          <Dropdown.Item eventKey="2">Westmount</Dropdown.Item>
          <Dropdown.Item eventKey="3">Concordia LB</Dropdown.Item>
        </StyledDropDown>
        <h4>Notifications</h4>
        <NotificationContainer>
          {notifications.map((book) => {
            console.log(book.title);
            return <div>{book.title}</div>;
          })}
        </NotificationContainer>
      </InventoryContainer>
      <h2>Book List</h2>

      {status === "loading" && <Loading />}
      {status === "error" && "Error..."}
      {status === "success" && (
        <InventoryContainer>
          {!selectedlibrary && (
            <div>
              {" "}
              <StyledButton
                variant="primary"
                onClick={() => {
                  setAddMode(!addMode);
                }}
              >
                {addMode ? "Close" : "Add book"}
              </StyledButton>
              {addMode && (
                <AddBook
                  addMode={addMode}
                  addBookInfo={addBookInfo}
                  setAddBookInfo={setAddBookInfo}
                  addBook={addBook}
                  setAddBook={setAddBook}
                  setAddMode={setAddMode}
                />
              )}
            </div>
          )}

          <Paginator active={page} lastPage={lastPage} setPage={setPage} />
          <Grid>
            {allBooks.map((book) => {
              const {
                id,
                title,
                author,
                imageLink,
                link,
                pages,
                year,
                language,
                country,
                stock,
              } = book;

              return (
                <BookCard
                  key={title + id}
                  id={id}
                  libraryId={selectedlibrary}
                  title={title}
                  author={author}
                  imageLink={imageLink}
                  link={link}
                  language={language}
                  pages={pages}
                  country={country}
                  year={year}
                  stock={stock}
                  setStockIncDec={setStockIncDec}
                  setDeleteBook={setDeleteBook}
                  setEditBook={setEditBook}
                />
              );
            })}
          </Grid>
          <Paginator active={page} lastPage={lastPage} setPage={setPage} />
        </InventoryContainer>
      )}
    </div>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  grid-gap: 0.5rem;
`;

const InventoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const NotificationContainer = styled.div`
  overflow: auto;
  border: 1px solid black;
  margin: 10px;
  height: 150px;
  max-height: 120px;
  width: 400px;
`;

const StyledButton = styled(Button)`
  margin: 5px;
`;

const StyledDropDown = styled(DropdownButton)`
  margin: 10px;
`;

export default Inventory;
