import { Category, User } from "@prisma/client";

export type CategoryResponse = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export type CreateCategoryRequest = {
  name: string;
  description: string;
  icon: string;
};

export type UpdateCategoryRequest = {
  name?: string;
  description?: string;
  icon?: string;
};

export function toCategoryResponse(category: Category): CategoryResponse {
  return {
    id: category.id,
    name: category.name,
    description: category.description,
    icon: category.icon,
  };
}
