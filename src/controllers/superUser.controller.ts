import { Response, Request } from "express";
import { SuperUser, SuperUserI } from "../models/superUser.model";
import { Utils } from "../libs/utils";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config";

export default class SuperUserController {

    static async Login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const superUserExists: SuperUserI | null = await SuperUser.findOne({ where: { email } })

            if (!superUserExists) return res.status(400).json({ menssage: 'Email is not registered' });

            const isMatch = await Utils.comparePassword(password, superUserExists!.password)

            if (!isMatch) return res.status(400).json({ message: "Incorrect password" })

            const token = jwt.sign({ email: superUserExists.email, fullname: superUserExists.fullname }, JWT_SECRET, { expiresIn: "1h" })
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV == 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60
            })

            res.status(200).json({ message: "Login successful" })

        } catch (error) {
            res.status(500).json({ message:"Login failed", error: error })
        }
    }

    static async register(req: Request, res: Response) {
        const { fullname, email, password } = req.body;
        try {
            const superUserExists: SuperUserI | null = await SuperUser.findOne({ where: { email } })
            if (superUserExists) return res.status(400).json({ menssage: 'This email already exists' });

            const newSuperUser: SuperUserI | null = await SuperUser.create({ fullname, email, password })

            res.status(200).json({ message: `Successful registration ${newSuperUser.fullname}` })
        } catch (error) {
            res.status(500).json({ message:"Register failed", error:error})
        }
    }
    static async Logout(req: Request, res: Response) {
        res.clearCookie("access_token")
        res.status(200).json({ message: "session terminated" })
    }

    static async Protected(req: Request, res: Response) {
        const token = req.cookies.access_token;
        
        if (!token) return res.status(401).json({ message: "No token provided" })

        try {
            const decoded=jwt.verify(token,  JWT_SECRET)
            res.json({ message: 'Protected data', user: decoded,authorized:true });
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    }
}