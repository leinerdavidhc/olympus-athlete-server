import { Request, Response } from 'express';
import { BlogArticle } from '../models/blogArticle.model';
import { User } from '../models/user.model';

export class BlogArticleController {

    // Crear un nuevo artículo de blog
    public static async create(req: Request, res: Response): Promise<void> {
        try {
            const { title, content, authorId, publishDate } = req.body;
            const imageUrl = req.body.imageUrl; // Obtener la URL de la imagen

            const newArticle = await BlogArticle.create({
                title,
                content,
                authorId,
                publishDate,
                imageUrl  // Guardar la URL de la imagen
            });

            res.status(201).json(newArticle);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create article' });
        }
    }

    // Obtener todos los artículos de blog
    public static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const articles = await BlogArticle.findAll({
                include: [{ model: User, attributes: ['id', 'fullname', 'email'] }]
            });

            return res.status(200).json(articles);
        } catch (error) {
            console.error('Error al obtener los artículos de blog:', error);
            return res.status(500).json({ error: 'Error al obtener los artículos de blog' });
        }
    }

    // Obtener un artículo de blog por ID
    public static async getById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const article = await BlogArticle.findByPk(id, {
                include: [{ model: User, attributes: ['id', 'fullname', 'email'] }]
            });

            if (!article) {
                return res.status(404).json({ error: 'Artículo de blog no encontrado' });
            }

            return res.status(200).json(article);
        } catch (error) {
            console.error('Error al obtener el artículo de blog:', error);
            return res.status(500).json({ error: 'Error al obtener el artículo de blog' });
        }
    }

    // Actualizar un artículo de blog por ID
    public static async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { title, content, publishDate, imageUrl } = req.body;

            const article = await BlogArticle.findByPk(id);

            if (article) {
                article.title = title;
                article.content = content;
                article.publishDate = publishDate;
                article.imageUrl = imageUrl; // Actualizar la URL de la imagen
                await article.save();
                res.status(200).json(article);
            } else {
                res.status(404).json({ error: 'Article not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to update article' });
        }
    }

    // Eliminar un artículo de blog por ID
    public static async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const article = await BlogArticle.findByPk(id);

            if (!article) {
                return res.status(404).json({ error: 'Artículo de blog no encontrado' });
            }

            await article.destroy();
            return res.status(204).send();
        } catch (error) {
            console.error('Error al eliminar el artículo de blog:', error);
            return res.status(500).json({ error: 'Error al eliminar el artículo de blog' });
        }
    }
}
