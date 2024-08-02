import { Router } from 'express';
import { StretchController } from '../controllers/stretches.controller';
import UploadFilesToCloudinary from '../middlewares/uploadFilesToCloudinary.middleware';

export default class StretchRouter {
    public router: Router = Router();

    constructor() {
        this.initializer();
    }

    private initializer() {
        // Ruta para crear un nuevo estiramiento
        this.router.post('/stretches',
            UploadFilesToCloudinary.upload,
            UploadFilesToCloudinary.uploadFiles('stretches'),
            StretchController.create
        );

        // Ruta para obtener todos los estiramientos
        this.router.get('/stretches', StretchController.getAll);

        // Ruta para obtener un estiramiento por ID
        this.router.get('/stretches/:id', StretchController.getById);

        // Ruta para actualizar un estiramiento por ID
        this.router.put('/stretches/:id',
            UploadFilesToCloudinary.upload,
            UploadFilesToCloudinary.uploadFiles('stretches'),
            StretchController.update
        );

        // Ruta para eliminar un estiramiento por ID
        this.router.delete('/stretches/:id', StretchController.delete);
    }
}
