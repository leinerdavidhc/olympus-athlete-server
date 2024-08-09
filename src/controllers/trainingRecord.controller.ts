import { Request, Response } from 'express';
import { TrainingRecord, TrainingRecordI } from '../models/trainingRecord.model';
import { User } from '../models/user.model';

// Controlador para TrainingRecord
export class TrainingRecordController {

    // Crear un nuevo TrainingRecord
    public static async create(req: Request, res: Response): Promise<Response> {
        try {
            const { userId, date } = req.body;

            // Verificar si el usuario existe
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const newTrainingRecord = await TrainingRecord.create({
                userId,
                date
            });

            return res.status(201).json(newTrainingRecord);
        } catch (error) {
            console.error('Error al crear el Registro de Entrenamiento:', error);
            return res.status(500).json({ error: 'Error al crear el Registro de Entrenamiento' });
        }
    }

    // Obtener todos los TrainingRecords
    public static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const trainingRecords = await TrainingRecord.findAll({
                include: [{
                    model: User,
                    attributes: ['id', 'name'] // Suponiendo que User tiene un campo 'name'
                }]
            });

            if (!trainingRecords.length) {
                return res.status(404).json({ error: 'No se encontraron Registros de Entrenamiento' });
            }

            return res.status(200).json(trainingRecords);
        } catch (error) {
            console.error('Error al obtener los Registros de Entrenamiento:', error);
            return res.status(500).json({ error: 'Error al obtener los Registros de Entrenamiento' });
        }
    }

    // Obtener un TrainingRecord por ID
    public static async getById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const trainingRecord = await TrainingRecord.findByPk(id, {
                include: [{
                    model: User,
                    attributes: ['id', 'name'] // Suponiendo que User tiene un campo 'name'
                }]
            });

            if (!trainingRecord) {
                return res.status(404).json({ error: 'Registro de Entrenamiento no encontrado' });
            }

            return res.status(200).json(trainingRecord);
        } catch (error) {
            console.error('Error al obtener el Registro de Entrenamiento:', error);
            return res.status(500).json({ error: 'Error al obtener el Registro de Entrenamiento' });
        }
    }

    // Actualizar un TrainingRecord por ID
    public static async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { userId, date } = req.body;

            // Verificar si el usuario existe
            const user = await User.findByPk(userId);
            if (userId && !user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const trainingRecord = await TrainingRecord.findByPk(id);

            if (!trainingRecord) {
                return res.status(404).json({ error: 'Registro de Entrenamiento no encontrado' });
            }

            await trainingRecord.update({
                userId: userId || trainingRecord.userId,
                date: date || trainingRecord.date
            });

            return res.status(200).json(trainingRecord);
        } catch (error) {
            console.error('Error al actualizar el Registro de Entrenamiento:', error);
            return res.status(500).json({ error: 'Error al actualizar el Registro de Entrenamiento' });
        }
    }

    // Eliminar un TrainingRecord por ID
    public static async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const trainingRecord = await TrainingRecord.findByPk(id);

            if (!trainingRecord) {
                return res.status(404).json({ error: 'Registro de Entrenamiento no encontrado' });
            }

            await trainingRecord.destroy();
            return res.status(204).send(); // No content
        } catch (error) {
            console.error('Error al eliminar el Registro de Entrenamiento:', error);
            return res.status(500).json({ error: 'Error al eliminar el Registro de Entrenamiento' });
        }
    }
}
