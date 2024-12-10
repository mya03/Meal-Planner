import { Sequelize } from "sequelize";

// This singleton class creates 1 instance of the SQLiteDB
// In the database.sqlite stores the tables (Recipes, User,...)
export class SQLiteDB {

    // Define a static reference to the SQLiteDB
    static sequelize = null;
    
    // Get an instance of the SQLiteDB
    static getInstance() {
        if (!SQLiteDB.sequelize) {
            SQLiteDB.sequelize = new Sequelize({
                dialect: "sqlite",
                storage: "database.sqlite",
            });
        }
        return SQLiteDB.sequelize;
    }
}