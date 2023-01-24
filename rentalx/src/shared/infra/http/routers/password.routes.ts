import { SendForgotPasswordEmailController } from "@modules/accounts/useCases/sendForgotEmail/SendForgotEmailController";
import { Router } from "express";

const passwordRoutes = Router();
const sendForgotPasswordEmailController = new SendForgotPasswordEmailController();

passwordRoutes.post("/forgot", sendForgotPasswordEmailController.handle);

export { passwordRoutes };
