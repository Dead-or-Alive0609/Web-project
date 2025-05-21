import axios from "axios";

const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

const api = axios.create({
  baseURL: "https://dapi.kakao.com/v3/search/book",
  headers: {
    Authorization: `KakaoAK ${KAKAO_API_KEY}`,
  },
});

/**
 * 책 검색 함수
 * @param {string} query - 검색어 (제목/저자 등)
 * @returns {Promise}
 */
export const searchBooks = async (query) => {
  try {
    const res = await api.get("", {
      params: {
        query,
        size: 10,
        sort: "accuracy", // 또는 "latest"
      },
    });
    return res.data.documents;
  } catch (error) {
    console.error("📚 검색 오류:", error);
    return [];
  }
};
