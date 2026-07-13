import { catchAsync } from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { sendResponse } from "../utils/sendResponse";
import config from "../config";

export const admin = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return sendResponse(res, {
                success: false,
                message: "unauthorized access",
                status: httpStatus.UNAUTHORIZED,
            });
        }
        const adminEmails = config.admin_emials
            ? config.admin_emials.split(",").map((e) => e.trim().toLowerCase())
            : [];

        if (adminEmails.includes(req.user.email)) {
            if (req.user) req.user.isAdmin = true;
            next();
        }

        return sendResponse(res, {
            success: false,
            message: "You have no permissions to access",
            status: httpStatus.FORBIDDEN,
        });
    },
);
