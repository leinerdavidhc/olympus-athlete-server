import { DataTypes, Model } from "sequelize";
import { database } from "../database/db";
import { Routine } from "./routine.model";
import { Challenge } from "./challenges.model";


// RoutineChallenge Model
export class RoutineChallenge extends Model {
    public routineId!: number;
    public challengeId!: number;
    public startDate!: Date;
    public endDate!: Date;
}

export interface RoutineChallengeI {
    routineId: number;
    challengeId: number;
    startDate: Date;
    endDate: Date;
}

RoutineChallenge.init({
    routineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Routine,
            key: 'id'
        }
    },
    challengeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Challenge,
            key: 'id'
        }
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize: database,
    tableName: "routine_challenges",
    timestamps: true
});

// Setting up the associations
Routine.belongsToMany(Challenge, { through: RoutineChallenge, foreignKey: 'routineId' });
Challenge.belongsToMany(Routine, { through: RoutineChallenge, foreignKey: 'challengeId' });
