import { Role } from "./role"

export interface User {
    id: string
    roles: Role[]
    phone: string
    email: string
    passwordHash: string
  }
