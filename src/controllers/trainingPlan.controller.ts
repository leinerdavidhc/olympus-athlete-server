import { Request, Response } from 'express';
import { TrainingPlan, TrainingPlanI,RoutineTrainingPlan,RoutineTrainingPlanI } from '../models/trainingPlan.model';

// Controlador para TrainingPlan
export class TrainingPlanController {

    // Crear un nuevo TrainingPlan
    public static async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name, description, duration } = req.body;

            const newTrainingPlan = await TrainingPlan.create({
                name,
                description,
                duration
            });

            return res.status(201).json(newTrainingPlan);
        } catch (error) {
            console.error('Error al crear el Plan de Entrenamiento:', error);
            return res.status(500).json({ error: 'Error al crear el Plan de Entrenamiento' });
        }
    }

    // Obtener todos los TrainingPlans
    public static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const trainingPlans = await TrainingPlan.findAll();

            if (!trainingPlans.length) {
                return res.status(404).json({ error: 'No se encontraron Planes de Entrenamiento' });
            }

            return res.status(200).json(trainingPlans);
        } catch (error) {
            console.error('Error al obtener los Planes de Entrenamiento:', error);
            return res.status(500).json({ error: 'Error al obtener los Planes de Entrenamiento' });
        }
    }

    // Obtener un TrainingPlan por ID
    public static async getById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const trainingPlan = await TrainingPlan.findByPk(id);

            if (!trainingPlan) {
                return res.status(404).json({ error: 'Plan de Entrenamiento no encontrado' });
            }

            return res.status(200).json(trainingPlan);
        } catch (error) {
            console.error('Error al obtener el Plan de Entrenamiento:', error);
            return res.status(500).json({ error: 'Error al obtener el Plan de Entrenamiento' });
        }
    }

    // Actualizar un TrainingPlan por ID
    public static async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { name, description, duration } = req.body;

            const trainingPlan = await TrainingPlan.findByPk(id);

            if (!trainingPlan) {
                return res.status(404).json({ error: 'Plan de Entrenamiento no encontrado' });
            }

            await trainingPlan.update({
                name: name || trainingPlan.name,
                description: description || trainingPlan.description,
                duration: duration || trainingPlan.duration
            });

            return res.status(200).json(trainingPlan);
        } catch (error) {
            console.error('Error al actualizar el Plan de Entrenamiento:', error);
            return res.status(500).json({ error: 'Error al actualizar el Plan de Entrenamiento' });
        }
    }

    // Eliminar un TrainingPlan por ID
    public static async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const trainingPlan = await TrainingPlan.findByPk(id);

            if (!trainingPlan) {
                return res.status(404).json({ error: 'Plan de Entrenamiento no encontrado' });
            }

            await trainingPlan.destroy();
            return res.status(204).send(); // No content
        } catch (error) {
            console.error('Error al eliminar el Plan de Entrenamiento:', error);
            return res.status(500).json({ error: 'Error al eliminar el Plan de Entrenamiento' });
        }
    }
}

// Controlador para RoutineTrainingPlan
export class RoutineTrainingPlanController {

    // Crear una relación entre Routine y TrainingPlan
    public static async create(req: Request, res: Response): Promise<Response> {
        try {
            const { trainingPlanId, routineId } = req.body;

            const newRoutineTrainingPlan = await RoutineTrainingPlan.create({
                trainingPlanId,
                routineId
            });

            return res.status(201).json(newRoutineTrainingPlan);
        } catch (error) {
            console.error('Error al crear la relación Routine-TrainingPlan:', error);
            return res.status(500).json({ error: 'Error al crear la relación Routine-TrainingPlan' });
        }
    }

    // Obtener todas las relaciones entre Routine y TrainingPlan
    public static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const routineTrainingPlans = await RoutineTrainingPlan.findAll();

            if (!routineTrainingPlans.length) {
                return res.status(404).json({ error: 'No se encontraron relaciones Routine-TrainingPlan' });
            }

            return res.status(200).json(routineTrainingPlans);
        } catch (error) {
            console.error('Error al obtener las relaciones Routine-TrainingPlan:', error);
            return res.status(500).json({ error: 'Error al obtener las relaciones Routine-TrainingPlan' });
        }
    }

    // Obtener una relación específica por ID
    public static async getById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const routineTrainingPlan = await RoutineTrainingPlan.findByPk(id);

            if (!routineTrainingPlan) {
                return res.status(404).json({ error: 'Relación Routine-TrainingPlan no encontrada' });
            }

            return res.status(200).json(routineTrainingPlan);
        } catch (error) {
            console.error('Error al obtener la relación Routine-TrainingPlan:', error);
            return res.status(500).json({ error: 'Error al obtener la relación Routine-TrainingPlan' });
        }
    }

    // Eliminar una relación entre Routine y TrainingPlan por ID
    public static async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const routineTrainingPlan = await RoutineTrainingPlan.findByPk(id);

            if (!routineTrainingPlan) {
                return res.status(404).json({ error: 'Relación Routine-TrainingPlan no encontrada' });
            }

            await routineTrainingPlan.destroy();
            return res.status(204).send(); // No content
        } catch (error) {
            console.error('Error al eliminar la relación Routine-TrainingPlan:', error);
            return res.status(500).json({ error: 'Error al eliminar la relación Routine-TrainingPlan' });
        }
    }
}
