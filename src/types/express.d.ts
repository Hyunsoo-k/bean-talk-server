import { Payload } from "./payload.js";

declare global {
  namespace Express {
    interface Request {
      payload?: Payload;
    }
  }
}

export {};