import { Router } from "express";
import addressController from "./address.controller";
import { auth } from "../../middlewares/auth";

const addressRoutes = Router();

addressRoutes.get("/", auth, addressController.getUserAddresses);
addressRoutes.post("/", auth, addressController.addAddress);
addressRoutes.put("/:id", auth, addressController.updateAddress);
addressRoutes.delete("/:id", auth, addressController.deleteAddress);

export default addressRoutes;
