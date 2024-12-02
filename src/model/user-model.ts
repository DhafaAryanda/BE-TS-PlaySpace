import { User } from "@prisma/client";

export type UserResponse = {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  avatar?: string | null;
  role: string;
};

export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  name?: string;
  password?: string;
  phone?: string;
  address?: string;
  avatar?: string;
};

export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    name: user.name,
    phone: user.phone,
    address: user.address,
    avatar: user.avatar || null,
    role: user.role,
  };
}
