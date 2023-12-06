import "./index.scss";
import { useEffect, useState } from "react";
import axios from "axios";

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

function App() {
  //const [start, setStart] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [books, setBooks] = useState([]);

  async function fetchBooks(keyword, s = 1, display = 20) {
    const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
    try {
      const response = await axios.get(
        `${PROXY}/v1/search/book.json?query=${keyword}&display=${display}&start=${s}`,
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
    fetchBooks(keyword);
    setKeyword("");
  };

  const handleSerchKeyword = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", function () {
      // 현재 스크롤 위치
      var scrollPosition =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop;

      // 전체 문서의 높이
      var documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );

      // 스크롤이 가장 하단으로 이동했을 때
      if (scrollPosition + window.innerHeight >= documentHeight) {
        // API 호출 함수 호출
        fetchBooks(!keyword && "주식", 1, 40);
      }
    });
    fetchBooks("주식");
    document.title = "NAVER 책";
  }, [keyword]);

  return (
    <div className="App">
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
