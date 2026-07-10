import { Router } from "express";
import productController from "./product.controller";
import { auth } from "../../middlewares/auth";

const productRoutes = Router();

productRoutes.post("/", auth("ADMIN"), productController.createProduct);
productRoutes.get("/flash-deals", productController.getFlashDeals);
productRoutes.get("/", productController.getProducts);
productRoutes.get("/:id", productController.getProduct);

export default productRoutes;
