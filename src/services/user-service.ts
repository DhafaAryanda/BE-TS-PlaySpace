import { User } from "@prisma/client";
import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  LoginUserRequest,
  toUserResponse,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d", // Token berlaku selama 1 hari
      }
    );

    // Save token to the database
    await prismaClient.token.create({
      data: {
        token: token,
        user_id: user.id,
        expired_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // Set expired_at to 1 day from now
      },
    });

    const userResponse = toUserResponse(user);
    userResponse.token = token;

    return userResponse;
  }
}
