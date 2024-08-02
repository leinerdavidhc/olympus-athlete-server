import ProfileRouter from "./profile.routes";
import SuperUserRouter from "./superUser.routes";
import UserRouter from "./user.routes";
import MuscleGroupRouter from "./muscleGroup.routes";
import ExerciseRouter from "./Exercise.routes";
import RoutineRouter from "./routine.routes";
import ExerciseMuscleGroupRouter from "./exerciseMuscleGroup.routes";
import StretchRouter from "./stretches.routes";


export default class IndexRoutes {
  public RouterSuperUser = new SuperUserRouter();
  public RouterUser = new UserRouter();
  public RouterProfile = new ProfileRouter();
  public RouterMuscleGroup = new MuscleGroupRouter();
  public RouterExercise = new ExerciseRouter();
  public RouterRoutine=new RoutineRouter();
  public RouterExerciseMuscleGroup = new ExerciseMuscleGroupRouter()
  public RouterStretch=new StretchRouter();
}
