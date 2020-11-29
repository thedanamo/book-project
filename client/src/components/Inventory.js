import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { InventoryContext } from "./InventoryContext";
import BookCard from "./BookCard";
import Paginator from "./Paginator";
import Loading from "./Loading";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

function Inventory() {
  const {
    status,
    allBooks,
    setNewBook,
    page,
    setPage,
    lastPage,
    selectedlibrary,
    setSelectedlibrary,
  } = useContext(InventoryContext);

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
          <Dropdown.Item eventKey="">All</Dropdown.Item>
          {/* map through libraries */}
          <Dropdown.Item eventKey="1">St.Do Brary</Dropdown.Item>
          <Dropdown.Item eventKey="2">Westmount</Dropdown.Item>
          <Dropdown.Item eventKey="3">Concordia LB</Dropdown.Item>
        </StyledDropDown>
        <NotificationContainer>Notifications here</NotificationContainer>
      </InventoryContainer>
      <h2>Book List</h2>

      {status === "loading" && <Loading />}
      {status === "error" && "Error..."}
      {status === "success" && (
        <InventoryContainer>
          <StyledButton variant="primary">Add book</StyledButton>
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
                //stock,
              } = book;
              return (
                <BookCard
                  key={title + id}
                  title={title}
                  author={author}
                  imgSrc={imageLink}
                  link={link}
                  language={language}
                  pages={pages}
                  country={country}
                  year={year}
                  // stock={stock}
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
  display: flex;
  border: 1px solid black;
  margin: 10px;
  height: 150px;
  max-height: 150px;
  width: 400px;
`;

const StyledButton = styled(Button)`
  margin: 5px;
`;

const StyledDropDown = styled(DropdownButton)`
  margin: 10px;
`;

export default Inventory;
