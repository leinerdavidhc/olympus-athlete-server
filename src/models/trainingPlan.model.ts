import { DataTypes, Model } from "sequelize";
import { database } from "../database/db";
import { Routine } from "./routine.model";

export class TrainingPlan extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public duration!: number; // Duration in weeks
}

export interface TrainingPlanI {
    id: number;
    name: string;
    description: string;
    duration: number; // Duration in weeks
}

TrainingPlan.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize: database,
    tableName: "training_plans",
    timestamps: true
});

// RoutineTrainingPlan Model
export class RoutineTrainingPlan extends Model {
    public trainingPlanId!: number;
    public routineId!: number;
}

export interface RoutineTrainingPlanI {
    trainingPlanId: number;
    routineId: number;
}

RoutineTrainingPlan.init({
    trainingPlanId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TrainingPlan,
            key: 'id'
        }
    },
    routineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Routine,
            key: 'id'
        }
    }
}, {
    sequelize: database,
    tableName: "routine_training_plan",
    timestamps: true
});

// Setting up associations
TrainingPlan.belongsToMany(Routine, { through: RoutineTrainingPlan, foreignKey: 'trainingPlanId' });
Routine.belongsToMany(TrainingPlan, { through: RoutineTrainingPlan, foreignKey: 'routineId' });