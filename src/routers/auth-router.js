import { Router } from "express";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import { userLoginShema, userRegisterSchema } from "../validation/user-schemas.js";
import { refreshController, loginController, registerController, logoutController, sendResetEmailController, resetPasswordController } from "../controllers/auth-controllers.js";
import { resetPasswordSchema, sendResetEmailSchema } from "../validation/auth.js";


const authRouter = Router();

authRouter.post("/register", validateBody(userRegisterSchema), ctrlWrapper(registerController));
authRouter.post("/login", validateBody(userLoginShema), ctrlWrapper(loginController));
authRouter.post("/refresh", ctrlWrapper(refreshController));
authRouter.post("/logout", ctrlWrapper(logoutController))
authRouter.post("/send-reset-email", validateBody(sendResetEmailSchema), ctrlWrapper(sendResetEmailController));
authRouter.post("/reset-pwd", validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));


export default authRouter;