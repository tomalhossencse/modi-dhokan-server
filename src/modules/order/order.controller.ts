import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import orderService from "./order.service";
import { resourceLimits } from "node:worker_threads";

class OrderController {
    createOrder = catchAsync(async (req: Request, res: Response) => {
        const payload = req.body;
        const userId = req.user.id;

        const { order } = await orderService.createOrder(userId, payload);

        sendResponse(res, {
            success: true,
            status: httpStatus.CREATED,
            message: "Order placed successfully",
            data: { order },
        });
    });

    getCustomerOrders = catchAsync(async (req: Request, res: Response) => {
        const status = req.query.status;
        const userId = req.user.id;

        const result = await orderService.getCustomerOrders(
            userId,
            status as string,
        );
        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "Customer orders retrived successfully",
            data: result,
        });
    });

    geOrder = catchAsync(async (req: Request, res: Response) => {
        const orderId = req.params.id;
        const userId = req.user.id;

        const result = await orderService.getCustomerOrders(
            userId,
            orderId as string,
        );
        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "Order retrived successfully",
            data: result,
        });
    });

    // update orderStatus by Admin
    updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
        const orderId = req.params.id;
        const payload = req.body;

        const result = await orderService.updateOrderStatus(
            payload,
            orderId as string,
        );
        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "order status updated successfully",
            data: result,
        });
    });

    getAllOrders = catchAsync(async (req: Request, res: Response) => {
        const result = await orderService.getAllOrders();
        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "All orders retrived successfully",
            data: result,
        });
    });

    getlOrderLocation = catchAsync(async (req: Request, res: Response) => {
        const orderId = req.params.id;
        const userId = req.user.id;
        const result = await orderService.getOrderLocation(
            orderId as string,
            userId,
        );
        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "order location retrived successfully",
            data: result,
        });
    });
}

export default new OrderController();
