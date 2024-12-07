import { Sequelize, DataTypes } from "sequelize";

// Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
});

const Recipes = sequelize.define("Recipes", {
    recipeid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "There is no description for this recipe."
    },
    nutrients: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    serving: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        defaultValue: 0,
    },
    length: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
    },
    instruction: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
    },
    image: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
    },
    ingredients: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: null,
    },
    diet_type: {
        type: DataTypes.JSON,
        allowNull: false,
    },
});