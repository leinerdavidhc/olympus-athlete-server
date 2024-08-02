import { Request, Response } from 'express';
import { ExerciseMuscleGroup, ExerciseMuscleGroupI } from '../models/muscleGroup.model';
import { Exercise } from '../models/exercises.model';
import { MuscleGroup } from '../models/muscleGroup.model';

export class ExerciseMuscleGroupController {
  // Asociar un ejercicio con un grupo muscular
  public static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { exerciseId, muscleGroupId } = req.body;

      // Verificar que el ejercicio y el grupo muscular existen
      const exercise = await Exercise.findByPk(exerciseId);
      const muscleGroup = await MuscleGroup.findByPk(muscleGroupId);

      if (!exercise || !muscleGroup) {
        return res.status(404).json({ error: 'Ejercicio o grupo muscular no encontrado' });
      }

      const newAssociation: ExerciseMuscleGroupI = await ExerciseMuscleGroup.create({ exerciseId, muscleGroupId });

      return res.status(201).json({ newAssociation });
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      return res.status(500).json({ error: 'Error al procesar la solicitud: ' + error });
    }
  }

  // Obtener todas las asociaciones
  public static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const associations = await ExerciseMuscleGroup.findAll();
      return res.status(200).json(associations);
    } catch (error) {
      console.error('Error al obtener las asociaciones:', error);
      return res.status(500).json({ error: 'Error al obtener las asociaciones' });
    }
  }

  // Obtener asociaciones por ID de ejercicio
  public static async getByExerciseId(req: Request, res: Response): Promise<Response> {
    try {
      const { exerciseId } = req.params;
      const associations = await ExerciseMuscleGroup.findAll({ where: { exerciseId } });

      if (!associations.length) {
        return res.status(404).json({ error: 'No se encontraron asociaciones para este ejercicio' });
      }

      return res.status(200).json(associations);
    } catch (error) {
      console.error('Error al obtener las asociaciones por ID de ejercicio:', error);
      return res.status(500).json({ error: 'Error al obtener las asociaciones por ID de ejercicio' });
    }
  }

  // Obtener asociaciones por ID de grupo muscular
  public static async getByMuscleGroupId(req: Request, res: Response): Promise<Response> {
    try {
      const { muscleGroupId } = req.params;
      const associations = await ExerciseMuscleGroup.findAll({ where: { muscleGroupId } });

      if (!associations.length) {
        return res.status(404).json({ error: 'No se encontraron asociaciones para este grupo muscular' });
      }

      return res.status(200).json(associations);
    } catch (error) {
      console.error('Error al obtener las asociaciones por ID de grupo muscular:', error);
      return res.status(500).json({ error: 'Error al obtener las asociaciones por ID de grupo muscular' });
    }
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { exerciseId, muscleGroupId } = req.params;
      const { newExerciseId, newMuscleGroupId } = req.body;

      // Validar nuevos valores
      if (newExerciseId) {
        // Aquí podrías agregar una validación adicional para asegurarte de que newExerciseId existe en la tabla Exercise
      }
      if (newMuscleGroupId) {
        // Aquí podrías agregar una validación adicional para asegurarte de que newMuscleGroupId existe en la tabla MuscleGroup
      }

      // Buscar la asociación existente
      const association = await ExerciseMuscleGroup.findOne({ where: { exerciseId, muscleGroupId } });

      if (!association) {
        return res.status(404).json({ error: 'Asociación no encontrada' });
      }

      // Actualizar la asociación con los nuevos valores
      await association.update({
        exerciseId: newExerciseId || exerciseId,
        muscleGroupId: newMuscleGroupId || muscleGroupId
      });

      return res.status(200).json(association);
    } catch (error) {
      console.error('Error al actualizar la asociación:', error);
      return res.status(500).json({ error: 'Error al actualizar la asociación' });
    }
  }

  // Eliminar una asociación por IDs
  public static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { exerciseId, muscleGroupId } = req.params;
      const association = await ExerciseMuscleGroup.findOne({ where: { exerciseId, muscleGroupId } });

      if (!association) {
        return res.status(404).json({ error: 'Asociación no encontrada' });
      }

      await association.destroy();
      return res.status(204).send(); // No content
    } catch (error) {
      console.error('Error al eliminar la asociación:', error);
      return res.status(500).json({ error: 'Error al eliminar la asociación' });
    }
  }
}
