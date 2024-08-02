import { DataTypes, Model } from "sequelize";
import { database } from "../database/db";
import { User } from "./user.model";

// TrainingRecord Model
export class TrainingRecord extends Model {
    public id!: number;
    public userId!: number;
    public date!: Date;
}

export interface TrainingRecordI {
    id: number;
    userId: number;
    date: Date;
}

TrainingRecord.init({
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize: database,
    tableName: "training_records",
    timestamps: false
});
