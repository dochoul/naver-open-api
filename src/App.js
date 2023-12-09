import { useEffect, useState } from "react";
import "./index.scss";
import Title from "./components/Title";
import Books from "./components/Books";
import Search from "./components/Search";
import { fetchBooks } from "./apis";

function App() {
  const [keyword, setKeyword] = useState("");
  const [books, setBooks] = useState([]);
  const [display, setDisplay] = useState(20);

  const handleScroll = () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    if (scrollPosition >= documentHeight - windowHeight) {
      console.log("스크롤이 가장 하단에 도달했습니다!");
      setDisplay((prev) => prev + 10);
      if (display <= 100) $_getBooks();
    }
  };

  const $_getBooks = async () => {
    try {
      const res = await fetchBooks(keyword, display);
      setBooks(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display]);

  const searchBooks = (books, keyword) => {
    setBooks(books);
    setKeyword(keyword);
  };

  //* 초기화
  useEffect(() => {
    $_getBooks();
    document.title = "네이버 Developers: 검색 > 책";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Title />
      <Search searchBooks={searchBooks} />
      <Books books={books} />
    </div>
  );
}

export default App;
