import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./utils/globalError";
import { notFound } from "./utils/notFound";
import config from "./config";

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
    res.send("Hello World");
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
