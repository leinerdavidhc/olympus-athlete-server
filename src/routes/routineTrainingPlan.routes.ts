import { Router } from 'express';
import { RoutineTrainingPlanController } from '../controllers/trainingPlan.controller';

export default class RoutineTrainingPlanRouter {
    public router: Router = Router();

    constructor() {
        this.initializer();
    }

    private initializer() {
        this.router.post('/routine-training-plans', RoutineTrainingPlanController.create);
        this.router.get('/routine-training-plans', RoutineTrainingPlanController.getAll);
        this.router.get('/routine-training-plans/:id', RoutineTrainingPlanController.getById);
        this.router.delete('/routine-training-plans/:id', RoutineTrainingPlanController.delete);
    }
}
