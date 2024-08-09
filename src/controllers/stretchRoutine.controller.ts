import { Request, Response } from 'express';
import { StretchRoutine, StretchRoutineI,StretchRoutineStretch } from '../models/stretchRoutine.model';
import { Stretch } from '../models/stretch.model';

export class StretchRoutineController {

    // Crear un nuevo StretchRoutine
    public static async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name, description, imageUrl, time } = req.body;

            const newStretchRoutine = await StretchRoutine.create({
                name,
                description,
                imageUrl,
                time
            });

            return res.status(201).json(newStretchRoutine);
        } catch (error) {
            console.error('Error al crear el StretchRoutine:', error);
            return res.status(500).json({ error: 'Error al crear el StretchRoutine' });
        }
    }

    // Obtener todos los StretchRoutines
    public static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const stretchRoutines = await StretchRoutine.findAll();

            if (!stretchRoutines.length) {
                return res.status(404).json({ error: 'No se encontraron StretchRoutines' });
            }

            return res.status(200).json(stretchRoutines);
        } catch (error) {
            console.error('Error al obtener los StretchRoutines:', error);
            return res.status(500).json({ error: 'Error al obtener los StretchRoutines' });
        }
    }

    // Obtener un StretchRoutine por ID
    public static async getById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const stretchRoutine = await StretchRoutine.findByPk(id);

            if (!stretchRoutine) {
                return res.status(404).json({ error: 'StretchRoutine no encontrado' });
            }

            return res.status(200).json(stretchRoutine);
        } catch (error) {
            console.error('Error al obtener el StretchRoutine:', error);
            return res.status(500).json({ error: 'Error al obtener el StretchRoutine' });
        }
    }

    // Actualizar un StretchRoutine por ID
    public static async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { name, description, imageUrl, time } = req.body;

            const stretchRoutine = await StretchRoutine.findByPk(id);

            if (!stretchRoutine) {
                return res.status(404).json({ error: 'StretchRoutine no encontrado' });
            }

            await stretchRoutine.update({
                name: name || stretchRoutine.name,
                description: description || stretchRoutine.description,
                imageUrl: imageUrl || stretchRoutine.imageUrl,
                time: time || stretchRoutine.time
            });

            return res.status(200).json(stretchRoutine);
        } catch (error) {
            console.error('Error al actualizar el StretchRoutine:', error);
            return res.status(500).json({ error: 'Error al actualizar el StretchRoutine' });
        }
    }

    // Eliminar un StretchRoutine por ID
    public static async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const stretchRoutine = await StretchRoutine.findByPk(id);

            if (!stretchRoutine) {
                return res.status(404).json({ error: 'StretchRoutine no encontrado' });
            }

            await stretchRoutine.destroy();
            return res.status(204).send(); // No content
        } catch (error) {
            console.error('Error al eliminar el StretchRoutine:', error);
            return res.status(500).json({ error: 'Error al eliminar el StretchRoutine' });
        }
    }
}

export class StretchRoutineStretchController {

    // Agregar un Stretch a un StretchRoutine
    public static async addStretch(req: Request, res: Response): Promise<Response> {
        try {
            const { stretchRoutineId, stretchId, durationInRoutine } = req.body;

            const newStretchRoutineStretch = await StretchRoutineStretch.create({
                stretchRoutineId,
                stretchId,
                durationInRoutine
            });

            return res.status(201).json(newStretchRoutineStretch);
        } catch (error) {
            console.error('Error al agregar el Stretch al StretchRoutine:', error);
            return res.status(500).json({ error: 'Error al agregar el Stretch al StretchRoutine' });
        }
    }

    // Obtener todos los Stretchs en un StretchRoutine
    public static async getStretches(req: Request, res: Response): Promise<Response> {
        try {
            const { stretchRoutineId } = req.params;

            const stretches = await Stretch.findAll({
                include: {
                    model: StretchRoutine,
                    through: {
                        attributes: ['durationInRoutine'],
                        where: { stretchRoutineId }
                    }
                }
            });

            if (!stretches.length) {
                return res.status(404).json({ error: 'No se encontraron Stretches para este StretchRoutine' });
            }

            return res.status(200).json(stretches);
        } catch (error) {
            console.error('Error al obtener los Stretches del StretchRoutine:', error);
            return res.status(500).json({ error: 'Error al obtener los Stretches del StretchRoutine' });
        }
    }

    // Eliminar un Stretch de un StretchRoutine
    public static async removeStretch(req: Request, res: Response): Promise<Response> {
        try {
            const { stretchRoutineId, stretchId } = req.params;

            await StretchRoutineStretch.destroy({
                where: {
                    stretchRoutineId,
                    stretchId
                }
            });

            return res.status(204).send(); // No content
        } catch (error) {
            console.error('Error al eliminar el Stretch del StretchRoutine:', error);
            return res.status(500).json({ error: 'Error al eliminar el Stretch del StretchRoutine' });
        }
    }
}
