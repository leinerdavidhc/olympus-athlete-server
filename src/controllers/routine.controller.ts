import { Request, Response } from 'express';
import { Routine, RoutineI } from '../models/routine.model';

export class RoutineController {
  // Crear una nueva rutina
  public static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description, level, goal, duration } = req.body;

      const newRoutine: RoutineI = await Routine.create({
        name,
        description,
        level,
        goal,
        duration
      });

      return res.status(201).json({ newRoutine });
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      return res.status(500).json({ error: 'Error al procesar la solicitud: ' + error });
    }
  }

  // Obtener todas las rutinas
  public static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const routines = await Routine.findAll();
      return res.status(200).json(routines);
    } catch (error) {
      console.error('Error al obtener las rutinas:', error);
      return res.status(500).json({ error: 'Error al obtener las rutinas' });
    }
  }

  // Obtener una rutina por ID
  public static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const routine = await Routine.findByPk(id);

      if (!routine) {
        return res.status(404).json({ error: 'Rutina no encontrada' });
      }

      return res.status(200).json(routine);
    } catch (error) {
      console.error('Error al obtener la rutina:', error);
      return res.status(500).json({ error: 'Error al obtener la rutina' });
    }
  }

  // Actualizar una rutina por ID
  public static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, description, level, goal, duration } = req.body;

      const routine = await Routine.findByPk(id);

      if (!routine) {
        return res.status(404).json({ error: 'Rutina no encontrada' });
      }

      await routine.update({
        name: name || routine.name,
        description: description || routine.description,
        level: level || routine.level,
        goal: goal || routine.goal,
        duration: duration || routine.duration
      });

      return res.status(200).json(routine);
    } catch (error) {
      console.error('Error al actualizar la rutina:', error);
      return res.status(500).json({ error: 'Error al actualizar la rutina' });
    }
  }

  // Eliminar una rutina por ID
  public static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const routine = await Routine.findByPk(id);

      if (!routine) {
        return res.status(404).json({ error: 'Rutina no encontrada' });
      }

      await routine.destroy();
      return res.status(204).send(); // No content
    } catch (error) {
      console.error('Error al eliminar la rutina:', error);
      return res.status(500).json({ error: 'Error al eliminar la rutina' });
    }
  }
}
