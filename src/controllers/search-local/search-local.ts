import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const KAKAO_LOCAL_API_URL = "https://dapi.kakao.com/v2/local/search/keyword.json";

const searchLocalController = async (req: Request, res: Response) => {
  const { query, page = "1" } = req.query as { query: string; page: string };

  if (!query) {
    res.status(400).json({ message: "검색어를 입력해주세요." });
    return;
  }

  try {
    const params = new URLSearchParams({ query, page, size: "15" });

    const response = await fetch(`${KAKAO_LOCAL_API_URL}?${params.toString()}`, {
      headers: {
        "Authorization": `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("카카오 API 호출 실패");
    }

    const { documents, meta } = await response.json();

    const locals = documents.map((doc: any) => ({
      address: doc.road_address_name || doc.address_name,
      placeName: doc.place_name,
      lng: Number(doc.x), 
      lat: Number(doc.y),
    }));

    res.status(200).json({
      locals,
      meta: { isEnd: meta.is_end },
    });
  } catch (error) {
    res.status(500).json({ message: "서버 내부 에러가 발생했습니다." });
  }
};

export default searchLocalController;