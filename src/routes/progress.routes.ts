import { Router } from 'express';
import { ProgressController } from '../controllers/progress.controller';

export default class ProgressRouter {
    public router: Router = Router();

    constructor() {
        this.initializer();
    }

    private initializer() {
        this.router.post('/progress', ProgressController.create);
        this.router.get('/progress/user/:userId', ProgressController.getAllByUser);
        this.router.get('/progress/:id', ProgressController.getById);
        this.router.put('/progress/:id', ProgressController.update);
        this.router.delete('/progress/:id', ProgressController.delete);
    }
}
