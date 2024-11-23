import { Response, Request, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import jwt from "jsonwebtoken";

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ResponseError(401, "Authorization token is missing");
  }

  // Pisahkan "Bearer" dan token
  const token = authHeader.split(" ")[1];

  try {
    // Verifikasi token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
      role: string;
    };

    // Simpan data pengguna yang ter-decode ke dalam request
    req.user = decoded;

    // Lanjutkan ke middleware berikutnya
    next();
  } catch (error) {
    // Tangani error jika token tidak valid atau kedaluwarsa
    throw new ResponseError(401, "Invalid or expired token");
  }
};
