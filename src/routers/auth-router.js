import { Router } from "express";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import { userLoginShema, userRegisterSchema } from "../validation/user-schemas.js";
import { refreshController, loginController, registerController, logoutController, sendResetEmailController, resetPasswordController, getGoogleOAuthController, authGoogleController } from "../controllers/auth-controllers.js";
import { resetPasswordSchema, sendResetEmailSchema, userGoogleAuthCodeSchema } from "../validation/auth.js";


const authRouter = Router();

authRouter.post("/register", validateBody(userRegisterSchema), ctrlWrapper(registerController));
authRouter.post("/login", validateBody(userLoginShema), ctrlWrapper(loginController));
authRouter.post("/refresh", ctrlWrapper(refreshController));
authRouter.post("/logout", ctrlWrapper(logoutController));
authRouter.get("/get-oauth-url", ctrlWrapper(getGoogleOAuthController));
authRouter.post("/confirm-google-oauth", validateBody(userGoogleAuthCodeSchema), ctrlWrapper(authGoogleController))
authRouter.post("/send-reset-email", validateBody(sendResetEmailSchema), ctrlWrapper(sendResetEmailController));
authRouter.post("/reset-pwd", validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));


export default authRouter;