import { DataTypes, Model } from "sequelize";
import { database } from "../database/db";

// Challenge Model
export class Challenge extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public level!: 'beginner' | 'intermediate' | 'advanced';
    public type!: 'daily' | 'body zone' | 'HIIT' | '7x4';
}

export interface ChallengeI {
    id: number;
    name: string;
    description: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    type: 'daily' | 'body zone' | 'HIIT' | '7x4';
}

Challenge.init({
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
    type: {
        type: DataTypes.ENUM('daily', 'body zone', 'HIIT', '7x4'),
        allowNull: false
    }
}, {
    sequelize: database,
    tableName: "challenges",
    timestamps: true
});
