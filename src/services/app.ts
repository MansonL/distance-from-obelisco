import cookieParser from "cookie-parser";
import e from "express";
import { errorHandler } from "../middleware/errorHandler";
import { router } from "../routes/route";

export const app: e.Application = e();

app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", router);
app.use(errorHandler);
