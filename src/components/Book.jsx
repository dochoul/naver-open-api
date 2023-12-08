import { changeDateString } from "../utils/changeDateString";
import { insertCommas } from "../utils/insertCommas";
import styled from "styled-components";

const BookItem = ({ book }) => {
  return (
    <LinkBook
      href={book.link}
      target="_blank"
      title="새창"
      rel="noreferer noreferrer"
    >
      <BookTitle>{book.title}</BookTitle>
      <Thumbail src={book.image} alt="" />
      <BookInfo>
        <dl>
          <dt>저자:</dt>
          <dd>{book.author}</dd>
        </dl>
        <dl>
          <dt>출판:</dt>
          <dd>{book.publisher}</dd>
        </dl>
        <Description>
          <dt>책 소개:</dt>
          <dd>{book.description}</dd>
        </Description>
        <dl>
          <dt>발행:</dt>
          <dd>{changeDateString(book.pubdate)}</dd>
        </dl>
        <dl>
          <dt>최저:</dt>
          <dd>{insertCommas(book.discount)}원</dd>
        </dl>
      </BookInfo>
    </LinkBook>
  );
};

const LinkBook = styled.a`
  padding: 30px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 4px 12px 30px 6px rgba(0, 0, 0, 0.09);
  transition: all 0.2s ease-in-out;
  &:hover {
    text-decoration: none;
    transform: translateY(-5px);
    box-shadow: 4px 12px 20px 6px rgba(0, 0, 0, 0.18);
  }
`;

const BookTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 5px;
  line-height: 1.2;
  font-weight: 900;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

const Thumbail = styled.img`
  display: block;
  margin: 20px auto 30px;
  max-width: 148px;
  max-height: 236px;
  object-fit: cover;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  gap: 5px;
  > dl {
    display: flex;
    dt {
      font-weight: bold;
      margin-right: 5px;
    }
  }
`;

const Description = styled.dl`
  flex-direction: column;
  > dt {
    font-weight: bold;
    margin-right: 5px;
  }
  > dd {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
`;

export default BookItem;
