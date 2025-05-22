import React, { useEffect, useState } from "react";
import { searchBooks } from "../../api/bookApi";
import "../styles/BookRecommendPage.css";

const KEYWORDS = ["자기계발", "심리학", "에세이", "소설", "경제"];

function BookRecommendPage() {
  const [selectedKeyword, setSelectedKeyword] = useState("자기계발");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const results = await searchBooks(selectedKeyword);
      setBooks(results.slice(0, 11)); // 최대 9권
    };

    fetchBooks();
  }, [selectedKeyword]);

  const handleClick = (isbn) => {
    const isbn13 = isbn?.split(" ").find((s) => s.length === 13) || isbn;
    window.location.href = `/detail/${isbn13}`;
  };

  return (
    <div className="book-recommend-page">
      <h2>📚 키워드별 인기 도서 추천</h2>

      <div className="keyword-buttons">
        {KEYWORDS.map((keyword) => (
          <button
            key={keyword}
            onClick={() => setSelectedKeyword(keyword)}
            className={selectedKeyword === keyword ? "active" : ""}
          >
            {keyword}
          </button>
        ))}
      </div>

      <div className="book-grid">
        {books.map((book) => {
          const isbn13 = book.isbn?.split(" ").find((s) => s.length === 13) || book.isbn;
          return (
            <div
              key={isbn13}
              className="book-item"
              onClick={() => handleClick(isbn13)}
            >
              {book.thumbnail ? (
                <img src={book.thumbnail} alt={book.title} />
              ) : (
                <div className="no-img">이미지 없음</div>
              )}
              <div className="book-title">{book.title}</div>
              <div className="book-author">{book.authors?.join(", ")}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookRecommendPage;
