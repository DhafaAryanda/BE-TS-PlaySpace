import { Request } from "express";

export interface UserData {
  id: string;
  email: string;
  role: string;
}

export interface UserRequest extends Request {
  user?: UserData;
}
