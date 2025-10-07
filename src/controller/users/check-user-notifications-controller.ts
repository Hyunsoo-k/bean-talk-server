import type { Request, Response } from "express";

const checkUserNotificationController = async (req: Request, res: Response): Promise<any> => {
  res.status(201).json();
};

export default checkUserNotificationController;
