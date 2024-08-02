import { Request, Response } from "express";
import { User, UserI } from "../models/user.model";
import jwt from "jsonwebtoken";
import { Utils } from "../libs/utils";
import { JWT_SECRET } from "../config";

export default class UserController {
  static async Login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user: UserI | null = await User.findOne({ where: { email } });
      if (!user)
        return res.status(400).json({ menssage: "Email is not registered" });
      const isMatch = Utils.comparePassword(user.password, password);
      if (!isMatch)
        return res.status(400).json({ menssage: "Incorrect password" });

      const token = jwt.sign({
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        sexo: user.sexo,
        height: user.height,
        weight: user.weight
      },
        JWT_SECRET, { expiresIn: "1h" });
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      });
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      res.status(500).json({ message: "Login failed", error: error });
    }
  }

  static async Register(req: Request, res: Response) {
    const { fullname, email, password, sexo, height, weight } = req.body;
    try {
      const user: UserI | null = await User.findOne({ where: { email } });
      if (user) return res.status(400).json({ menssage: 'This email already exists' });

      const newUser: UserI | null = await User.create({ fullname, email, password, sexo, height, weight })
      res.status(200).json({ message: `Successful registration ${newUser.fullname}` })
    } catch (error) {
      res.status(500).json({ message: "Register failed", error: error })
    }
  }

  static async Logout(req: Request, res: Response) {
    res.clearCookie("access_token");
    res.status(200).json({ message: "session terminated" });
  }

  static async Protected(req: Request, res: Response) {
    const token = req.cookies.access_token;

    try {
      if (!token) return res.status(401).json({ message: "No token provided" });

      const decoded = jwt.verify(token, JWT_SECRET);
      res.json({ message: "Protected data", user: decoded, authorized: true });
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  }
}
