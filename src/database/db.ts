import { Sequelize } from 'sequelize';
import {DB_HOST,DB_NAME,DB_USER,DB_PASS} from "../config"
export const database = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

async function generateDb() {
    await database.sync({ force: true });
    console.log('Base de datos y tablas creadas');
}

generateDb();