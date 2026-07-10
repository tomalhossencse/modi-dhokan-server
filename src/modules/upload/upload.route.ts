import { Router } from "express";
import uploadController from "./upload.controller";
import { auth } from "../../middlewares/auth";
import multer from "multer";

const uploadRoutes = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

uploadRoutes.post(
    "/",
    auth("ADMIN"),
    upload.single("image"),
    uploadController.upload,
);

export default uploadRoutes;
