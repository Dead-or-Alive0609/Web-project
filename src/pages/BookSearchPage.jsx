import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const bookTitles = [
  "세이노의 가르침",
  "불변의 법칙",
  "하얼빈",
  "나미야 잡화점의 기적",
  "문과 남자의 과학 공부",
  "진짜 공부",
  "작별하지 않는다",
  "메리골드 마음 세탁소",
  "죽고 싶지만 떡볶이는 먹고 싶어",
  "내가 틀릴 수도 있습니다",
  "도둑맞은 집중력",
  "마흔에 읽는 쇼펜하우어",
];

function HomePage() {
  const navigate = useNavigate();
  const [bestNovels, setBestNovels] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const results = await Promise.all(
          bookTitles.map(async (title) => {
            const res = await fetch(`/api/books?query=${encodeURIComponent(title)}`);
            if (!res.ok) throw new Error("API 호출 실패");

            const data = await res.json();
            const book = data.documents?.[0];

            if (!book) return null;

            const isbn13 = book.isbn?.split(" ").find((i) => i.length === 13) || title;

            return {
              isbn: isbn13,
              title: book.title,
              authors: book.authors,
              thumbnail: book.thumbnail,
            };
          })
        );

        setBestNovels(results.filter((b) => b)); // null 제외
      } catch (err) {
        console.error("책 정보 가져오기 실패:", err);
        setError("도서 정보를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchBooks();
  }, []);

  const handleClick = (isbn) => {
    navigate(`/detail/${isbn}`);
  };

  return (
    <div className="home-container">
      <h2>📚 2025년 소설 베스트셀러 TOP 12</h2>

      {error && <p className="no-results">{error}</p>}

      <div className="book-grid">
        {bestNovels.map((book, idx) => (
          <div
            key={book.isbn}
            className="book-item"
            onClick={() => handleClick(book.isbn)}
          >
            {book.thumbnail ? (
              <img src={book.thumbnail} alt={book.title} />
            ) : (
              <div className="no-img">이미지 없음</div>
            )}
            <div className="book-title">
              {idx + 1}위. {book.title}
            </div>
            <div className="book-author">{book.authors.join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
