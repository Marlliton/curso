import { Router } from "express";
import { categoryRouter } from "./category.routes";
import { specificationsRouter } from "./specification.routes";
import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";

const routers = Router();

routers.use("/categories", categoryRouter);
routers.use("/specifications", specificationsRouter);
routers.use("/users", usersRoutes);
routers.use(authenticateRoutes);

export { routers }; 