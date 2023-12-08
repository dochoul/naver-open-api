import { useState } from "react";
import { INITIAL_DISPLAY_BOOKS } from "../constant";
import { fetchBooks } from "../apis";

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
    <form onSubmit={$_handleSubmit} className="search_wrap">
      <input
        value={keyword}
        onChange={$_handleKeyword}
        placeholder="한 시간 정도 독서하면 어떤 고통도 진정된다."
      />
      <button type="submit" className="search_button">
        <img
          src="https://www.semie.cooking/assets/images/common/ic_search.png"
          alt=""
        />
      </button>
    </form>
  );
};

export default Search;
