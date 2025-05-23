/**
 * bookApi.js (vercel serverless API 호출 방식)
 * 클라이언트에서는 API 키를 직접 사용하지 않고,
 * Vercel에 배포된 serverless 함수의 endpoint로 요청
 */

const BASE_URL = process.env.VITE_API_GATEWAY_URL;

/**
 * 책 검색 함수
 * @param {string} query - 검색어 (제목/저자 등)
 * @returns {Promise}
 */
export const searchBooks = async (query) => {
  try {
    const res = await fetch(`${BASE_URL}/api/books?query=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("API 호출 실패");

    const data = await res.json();
    return data.documents || [];
  } catch (error) {
    console.error("📚 검색 오류:", error);
    return [];
  }
};
