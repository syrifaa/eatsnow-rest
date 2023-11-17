import { Request } from "express";

export interface UserData {
    email: string;
    username: string;
    password: string;
    profile_img: string;
}

export interface ValidationRequest extends Request {
    userData: UserData;
}