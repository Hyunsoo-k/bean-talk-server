import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const verifyAccessToken = (accessToken: string) => {
  const payload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY!) as { user_id: string };

  return payload;
};

export default verifyAccessToken