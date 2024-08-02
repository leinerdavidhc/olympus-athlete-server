import { DataTypes, Model } from "sequelize";
import { database } from "../database/db";
import { Exercise } from "./exercises.model";
import { Stretch } from "./stretch.model";

// MuscleGroups Model
export class MuscleGroup extends Model {
    public id!: number;
    public name!: string;
    public imageUrl!: string;
}

export interface MuscleGroupI {
    id: number;
    name: string;
    imageUrl: string;
}

MuscleGroup.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize: database,
    tableName: "muscle_groups",
    timestamps: true
});

// ExerciseMuscleGroup Model
export class ExerciseMuscleGroup extends Model {
    public exerciseId!: number;
    public muscleGroupId!: number;
}

export interface ExerciseMuscleGroupI {
    exerciseId: number;
    muscleGroupId: number;
}

ExerciseMuscleGroup.init({
    exerciseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Exercise,
            key: 'id'
        }
    },
    muscleGroupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: MuscleGroup,
            key: 'id'
        }
    }
}, {
    sequelize: database,
    tableName: "exercise_muscle_group",
    timestamps: true
});

// StretchMuscleGroup Model
export class StretchMuscleGroup extends Model {
    public stretchId!: number;
    public muscleGroupId!: number;
}

export interface StretchMuscleGroupI {
    stretchId: number;
    muscleGroupId: number;
}

StretchMuscleGroup.init({
    stretchId: {
        type: DataTypes.INTEGER,
        references: {
            model: Stretch,
            key: 'id'
        },
        allowNull: false
    },
    muscleGroupId: {
        type: DataTypes.INTEGER,
        references: {
            model: MuscleGroup,
            key: 'id'
        },
        allowNull: false
    }
}, {
    sequelize: database,
    tableName: "stretch_muscle_groups",
    timestamps: false
});


// Setting up associations
Exercise.belongsToMany(MuscleGroup, { through: ExerciseMuscleGroup, foreignKey: 'exerciseId' });
MuscleGroup.belongsToMany(Exercise, { through: ExerciseMuscleGroup, foreignKey: 'muscleGroupId' });

// Associations
Stretch.belongsToMany(MuscleGroup, {
    through: StretchMuscleGroup,
    foreignKey: 'stretchId',
    otherKey: 'muscleGroupId'
});

MuscleGroup.belongsToMany(Stretch, {
    through: StretchMuscleGroup,
    foreignKey: 'muscleGroupId',
    otherKey: 'stretchId'
});

