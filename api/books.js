export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "검색어(query)가 필요합니다." });
  }

  const KAKAO_API_KEY = process.env.KAKAO_API_KEY;

  try {
    const response = await fetch(
      `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(query)}&size=10&sort=accuracy`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Kakao API 요청 실패");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("서버 오류:", error);
    res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
}
