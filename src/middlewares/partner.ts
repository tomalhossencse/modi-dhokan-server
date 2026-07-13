import { catchAsync } from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import httpStatus from "http-status";
import { sendResponse } from "../utils/sendResponse";
import { prisma } from "../lib/prisma";
import { JwtPayload } from "../types";

export const partner = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const accessToken = req.cookies.accessToken
            ? req.cookies.accessToken
            : req.headers.authorization?.startsWith("Bearer ")
              ? req.headers.authorization?.split(" ")[1]
              : req.headers.authorization;

        const payload = verifyToken(accessToken, "access") as JwtPayload;

        if (!payload) {
            return sendResponse(res, {
                success: false,
                message: "Your token is Invalid",
                status: httpStatus.UNAUTHORIZED,
            });
        }

        const partner = await prisma.deliveryPartner.findUnique({
            where: {
                id: payload.id,
            },
        });

        if (!partner) {
            return sendResponse(res, {
                success: false,
                message: "Delivery Partner not Found. Please login again",
                status: httpStatus.NOT_FOUND,
            });
        }

        if (!partner.isActive) {
            return sendResponse(res, {
                success: false,
                message: "Account is deactivated",
                status: httpStatus.FORBIDDEN,
            });
        }

        req.partner = { ...partner };

        next();
    },
);
