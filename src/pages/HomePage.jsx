import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const bestsellers = [
  { title: '불편한 편의점', authors: ['김호연'], isbn: '9788954679380' },
  { title: '세이노의 가르침', authors: ['세이노'], isbn: '9791192401238' },
  { title: '문과남자의 과학공부', authors: ['유시민'], isbn: '9788936479286' },
  { title: '도둑맞은 집중력', authors: ['요한 하리'], isbn: '9788934985062' },
  { title: '역행자', authors: ['자청'], isbn: '9791191114221' },
  { title: '아주 희미한 빛으로도', authors: ['정세랑'], isbn: '9788954687439' },
  { title: '호감가는 대화의 법칙', authors: ['장차오'], isbn: '9791168473690' },
  { title: '도쿄 에일리언즈 1', authors: ['NAOE'], isbn: '9791134886001' },
  { title: '모순', authors: ['양귀자'], isbn: '9788956608760' },
  { title: '트렌드 코리아 2024', authors: ['김난도'], isbn: '9791168475861' },
  { title: '하얼빈', authors: ['김훈'], isbn: '9788936479303' },
  { title: '말의 품격', authors: ['이기주'], isbn: '9788965703531' },
];

function HomePage() {
  const [bookImages, setBookImages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThumbnails = async () => {
      const updatedImages = {};
      for (const book of bestsellers) {
        try {
          const response = await axios.get('https://dapi.kakao.com/v3/search/book', {
            params: { query: book.title },
            headers: {
              Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
            },
          });
          const first = response.data.documents[0];
          updatedImages[book.isbn] = first?.thumbnail || '';
        } catch (error) {
          console.error(`${book.title} 이미지 불러오기 실패`, error);
        }
      }
      setBookImages(updatedImages);
    };

    fetchThumbnails();
  }, []);

  const handleClick = (isbn) => {
    const cleanIsbn = isbn.split(' ')[0]; // 공백 있을 경우 대비
    navigate(`/detail/${cleanIsbn}`);
  };

  return (
    <div className="home-container">
      <h2>📚 2024 베스트셀러 TOP 12</h2>
      <div className="book-grid">
        {bestsellers.map((book, idx) => (
          <div
            key={book.isbn}
            className="book-item"
            onClick={() => handleClick(book.isbn)}
          >
            {bookImages[book.isbn] ? (
              <img src={bookImages[book.isbn]} alt={book.title} />
            ) : (
              <div className="no-img">이미지 없음</div>
            )}
            <div className="book-title">{idx + 1}위. {book.title}</div>
            <div className="book-author">{book.authors.join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
