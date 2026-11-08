import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import authService from "./auth.service";

class AuthController {
	register = catchAsync(async (req: Request, res: Response) => {
		const payload = req.body;

		const { accessToken, refreshToken, user } =
			await authService.register(payload);

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: false,
			sameSite: "none",
			maxAge: 1000 * 60 * 60,
		});

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: false,
			sameSite: "none",
			maxAge: 1000 * 60 * 60 * 24 * 7,
		});

		sendResponse(res, {
			success: true,
			status: httpStatus.CREATED,
			message: "User registered successfully",
			data: {
				accessToken,
				user,
			},
		});
	});

	login = catchAsync(async (req: Request, res: Response) => {
		const payload = req.body;

		const { accessToken, refreshToken, user } =
			await authService.login(payload);

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: false,
			sameSite: "none",
			maxAge: 1000 * 60 * 60,
		});

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: false,
			sameSite: "none",
			maxAge: 1000 * 60 * 60 * 24 * 7,
		});

		sendResponse(res, {
			success: true,
			status: httpStatus.OK,
			message: "User logged in successfully",
			data: {
				accessToken,
				user,
			},
		});
	});
}

export default new AuthController();
