import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const bestNovels = [
    {
      isbn: "9791169825801",
      title: "세이노의 가르침",
      authors: ["세이노"],
      thumbnail: "https://image.yes24.com/goods/117685205/XL",
    },
    {
      isbn: "9791192833033",
      title: "불변의 법칙",
      authors: ["모건 하우절"],
      thumbnail: "https://image.yes24.com/goods/119761388/XL",
    },
    {
      isbn: "9791136292408",
      title: "하얼빈",
      authors: ["김훈"],
      thumbnail: "https://image.yes24.com/goods/112164239/XL",
    },
    {
      isbn: "9791198454850",
      title: "마흔에 읽는 쇼펜하우어",
      authors: ["강용수"],
      thumbnail: "https://image.yes24.com/goods/119755841/XL",
    },
    {
      isbn: "9791160949155",
      title: "도둑맞은 집중력",
      authors: ["요한 하리"],
      thumbnail: "https://image.yes24.com/goods/109693171/XL",
    },
    {
      isbn: "9788936434495",
      title: "소년이 온다",
      authors: ["한강"],
      thumbnail: "https://image.yes24.com/goods/13137546/XL",
    },
    {
      isbn: "9788984375042",
      title: "나미야 잡화점의 기적",
      authors: ["히가시노 게이고"],
      thumbnail: "https://image.yes24.com/goods/12140969/XL",
    },
    {
      isbn: "9791130682786",
      title: "흔한남매 14",
      authors: ["흔한남매"],
      thumbnail: "https://image.yes24.com/goods/119509245/XL",
    },
    {
      isbn: "9788954684003",
      title: "사피엔스",
      authors: ["유발 하라리"],
      thumbnail: "https://image.yes24.com/goods/18249023/XL",
    },
    {
      isbn: "9788970128856",
      title: "내가 틀릴 수도 있습니다",
      authors: ["비욘 나티코 린데블라드"],
      thumbnail: "https://image.yes24.com/goods/102042189/XL",
    },
    {
      isbn: "9791198342416",
      title: "역행자",
      authors: ["자청"],
      thumbnail: "https://image.yes24.com/goods/110597518/XL",
    },
    {
      isbn: "9791191891287",
      title: "메리골드 마음 세탁소",
      authors: ["윤정은"],
      thumbnail: "https://image.yes24.com/goods/117716170/XL",
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
