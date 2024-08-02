import { DataTypes, Model } from "sequelize";
import { database } from "../database/db";
import { User } from "./user.model";

// BlogArticle Model
export class BlogArticle extends Model {
    public id!: number;
    public title!: string;
    public content!: string;
    public authorId!: number;
    public publishDate!: Date;
}

export interface BlogArticleI {
    id: number;
    title: string;
    content: string;
    authorId: number;
    publishDate: Date;
}

BlogArticle.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    publishDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize: database,
    tableName: "blog_articles",
    timestamps: true
});

// Setting up the association with the User model
User.hasMany(BlogArticle, { foreignKey: 'authorId' });
BlogArticle.belongsTo(User, { foreignKey: 'authorId' });
