; import { UserDTO } from "../dto/user.dto.js";
import { generateToken } from "../utils/jwt.js";


class SessionController {

    async register(req, res) {
        try {
            res.status(200).json({
                status: "Success",
                message: "User registered successfully"
            });
        } catch (error) {
            next(error);
        }
    };

    async login(req, res) {
        try {
            const user = new UserDTO(req.user);
            //genera el token y lo almacena en una cookie por 24 horas
            const token = generateToken(req.user);
            res.cookie("token", token, { httpOnly: true, signed: true, sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 1 }); // 1 día

            res.status(200).json({
                status: "Success",
                message: "successful login",
                payload: user
            });
        } catch (error) {
            next(error);
        }
    }

    async google(req, res) {
        try {
            const token = generateToken(req.user);
            res.status(200).json({
                status: "Success",
                session: req.user, token
            });
        } catch (error) {
            next(error);
        }
    }


    async currentUser(req, res) {
        try {
            const user = new UserDTO(req.user);
            res.status(200).json({
                status: "Success",
                user: user
            });
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "Strict" });
            return res.status(200).json({
                status: "Success",
                message: "Logout successful"
            });
        } catch (error) {
            next(error);
        }
    }



}

export const sessionController = new SessionController();