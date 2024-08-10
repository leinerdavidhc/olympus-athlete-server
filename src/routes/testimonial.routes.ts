import { Router } from 'express';
import { TestimonialController } from '../controllers/testimonial.controller';

export default class TestimonialRouter {
    public router: Router = Router();

    constructor() {
        this.initializer();
    }

    private initializer() {
        this.router.post('/testimonials', TestimonialController.create);
        this.router.get('/testimonials', TestimonialController.getAll);
        this.router.get('/testimonials/:id', TestimonialController.getById);
        this.router.put('/testimonials/:id', TestimonialController.update);
        this.router.delete('/testimonials/:id', TestimonialController.delete);
    }
}
