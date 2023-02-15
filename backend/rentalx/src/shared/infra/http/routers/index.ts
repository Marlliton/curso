import { Router } from "express";
import { categoryRouter } from "./category.routes";
import { specificationsRouter } from "./specification.routes";
import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { carsRouters } from "./cars.routes";
import { rentalsRouters } from "./rentals.routes";
import { passwordRoutes } from "./password.routes";

const routers = Router();

routers.use("/categories", categoryRouter);
routers.use("/specifications", specificationsRouter);
routers.use("/users", usersRoutes);
routers.use("/cars", carsRouters);
routers.use("/rentals", rentalsRouters);
routers.use("/password", passwordRoutes);
routers.use(authenticateRoutes);

export { routers };
