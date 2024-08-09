import { Request, Response, NextFunction } from "express"
import { UserValidator } from "../validators/user.validator";

export class UserMiddleware {
    static validateLogin(req: Request, res: Response, next: NextFunction) {
        const validationResult = UserValidator.validateUserLogin(req.body)
        if (!validationResult.valid) return res.status(401).json({ message: "it is not possible to log in" })
            
        req.body.email = req.body.email.toLowerCase().trim();
        req.body.password = req.body.password.trim();

        next()
    }

    static validateRegister(req: Request, res: Response, next: NextFunction) {
        
        req.body.email = req.body.email.toLowerCase().trim();
        req.body.password = req.body.password.trim();
        req.body.fullname = req.body.fullname.toLowerCase().trim();
        req.body.height = parseFloat(req.body.height)
        req.body.weight = parseFloat(req.body.weight)

        const validationResult = UserValidator.validateUserRegister(req.body)
        if (!validationResult.valid) return res.status(401).json({ error: validationResult.errors })

        next()
    }
}