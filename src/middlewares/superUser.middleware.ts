import {Request, Response, NextFunction} from 'express'
import { SuperUserValidator } from '../validators/superUser.validator'

export class SuperUserMiddleware{
    static async validateLogin(req: Request, res: Response, next: NextFunction) {
        const validationResult = SuperUserValidator.validateLogin(req.body);
    
        if (!validationResult.valid) {
          return res.status(400).json({ error: validationResult.errors});
        }

        req.body.email = req.body.email.toLowerCase().trim();
        req.body.password = req.body.password.trim()
        next();
    }
    static async validateRegister(req: Request, res: Response, next: NextFunction) {
      const validationResult = SuperUserValidator.validateRegister(req.body);
  
      if (!validationResult.valid) {
        return res.status(400).json({error: validationResult.errors});
      }

      req.body.email = req.body.email.toLowerCase().trim();
      req.body.password = req.body.password.trim();
      req.body.fullname = req.body.fullname.toLowerCase().trim();
      next();
  }
}