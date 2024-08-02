import {Router} from "express"
import ProfileController from "../controllers/profile.controller";

export default class ProfileRouter{
    public router:Router = Router();
    constructor(){
        this.initializer();
    }

    private initializer(){
        this.router.get("/profile/getall",ProfileController.getAllProfiles);
    }
}