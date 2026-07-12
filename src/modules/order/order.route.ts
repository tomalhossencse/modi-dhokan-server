import { Router } from "express";
import orderController from "./order.controller";
import { auth } from "../../middlewares/auth";

const orderRoutes = Router();

orderRoutes.post("/", auth("CUSTOMER"), orderController.createOrder);
orderRoutes.get("/", auth("CUSTOMER"), orderController.getCustomerOrders);
orderRoutes.get("/:id", auth("CUSTOMER"), orderController.getCustomerOrders);
orderRoutes.put(
    "/:id/status",
    auth("ADMIN"),
    orderController.getCustomerOrders,
);
orderRoutes.put("/all", auth("ADMIN"), orderController.getAllOrders);
orderRoutes.put(
    "/:id/location",
    auth("CUSTOMER"),
    orderController.getlOrderLocation,
);

export default orderRoutes;
