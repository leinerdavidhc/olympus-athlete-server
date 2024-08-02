import { Router } from 'express';
import { MuscleGroupController } from '../controllers/muscleGroup.controller';
import { UploadCloudinary } from '../middlewares/upload.middleware';

export default class MuscleGroupRouter {
    public router: Router = Router();

    constructor() {
        this.initializer();
    }

    private initializer() {
        this.router.post('/muscle-groups',
            UploadCloudinary.upload.single("image"),
            UploadCloudinary.Uploadfile('muscleGroup'),
            MuscleGroupController.create
        );

        this.router.get('/muscle-groups', MuscleGroupController.getAll);
        this.router.get('/muscle-groups/:id', MuscleGroupController.getById);

        this.router.put('/muscle-groups/:id',
            UploadCloudinary.upload.single("image"),
            UploadCloudinary.Uploadfile('muscleGroup'),
            MuscleGroupController.update
        );

        this.router.delete('/muscle-groups/:id', MuscleGroupController.delete);
    }
}
