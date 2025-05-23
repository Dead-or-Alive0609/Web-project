import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHomeThumbnails } from '../api/bookApi';
import '../styles/HomePage.css';

function HomePage() {
  const [bookList, setBookList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThumbnails = async () => {
      const data = await getHomeThumbnails();
      setBookList(data);
    };

    fetchThumbnails();
  }, []);

  const handleClick = (isbn) => {
    const cleanIsbn = isbn?.split(' ').find((s) => s.length === 13) || isbn;
    navigate(`/detail/${cleanIsbn}`);
  };

  return (
    <div className="home-container">
      <h2>📚 2024 베스트셀러 TOP 12</h2>
      <div className="book-grid">
        {bookList.map((book, idx) => (
          <div key={book.isbn || idx} className="book-item" onClick={() => handleClick(book.isbn)}>
            {book.thumbnail ? (
              <img src={book.thumbnail} alt={book.title} />
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
