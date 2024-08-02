import { Request, Response } from 'express';
import { MuscleGroup, MuscleGroupI } from '../models/muscleGroup.model';
import cloudinary from '../libs/cloudinary.config';

export class MuscleGroupController {
  // Crear un nuevo grupo muscular
  public static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;
      const imageUrl = req.body.image;

      if (!imageUrl) {
        return res.status(400).json({ error: 'No se proporcionó una URL de imagen' });
      }

      const newMuscleGroup: MuscleGroupI = await MuscleGroup.create({ name, imageUrl });

      return res.status(201).json({ newMuscleGroup });
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      return res.status(500).json({ error: 'Error al procesar la solicitud: ' + error });
    }
  }

  // Obtener todos los grupos musculares
  public static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const muscleGroups = await MuscleGroup.findAll();
      return res.status(200).json(muscleGroups);
    } catch (error) {
      console.error('Error al obtener los grupos musculares:', error);
      return res.status(500).json({ error: 'Error al obtener los grupos musculares' });
    }
  }

  // Obtener un grupo muscular por ID
  public static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const muscleGroup = await MuscleGroup.findByPk(id);

      if (!muscleGroup) {
        return res.status(404).json({ error: 'Grupo muscular no encontrado' });
      }

      return res.status(200).json(muscleGroup);
    } catch (error) {
      console.error('Error al obtener el grupo muscular:', error);
      return res.status(500).json({ error: 'Error al obtener el grupo muscular' });
    }
  }

  // Actualizar un grupo muscular por ID
  public static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const newImageUrl = req.body.imageUrl; // Asegúrate de que esto coincide con el nombre del campo en el cuerpo de la solicitud

      const muscleGroup = await MuscleGroup.findByPk(id);

      if (!muscleGroup) {
        return res.status(404).json({ error: 'Grupo muscular no encontrado' });
      }

      // Función para extraer el public_id de una URL
      const extractPublicId = (url: string) => {
        const parts = url.split('/');
        const filename = parts.pop() || '';
        return filename.split('.')[0];
      };

      // Eliminar la imagen antigua de Cloudinary si hay una nueva
      if (newImageUrl && newImageUrl !== muscleGroup.imageUrl) {
        const oldImageUrl = muscleGroup.imageUrl; // URL de la imagen antigua
        const oldPublicId = extractPublicId(oldImageUrl);

        if (oldPublicId) {
          console.log(`Eliminando imagen antigua: ${oldPublicId}`);
          await cloudinary.uploader.destroy(`olympus_athlete/muscleGroup/${oldPublicId}`);
        }
      }

      await muscleGroup.update({
        name: name || muscleGroup.name,
        imageUrl: newImageUrl || muscleGroup.imageUrl
      });

      return res.status(200).json(muscleGroup);
    } catch (error) {
      console.error('Error al actualizar el grupo muscular:', error);
      return res.status(500).json({ error: 'Error al actualizar el grupo muscular' });
    }
  }


  // Eliminar un grupo muscular por ID
  public static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const muscleGroup = await MuscleGroup.findByPk(id);

      if (!muscleGroup) {
        return res.status(404).json({ error: 'Grupo muscular no encontrado' });
      }

      // Función para extraer el public_id de una URL
      const extractPublicId = (url: string) => {
        const parts = url.split('/');
        const filename = parts.pop() || '';
        return filename.split('.')[0];
      };

      // Eliminar la imagen de Cloudinary si existe
      if (muscleGroup.imageUrl) {
        const publicId = extractPublicId(muscleGroup.imageUrl);

        if (publicId) {
          console.log(`Eliminando imagen: ${publicId}`);
          await cloudinary.uploader.destroy(`olympus_athlete/muscleGroup/${publicId}`);
        }
      }

      // Elimina la entrada en la base de datos
      await muscleGroup.destroy();
      return res.status(204).send(); // No content
    } catch (error) {
      console.error('Error al eliminar el grupo muscular:', error);
      return res.status(500).json({ error: 'Error al eliminar el grupo muscular' });
    }
  }

}
