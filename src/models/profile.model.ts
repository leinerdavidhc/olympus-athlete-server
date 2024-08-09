import { DataTypes, Model } from "sequelize";
import { database } from "../database/db";
import { User } from "./user.model";

export class Profile extends Model {
    public id!: number;
    public UserId!: number;
    public body_goals!: string;
    public main_goals!: string;
    public fitness_level!: string;
    public activity_level!: string;
    public weeklyGoalId!: number;
    public motivationId!: number;
}

export interface ProfileI {
    id: number;
    UserId: number;
    body_goals: string;
    main_goals: string;
    motivations: string;
    fitness_level: string;
    activity_level: string;
    weeklyGoalId: number;
    motivationId: number;
}

Profile.init({
    body_goals:{
        type: DataTypes.STRING,
        allowNull:false
    },
    main_goals:{
        type: DataTypes.STRING,
        allowNull:false
    },
    fitness_level:{
        type: DataTypes.STRING,
        allowNull:false
    },
    activity_level:{
        type: DataTypes.STRING,
        allowNull:false
    },

},{
    sequelize:database,
    tableName: "profile",
    timestamps:true
})



export class weeklyGoals extends Model {
    public id!: number;
    public day!: string;
    public first_day!: string;
}

export interface weeklyGoalsI {
    id: number;
    day: number;
    first_day: string;
}


weeklyGoals.init({
    day: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5", "6", "7"),
        allowNull: false
    },
    first_day: {
        type: DataTypes.ENUM("Domingo", "Sabado", "Lunes"),
        allowNull: false
    }
}, {
    sequelize: database,
    tableName: "weekly_goals",
    timestamps: true
})



export class Motivation extends Model {
    public id!: number;
    public description!: string;
}
export interface MotivationI{
    id: number;
    description: string;
}

Motivation.init({
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database,
    tableName: 'motivations',
    timestamps: true,
});


export class ProfileMotivation extends Model {
    public ProfileId!: number;
    public MotivationId!: number;
}

export interface ProfileMotivationI {
    ProfileId: number;
    MotivationId: number;
}

ProfileMotivation.init({}, {
    sequelize: database,
    tableName: 'profile_motivations',
    timestamps: false,
});




//relacion entre perfil y usuario
User.hasOne(Profile)
Profile.belongsTo(User)


//relacion entre perfil y objetivo de la semana
weeklyGoals.hasOne(Profile)
Profile.belongsTo(weeklyGoals)

//relacion entre perfil y motivation
Profile.belongsToMany(Motivation, { through: ProfileMotivation });
Motivation.belongsToMany(Profile, { through: ProfileMotivation });

