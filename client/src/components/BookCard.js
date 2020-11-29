import styled from "styled-components";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";

function BookCard({
  id,
  libraryId,
  title,
  author,
  imgSrc,
  link,
  pages,
  year,
  language,
  country,
  stock,
  setStockIncDec,
}) {
  const [stockNumber, setStockNumber] = useState(stock);

  const incrementOrDecrement = (mode) => {
    setStockIncDec({ bookId: id, libraryId, mode });

    //ToDo: add confirmation from context before updating stockNumber hook, optimistic atm
    setStockNumber(mode === "increment" ? stockNumber + 1 : stockNumber - 1);
  };

  return (
    <BookDiv>
      <div>
        <span>{title}</span>
      </div>
      {imgSrc && <BookImg src={imgSrc} />}
      <InfoContainer>
        <div> Author: {author}</div>
        <div> Country: {country}</div>
        <div>Language: {language}</div>
        <div>Year: {year}</div>
        <div>Pages: {pages}</div>
        {stock && (
          <>
            <div>Stock: {stockNumber}</div>
            <ButtonContainer>
              <StyledButton
                variant="primary"
                onClick={() => {
                  incrementOrDecrement("decrement");
                }}
              >
                -
              </StyledButton>
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
      </InfoContainer>
      {link && <a href={link}>More info</a>}
      <ButtonContainer>
        <StyledButton variant="primary" onClick={() => {}}>
          Edit
        </StyledButton>
        <StyledButton variant="danger" onClick={() => {}}>
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
