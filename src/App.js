import "./index.scss";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [books, setBooks] = useState([]);

  async function fetchData() {
    const response = await axios.get(
      "https://85c3ac80-6126-4378-bfb0-43dbff5aa142.mock.pstmn.io/list"
    );
    setData(response);
    //console.log(response);
  }

  async function createData() {
    const response = await axios.post(
      "https://85c3ac80-6126-4378-bfb0-43dbff5aa142.mock.pstmn.io/list",
      { name: "아이언맨", age: 100, male: "M" }
    );
    console.log(response);
  }

  async function fetchBooks() {
    const response = await axios.get(
      "/v1/search/book.json?query=주식&display=50&start=1",
      {
        headers: {
          "X-Naver-Client-Id": "ky8lLbnB0L4E8EH2gm73",
          "X-Naver-Client-Secret": "F6ZVyV2Qiz",
        },
      }
    );
    setBooks(response.data.items);
    console.log(response.data);
  }

  useEffect(() => {
    fetchBooks();
    // fetchData();
    // createData();
  }, []);

  return (
    /* grid-template-columns: repeat(3, 1fr) */

    <div className="App">
      <div className="container">
        {books.map((book) => (
          <div className="box" key={book.isbn}>
            <a
              href={book.link}
              target="_blank"
              title="새창"
              rel="noreferer noreferrer"
            >
              <h2 className="book-title">{book.title}</h2>
              <img
                className="thumbnail"
                src={book.image}
                alt=""
                style={{ width: "100%" }}
              />
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
