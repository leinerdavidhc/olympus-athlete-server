import { Router } from 'express';
import { StretchRoutineController } from '../controllers/stretchRoutine.controller';

export default class StretchRoutineRouter {
    public router: Router = Router();

    constructor() {
        this.initializer();
    }

    private initializer() {
        this.router.post('/stretch-routines', StretchRoutineController.create);
        this.router.get('/stretch-routines', StretchRoutineController.getAll);
        this.router.get('/stretch-routines/:id', StretchRoutineController.getById);
        this.router.put('/stretch-routines/:id', StretchRoutineController.update);
        this.router.delete('/stretch-routines/:id', StretchRoutineController.delete);
    }
}
