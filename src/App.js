import "./index.scss";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);

  async function fetchBooks() {
    const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";

    const response = await axios.get(
      `${PROXY}/v1/search/book.json?query=주식&display=50&start=1`,
      {
        headers: {
          "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
        },
      }
    );
    setBooks(response.data.items);
    console.log(response.data);
  }

  useEffect(() => {
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
                target="_blank"
                title="새창"
                rel="noreferer noreferrer"
              >
                <h2 className="book-title">{book.title}</h2>
                <img className="thumbnail" src={book.image} alt="" />
                <p>{book.author}</p>
                <p>{book.publisher}</p>
                <p>{book.description}</p>
                <p>{book.pubdate}</p>
                <p>{book.discount}</p>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
