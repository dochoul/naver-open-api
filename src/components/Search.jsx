import { useState } from "react";
import {
  BROWSER_LARGE_SIZE,
  BROWSER_MEDIUM_SIZE,
  INITIAL_DISPLAY_BOOKS,
} from "../constant";
import { fetchBooks } from "../apis";
import styled from "styled-components";

const Form = styled.form`
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2%;
  width: 95%;
  @media only screen and (min-width: ${BROWSER_MEDIUM_SIZE}) {
  }
  @media only screen and (min-width: ${BROWSER_LARGE_SIZE}) {
    width: 50%;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 10px solid #00c772;
  border-width: 5px;
  border-radius: 6px;
  height: 30px;
  font-size: 16px;
  transition: border-color 0.15s ease-in;
  @media only screen and (min-width: ${BROWSER_MEDIUM_SIZE}) {
    border-width: 8px;
    font-size: 18px;
  }
  @media only screen and (min-width: ${BROWSER_LARGE_SIZE}) {
    font-size: 20px;
  }
`;

const Button = styled.button`
  position: absolute;
  right: 12px;
  top: calc(50% - 19px);
  cursor: pointer;
  @media only screen and (min-width: ${BROWSER_MEDIUM_SIZE}) {
    top: calc(50% - 24px);
  }
  @media only screen and (min-width: ${BROWSER_LARGE_SIZE}) {
    top: calc(50% - 24px);
  }
`;

const SearchImage = styled.img`
  width: 36px;
  height: 36px;
  @media only screen and (min-width: ${BROWSER_MEDIUM_SIZE}) {
    width: 46px;
    height: 46px;
  }
  @media only screen and (min-width: ${BROWSER_LARGE_SIZE}) {
    width: 46px;
    height: 46px;
  }
`;

const Search = ({ searchBooks }) => {
  const [keyword, setKeyword] = useState("");

  async function $_getBooks(keyword, display) {
    try {
      const res = await fetchBooks(keyword, display);
      searchBooks(res, keyword); //* 부모로 데이터를 전달한다
    } catch (err) {
      console.log(err);
    }
  }

  const $_handleSubmit = (e) => {
    e.preventDefault();
    $_getBooks(keyword, INITIAL_DISPLAY_BOOKS);
    setKeyword("");
  };

  const $_handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <Form onSubmit={$_handleSubmit}>
      <Input
        value={keyword}
        onChange={$_handleKeyword}
        placeholder="한 시간 정도 독서하면 어떤 고통도 진정된다."
      />
      <Button type="submit">
        <SearchImage
          src="https://www.semie.cooking/assets/images/common/ic_search.png"
          alt=""
        />
      </Button>
    </Form>
  );
};

export default Search;
