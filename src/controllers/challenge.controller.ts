import { Request, Response } from 'express';
import { Challenge } from '../models/challenges.model';

export class ChallengeController {

    // Crear un nuevo reto
    public static async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name, description, level, type } = req.body;

            const newChallenge = await Challenge.create({
                name,
                description,
                level,
                type
            });

            return res.status(201).json(newChallenge);
        } catch (error) {
            console.error('Error al crear el reto:', error);
            return res.status(500).json({ error: 'Error al crear el reto' });
        }
    }

    // Obtener todos los retos
    public static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const challenges = await Challenge.findAll();
            return res.status(200).json(challenges);
        } catch (error) {
            console.error('Error al obtener los retos:', error);
            return res.status(500).json({ error: 'Error al obtener los retos' });
        }
    }

    // Obtener un reto por ID
    public static async getById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const challenge = await Challenge.findByPk(id);

            if (!challenge) {
                return res.status(404).json({ error: 'Reto no encontrado' });
            }

            return res.status(200).json(challenge);
        } catch (error) {
            console.error('Error al obtener el reto:', error);
            return res.status(500).json({ error: 'Error al obtener el reto' });
        }
    }

    // Actualizar un reto por ID
    public static async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { name, description, level, type } = req.body;

            const challenge = await Challenge.findByPk(id);
            if (!challenge) {
                return res.status(404).json({ error: 'Reto no encontrado' });
            }

            await challenge.update({
                name: name || challenge.name,
                description: description || challenge.description,
                level: level || challenge.level,
                type: type || challenge.type
            });

            return res.status(200).json(challenge);
        } catch (error) {
            console.error('Error al actualizar el reto:', error);
            return res.status(500).json({ error: 'Error al actualizar el reto' });
        }
    }

    // Eliminar un reto por ID
    public static async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const challenge = await Challenge.findByPk(id);

            if (!challenge) {
                return res.status(404).json({ error: 'Reto no encontrado' });
            }

            await challenge.destroy();
            return res.status(204).send(); // No content
        } catch (error) {
            console.error('Error al eliminar el reto:', error);
            return res.status(500).json({ error: 'Error al eliminar el reto' });
        }
    }
}
