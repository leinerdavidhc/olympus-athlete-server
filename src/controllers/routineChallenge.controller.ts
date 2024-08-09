import { Request, Response } from 'express';
import { RoutineChallenge } from '../models/RoutineChallenge.model';
import { Routine } from '../models/routine.model';
import { Challenge } from '../models/challenges.model';

export class RoutineChallengeController {

    // Crear un nuevo RoutineChallenge
    public static async create(req: Request, res: Response): Promise<Response> {
        try {
            const { routineId, challengeId, startDate, endDate } = req.body;

            // Verificar si la rutina y el desafío existen
            const routine = await Routine.findByPk(routineId);
            const challenge = await Challenge.findByPk(challengeId);

            if (!routine || !challenge) {
                return res.status(404).json({ error: 'Rutina o desafío no encontrado' });
            }

            const newRoutineChallenge = await RoutineChallenge.create({
                routineId,
                challengeId,
                startDate,
                endDate
            });

            return res.status(201).json(newRoutineChallenge);
        } catch (error) {
            console.error('Error al crear el RoutineChallenge:', error);
            return res.status(500).json({ error: 'Error al crear el RoutineChallenge' });
        }
    }

    // Obtener todos los RoutineChallenges
    public static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const routineChallenges = await RoutineChallenge.findAll();

            if (!routineChallenges.length) {
                return res.status(404).json({ error: 'No se encontraron RoutineChallenges' });
            }

            return res.status(200).json(routineChallenges);
        } catch (error) {
            console.error('Error al obtener los RoutineChallenges:', error);
            return res.status(500).json({ error: 'Error al obtener los RoutineChallenges' });
        }
    }

    // Obtener un RoutineChallenge por ID
    public static async getById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const routineChallenge = await RoutineChallenge.findByPk(id);

            if (!routineChallenge) {
                return res.status(404).json({ error: 'RoutineChallenge no encontrado' });
            }

            return res.status(200).json(routineChallenge);
        } catch (error) {
            console.error('Error al obtener el RoutineChallenge:', error);
            return res.status(500).json({ error: 'Error al obtener el RoutineChallenge' });
        }
    }

    // Actualizar un RoutineChallenge por ID
    public static async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { startDate, endDate } = req.body;

            const routineChallenge = await RoutineChallenge.findByPk(id);

            if (!routineChallenge) {
                return res.status(404).json({ error: 'RoutineChallenge no encontrado' });
            }

            await routineChallenge.update({
                startDate: startDate || routineChallenge.startDate,
                endDate: endDate || routineChallenge.endDate
            });

            return res.status(200).json(routineChallenge);
        } catch (error) {
            console.error('Error al actualizar el RoutineChallenge:', error);
            return res.status(500).json({ error: 'Error al actualizar el RoutineChallenge' });
        }
    }

    // Eliminar un RoutineChallenge por ID
    public static async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const routineChallenge = await RoutineChallenge.findByPk(id);

            if (!routineChallenge) {
                return res.status(404).json({ error: 'RoutineChallenge no encontrado' });
            }

            await routineChallenge.destroy();
            return res.status(204).send(); // No content
        } catch (error) {
            console.error('Error al eliminar el RoutineChallenge:', error);
            return res.status(500).json({ error: 'Error al eliminar el RoutineChallenge' });
        }
    }
}
