import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import productService from "./product.service";
class ProductController {
    createProduct = catchAsync(async (req: Request, res: Response) => {
        const payload = req.body;

        const result = await productService.createProduct(payload);

        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "New Product Added successfully",
            data: result,
        });
    });

    getFlashDeals = catchAsync(async (req: Request, res: Response) => {
        const result = await productService.getFlashDeals();
        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "Flash deals products retrived successfully",
            data: result,
        });
    });

    getProducts = catchAsync(async (req: Request, res: Response) => {
        const query = req.query;
        const result = await productService.getProducts(query);
        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "Products retrived successfully",
            data: result,
        });
    });

    getProduct = catchAsync(async (req: Request, res: Response) => {
        const productId = req.params.id;

        if (!productId) {
            throw new Error("Please provide productId in the params!");
        }

        const result = await productService.getProduct(productId as string);

        sendResponse(res, {
            success: true,
            status: httpStatus.OK,
            message: "Product retrived successfully",
            data: result,
        });
    });
}

export default new ProductController();
