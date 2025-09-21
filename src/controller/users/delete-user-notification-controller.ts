import { Request, Response } from "express";

const deleteUserNotificationController = async (req: Request, res: Response): Promise<any> => {
  return res.status(204).json();
};

export default deleteUserNotificationController;
