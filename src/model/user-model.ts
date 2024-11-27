import { User } from "@prisma/client";

export type UserResponse = {
  name: string;
  token?: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
  avatar?: string;
};

export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  avatar: string;
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
    name: user.name,
    created_at: user.created_at.toISOString(),
    updated_at: user.updated_at.toISOString(),
  };
}

export function toDetailUserResponse(user: User): UserResponse {
  return {
    name: user.name,
    phone: user.phone,
    address: user.address,
    avatar: user.avatar,
    created_at: user.created_at.toISOString(),
    updated_at: user.updated_at.toISOString(),
  };
}
