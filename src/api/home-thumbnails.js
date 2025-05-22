// /api/home-thumbnails.js
export default async function handler(req, res) {
  const apiKey = process.env.KAKAO_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API 키가 누락되었습니다." });
  }

  const { titles } = req.body;
  if (!Array.isArray(titles)) {
    return res.status(400).json({ error: "titles 배열이 필요합니다." });
  }

  const thumbnails = {};

  for (const title of titles) {
    try {
      const response = await fetch(`https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(title)}`, {
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
        },
      });

      const data = await response.json();
      thumbnails[title] = data.documents?.[0]?.thumbnail || '';
    } catch (err) {
      console.error(`[${title}] 썸네일 로딩 실패`, err);
      thumbnails[title] = '';
    }
  }

  res.status(200).json(thumbnails);
}
