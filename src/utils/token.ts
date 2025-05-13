import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(403).json({ status: false, message: "Token not found" });
    return;
  }
  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) {
        res.status(403).json({
          status: false,
          message: "Token expired or invalid",
        });
        return;
      }

      req.headers.userId = user.userId;

      next();
    }
  );
}

function authenticateAdminToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(403).json({ status: false, message: "Token not found" });
    return;
  }
  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) {
        res.status(403).json({
          status: false,
          message: "Token expired or invalid",
        });
        return;
      }
      if (!user.isAdmin) {
        res.status(403).json({
          status: false,
          message: "You have no access",
        });
        return;
      }
      req.headers.isAdmin = user.isAdmin;
      req.headers.userId = user.userId;

      next();
    }
  );
}

export { authenticateToken, authenticateAdminToken };
