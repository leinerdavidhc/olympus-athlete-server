import { Router } from 'express';
import { ExerciseMuscleGroupController } from '../controllers/exerciseMuscleGroup.controller';

export default class ExerciseMuscleGroupRouter {
    public router: Router = Router();

    constructor() {
        this.initializer();
    }

    private initializer() {
        this.router.post('/exercise-muscle-groups', ExerciseMuscleGroupController.create);
        this.router.get('/exercise-muscle-groups', ExerciseMuscleGroupController.getAll);
        this.router.get('/exercise-muscle-groups/exercise/:exerciseId', ExerciseMuscleGroupController.getByExerciseId);
        this.router.get('/exercise-muscle-groups/muscle-group/:muscleGroupId', ExerciseMuscleGroupController.getByMuscleGroupId);
        this.router.delete('/exercise-muscle-groups/exercise/:exerciseId/muscle-group/:muscleGroupId', ExerciseMuscleGroupController.delete);
        this.router.put('/exercise-muscle-groups/exercise/:exerciseId/muscle-group/:muscleGroupId', ExerciseMuscleGroupController.update);
    }
}
