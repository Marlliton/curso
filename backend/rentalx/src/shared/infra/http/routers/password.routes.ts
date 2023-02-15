import { ResetPasswordController } from "@modules/accounts/useCases/resetPassword/ResetPasswordController";
import { SendForgotPasswordEmailController } from "@modules/accounts/useCases/sendForgotEmail/SendForgotEmailController";
import { Router } from "express";

const passwordRoutes = Router();
const sendForgotPasswordEmailController = new SendForgotPasswordEmailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post("/forgot", sendForgotPasswordEmailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };
