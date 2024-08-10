import { Router } from 'express';
import { MuscleGroupController } from '../controllers/muscleGroup.controller';
import UploadFilesToCloudinary from '../middlewares/uploadFilesToCloudinary.middleware';

export default class MuscleGroupRouter {
    public router: Router = Router();

    constructor() {
        this.initializer();
    }

    private initializer() {
        this.router.post('/muscle-groups',
            UploadFilesToCloudinary.upload,
            UploadFilesToCloudinary.uploadFiles('muscleGroup'),
            MuscleGroupController.create
        );

        this.router.get('/muscle-groups', MuscleGroupController.getAll);
        this.router.get('/muscle-groups/:id', MuscleGroupController.getById);

        this.router.put('/muscle-groups/:id',
            UploadFilesToCloudinary.upload,
            UploadFilesToCloudinary.uploadFiles('muscleGroup'),
            MuscleGroupController.update
        );

        this.router.delete('/muscle-groups/:id', MuscleGroupController.delete);
    }
}
