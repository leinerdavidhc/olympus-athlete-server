import express,{Application} from 'express'
import morgan from 'morgan'
import cors from 'cors'
import indexRoutes from '../routes/index.routes';
import cookieParser from 'cookie-parser';


export class App{
    public Routes=new indexRoutes()
    app:Application;

    constructor(private port?:number|string){
        this.app=express();
        this.setting()
        this.middlewares()
        this.routes()
    }

    private setting(){
        this.app.set('port',this.port||3000)
    }

    private middlewares(){
        this.app.use(morgan('dev'))
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:false}))
        this.app.use(cors());
        this.app.use(cookieParser());
    }

    private routes() {
        this.app.use("/admin", this.Routes.RouterSuperUser.router);
        this.app.use("/auth", this.Routes.RouterUser.router);
        this.app.use("/api", this.Routes.RouterProfile.router);
        this.app.use("/api", this.Routes.RouterMuscleGroup.router);
        this.app.use("/api", this.Routes.RouterExercise.router);
        this.app.use("/api", this.Routes.RouterRoutine.router);
        this.app.use("/api", this.Routes.RouterExerciseMuscleGroup.router);
        this.app.use("/api", this.Routes.RouterStretch.router);
        this.app.use("/api", this.Routes.RouterBlogArticle.router);
        this.app.use("/api", this.Routes.RouterChallenge.router);
        this.app.use("/api", this.Routes.RouterProgress.router);
        this.app.use("/api", this.Routes.RouterStretchRoutine.router);
        this.app.use("/api", this.Routes.RouterStretchRoutineStretch.router);
        this.app.use("/api", this.Routes.RouterTestimonial.router);
        this.app.use("/api", this.Routes.RouterTrainingPlan.router);
        this.app.use("/api", this.Routes.RouterRoutineTrainingPlan.router);
        this.app.use("/api", this.Routes.RouterTrainingRecord.router);
    }
    

    async start() {
        await this.app.listen(this.app.get('port'))
        console.log('Server on port', this.app.get('port'));
    }
}

