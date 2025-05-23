import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const bookList = [
  { title: "세이노의 가르침", authors: ["세이노"] },
  { title: "불변의 법칙", authors: ["모건 하우절"] },
  { title: "하얼빈", authors: ["김훈"] },
  { title: "나미야 잡화점의 기적", authors: ["히가시노 게이고"] },
  { title: "문과 남자의 과학 공부", authors: ["이선영"] },
  { title: "진짜 공부", authors: ["신영준", "고영성"] },
  { title: "작별하지 않는다", authors: ["한강"] },
  { title: "메리골드 마음 세탁소", authors: ["윤정은"] },
  { title: "죽고 싶지만 떡볶이는 먹고 싶어", authors: ["백세희"] },
  { title: "내가 틀릴 수도 있습니다", authors: ["비욘 나티코 린데블라드"] },
  { title: "도둑맞은 집중력", authors: ["요한 하리"] },
  { title: "마흔에 읽는 쇼펜하우어", authors: ["강용수"] },
];

function HomePage() {
  const navigate = useNavigate();
  const [bestNovels, setBestNovels] = useState([]);

  useEffect(() => {
    const fetchThumbnails = async () => {
      const results = await Promise.all(
        bookList.map(async (book) => {
          try {
            const res = await fetch(
              `https://dapi.kakao.com/v3/search/book?target=title&query=${encodeURIComponent(book.title)}`,
              {
                headers: {
                  Authorization: `KakaoAK YOUR_REST_API_KEY`,
                },
              }
            );
            const data = await res.json();
            const thumbnail =
              data.documents && data.documents.length > 0
                ? data.documents[0].thumbnail
                : null;

            return {
              ...book,
              isbn: data.documents[0]?.isbn?.split(" ")[0] || book.title,
              thumbnail,
            };
          } catch (err) {
            console.error(`Error fetching ${book.title}:`, err);
            return { ...book, thumbnail: null };
          }
        })
      );
      setBestNovels(results);
    };

    fetchThumbnails();
  }, []);

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
