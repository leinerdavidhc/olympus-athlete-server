import { DataTypes, Model } from "sequelize";
import { database } from "../database/db";
import { Stretch } from "./stretch.model";

// StretchRoutine Model
export class StretchRoutine extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public imageUrl!: string;
    public time!: number; // Total duration in minutes
}

export interface StretchRoutineI {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    time: number; // Total duration in minutes
}

StretchRoutine.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    time: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: database,
    tableName: "stretch_routines",
    timestamps: true
});

export class StretchRoutineStretch extends Model {
    public stretchRoutineId!: number;
    public stretchId!: number;
    public durationInRoutine!: number; // Duration of the stretch in this routine
}

export interface StretchRoutineStretchI {
    stretchRoutineId: number;
    stretchId: number;
    durationInRoutine: number; // Duration of the stretch in this routine
}

StretchRoutineStretch.init({
    stretchRoutineId: {
        type: DataTypes.INTEGER,
        references: {
            model: StretchRoutine,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    stretchId: {
        type: DataTypes.INTEGER,
        references: {
            model: Stretch,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    durationInRoutine: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize: database,
    tableName: "stretch_routine_stretch",
    timestamps: false
});

// Associations
StretchRoutine.belongsToMany(Stretch, {
    through: StretchRoutineStretch,
    foreignKey: 'stretchRoutineId',
    otherKey: 'stretchId'
});
Stretch.belongsToMany(StretchRoutine, {
    through: StretchRoutineStretch,
    foreignKey: 'stretchId',
    otherKey: 'stretchRoutineId'
});