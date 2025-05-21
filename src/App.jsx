import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import BoardPage from "./pages/BoardPage";
import BoardDetailPage from "./pages/BoardDetailPage";
import BookSearchPage from "./pages/BookSearchPage.jsx";
import MyBookListPage from "./pages/MyBookListPage.jsx";
import BookRecommendPage from "./pages/BookRecommendPage.jsx";
import BookDetailPage from "./pages/BookDetailPage.jsx";
import WritePage from './pages/WritePage';

import PrivateRoute from "./components/PrivateRoute";

function AppWrapper() {
  const [username, setUsername] = useState('');
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem('username');
    if (savedUser) {
      setUsername(savedUser);
    }
  }, []);

  const hideNavbarOnRoutes = ['/login', '/signup'];
  const shouldHideNavbar = hideNavbarOnRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar username={username} setUsername={setUsername} />}
      <Routes>
        <Route path="/login" element={<LoginPage setUsername={setUsername} />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/board/:id" element={<BoardDetailPage />} />
          <Route path="/search" element={<BookSearchPage />} />
          <Route path="/recommend" element={<BookRecommendPage />} />
          <Route path="/mylist" element={<MyBookListPage />} />
          <Route path="/detail/:isbn" element={<BookDetailPage />} />
          <Route path="/board/write" element={<WritePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
