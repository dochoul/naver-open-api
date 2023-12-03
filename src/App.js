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
  const [start, setStart] = useState(1);
  const [books, setBooks] = useState([]);

  async function fetchBooks(s = 100) {
    const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
    const response = await axios.get(
      `${PROXY}/v1/search/book.json?query=주식&display=50&start=${s}`,
      {
        headers: {
          "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
        },
      }
    );
    setBooks(response.data.items);
  }

  useEffect(() => {
    window.addEventListener("scroll", function () {
      var isScrollAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (isScrollAtBottom) {
        console.log("bottom");
      }
    });
    fetchBooks();
    document.title = "NAVER 책";
  }, []);

  return (
    <div className="App">
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
