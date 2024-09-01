import createHttpError from "http-errors";
import { findUser, register, resetPassword, sendResetToken } from "../services/auth-services.js";
import { compareHash } from "../utils/hash.js";
import { createSession, deleteSession, findSession } from "../services/session-services.js";
import { generateAuthUrl, getGoogleOAuthName, validateGoogleOAuthCode } from "../utils/googleOAuth2.js";
import {randomBytes} from "node:crypto";


const setupResponseSession = (res, {refreshToken, refreshTokenValidUntil, _id}) => {
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        expires: refreshTokenValidUntil,
    })
    res.cookie("sessionId", _id, {
        httpOnly: true,
        expires: refreshTokenValidUntil,
    })
}

export const registerController = async (req, res) => {
    const { email } = req.body;
    const user = await findUser({ email });
    if (user) {
        throw createHttpError(409, "Email in use");
    }
    const newUser = await register(req.body);

    const data = {
        name: newUser.name,
        email: newUser.email,
    }

    res.status(201).json({
        status: 201,
        data,
        message: "Successfully registered a user!",
    })
}

export const loginController = async (req, res) => {
    const { email, password } = req.body;
    const user = await findUser({ email });
    if(!user){
        throw createHttpError(401, "Email not found");
    }
    const passwordCompare = await compareHash(password, user.password);
    if (!passwordCompare) {
        throw createHttpError(401, "Password invalid");
    }

    const session = await createSession(user._id);
    setupResponseSession(res, session);

    res.json({
        status: 200,
        message: "Successfully logged in an user!",
        data: {
            accessToken: session.accessToken,
        }
    });

}
export const refreshController = async (req, res) => {
    const { refreshToken, sessionId } = req.cookies;
    const currentSession = await findSession({ _id: sessionId, refreshToken });
    if (!currentSession) {
        throw createHttpError(401, "Session not found");
    }
    const refreshController = new Date() > new Date(currentSession.refreshTokenValidUntil);
    if (refreshController) {
        throw createHttpError(401, "Session expired")
    }
    const newSession = await createSession(currentSession.userId);

    setupResponseSession(res, newSession);

    res.json({
        status: 200,
        message: "Successfully logged in an user!",
        data: {
            accessToken: newSession.accessToken,
        }
    });
}
export const logoutController = async (req, res) => {
    const { sessionId } = req.cookies;
    if (!sessionId) {
        throw createHttpError(401, "Session not found");
    }
    await deleteSession({ _id: sessionId });

    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");

    res.status(204).send();
}

export const sendResetEmailController = async (req, res) => {
    await sendResetToken(req.body.email);
    res.json({
        message: "Reset password email has been successfully sent.",
        status: 200,
        data: {},
    });
};

export const resetPasswordController = async (req, res) => {
    await resetPassword(req.body);
    res.json(
        {
            status: 200,
            message: "Password has been successfully reset.",
            data: {},
        })
}

export const getGoogleOAuthController = async(req, res)=>{
    const url = generateAuthUrl();
    res.json({
        status:200,
        message: "Google OAuth url generate successfully",
        data:{
            url,
        }
    })
}
export const authGoogleController = async(req, res) =>{
    const{code} = req.body;
    const ticket = await validateGoogleOAuthCode(code);
    const userPayload = ticket.getPayload();
    if(!userPayload){
        throw createHttpError(401);
    }

    let user = await findUser({email:userPayload.email});
    if(!user){
        const registerData = {
            email: userPayload.email,
            password: randomBytes(10),
            name: getGoogleOAuthName(userPayload),
        }
        user = await register(registerData);
    }
    const session = await createSession(user._id);
    setupResponseSession(res, session);

    res.json({
        status: 200,
        message: "Successfully logged in an user!",
        data: {
            accessToken: session.accessToken,
        }
    });

}