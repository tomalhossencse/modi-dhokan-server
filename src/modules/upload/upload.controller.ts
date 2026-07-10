import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import cloudinary from "../../config/coudinary";

class UploadController {
    upload = catchAsync(async (req: Request, res: Response) => {
        if (!req.file) {
            throw new Error("No image file provided");
        }

        const b64 = Buffer.from(req.file.buffer).toString("base64");

        const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

        const { secure_url } = await cloudinary.uploader.upload(dataURI, {
            folder: "grocery-delivery",
            resource_type: "auto",
        });

        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "Image upload successfully",
            data: {
                url: secure_url,
            },
        });
    });
}

export default new UploadController();
