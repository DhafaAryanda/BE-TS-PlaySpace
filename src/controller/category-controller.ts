import { UserRole } from "@prisma/client";
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../model/category-model";
import { CategoryService } from "../services/category-service";
import { UserRequest } from "../type/user-request";
import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../app/database";

export class CategoryController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateCategoryRequest = req.body as CreateCategoryRequest;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          message: "Unauthorized",
        });
        return;
      }

      const user = await prismaClient.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user || user.role !== UserRole.ADMIN) {
        res.status(403).json({
          message: "You are not authorized to create category",
        });
        return;
      }

      const response = await CategoryService.create(request, userId);

      res.status(201).json({
        message: "Category created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateCategoryRequest = req.body as UpdateCategoryRequest;
      const categoryId = req.params.categoryId;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          message: "Unauthorized",
        });
        return;
      }

      const user = await prismaClient.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user || user.role !== UserRole.ADMIN) {
        res.status(403).json({
          message: "You are not authorized to create category",
        });
        return;
      }

      const response = await CategoryService.update(
        categoryId,
        request,
        userId
      );

      res.status(200).json({
        message: "Category updated successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CategoryService.getAll();
      res.status(200).json({
        message: "Categories fetched successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
