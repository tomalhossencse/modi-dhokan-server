import { Router } from "express";
import orderController from "./order.controller";
import { auth } from "../../middlewares/auth";
import { admin } from "../../middlewares/admin";

const orderRoutes = Router();

orderRoutes.post("/", auth, orderController.createOrder);
orderRoutes.get("/", auth, orderController.getCustomerOrders);
orderRoutes.get("/:id", auth, orderController.getCustomerOrders);
orderRoutes.put("/:id/status", auth, admin, orderController.getCustomerOrders);
orderRoutes.put("/all", auth, admin, orderController.getAllOrders);
orderRoutes.put("/:id/location", auth, orderController.getlOrderLocation);

export default orderRoutes;
