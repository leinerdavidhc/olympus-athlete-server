import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller';

export default class ProfileRouter {
    public router: Router = Router();

    constructor() {
        this.initializer();
    }

    private initializer() {
        // Rutas para el manejo de perfiles
        this.router.post('/profiles', ProfileController.create);
        this.router.get('/profiles', ProfileController.getAll);
        this.router.get('/profiles/:id', ProfileController.getById);
        this.router.put('/profiles/:id', ProfileController.update);
        this.router.delete('/profiles/:id', ProfileController.delete);
    }
}
