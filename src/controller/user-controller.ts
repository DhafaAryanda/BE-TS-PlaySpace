import { Request, Response, NextFunction } from "express";
import {
  CreateUserRequest,
  LoginUserRequest,
  UpdateUserRequest,
} from "../model/user-model";

import { UserRequest } from "../type/user-request";
import { UserService } from "../services/user-service";

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
    try {
      const request: LoginUserRequest = req.body as LoginUserRequest;
      const response = await UserService.login(request);
      res.status(200).json({
        message: "User logged in successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  // Endpoint untuk mengambil profil pengguna
  static async profile(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user; // Data pengguna dari middleware
      if (!user) {
        res.status(401).json({
          message: "Unauthorized",
        });
        return;
      }

      res.status(200).json({
        message: "User profile retrieved successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}
