import { Request, Response } from "express";

const loginController = async (req: Request, res: Response): Promise<any> => {
  const { accessToken } = res.locals;
  
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
  });

  return res.status(200).json();
};

export default loginController;
