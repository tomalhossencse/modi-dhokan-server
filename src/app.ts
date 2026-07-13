import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./utils/globalError";
import { notFound } from "./utils/notFound";
import config from "./config";
import authRoutes from "./modules/auth/auth.route";
import productRoutes from "./modules/product/product.route";
import uploadRoutes from "./modules/upload/upload.route";
import orderRoutes from "./modules/order/order.route";
import { functions, inngest } from "./inngest";
import { serve } from "inngest/express";
import addressRoutes from "./modules/address/address.route";
import adminRoutes from "./modules/admin/admin.route";

const app: Application = express();

app.use(
    cors({
        origin: config.app_url,
        credentials: true,
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.send("Server is live");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/addresses", addressRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
