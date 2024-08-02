import { Request, Response } from 'express';
import { Exercise, ExerciseI } from '../models/exercises.model';
import cloudinary from '../libs/cloudinary.config';
import { Utils } from '../libs/utils';


export class ExerciseController {
    // Crear un nuevo ejercicio
    public static async create(req: Request, res: Response): Promise<Response> {
        try {
            const {
                name,
                instructions,
                level,
                repetitions,
                sets,
                time,
                animationUrl,
                videoUrl,
                imageUrl
            } = req.body;

            const newExercise: ExerciseI = await Exercise.create({
                name,
                instructions,
                level,
                repetitions,
                sets,
                time,
                animationUrl,
                videoUrl: videoUrl ? Utils.convertYouTubeUrlToEmbed(videoUrl) : "",
                imageUrl
            });

            return res.status(201).json({ newExercise });
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            return res.status(500).json({ error: 'Error al procesar la solicitud:' + error });
        }
    }

    // Obtener todos los ejercicios
    public static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const exercises = await Exercise.findAll();
            return res.status(200).json(exercises);
        } catch (error) {
            console.error('Error al obtener los ejercicios:', error);
            return res.status(500).json({ error: 'Error al obtener los ejercicios' });
        }
    }

    // Obtener un ejercicio por ID
    public static async getById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const exercise = await Exercise.findByPk(id);

            if (!exercise) {
                return res.status(404).json({ error: 'Ejercicio no encontrado' });
            }

            return res.status(200).json(exercise);
        } catch (error) {
            console.error('Error al obtener el ejercicio:', error);
            return res.status(500).json({ error: 'Error al obtener el ejercicio' });
        }
    }

    // Actualizar un ejercicio por ID
    public static async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const {
                name,
                instructions,
                level,
                repetitions,
                sets,
                time,
                animationUrl,
                videoUrl,
                imageUrl
            } = req.body;

            const exercise = await Exercise.findByPk(id);

            if (!exercise) {
                return res.status(404).json({ error: 'Ejercicio no encontrado' });
            }

            // Función para extraer el public_id de una URL
            const extractPublicId = (url: string) => {
                const parts = url.split('/');
                const filename = parts.pop() || '';
                return filename.split('.')[0];
            };

            // Eliminar la imagen antigua de Cloudinary si hay una nueva
            if (imageUrl && imageUrl !== exercise.imageUrl) {
                const oldPublicId = extractPublicId(exercise.imageUrl);
                const newPublicId = extractPublicId(imageUrl);

                if (oldPublicId!=newPublicId) {
                    console.log(`Eliminando imagen antigua: ${oldPublicId}`);
                    await cloudinary.uploader.destroy(`olympus_athlete/exercises/${oldPublicId}`);
                }
            }

            // Eliminar la animación antigua de Cloudinary si hay una nueva
            if (animationUrl && animationUrl !== exercise.animationUrl) {
                const oldPublicId = extractPublicId(exercise.animationUrl);
                const newPublicId = extractPublicId(animationUrl);

                if (oldPublicId!==newPublicId) {
                    console.log(oldPublicId,newPublicId);
                    
                    await cloudinary.uploader.destroy(`olympus_athlete/exercises/${oldPublicId}`);
                }
            }

            await exercise.update({
                name: name || exercise.name,
                instructions: instructions || exercise.instructions,
                level: level || exercise.level,
                repetitions: repetitions || exercise.repetitions,
                sets: sets || exercise.sets,
                time: time || exercise.time,
                animationUrl: animationUrl || exercise.animationUrl,
                videoUrl: videoUrl || exercise.videoUrl,
                imageUrl: imageUrl || exercise.imageUrl
            });

            return res.status(200).json(exercise);
        } catch (error) {
            console.error('Error al actualizar el ejercicio:', error);
            return res.status(500).json({ error: 'Error al actualizar el ejercicio' });
        }
    }

    // Eliminar un ejercicio por ID
    public static async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const exercise = await Exercise.findByPk(id);

            if (!exercise) {
                return res.status(404).json({ error: 'Ejercicio no encontrado' });
            }

            // Función para extraer el public_id de una URL
            const extractPublicId = (url: string) => {
                const parts = url.split('/');
                const filename = parts.pop() || '';
                return filename.split('.')[0];
            };

            // Eliminar la imagen de Cloudinary si existe
            if (exercise.imageUrl) {
                const publicId = extractPublicId(exercise.imageUrl);

                if (publicId) {
                    console.log(`Eliminando imagen: ${publicId}`);
                    await cloudinary.uploader.destroy(`olympus_athlete/exercises/${publicId}`);
                }
            }

            // Eliminar la animación de Cloudinary si existe
            if (exercise.animationUrl) {
                const publicId = extractPublicId(exercise.animationUrl);

                if (publicId) {
                    console.log(`Eliminando animación: ${publicId}`);
                    await cloudinary.uploader.destroy(`olympus_athlete/exercises/${publicId}`);
                }
            }

            // Elimina la entrada en la base de datos
            await exercise.destroy();
            return res.status(204).send(); // No content
        } catch (error) {
            console.error('Error al eliminar el ejercicio:', error);
            return res.status(500).json({ error: 'Error al eliminar el ejercicio' });
        }
    }

}
