import { Request, Response } from 'express';
import Testimonial, { TestimonialI } from '../models/testimonial.model';

export class TestimonialController {

    // Crear un nuevo Testimonial
    public static async create(req: Request, res: Response): Promise<Response> {
        try {
            const { quote, description, author, date } = req.body;

            const newTestimonial = await Testimonial.create({
                quote,
                description,
                author,
                date
            });

            return res.status(201).json(newTestimonial);
        } catch (error) {
            console.error('Error al crear el Testimonial:', error);
            return res.status(500).json({ error: 'Error al crear el Testimonial' });
        }
    }

    // Obtener todos los Testimonials
    public static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const testimonials = await Testimonial.findAll();

            if (!testimonials.length) {
                return res.status(404).json({ error: 'No se encontraron Testimonials' });
            }

            return res.status(200).json(testimonials);
        } catch (error) {
            console.error('Error al obtener los Testimonials:', error);
            return res.status(500).json({ error: 'Error al obtener los Testimonials' });
        }
    }

    // Obtener un Testimonial por ID
    public static async getById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const testimonial = await Testimonial.findByPk(id);

            if (!testimonial) {
                return res.status(404).json({ error: 'Testimonial no encontrado' });
            }

            return res.status(200).json(testimonial);
        } catch (error) {
            console.error('Error al obtener el Testimonial:', error);
            return res.status(500).json({ error: 'Error al obtener el Testimonial' });
        }
    }

    // Actualizar un Testimonial por ID
    public static async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { quote, description, author, date } = req.body;

            const testimonial = await Testimonial.findByPk(id);

            if (!testimonial) {
                return res.status(404).json({ error: 'Testimonial no encontrado' });
            }

            await testimonial.update({
                quote: quote || testimonial.quote,
                description: description || testimonial.description,
                author: author || testimonial.author,
                date: date || testimonial.date
            });

            return res.status(200).json(testimonial);
        } catch (error) {
            console.error('Error al actualizar el Testimonial:', error);
            return res.status(500).json({ error: 'Error al actualizar el Testimonial' });
        }
    }

    // Eliminar un Testimonial por ID
    public static async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const testimonial = await Testimonial.findByPk(id);

            if (!testimonial) {
                return res.status(404).json({ error: 'Testimonial no encontrado' });
            }

            await testimonial.destroy();
            return res.status(204).send(); // No content
        } catch (error) {
            console.error('Error al eliminar el Testimonial:', error);
            return res.status(500).json({ error: 'Error al eliminar el Testimonial' });
        }
    }
}
