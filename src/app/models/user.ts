import { Role } from "./role"

export interface User {
    id: string
    roles: string[]
    phone: string
    email: string
    passwordHash: string
    token: string
    firstName: string
    lastName: string
  }

export interface UserFormValues {
  email: string;
  password: string;
  phone?:string;
  firstName?: string;
  lastName?: string;
}