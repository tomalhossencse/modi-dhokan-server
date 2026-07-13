import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import adminService from "./admin.service";

class AdminController {
    getAdminStats = catchAsync(async (req: Request, res: Response) => {
        const result = await adminService.getAdminStats();
        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "Admin stats retrived successfully",
            data: result,
        });
    });

    getDeliveryPartners = catchAsync(async (req: Request, res: Response) => {
        const result = await adminService.getDeliveryPartners();

        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "Delivery partners retrived successfully",
            data: result,
        });
    });

    createDeliveryPartner = catchAsync(async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await adminService.createDeliveryPartner(payload);

        sendResponse(res, {
            success: true,
            status: httpStatus.CREATED,
            message: "Delivery partners created successfully",
            data: result,
        });
    });

    updateDeliveryPartner = catchAsync(async (req: Request, res: Response) => {
        const payload = req.body;
        const partnerId = req.params?.id;
        const result = await adminService.updateDeliveryPartner(
            partnerId as string,
            payload,
        );

        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "Delivery partner updated successfully",
            data: result,
        });
    });

    assignDeliveryPartner = catchAsync(async (req: Request, res: Response) => {
        const partnerId = req.body?.partnerId;
        const orderId = req.params?.id;
        const result = await adminService.assignDeliveryPartner(
            orderId as string,
            partnerId,
        );

        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "Delivery partner Assigned successfully",
            data: result,
        });
    });
}

export default new AdminController();
