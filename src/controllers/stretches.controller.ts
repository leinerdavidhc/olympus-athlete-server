import { Request, Response } from 'express';
import { Stretch, StretchI } from '../models/stretch.model';
import cloudinary from '../libs/cloudinary.config';
import { Utils } from '../libs/utils';

export class StretchController {
    // Crear un nuevo estiramiento
    public static async create(req: Request, res: Response): Promise<Response> {
        try {
            const {
                name,
                instructions,
                repetitions,
                sets,
                time,
                animationUrl,
                videoUrl,
                imageUrl
            } = req.body;

            const newStretch: StretchI = await Stretch.create({
                name,
                instructions,
                repetitions,
                sets,
                time,
                animationUrl,
                videoUrl: videoUrl ? Utils.convertYouTubeUrlToEmbed(videoUrl) : "",
                imageUrl
            });

            return res.status(201).json({ newStretch });
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            return res.status(500).json({ error: 'Error al procesar la solicitud: ' + error });
        }
    }

    // Obtener todos los estiramientos
    public static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const stretches = await Stretch.findAll();
            return res.status(200).json(stretches);
        } catch (error) {
            console.error('Error al obtener los estiramientos:', error);
            return res.status(500).json({ error: 'Error al obtener los estiramientos' });
        }
    }

    // Obtener un estiramiento por ID
    public static async getById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const stretch = await Stretch.findByPk(id);

            if (!stretch) {
                return res.status(404).json({ error: 'Estiramiento no encontrado' });
            }

            return res.status(200).json(stretch);
        } catch (error) {
            console.error('Error al obtener el estiramiento:', error);
            return res.status(500).json({ error: 'Error al obtener el estiramiento' });
        }
    }

    // Actualizar un estiramiento por ID
    public static async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const {
                name,
                instructions,
                repetitions,
                sets,
                time,
                animationUrl,
                videoUrl,
                imageUrl
            } = req.body;

            const stretch = await Stretch.findByPk(id);

            if (!stretch) {
                return res.status(404).json({ error: 'Estiramiento no encontrado' });
            }

            // Función para extraer el public_id de una URL
            const extractPublicId = (url: string) => {
                const parts = url.split('/');
                const filename = parts.pop() || '';
                return filename.split('.')[0];
            };

            // Comparar y eliminar la imagen antigua de Cloudinary si es diferente
            if (imageUrl && stretch.imageUrl && imageUrl !== stretch.imageUrl) {
                const oldPublicId = extractPublicId(stretch.imageUrl);
                const newPublicId = extractPublicId(imageUrl);

                if (oldPublicId !== newPublicId) {
                    await cloudinary.uploader.destroy(`olympus_athlete/stretches/${oldPublicId}`);
                }
            }

            // Comparar y eliminar la animación antigua de Cloudinary si es diferente
            if (animationUrl && stretch.animationUrl && animationUrl !== stretch.animationUrl) {
                const oldPublicId = extractPublicId(stretch.animationUrl);
                const newPublicId = extractPublicId(animationUrl);

                if (oldPublicId !== newPublicId) {
                    await cloudinary.uploader.destroy(`olympus_athlete/stretches/${oldPublicId}`);
                }
            }

            await stretch.update({
                name: name || stretch.name,
                instructions: instructions || stretch.instructions,
                repetitions: repetitions || stretch.repetitions,
                sets: sets || stretch.sets,
                time: time || stretch.time,
                animationUrl: animationUrl || stretch.animationUrl,
                videoUrl: videoUrl || stretch.videoUrl,
                imageUrl: imageUrl || stretch.imageUrl
            });

            return res.status(200).json(stretch);
        } catch (error) {
            console.error('Error al actualizar el estiramiento:', error);
            return res.status(500).json({ error: 'Error al actualizar el estiramiento' });
        }
    }



    // Eliminar un estiramiento por ID
    public static async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const stretch = await Stretch.findByPk(id);

            if (!stretch) {
                return res.status(404).json({ error: 'Estiramiento no encontrado' });
            }

            // Función para extraer el public_id de una URL
            const extractPublicId = (url: string) => {
                const parts = url.split('/');
                const filename = parts.pop() || '';
                return filename.split('.')[0];
            };

            // Eliminar la imagen de Cloudinary si existe
            if (stretch.imageUrl) {
                const publicId = extractPublicId(stretch.imageUrl);

                if (publicId) {
                    console.log(`Eliminando imagen: ${publicId}`);
                    await cloudinary.uploader.destroy(`olympus_athlete/stretches/${publicId}`);
                }
            }

            // Eliminar la animación de Cloudinary si existe
            if (stretch.animationUrl) {
                const publicId = extractPublicId(stretch.animationUrl);

                if (publicId) {
                    console.log(`Eliminando animación: ${publicId}`);
                    await cloudinary.uploader.destroy(`olympus_athlete/stretches/${publicId}`);
                }
            }

            // Elimina la entrada en la base de datos
            await stretch.destroy();
            return res.status(204).send(); // No content
        } catch (error) {
            console.error('Error al eliminar el estiramiento:', error);
            return res.status(500).json({ error: 'Error al eliminar el estiramiento' });
        }
    }

}
