import { Router } from 'express';
import { StretchRoutineStretchController } from '../controllers/stretchRoutine.controller';

export default class StretchRoutineStretchRouter {
    public router: Router = Router();

    constructor() {
        this.initializer();
    }

    private initializer() {
        this.router.post('/stretch-routines/:stretchRoutineId/stretches', StretchRoutineStretchController.addStretch);
        this.router.get('/stretch-routines/:stretchRoutineId/stretches', StretchRoutineStretchController.getStretches);
        this.router.delete('/stretch-routines/:stretchRoutineId/stretches/:stretchId', StretchRoutineStretchController.removeStretch);
    }
}
