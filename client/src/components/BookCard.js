import styled from "styled-components";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";

function BookCard({
  id,
  libraryId,
  title,
  author,
  imageLink,
  link,
  pages,
  year,
  language,
  country,
  stock,
  setStockIncDec,
  setDeleteBook,
  setEditBook,
}) {
  const [stockNumber, setStockNumber] = useState(stock);
  const [editButtonText, setEditButtonText] = useState("Edit");
  const [editMode, setEditMode] = useState(false);
  const [editBookInfo, setEditBookInfo] = useState({
    title,
    author,
    imageLink,
    link,
    pages,
    year,
    language,
    country,
  });

  const incrementOrDecrement = (mode) => {
    setStockIncDec({ bookId: id, libraryId, mode });

    //ToDo: add confirmation from context before updating stockNumber hook, optimistic atm
    setStockNumber(mode === "increment" ? stockNumber + 1 : stockNumber - 1);
  };

  const deleteBook = () => {
    setDeleteBook({ bookId: id, libraryId });
  };

  const submitEditBook = () => {
    console.log("*******", stockNumber);
    setEditBook(
      isBookRepoEditMode
        ? { book: { ...editBookInfo }, bookId: id, libraryId }
        : {
            book: { ...editBookInfo, stock: stockNumber },
            bookId: id,
            libraryId,
          }
    );
    setEditMode(false);
  };

  const isBookRepoEditMode = editMode && !libraryId;
  const isLibraryEditMode = editMode && libraryId;

  return (
    <BookDiv>
      <div>
        <span>{title}</span>
      </div>
      {imageLink && <BookImg src={imageLink} />}
      <InfoContainer>
        <div>
          Author:
          {!isBookRepoEditMode ? (
            editBookInfo.author
          ) : (
            <input
              onChange={(e) => {
                setEditBookInfo({ ...editBookInfo, author: e.target.value });
              }}
              type="text"
              placeholder={editBookInfo.author}
            />
          )}
        </div>
        <div>
          Country:
          {!isBookRepoEditMode ? (
            editBookInfo.country
          ) : (
            <input
              onChange={(e) => {
                setEditBookInfo({ ...editBookInfo, country: e.target.value });
              }}
              type="text"
              placeholder={editBookInfo.country}
            />
          )}
        </div>
        <div>
          Language:
          {!isBookRepoEditMode ? (
            editBookInfo.language
          ) : (
            <input
              onChange={(e) => {
                setEditBookInfo({ ...editBookInfo, language: e.target.value });
              }}
              type="text"
              placeholder={editBookInfo.language}
            />
          )}
        </div>
        <div>
          Year:
          {!isBookRepoEditMode ? (
            editBookInfo.year
          ) : (
            <input
              onChange={(e) => {
                setEditBookInfo({ ...editBookInfo, year: e.target.value });
              }}
              type="text"
              placeholder={editBookInfo.year}
            />
          )}
        </div>
        <div>
          Pages:
          {!isBookRepoEditMode ? (
            editBookInfo.pages
          ) : (
            <input
              onChange={(e) => {
                setEditBookInfo({ ...editBookInfo, pages: e.target.value });
              }}
              type="text"
              placeholder={editBookInfo.pages}
            />
          )}
        </div>
        {stock && (
          <>
            <div>
              Stock:
              {isLibraryEditMode ? (
                <input
                  onChange={(e) => {
                    console.log("**TEARGET: ", e.target.value);
                    setStockNumber(Number(e.target.value));
                  }}
                  type="number"
                  min="0"
                  placeholder={stockNumber}
                />
              ) : (
                stockNumber
              )}
            </div>
            <ButtonContainer>
              {stockNumber > 0 && (
                <StyledButton
                  variant="primary"
                  onClick={() => {
                    incrementOrDecrement("decrement");
                  }}
                >
                  -
                </StyledButton>
              )}
              <StyledButton
                variant="primary"
                onClick={() => {
                  incrementOrDecrement("increment");
                }}
              >
                +
              </StyledButton>
            </ButtonContainer>
          </>
        )}
        {editMode && (
          <StyledButton
            variant="success"
            onClick={() => {
              submitEditBook();
            }}
          >
            Submit
          </StyledButton>
        )}
      </InfoContainer>
      {link && <a href={link}>More info</a>}
      <ButtonContainer>
        <StyledButton
          variant="primary"
          onClick={() => {
            setEditButtonText(!editMode ? "Close" : "Edit");
            setEditMode(!editMode);
          }}
        >
          {editButtonText}
        </StyledButton>
        <StyledButton
          variant="danger"
          onClick={() => {
            deleteBook();
          }}
        >
          Delete
        </StyledButton>
      </ButtonContainer>
    </BookDiv>
  );
}

const BookDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  border: 1px solid gray;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  max-width: 300px;
`;

const BookImg = styled.img`
  height: auto;
  width: 120px;
  border: 1px solid gray;
`;

const InfoContainer = styled.div`
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  margin: 5px;
`;

export default BookCard;
