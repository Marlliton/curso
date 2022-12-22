import { Router } from "express";
import { categoryRouter } from "./category.routes";
import { specificationsRouter } from "./specification.routes";

const routers = Router();

routers.use("/categories", categoryRouter);
routers.use("/specifications", specificationsRouter);

export { routers };
