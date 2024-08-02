import { Router } from 'express';
import { RoutineController } from '../controllers/routine.controller';

export default class RoutineRouter {
    public router: Router = Router();

    constructor() {
        this.initializer();
    }

    private initializer() {
        this.router.post('/routines', RoutineController.create);
        this.router.get('/routines', RoutineController.getAll);
        this.router.get('/routines/:id', RoutineController.getById);
        this.router.put('/routines/:id', RoutineController.update);
        this.router.delete('/routines/:id', RoutineController.delete);
    }
}
