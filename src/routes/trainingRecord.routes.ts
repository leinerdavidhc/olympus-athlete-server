import { Router } from 'express';
import { TrainingRecordController } from '../controllers/trainingRecord.controller';

export default class TrainingRecordRouter {
    public router: Router = Router();

    constructor() {
        this.initializer();
    }

    private initializer() {
        this.router.post('/training-records', TrainingRecordController.create);
        this.router.get('/training-records', TrainingRecordController.getAll);
        this.router.get('/training-records/:id', TrainingRecordController.getById);
        this.router.put('/training-records/:id', TrainingRecordController.update);
        this.router.delete('/training-records/:id', TrainingRecordController.delete);
    }
}
