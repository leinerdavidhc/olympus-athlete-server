import { DataTypes, Model } from "sequelize";
import { database } from "../database/db";

// Routine Model
export class Routine extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public level!: 'beginner' | 'intermediate' | 'advanced';
    public goal!: 'weight loss' | 'muscle gain' | 'endurance improvement' | 'general';
    public duration!: number; // Duration in minutes
}

export interface RoutineI {
    id: number;
    name: string;
    description: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    goal: 'weight loss' | 'muscle gain' | 'endurance improvement' | 'general';
    duration: number;
}

Routine.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    level: {
        type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
        allowNull: false
    },
    goal: {
        type: DataTypes.ENUM('weight loss', 'muscle gain', 'endurance improvement', 'general'),
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false // Duration is required
    }
}, {
    sequelize: database,
    tableName: "routines",
    timestamps: true
});
