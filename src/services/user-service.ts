import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  LoginUserRequest,
  toUserResponse,
  UpdateUserRequest,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );

    const totalUserWithSameEmail = await prismaClient.user.count({
      where: {
        email: registerRequest.email,
      },
    });

    if (totalUserWithSameEmail > 0) {
      throw new ResponseError(400, "User with same email already exists");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    return toUserResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    const user = await prismaClient.user.findUnique({
      where: {
        email: loginRequest.email,
      },
    });

    if (!user) {
      throw new ResponseError(401, "Email or password is wrong");
    }

    const isPasswordMatch = await bcrypt.compare(
      loginRequest.password,
      user.password
    );

    if (!isPasswordMatch) {
      throw new ResponseError(401, "Email or password is wrong");
    }

    return toUserResponse(user);
  }

  static async saveRefreshToken(userId: string, token: string): Promise<any> {
    return prismaClient.refreshToken.create({
      data: {
        userId: userId,
        token: token,
      },
    });
  }

  // Method untuk mendapatkan profil user berdasarkan userId
  static async get(userId: string): Promise<UserResponse> {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    return toUserResponse(user);
  }

  static async update(
    userId: string,
    request: UpdateUserRequest
  ): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    const updatedData: UpdateUserRequest = {};

    if (updateRequest.name) {
      updatedData.name = updateRequest.name;
    }
    if (updateRequest.phone) {
      updatedData.phone = updateRequest.phone;
    }
    if (updateRequest.address) {
      updatedData.address = updateRequest.address;
    }
    if (updateRequest.password) {
      updatedData.password = bcrypt.hashSync(updateRequest.password, 10);
    }

    const result = await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: updatedData,
    });

    return toUserResponse(result);
  }

  static async logout(userId: string): Promise<void> {
    await prismaClient.refreshToken.deleteMany({
      where: {
        userId: userId,
      },
    });
  }
}
