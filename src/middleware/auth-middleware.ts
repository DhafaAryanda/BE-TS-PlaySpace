import { Response, Request, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { ResponseError } from "../error/response-error";
import jwt from "jsonwebtoken";
import { prismaClient } from "../app/database";

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ResponseError(401, "Authorization token is missing"));
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

    // Periksa apakah token ada di database
    const tokenRecord = await prismaClient.token.findFirst({
      where: {
        token: token,
        user_id: decoded.id, // Pastikan token sesuai dengan user
      },
    });

    if (!tokenRecord) {
      return next(
        new ResponseError(401, "Token is not valid or has been revoked")
      );
    }

    // Cek apakah token telah kedaluwarsa
    if (new Date(tokenRecord.expired_at) < new Date()) {
      return next(new ResponseError(401, "Token has expired"));
    }

    // Simpan data pengguna yang ter-decode ke dalam request
    req.user = decoded;

    // Lanjutkan ke middleware berikutnya
    next();
  } catch (error) {
    // Tangani error jika token tidak valid atau kedaluwarsa
    return next(new ResponseError(401, "Invalid or expired token"));
  }
};
