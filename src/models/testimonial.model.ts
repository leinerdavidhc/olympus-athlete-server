import { DataTypes, Model } from "sequelize"
import { database } from "../database/db"

export default class Testimonial extends Model {
    public id!: number;
    public quote!: string;
    public description!: string;
    public author!: string;
    public date!: Date;
}

export interface TestimonialI {
    id: number;
    quote: string;
    description: string;
    author: string;
    date: Date;
}

Testimonial.init({
    quote: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    sequelize: database,
    tableName: "testimonial",
    timestamps: true,
})