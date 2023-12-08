import axios from "axios";
import { INITIAL_DISPLAY_BOOKS, INITIAL_DISPLAY_TITLE } from "../constant";

export async function fetchBooks(keyword, display) {
  if (!keyword) keyword = INITIAL_DISPLAY_TITLE;
  if (!display) display = INITIAL_DISPLAY_BOOKS;

  const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
  const response = await axios.get(
    `${PROXY}/v1/search/book.json?query=${keyword}&display=${display}&start=1`,
    {
      headers: {
        "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
      },
    }
  );
  return response.data.items;
}
