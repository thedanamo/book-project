import styled from "styled-components";
import Button from "react-bootstrap/Button";

function BookCard({
  title,
  author,
  imgSrc,
  link,
  pages,
  year,
  language,
  country,
}) {
  return (
    <BookDiv>
      <div>
        Title: <span>{title}</span>
      </div>
      <BookImg src={imgSrc} />
      <InfoContainer>
        <div> Author: {author}</div>
        <div> Country: {country}</div>
        <div>Language: {language}</div>
        <div>Year: {year}</div>
        <div>Pages: {pages}</div>
      </InfoContainer>
      {link && <a href={link}>More info</a>}
      <ButtonContainer>
        <StyledButton variant="primary">Edit</StyledButton>
        <StyledButton variant="danger">Delete</StyledButton>
      </ButtonContainer>
    </BookDiv>
  );
}

const BookDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
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
`;

const StyledButton = styled(Button)`
  margin: 5px;
`;

export default BookCard;
