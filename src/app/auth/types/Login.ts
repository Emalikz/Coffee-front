import { User } from "src/app/types/User";

export class Login{
    email!:string;
    password!: string;
}

export interface LoginResponse {
  token: string
  user: User
}
