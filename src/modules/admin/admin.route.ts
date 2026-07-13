import { Router } from "express";
import { auth } from "../../middlewares/auth";
import adminController from "./admin.controller";
import { admin } from "../../middlewares/admin";

const adminRoutes = Router();

adminRoutes.get("/stats", auth, admin, adminController.getAdminStats);

adminRoutes.get(
    "/delivery-partners",
    auth,
    admin,
    adminController.getDeliveryPartners,
);
adminRoutes.post(
    "/delivery-partners",
    auth,
    admin,
    adminController.createDeliveryPartner,
);
adminRoutes.put(
    "/delivery-partners/:id",
    auth,
    admin,
    adminController.updateDeliveryPartner,
);
adminRoutes.put(
    "/orders/:id/assign",
    auth,
    admin,
    adminController.assignDeliveryPartner,
);

export default adminRoutes;
