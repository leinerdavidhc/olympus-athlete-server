import { Request, Response } from 'express';
import { BlogArticle } from '../models/blogArticle.model';
import { User } from '../models/user.model';

export class BlogArticleController {

    // Crear un nuevo artículo de blog
    public static async create(req: Request, res: Response): Promise<Response> {
        try {
            const { title, content, authorId, publishDate } = req.body;

            // Verificar que el autor existe
            const author = await User.findByPk(authorId);
            if (!author) {
                return res.status(404).json({ error: 'Autor no encontrado' });
            }

            const newArticle = await BlogArticle.create({
                title,
                content,
                authorId,
                publishDate
            });

            return res.status(201).json(newArticle);
        } catch (error) {
            console.error('Error al crear el artículo de blog:', error);
            return res.status(500).json({ error: 'Error al crear el artículo de blog' });
        }
    }

    // Obtener todos los artículos de blog
    public static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const articles = await BlogArticle.findAll({
                include: [{ model: User, attributes: ['id', 'username', 'email'] }]
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
                include: [{ model: User, attributes: ['id', 'username', 'email'] }]
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
    public static async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { title, content, authorId, publishDate } = req.body;

            const article = await BlogArticle.findByPk(id);
            if (!article) {
                return res.status(404).json({ error: 'Artículo de blog no encontrado' });
            }

            // Verificar si el autor ha cambiado y si existe
            if (authorId && authorId !== article.authorId) {
                const author = await User.findByPk(authorId);
                if (!author) {
                    return res.status(404).json({ error: 'Autor no encontrado' });
                }
            }

            await article.update({
                title: title || article.title,
                content: content || article.content,
                authorId: authorId || article.authorId,
                publishDate: publishDate || article.publishDate
            });

            return res.status(200).json(article);
        } catch (error) {
            console.error('Error al actualizar el artículo de blog:', error);
            return res.status(500).json({ error: 'Error al actualizar el artículo de blog' });
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
