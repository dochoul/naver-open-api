import Book from "./Book";
import styled from "styled-components";
import { BROWSER_LARGE_SIZE, BROWSER_MEDIUM_SIZE } from "../constant";

const Books = ({ books }) => {
  return (
    <Container>
      {books && books.map((book) => <Book key={book.isbn} book={book} />)}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  width: 95%;
  margin: 0 auto 3%;
  @media only screen and (min-width: ${BROWSER_MEDIUM_SIZE}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (min-width: ${BROWSER_LARGE_SIZE}) {
    width: 90%;
    gap: 20px;
    grid-template-columns: repeat(5, 1fr);
  }
`;

export default Books;
