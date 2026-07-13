import { Router } from "express";
import { auth } from "../../middlewares/auth";
import adminController from "./admin.controller";

const adminRoutes = Router();

adminRoutes.get("/stats", auth("ADMIN"), adminController.getAdminStats);
adminRoutes.get(
    "/delivery-partners",
    auth("ADMIN"),
    adminController.getDeliveryPartners,
);
adminRoutes.post(
    "/delivery-partners",
    auth("ADMIN"),
    adminController.createDeliveryPartner,
);
adminRoutes.put(
    "/delivery-partners/:id",
    auth("ADMIN"),
    adminController.updateDeliveryPartner,
);
adminRoutes.put(
    "/orders/:id/assign",
    auth("ADMIN"),
    adminController.assignDeliveryPartner,
);

export default adminRoutes;
