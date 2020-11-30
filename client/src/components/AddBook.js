import styled from "styled-components";
import Button from "react-bootstrap/Button";

const AddBook = ({
  addBookInfo,
  setAddBookInfo,
  addMode,
  setAddMode,
  addBook,
  setAddBook,
}) => {
  const submitAddBook = () => {
    console.log(addBookInfo);
    if (addBookInfo && addBookInfo.title && addBookInfo.title !== "") {
      setAddBook(addBookInfo);
    }
    setAddBookInfo({});
  };

  return (
    <AddContainer>
      <input
        onChange={(e) => {
          setAddBookInfo({ ...addBookInfo, title: e.target.value });
        }}
        type="text"
        placeholder="Title"
      />
      <input
        onChange={(e) => {
          setAddBookInfo({ ...addBookInfo, author: e.target.value });
        }}
        type="text"
        placeholder="Author"
      />
      <input
        onChange={(e) => {
          setAddBookInfo({ ...addBookInfo, country: e.target.value });
        }}
        type="text"
        placeholder="Country"
      />
      <input
        onChange={(e) => {
          setAddBookInfo({ ...addBookInfo, language: e.target.value });
        }}
        type="text"
        placeholder="Language"
      />
      <input
        onChange={(e) => {
          setAddBookInfo({ ...addBookInfo, year: e.target.value });
        }}
        type="text"
        placeholder="Year"
      />
      <input
        onChange={(e) => {
          setAddBookInfo({ ...addBookInfo, pages: e.target.value });
        }}
        type="text"
        placeholder="Pages"
      />
      <input
        onChange={(e) => {
          setAddBookInfo({ ...addBookInfo, link: e.target.value });
        }}
        type="text"
        placeholder="Info Link"
      />
      <input
        onChange={(e) => {
          setAddBookInfo({ ...addBookInfo, imageLink: e.target.value });
        }}
        type="text"
        placeholder="Image Link"
      />
      {addMode && (
        <StyledButton
          variant="success"
          onClick={() => {
            submitAddBook();
            setAddMode(false);
          }}
        >
          Submit
        </StyledButton>
      )}
    </AddContainer>
  );
};

const AddContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  margin: 5px;
`;

export default AddBook;
