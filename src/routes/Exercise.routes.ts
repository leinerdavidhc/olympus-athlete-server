import { Router } from 'express';
import { ExerciseController } from '../controllers/exercise.controller';
import UploadFilesToCloudinary from '../middlewares/uploadFilesToCloudinary.middleware';

export default class ExerciseRouter {
    public router: Router = Router();

    constructor() {
        this.initializer();
    }

    private initializer() {
        // Ruta para crear un nuevo ejercicio
        this.router.post('/exercises',
            UploadFilesToCloudinary.upload,
            UploadFilesToCloudinary.uploadFiles('exercises'),
            ExerciseController.create
        );

        // Ruta para obtener todos los ejercicios
        this.router.get('/exercises', ExerciseController.getAll);

        // Ruta para obtener un ejercicio por ID
        this.router.get('/exercises/:id', ExerciseController.getById);

        // Ruta para actualizar un ejercicio por ID
        this.router.put('/exercises/:id',
            UploadFilesToCloudinary.upload,
            UploadFilesToCloudinary.uploadFiles('exercises'),
            ExerciseController.update
        );

        // Ruta para eliminar un ejercicio por ID
        this.router.delete('/exercises/:id', ExerciseController.delete);
    }
}
