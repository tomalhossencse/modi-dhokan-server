import { Router } from "express";
import productController from "./product.controller";
import { auth } from "../../middlewares/auth";
import { admin } from "../../middlewares/admin";

const productRoutes = Router();

productRoutes.post("/", auth, admin, productController.createProduct);
productRoutes.get("/flash-deals", productController.getFlashDeals);
productRoutes.get("/", productController.getProducts);
productRoutes.get("/:id", productController.getProduct);
productRoutes.put("/:id", auth, admin, productController.updateProduct);
productRoutes.delete("/:id", auth, admin, productController.deleteProduct);

export default productRoutes;
