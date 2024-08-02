import { Router } from "express";
import UserController  from "../controllers/user.controller";
import { UserMiddleware } from "../middlewares/user.middleware";

export default class UserRouer{
    public router: Router;
    constructor(){
        this.router=Router()
        this.initializer()
    }

    private initializer() {
        this.router.post("/login",UserMiddleware.validateLogin,UserController.Login)
        this.router.post("/register",UserMiddleware.validateRegister,UserController.Register)
        this.router.get("/logout",UserController.Logout)
        this.router.get("/protected",UserController.Protected)
    }
}