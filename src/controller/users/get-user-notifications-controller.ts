import { Request, Response } from "express";

const getUserNotificationsController = async (req: Request, res: Response): Promise<any> => {
  const { notifications } = res.locals;
  
  res.status(201).send(notifications);
};

export default getUserNotificationsController;
