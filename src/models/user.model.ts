import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import bcrypt from "bcrypt"
export class User extends Model {
    public id!: number;
    public fullname!: string;
    public email!: string;
    public password!: string;
    public sexo!: string;
    public height!: number;
    public weight!: number;
}

export interface UserI {
    id: number;
    fullname: string;
    email: string;
    password: string;
    sexo: string;
    height: number;
    weight: number;
}

User.init({
    fullname:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    sexo:{
        type: DataTypes.ENUM("Male", "Female"),
        allowNull:false,
    },
    height: {
        type: DataTypes.FLOAT,
        allowNull:false,
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull:false,
    }
},
    {
        sequelize: database,
        tableName: "users",
        timestamps: true,
        hooks:{
            beforeCreate:async (user:User)=>{
                user.password=await bcrypt.hash(user.password,12)
            },
            beforeUpdate:async (user:User)=>{
                if(user.changed("password")){
                    user.password=await bcrypt.hash(user.password,12)
                }
            }
        }
    })