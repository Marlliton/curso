import { Router } from "express";
import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { UserRefreshTokensController } from "@modules/accounts/useCases/userRefresTokens/UserRefreshTokensController";

const authenticateRoutes = Router();
const authenticateUserController = new AuthenticateUserController();
const userRefreshTokensController = new UserRefreshTokensController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", userRefreshTokensController.handle);

export { authenticateRoutes };
