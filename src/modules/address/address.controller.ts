import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import addressService from "./address.service";

class AddressCotroller {
    getUserAddresses = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id;
        const result = await addressService.getUserAddresses(userId as string);
        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "Customer addresses retrived successfully",
            data: result,
        });
    });

    addAddress = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id;
        const payload = req.body;
        const result = await addressService.addAddress(
            userId as string,
            payload,
        );
        sendResponse(res, {
            success: true,
            status: httpStatus.CREATED,
            message: "New address added  successfully",
            data: result,
        });
    });

    updateAddress = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id;
        const payload = req.body;
        const addressId = req.params?.id;
        const result = await addressService.updateAddress(
            addressId as string,
            userId as string,
            payload,
        );
        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "New address added successfully",
            data: result,
        });
    });

    deleteAddress = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id;
        const addressId = req.params?.id;
        const result = await addressService.deleteAddress(
            addressId as string,
            userId as string,
        );
        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "Address deleted successfully",
            data: result,
        });
    });
}

export default new AddressCotroller();
