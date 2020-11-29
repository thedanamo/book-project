import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { InventoryContext } from "./InventoryContext";
import BookCard from "./BookCard";
import Paginator from "./Paginator";
import Loading from "./Loading";

function Inventory() {
  const { status, allBooks, setNewBook, page, setPage, lastPage } = useContext(
    InventoryContext
  );

  return (
    <>
      <h2>Book List</h2>
      {status === "loading" && <Loading />}
      {status === "error" && "Error..."}
      {status === "success" && (
        <InventoryContainer>
          <Paginator active={page} lastPage={lastPage} setPage={setPage} />
          <Grid>
            {allBooks.map((book) => {
              const {
                title,
                author,
                imageLink,
                link,
                pages,
                year,
                language,
                country,
              } = book;
              return (
                <BookCard
                  key={title + Math.random() * 100000}
                  title={title}
                  author={author}
                  imgSrc={imageLink}
                  link={link}
                  language={language}
                  pages={pages}
                  country={country}
                  year={year}
                />
              );
            })}
          </Grid>
          <Paginator active={page} lastPage={lastPage} setPage={setPage} />
        </InventoryContainer>
      )}
    </>
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

export default Inventory;
