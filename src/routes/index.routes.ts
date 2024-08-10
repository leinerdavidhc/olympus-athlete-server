import ProfileRouter from "./profile.routes";
import SuperUserRouter from "./superUser.routes";
import UserRouter from "./user.routes";
import MuscleGroupRouter from "./muscleGroup.routes";
import ExerciseRouter from "./exercise.routes";
import RoutineRouter from "./routine.routes";
import ExerciseMuscleGroupRouter from "./exerciseMuscleGroup.routes";
import StretchRouter from "./stretches.routes";
import BlogArticleRouter from "./blogArticle.routes";
import ChallengeRouter from "./challenge.routes";
import ProgressRouter from "./progress.routes";
import StretchRoutineRouter from "./stretchRoutine.routes";
import StretchRoutineStretchRouter from "./stretchRoutineStretch.routes";
import TestimonialRouter from "./testimonial.routes";
import TrainingPlanRouter from "./trainingPlan.routes";
import RoutineTrainingPlanRouter from "./routineTrainingPlan.routes";
import TrainingRecordRouter from "./trainingRecord.routes";


export default class IndexRoutes {
  public RouterSuperUser = new SuperUserRouter();
  public RouterUser = new UserRouter();
  public RouterProfile = new ProfileRouter();
  public RouterMuscleGroup = new MuscleGroupRouter();
  public RouterExercise = new ExerciseRouter();
  public RouterRoutine = new RoutineRouter();
  public RouterExerciseMuscleGroup = new ExerciseMuscleGroupRouter()
  public RouterStretch = new StretchRouter();
  public RouterBlogArticle = new BlogArticleRouter();
  public RouterChallenge = new ChallengeRouter();
  public RouterProgress = new ProgressRouter();
  public RouterStretchRoutine = new StretchRoutineRouter();
  public RouterStretchRoutineStretch = new StretchRoutineStretchRouter();
  public RouterTestimonial = new TestimonialRouter();
  public RouterTrainingPlan = new TrainingPlanRouter();
  public RouterRoutineTrainingPlan = new RoutineTrainingPlanRouter();
  public RouterTrainingRecord = new TrainingRecordRouter();

}
