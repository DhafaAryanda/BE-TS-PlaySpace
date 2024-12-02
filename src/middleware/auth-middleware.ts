import { Response, Request, NextFunction } from "express";
import { UserData, UserRequest } from "../type/user-request";
import { ResponseError } from "../error/response-error";
import jwt, { JwtPayload } from "jsonwebtoken";

interface UserPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const authenticateToken = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!token) {
    // throw new ResponseError(401, "Access denied, token missing");
    return next(new ResponseError(401, "Access denied, token missing"));
  }
  if (!secret) {
    return next(
      new ResponseError(500, "Server error: JWT_SECRET is not defined")
    );
  }

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new ResponseError(401, "Access denied, malformed authorization header")
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;

    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new ResponseError(401, "Access denied, token expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new ResponseError(401, "Access denied, invalid token");
    }

    next(error);
  }
};
