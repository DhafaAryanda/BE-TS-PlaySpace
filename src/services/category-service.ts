import { UserRole } from "@prisma/client";
import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import {
  CategoryResponse,
  CreateCategoryRequest,
  toCategoryResponse,
  UpdateCategoryRequest,
} from "../model/category-model";
import { CategoryValidation } from "../validation/category-validation";
import { Validation } from "../validation/validation";

export class CategoryService {
  static async create(
    request: CreateCategoryRequest,
    adminId: string
  ): Promise<CategoryResponse> {
    const createRequest = Validation.validate(
      CategoryValidation.CREATE,
      request
    );

    const user = await prismaClient.user.findUnique({
      where: {
        id: adminId,
      },
    });

    // if (!user || user.role !== UserRole.ADMIN) {
    //   throw new ResponseError(403, "You are not authorized to update category");
    // }

    const category = await prismaClient.category.create({
      data: createRequest,
    });

    return toCategoryResponse(category);
  }

  static async update(
    categoryId: string,
    request: UpdateCategoryRequest,
    adminId: string
  ): Promise<CategoryResponse> {
    const updateRequest = Validation.validate(
      CategoryValidation.UPDATE,
      request
    );

    const admin = await prismaClient.user.findUnique({
      where: {
        id: adminId,
      },
    });

    if (!admin || admin.role !== UserRole.ADMIN) {
      throw new ResponseError(403, "You are not authorized to update category");
    }

    const category = await prismaClient.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new ResponseError(404, "Category not found");
    }

    const updatedData: UpdateCategoryRequest = {};

    if (updateRequest.name) {
      updatedData.name = updateRequest.name;
    }
    if (updateRequest.description) {
      updatedData.description = updateRequest.description;
    }
    if (updateRequest.icon) {
      updatedData.icon = updateRequest.icon;
    }

    const result = await prismaClient.category.update({
      where: {
        id: category.id,
      },
      data: updatedData,
    });

    return toCategoryResponse(result);
  }

  static async getAll(): Promise<CategoryResponse[]> {
    const categories = await prismaClient.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    if (categories.length === 0) {
      throw new ResponseError(404, "Category not found");
    }

    return categories.map((categoy) => toCategoryResponse(categoy));
  }
}
