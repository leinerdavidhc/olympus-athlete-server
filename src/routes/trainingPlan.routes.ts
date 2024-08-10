import { Router } from 'express';
import { TrainingPlanController } from '../controllers/trainingPlan.controller';

export default class TrainingPlanRouter {
    public router: Router = Router();

    constructor() {
        this.initializer();
    }

    private initializer() {
        this.router.post('/training-plans', TrainingPlanController.create);
        this.router.get('/training-plans', TrainingPlanController.getAll);
        this.router.get('/training-plans/:id', TrainingPlanController.getById);
        this.router.put('/training-plans/:id', TrainingPlanController.update);
        this.router.delete('/training-plans/:id', TrainingPlanController.delete);
    }
}
