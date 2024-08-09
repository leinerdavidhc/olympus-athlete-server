import { Request, Response } from 'express';
import { Profile,Motivation,ProfileMotivation,weeklyGoals } from '../models/profile.model';
import { database as sequelize } from '../database/db'; // Asegúrate de importar sequelize para realizar transacciones

export class ProfileController {

    // Crear un nuevo perfil
    public static async create(req: Request, res: Response): Promise<Response> {
        const transaction = await sequelize.transaction(); // Iniciar una transacción
        try {
            const { UserId, body_goals, main_goals, fitness_level, activity_level, weeklyGoalId, motivationIds } = req.body;

            // Crear perfil
            const newProfile = await Profile.create({
                UserId,
                body_goals,
                main_goals,
                fitness_level,
                activity_level,
                weeklyGoalId,
            }, { transaction });

            // Asociar motivaciones si se proporcionan
            if (motivationIds && motivationIds.length > 0) {
                await ProfileMotivation.bulkCreate(
                    motivationIds.map((motivationId: number) => ({
                        ProfileId: newProfile.id,
                        MotivationId: motivationId
                    })),
                    { transaction }
                );
            }

            await transaction.commit(); // Confirmar la transacción
            return res.status(201).json(newProfile);
        } catch (error) {
            await transaction.rollback(); // Revertir la transacción en caso de error
            console.error('Error al crear el perfil:', error);
            return res.status(500).json({ error: 'Error al crear el perfil' });
        }
    }

    // Obtener todos los perfiles
    public static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const profiles = await Profile.findAll({
                include: [
                    { model: weeklyGoals },
                    { model: Motivation, through: { attributes: [] } } // Excluir atributos de la tabla intermedia
                ]
            });
            return res.status(200).json(profiles);
        } catch (error) {
            console.error('Error al obtener los perfiles:', error);
            return res.status(500).json({ error: 'Error al obtener los perfiles' });
        }
    }

    // Obtener un perfil por ID
    public static async getById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const profile = await Profile.findByPk(id, {
                include: [
                    { model: weeklyGoals },
                    { model: Motivation, through: { attributes: [] } } // Excluir atributos de la tabla intermedia
                ]
            });

            if (!profile) {
                return res.status(404).json({ error: 'Perfil no encontrado' });
            }

            return res.status(200).json(profile);
        } catch (error) {
            console.error('Error al obtener el perfil:', error);
            return res.status(500).json({ error: 'Error al obtener el perfil' });
        }
    }

    // Actualizar un perfil por ID
    public static async update(req: Request, res: Response): Promise<Response> {
        const transaction = await sequelize.transaction(); // Iniciar una transacción
        try {
            const { id } = req.params;
            const { body_goals, main_goals, fitness_level, activity_level, weeklyGoalId, motivationIds } = req.body;

            const profile = await Profile.findByPk(id);

            if (!profile) {
                return res.status(404).json({ error: 'Perfil no encontrado' });
            }

            await profile.update({
                body_goals: body_goals || profile.body_goals,
                main_goals: main_goals || profile.main_goals,
                fitness_level: fitness_level || profile.fitness_level,
                activity_level: activity_level || profile.activity_level,
                weeklyGoalId: weeklyGoalId || profile.weeklyGoalId,
            }, { transaction });

            // Actualizar motivaciones si se proporcionan
            if (motivationIds) {
                await ProfileMotivation.destroy({ where: { ProfileId: id }, transaction });
                await ProfileMotivation.bulkCreate(
                    motivationIds.map((motivationId: number) => ({
                        ProfileId: id,
                        MotivationId: motivationId
                    })),
                    { transaction }
                );
            }

            await transaction.commit(); // Confirmar la transacción
            return res.status(200).json(profile);
        } catch (error) {
            await transaction.rollback(); // Revertir la transacción en caso de error
            console.error('Error al actualizar el perfil:', error);
            return res.status(500).json({ error: 'Error al actualizar el perfil' });
        }
    }

    // Eliminar un perfil por ID
    public static async delete(req: Request, res: Response): Promise<Response> {
        const transaction = await sequelize.transaction(); // Iniciar una transacción
        try {
            const { id } = req.params;
            const profile = await Profile.findByPk(id);

            if (!profile) {
                return res.status(404).json({ error: 'Perfil no encontrado' });
            }

            // Eliminar asociaciones con motivaciones
            await ProfileMotivation.destroy({ where: { ProfileId: id }, transaction });

            // Eliminar el perfil
            await profile.destroy({ transaction });
            await transaction.commit(); // Confirmar la transacción
            return res.status(204).send(); // No content
        } catch (error) {
            await transaction.rollback(); // Revertir la transacción en caso de error
            console.error('Error al eliminar el perfil:', error);
            return res.status(500).json({ error: 'Error al eliminar el perfil' });
        }
    }
}
