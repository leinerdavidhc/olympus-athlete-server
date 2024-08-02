import { DataTypes, Model } from "sequelize";
import { database } from "../database/db";

// Stretch Model
export class Stretch extends Model {
    public id!: number;
    public name!: string;
    public instructions!: string;
    public repetitions!: number;
    public sets!: number;
    public time!: number;
    public animationUrl!: string;
    public videoUrl!: string;
    public imageUrl!: string;
}

export interface StretchI {
    id: number;
    name: string;
    instructions: string;
    repetitions: number;
    sets: number;
    time: number;
    animationUrl: string;
    videoUrl: string;
    imageUrl: string;
}

Stretch.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    instructions: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    repetitions: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    sets: {
        type: DataTypes.INTEGER,
        allowNull: true
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
    }
}, {
    sequelize: database,
    tableName: "stretches",
    timestamps: true
});

