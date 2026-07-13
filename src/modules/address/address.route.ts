import { Router } from "express";
import addressController from "./address.controller";
import { auth } from "../../middlewares/auth";

const addressRoutes = Router();

addressRoutes.get("/", auth("CUSTOMER"), addressController.getUserAddresses);
addressRoutes.post("/", auth("CUSTOMER"), addressController.addAddress);
addressRoutes.put("/:id", auth("CUSTOMER"), addressController.updateAddress);
addressRoutes.delete("/:id", auth("CUSTOMER"), addressController.deleteAddress);

export default addressRoutes;
