import { DataTypes, Model } from "sequelize";
import { database } from "../database/db";
import { User } from "./user.model";

// Progress Model
export class Progress extends Model {
    public id!: number;
    public userId!: number;
    public date!: Date;
    public weight!: number;
    public height!: number;
    public BMI!: number;
}

export interface ProgressI {
    id: number;
    userId: number;
    date: Date;
    weight: number;
    height: number;
    BMI: number;
}

Progress.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    weight: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    height: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    BMI: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    }
}, {
    sequelize: database,
    tableName: "progress",
    timestamps: true
});

// Setting up the association with the User model
User.hasMany(Progress, { foreignKey: 'userId' });
Progress.belongsTo(User, { foreignKey: 'userId' });
