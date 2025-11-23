import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import { TokenPayload } from "../interfaces/tokenIntefaces";

dotenv.config();




export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string) as TokenPayload;

    req.user = decoded; // agora o TS aceita

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid" });
  }
};
