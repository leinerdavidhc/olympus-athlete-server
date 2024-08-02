import { DataTypes, Model } from "sequelize";
import { database } from "../database/db";

// Exercises Model
export class Exercise extends Model {
    public id!: number;
    public name!: string;
    public instructions!: string;
    public level!: 'beginner' | 'intermediate' | 'advanced';
    public repetitions!: number;
    public sets!: number;
    public time!: number;
    public animationUrl!: string;
    public videoUrl!: string;
    public imageUrl!: string;
}

export interface ExerciseI {
    id: number;
    name: string;
    instructions: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    repetitions: number;
    sets: number;
    time: number;
    animationUrl: string;
    videoUrl: string;
    imageUrl: string;
}

Exercise.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    instructions: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    level: {
        type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
        allowNull: false
    },
    repetitions: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sets: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    time: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    animationUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    videoUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize: database,
    tableName: "exercises",
    timestamps: true
});
