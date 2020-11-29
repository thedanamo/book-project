import styled from "styled-components";

function BookCard({ title, author }) {
  return (
    <BookDiv>
      <div>
        Title: <span>{title}</span>
      </div>
      <div>
        Author: <span>{author}</span>
      </div>
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
`;

export default BookCard;
