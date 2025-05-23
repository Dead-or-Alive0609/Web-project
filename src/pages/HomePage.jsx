import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const bestNovels = [
    {
      isbn: "9788936437541",
      title: "디디의 우산",
      authors: ["황정은"],
      thumbnail: "https://covers.openlibrary.org/b/isbn/9788936437541-L.jpg",
    },
    {
      isbn: "9781335050076",
      title: "Apartment Women",
      authors: ["구병모"],
      thumbnail: "https://covers.openlibrary.org/b/isbn/9781335050076-L.jpg",
    },
    {
      isbn: "9788954682152",
      title: "We Do Not Part",
      authors: ["한강"],
      thumbnail: "https://covers.openlibrary.org/b/isbn/9788954682152-L.jpg",
    },
    {
      isbn: "9788996989128",
      title: "소년이 온다",
      authors: ["한강"],
      thumbnail: "https://covers.openlibrary.org/b/isbn/9788996989128-L.jpg",
    },
    {
      isbn: "9788954684003",
      title: "사피엔스",
      authors: ["유발 하라리"],
      thumbnail: "https://covers.openlibrary.org/b/isbn/9788954684003-L.jpg",
    },
    {
      isbn: "9788934976553",
      title: "돈의 심리학",
      authors: ["모건 하우절"],
      thumbnail: "https://covers.openlibrary.org/b/isbn/9788934976553-L.jpg",
    },
    {
      isbn: "9788936433665",
      title: "죽고 싶지만 떡볶이는 먹고 싶어",
      authors: ["백세희"],
      thumbnail: "https://covers.openlibrary.org/b/isbn/9788936433665-L.jpg",
    },
    {
      isbn: "9788965965205",
      title: "미움받을 용기",
      authors: ["기시미 이치로", "고가 후미타케"],
      thumbnail: "https://covers.openlibrary.org/b/isbn/9788965965205-L.jpg",
    },
    {
      isbn: "9791191891287",
      title: "역행자",
      authors: ["자청"],
      thumbnail: "https://covers.openlibrary.org/b/isbn/9791191891287-L.jpg",
    },
    {
      isbn: "9788990982583",
      title: "말의 품격",
      authors: ["이기주"],
      thumbnail: "https://covers.openlibrary.org/b/isbn/9788990982583-L.jpg",
    },
    {
      isbn: "9791168477605",
      title: "진짜 공부",
      authors: ["신영준", "고영성"],
      thumbnail: "https://covers.openlibrary.org/b/isbn/9791168477605-L.jpg",
    },
    {
      isbn: "9791161571379",
      title: "문과 남자의 과학 공부",
      authors: ["이선영"],
      thumbnail: "https://covers.openlibrary.org/b/isbn/9791161571379-L.jpg",
    },
  ];

  const handleClick = (isbn) => {
    navigate(`/detail/${isbn}`);
  };

  return (
    <div className="home-container">
      <h2>📚 2025년 소설 베스트셀러 TOP 12</h2>
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
