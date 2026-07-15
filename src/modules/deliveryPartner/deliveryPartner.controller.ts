import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import deliveryPartnerService from "./deliveryPartner.service";

class DeliveryPartnerController {
    loginPartner = catchAsync(async (req: Request, res: Response) => {
        const payload = req.body;
        const { accessToken, refreshToken, user } =
            await deliveryPartnerService.loginPartner(payload);

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
            message: "Delivery Partner logged in successfully",
            data: {
                accessToken,
                user,
            },
        });
    });

    getMyDeliveries = catchAsync(async (req: Request, res: Response) => {
        const partnerId = req.partner?.id;
        const { status } = req.query;
        const result = await deliveryPartnerService.getMyDeliveries(
            partnerId as string,
            status as string,
        );
        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "My Deliveries retrived successfully",
            data: result,
        });
    });

    getSingleDelivery = catchAsync(async (req: Request, res: Response) => {
        const partnerId = req.partner?.id;
        const orderId = req.query.id;
        const result = await deliveryPartnerService.getSingleDelivery(
            partnerId as string,
            orderId as string,
        );
        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "Delivery retrived successfully",
            data: result,
        });
    });

    completeDelivery = catchAsync(async (req: Request, res: Response) => {
        const partnerId = req.partner?.id;
        const orderId = req.query.id;
        const { otp } = req.body;
        const result = await deliveryPartnerService.completeDelivery(
            partnerId as string,
            orderId as string,
            otp,
        );
        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "Delivery completed successfully",
            data: result,
        });
    });

    cancelDelivery = catchAsync(async (req: Request, res: Response) => {
        const partnerId = req.partner?.id;
        const orderId = req.query.id;
        const { reason } = req.body;
        const result = await deliveryPartnerService.cancelDelivery(
            partnerId as string,
            orderId as string,
            reason,
        );
        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "Delivery cancelled",
            data: result,
        });
    });

    updateDeliveryStatus = catchAsync(async (req: Request, res: Response) => {
        const partnerId = req.partner?.id;
        const orderId = req.query.id;
        const { status } = req.body;
        const result = await deliveryPartnerService.updateDeliveryStatus(
            partnerId as string,
            orderId as string,
            status,
        );
        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "Delivery status updated successfully",
            data: result,
        });
    });

    updateLocation = catchAsync(async (req: Request, res: Response) => {
        const partnerId = req.partner?.id;
        const orderId = req.query.id;
        const payload = req.body;
        const result = await deliveryPartnerService.updateLocation(
            partnerId as string,
            orderId as string,
            payload,
        );
        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "Delivery Location updated successfully",
            data: result,
        });
    });
}

export default new DeliveryPartnerController();
