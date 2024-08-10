import { Router } from 'express';
import { BlogArticleController } from '../controllers/blogArticle.controller';
import UploadFilesToCloudinary from '../middlewares/uploadFilesToCloudinary.middleware';

export default class BlogArticleRouter {
    public router: Router = Router();

    constructor() {
        this.initializer();
    }

    private initializer() {
        // Ruta para crear un nuevo artículo de blog con imagen
        this.router.post('/blog-articles',
            UploadFilesToCloudinary.upload,
            UploadFilesToCloudinary.uploadFiles('blog_articles'),
            BlogArticleController.create
        );

        // Ruta para obtener todos los artículos de blog
        this.router.get('/blog-articles', BlogArticleController.getAll);

        // Ruta para obtener un artículo de blog por ID
        this.router.get('/blog-articles/:id', BlogArticleController.getById);

        // Ruta para actualizar un artículo de blog por ID con imagen
        this.router.put('/blog-articles/:id',
            UploadFilesToCloudinary.upload,
            UploadFilesToCloudinary.uploadFiles('blog_articles'),
            BlogArticleController.update
        );

        // Ruta para eliminar un artículo de blog por ID
        this.router.delete('/blog-articles/:id', BlogArticleController.delete);
    }
}
