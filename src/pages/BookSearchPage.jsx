import React, { useState } from "react";
import "../styles/BookSearchPage.css";

function BookSearchPage() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setBooks([]);

    if (query.trim() === "") return;

    try {
      const res = await fetch(`/api/books?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("API 호출 실패");

      const data = await res.json();
      const results = data.documents || [];

      if (results.length === 0) {
        setError("검색 결과가 없습니다.");
      } else {
        setBooks(results);
      }
    } catch (err) {
      console.error("도서 검색 실패:", err);
      setError("도서 검색 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="book-search-page">
      <h2>도서 검색</h2>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="책 제목 또는 저자 입력"
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      <div className="search-results">
        {error && <p className="no-results">{error}</p>}

        {!error && books.length > 0 && (
          books.map((book) => {
            const isbn13 = book.isbn?.split(" ").find((num) => num.length === 13) || "";
            return (
              <div
                key={isbn13}
                className="search-book-card"
                onClick={() => window.location.href = `/detail/${isbn13}`}
              >
                {book.thumbnail ? (
                  <img className="search-book-img" src={book.thumbnail} alt={book.title} />
                ) : (
                  <div className="no-img">이미지 없음</div>
                )}
                <div className="search-book-info">
                  <div className="book-title">{book.title}</div>
                  <div className="book-author">{book.authors?.join(", ")}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default BookSearchPage;
