import { Router } from "express";
import deliveryPartnerController from "./deliveryPartner.controller";
import { partner } from "../../middlewares/partner";

const deliveryPartnerRoutes = Router();

deliveryPartnerRoutes.get(
    "/login",
    partner,

    deliveryPartnerController.loginPartner,
);

deliveryPartnerRoutes.get(
    "/my-deliveries",
    partner,
    deliveryPartnerController.getMyDeliveries,
);

deliveryPartnerRoutes.get(
    "/my-deliveries/:id",
    partner,
    deliveryPartnerController.getSingleDelivery,
);

deliveryPartnerRoutes.put(
    "/my-deliveries/:id/complete",
    partner,
    deliveryPartnerController.completeDelivery,
);

deliveryPartnerRoutes.put(
    "/my-deliveries/:id/cancel",
    partner,
    deliveryPartnerController.cancelDelivery,
);

export default deliveryPartnerRoutes;
