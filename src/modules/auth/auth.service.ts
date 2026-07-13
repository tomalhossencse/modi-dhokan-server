import { ILoginPayload, IResisterPayload, JwtPayload } from "../../types";
import bcrypt from "bcrypt";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { signToken } from "../../utils/jwt";
class AuthService {
    async hashPassword(password: string) {
        const hashedPassword = await bcrypt.hash(
            password,
            Number(config.bcrypt_salt_rounds),
        );
        return hashedPassword;
    }

    async comparePassword(password: string, hashedPassword: string) {
        const isMatchPassword = await bcrypt.compare(password, hashedPassword);
        return isMatchPassword;
    }

    getAdminStatus(email: string | null | undefined): boolean {
        if (!email) return false;

        const adminEmails = config.admin_emials
            ? config.admin_emials.split(",").map((e) => e.trim().toLowerCase())
            : [];

        return adminEmails.includes(email.toLowerCase());
    }

    async register(payload: IResisterPayload) {
        const { name, email, password } = payload;
        if (!name || !email || !password) {
            throw new Error("Please provide all fields");
        }

        const hashedPassword = await this.hashPassword(password);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
            omit: {
                password: true,
            },
        });

        const jwtPayload = {
            id: user.id,
            name: user.name,
            email: user.email,
        } as JwtPayload;

        const { accessToken, refreshToken } = signToken(jwtPayload);

        const userData: any = { ...user };

        delete userData.password;

        userData.isAdmin = this.getAdminStatus(userData.email);

        return { accessToken, refreshToken, user: userData };
    }

    async login(payload: ILoginPayload) {
        const { email, password } = payload;
        if (!email || !password) {
            throw new Error("Please provide email and password fields");
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
            include: {
                addresses: true,
            },
        });

        if (!user) {
            throw new Error("User not exists with this email!");
        }

        const isMatchPassword = await this.comparePassword(
            password,
            user.password,
        );

        if (!isMatchPassword) {
            throw new Error("Your provided password is incorrect!");
        }

        const jwtPayload = {
            id: user.id,
            name: user.name,
            email: user.email,
        } as JwtPayload;

        const { accessToken, refreshToken } = signToken(jwtPayload);

        const userData: any = { ...user };

        delete userData.password;

        userData.isAdmin = this.getAdminStatus(userData.email);

        return { accessToken, refreshToken, user: userData };
    }
}

export default new AuthService();
