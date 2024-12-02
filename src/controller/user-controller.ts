import { Request, Response, NextFunction } from "express";
import {
  CreateUserRequest,
  LoginUserRequest,
  UpdateUserRequest,
} from "../model/user-model";

import { UserRequest } from "../type/user-request";
import { UserService } from "../services/user-service";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtUtil";
import { prismaClient } from "../app/database";
import jwt, { JwtPayload } from "jsonwebtoken";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response = await UserService.register(request);
      res.status(201).json({
        message: "User registered successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const handleRefreshToken = async (userId: string) => {
      const refreshToken = await generateRefreshToken({
        id: userId,
      });
      await UserService.saveRefreshToken(userId, refreshToken);
      return refreshToken;
    };

    try {
      const request: LoginUserRequest = req.body as LoginUserRequest;

      const response = await UserService.login(request);
      const accessToken = generateAccessToken({
        id: response.id,
        role: response.role,
      });

      const refreshToken = await handleRefreshToken(response.id);

      // res.cookie("refreshToken", refreshToken, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      //   sameSite: "strict",
      // });

      res.status(200).json({
        message: "User logged in successfully",
        data: response,
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({
        message: "Bad request: Missing parameters",
      });
      return;
    }

    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
      ) as JwtPayload;
      if (!decoded || !decoded.id) {
        res.status(400).json({
          message: "Invalid token: Missing user id",
        });
        return;
      }

      const storedRefreshToken = await prismaClient.refreshToken.findFirst({
        where: {
          userId: decoded.id,
          token: refreshToken,
        },
      });

      if (!storedRefreshToken) {
        res.status(403).json({
          message: "Invalid token: Token not found",
        });
        return;
      }

      const user = await prismaClient.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
        return;
      }

      const newAccessToken = generateAccessToken({
        id: user.id,
      });
      const newRefreshToken = await generateRefreshToken({
        id: user.id,
      });

      await prismaClient.refreshToken.deleteMany({
        where: {
          userId: user.id,
        },
      });

      await prismaClient.refreshToken.create({
        data: {
          userId: user.id,
          token: newRefreshToken,
        },
      });

      res.status(200).json({
        message: "Token refreshed successfully",
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      next(error);
    }
  }

  // Endpoint untuk mengambil profil pengguna
  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          message: "Unauthorized: No user ID in request",
        });
        return;
      }

      const response = await UserService.get(userId);
      res.status(200).json({
        message: "Profile retrieved successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateUserRequest = req.body as UpdateUserRequest;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          message: "Unauthorized",
        });
        return;
      }

      const response = await UserService.update(userId, request);

      res.status(200).json({
        message: "Profile updated successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          message: "Unauthorized",
        });
        return;
      }

      await UserService.logout(userId);

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(200).json({
        message: "User logged out successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
