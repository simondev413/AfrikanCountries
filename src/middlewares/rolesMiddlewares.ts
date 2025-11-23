import { Request, Response, NextFunction } from "express";


export const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if(!req.user.role) {
      return res.status(401).json({ message: "Unauthorized: No role found.",user: req.user });
    }
    if (req.user?.role !== role) {
      return res.status(403).json({
        message: "Forbidden: You do not have the required role to access this resource.",
      });
    }
    next();
  };
};
