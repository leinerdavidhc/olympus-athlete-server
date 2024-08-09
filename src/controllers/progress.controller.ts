import { Request, Response } from 'express';
import { Progress } from '../models/progress.model';
import { User } from '../models/user.model';

export class ProgressController {

    // Crear un nuevo registro de progreso
    public static async create(req: Request, res: Response): Promise<Response> {
        try {
            const { userId, date, weight, height, BMI } = req.body;

            // Verificar si el usuario existe
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const newProgress = await Progress.create({
                userId,
                date,
                weight,
                height,
                BMI
            });

            return res.status(201).json(newProgress);
        } catch (error) {
            console.error('Error al crear el progreso:', error);
            return res.status(500).json({ error: 'Error al crear el progreso' });
        }
    }

    // Obtener todos los registros de progreso de un usuario
    public static async getAllByUser(req: Request, res: Response): Promise<Response> {
        try {
            const { userId } = req.params;

            const progressRecords = await Progress.findAll({
                where: { userId },
                order: [['date', 'ASC']]  // Ordenar por fecha ascendente
            });

            if (!progressRecords.length) {
                return res.status(404).json({ error: 'No se encontraron registros de progreso para este usuario' });
            }

            return res.status(200).json(progressRecords);
        } catch (error) {
            console.error('Error al obtener los registros de progreso:', error);
            return res.status(500).json({ error: 'Error al obtener los registros de progreso' });
        }
    }

    // Obtener un registro de progreso por ID
    public static async getById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const progress = await Progress.findByPk(id);

            if (!progress) {
                return res.status(404).json({ error: 'Registro de progreso no encontrado' });
            }

            return res.status(200).json(progress);
        } catch (error) {
            console.error('Error al obtener el registro de progreso:', error);
            return res.status(500).json({ error: 'Error al obtener el registro de progreso' });
        }
    }

    // Actualizar un registro de progreso por ID
    public static async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { date, weight, height, BMI } = req.body;

            const progress = await Progress.findByPk(id);

            if (!progress) {
                return res.status(404).json({ error: 'Registro de progreso no encontrado' });
            }

            await progress.update({
                date: date || progress.date,
                weight: weight || progress.weight,
                height: height || progress.height,
                BMI: BMI || progress.BMI
            });

            return res.status(200).json(progress);
        } catch (error) {
            console.error('Error al actualizar el registro de progreso:', error);
            return res.status(500).json({ error: 'Error al actualizar el registro de progreso' });
        }
    }

    // Eliminar un registro de progreso por ID
    public static async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const progress = await Progress.findByPk(id);

            if (!progress) {
                return res.status(404).json({ error: 'Registro de progreso no encontrado' });
            }

            await progress.destroy();
            return res.status(204).send(); // No content
        } catch (error) {
            console.error('Error al eliminar el registro de progreso:', error);
            return res.status(500).json({ error: 'Error al eliminar el registro de progreso' });
        }
    }
}
