import { Router } from 'express';
import { ChallengeController } from '../controllers/challenge.controller';

export default class ChallengeRouter {
    public router: Router = Router();

    constructor() {
        this.initializer();
    }

    private initializer() {
        this.router.post('/challenges', ChallengeController.create);
        this.router.get('/challenges', ChallengeController.getAll);
        this.router.get('/challenges/:id', ChallengeController.getById);
        this.router.put('/challenges/:id', ChallengeController.update);
        this.router.delete('/challenges/:id', ChallengeController.delete);
    }
}
