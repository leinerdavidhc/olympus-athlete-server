import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import bcrypt from "bcrypt"

export class SuperUser extends Model {
    public id!:number
    public  fullname!: string;
    public email!: string;
    public password!: string;
}

export interface SuperUserI{
    id:number
    fullname: string;
    email: string;
    password: string;
}


SuperUser.init({
    fullname:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    }

},{
    sequelize:database,
    tableName: "superusers",
    timestamps: true,
    hooks:{
        beforeCreate: async (superuser:SuperUser)=>{
            superuser.password=await bcrypt.hash(superuser.password,12)
        },
        beforeUpdate: async (superuser:SuperUser)=>{
            if(superuser.changed("password")){
                superuser.password=await bcrypt.hash(superuser.password,12)
            }
        }
    }
})