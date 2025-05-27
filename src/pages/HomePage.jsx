import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const bestNovels = [
    {
      isbn: "9788998441012",
      title: "모순",
      authors: ["양귀자"],
      thumbnail: "https://image.yes24.com/goods/8759796/XL",
    },
    {
      isbn: "9788937473401",
      title: "급류",
      authors: ["정대건"],
      thumbnail: "https://image.yes24.com/goods/116586303/XL",
    },
    {
      isbn: "9791162203620",
      title: "파과",
      authors: ["구병모"],
      thumbnail: "https://image.yes24.com/goods/125761518/XL",
    },
    {
      isbn: "9788936434120",
      title: "소년이 온다",
      authors: ["한강"],
      thumbnail: "https://image.yes24.com/goods/13137546/XL",
    },
    {
      isbn: "9791168127012",
      title: "파쇄",
      authors: ["구병모"],
      thumbnail: "https://image.yes24.com/goods/117828174/XL",
    },
    {
      isbn: "9788954681155",
      title: "홍학의 자리",
      authors: ["정해연"],
      thumbnail: "https://image.yes24.com/goods/102791425/XL",
    },
    {
      isbn: "9791197221989",
      title: "첫 여름, 완주",
      authors: ["김금희"],
      thumbnail: "https://image.yes24.com/goods/145567095/XL",
    },
    {
      isbn: "9788936439743",
      title: "혼모노",
      authors: ["성해나"],
      thumbnail: "https://image.yes24.com/goods/143911524/XL",
    },
    {
      isbn: "9791168342880",
      title: "고래눈이 내리다",
      authors: ["김보영"],
      thumbnail: "https://image.yes24.com/goods/146651623/XL",
    },
    {
      isbn: "9788936437978",
      title: "대도시의 사랑법 (15만부 기념 특별 한정판)",
      authors: ["박상영"],
      thumbnail: "https://image.yes24.com/goods/74971092/XL",
    },
    {
      isbn: "9791141087845",
      title: "마침내 멸망하는 여름",
      authors: ["정"],
      thumbnail: "https://image.yes24.com/goods/127167526/XL",
    },
    {
      isbn: "9791167372864",
      title: "구의 증명",
      authors: ["최진영"],
      thumbnail: "https://image.yes24.com/goods/118578901/XL",
    },
  ];

  const handleClick = (isbn) => {
    navigate(`/detail/${isbn}`);
  };

  return (
    <div className="home-container">
      <h2>2025년 소설 베스트셀러 TOP 12</h2>
      <div className="book-grid">
        {bestNovels.map((book, idx) => (
          <div
            key={book.isbn}
            className="book-item"
            onClick={() => handleClick(book.isbn)}
          >
            <img src={book.thumbnail} alt={book.title} />
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
