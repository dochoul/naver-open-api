import { useEffect, useState } from "react";
import axios from "axios";
import "./index.scss";

function insertCommas(n) {
  // get stuff before the dot
  let s1 = n.toString();
  var d = s1.indexOf(".");
  var s2 = d === -1 ? s1 : s1.slice(0, d);

  // insert commas every 3 digits from the right
  for (var i = s2.length - 3; i > 0; i -= 3)
    s2 = s2.slice(0, i) + "," + s2.slice(i);

  // append fractional part
  if (d !== -1) s2 += s1.slice(d);

  return s2;
}

function changeDateString(date) {
  var year = date.substr(0, 4);
  var month = date.substr(4, 2);
  var day = date.substr(6, 2);
  return year + "." + month + "." + day;
}

const INIT_BOOK_NUMBER = 10;

function App() {
  const [keyword, setKeyword] = useState("");
  const [books, setBooks] = useState([]);
  const [display, setDisplay] = useState(INIT_BOOK_NUMBER);

  async function fetchBooks(keyword, display) {
    if (!keyword) keyword = "주식";
    const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
    try {
      const response = await axios.get(
        `${PROXY}/v1/search/book.json?query=${keyword}&display=${display}&start=1`,
        {
          headers: {
            "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
            "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
          },
        }
      );
      setBooks(response.data.items);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBooks(keyword, INIT_BOOK_NUMBER);
  };

  const handleSerchKeyword = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      if (scrollPosition >= documentHeight - windowHeight) {
        console.log("스크롤이 가장 하단에 도달했습니다!");
        setDisplay((prev) => prev + 10);
      }
    };

    if (display <= 100) fetchBooks(keyword, display);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display]);

  //* 초기화
  useEffect(() => {
    fetchBooks("주식", INIT_BOOK_NUMBER);
  }, []);

  return (
    <div className="App">
      {/* <div style={{ position: "fixed" }}>{test}</div> */}
      <form onSubmit={handleSubmit} className="search_wrap">
        <div className="emoji">📗</div>
        <input
          value={keyword}
          onChange={handleSerchKeyword}
          placeholder="한 시간 정도 독서하면 어떤 고통도 진정된다."
        />
        <button type="button" className="search_button">
          <img
            src="https://www.semie.cooking/assets/images/common/ic_search.png"
            alt=""
          />
        </button>
      </form>
      <div className="container">
        {books &&
          books.map((book) => (
            <div className="box" key={book.isbn}>
              <a
                href={book.link}
                className="link"
                target="_blank"
                title="새창"
                rel="noreferer noreferrer"
              >
                <h2 className="book-title">{book.title}</h2>
                <img className="thumbnail" src={book.image} alt="" />
                <div className="book-info">
                  <p className="author">
                    <span>저자:</span> {book.author}
                  </p>
                  <p className="publisher">
                    <span>출판:</span> {book.publisher}
                  </p>
                  <p className="description">
                    <span>책 소개:</span> {book.description}
                  </p>
                  <p className="pubdate">
                    <span>발행:</span> {changeDateString(book.pubdate)}
                  </p>
                  <p className="discount">
                    <span>최저:</span> {insertCommas(book.discount)}원
                  </p>
                </div>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
