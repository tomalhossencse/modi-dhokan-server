import { Role, UserStatus } from "../../generated/prisma/enums";

export interface JwtPayload {
    id: string;
    name: string;
    email: string;
    role: Role;
    status: UserStatus;
}

export interface IResisterPayload {
    name: string;
    email: string;
    password: string;
    phone?: string;
    avatar?: string;
}
export interface ILoginPayload {
    email: string;
    password: string;
}
